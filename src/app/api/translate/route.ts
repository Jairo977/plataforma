import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const cache = new Map<string, { translation: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

const GEMINI_MODELS = ['gemini-1.5-flash', 'gemini-2.0-flash'];

async function translateWithGemini(apiKey: string, prompt: string): Promise<string | null> {
  const genAI = new GoogleGenerativeAI(apiKey);
  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err: any) {
      if (err?.status === 429 || err?.message?.includes('429')) {
        console.warn(`Gemini quota exceeded for ${modelName}`);
        continue;
      }
      throw err;
    }
  }
  return null;
}

async function translateWithNvidia(apiKey: string, prompt: string): Promise<string> {
  const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta/llama-3.1-8b-instruct',
      messages: [
        { role: 'system', content: 'You are an expert translator. Provide ONLY the translated text, nothing else.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 200,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NVIDIA API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.choices[0].message.content.trim();
}

export async function POST(req: Request) {
  try {
    const { text, from = 'es', to = 'en' } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const cacheKey = `${from}:${to}:${text.trim().toLowerCase()}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ success: true, translation: cached.translation });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const nvidiaKey = process.env.NVIDIA_API_KEY;

    const systemPrompt = `You are an expert translator and English teacher. 
Translate the following text from ${from.toUpperCase()} to ${to.toUpperCase()}.
If the user provides a short phrase in Spanish (e.g. "soy de ecuador"), translate it naturally to spoken English ("I'm from Ecuador").
Provide ONLY the translated text in your response, nothing else.`;

    const fullPrompt = `${systemPrompt}\n\nText to translate: "${text}"`;

    let translatedText: string | null = null;

    if (geminiKey) {
      translatedText = await translateWithGemini(geminiKey, fullPrompt);
    }

    if (!translatedText && nvidiaKey) {
      console.warn('Gemini falló, probando con NVIDIA...');
      translatedText = await translateWithNvidia(nvidiaKey, fullPrompt);
    }

    if (!translatedText) {
      return NextResponse.json({
        success: true,
        translation: "I'm from Ecuador (Mock Translation - No API disponible)"
      });
    }

    cache.set(cacheKey, { translation: translatedText, timestamp: Date.now() });

    return NextResponse.json({ success: true, translation: translatedText });

  } catch (error: any) {
    console.error('Error in translate route:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: true, translation: `(Error al traducir: ${message})` });
  }
}
