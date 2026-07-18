import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { module, text, prompt, minWords } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Mock fallback if API key is not configured
      return NextResponse.json({
        success: true,
        mock: true,
        feedback: {
          taskFulfillment: { score: 3, max: 5, comment: "Buen intento de responder, pero asegúrate de cubrir todos los puntos del enunciado." },
          organization: { score: 4, max: 5, comment: "La estructura es clara y usaste algunos conectores básicos." },
          grammar: { score: 3, max: 5, comment: "Hay algunos errores en el uso de los tiempos verbales (present perfect vs past simple)." },
          lexis: { score: 4, max: 5, comment: "Buen vocabulario, aunque podrías intentar usar expresiones más complejas de nivel B2." },
          overall: "B1",
          generalComment: "Vas por buen camino. Trata de revisar tus tiempos verbales antes de enviar la respuesta final y asegúrate de llegar al mínimo de palabras.",
        }
      });
    }

    const systemPrompt = `You are an expert Oxford Test of English (OTE) examiner at B1/B2 level.
Evaluate the following student writing task strictly.

Task type: ${module}
Minimum words: ${minWords || 80}

Task prompt given to student:
"${prompt}"

Student's answer:
"${text}"

Evaluate based on 4 criteria (each scored 1-5):
1. Task Fulfillment — Did they respond to ALL parts of the prompt? Is the length appropriate?
2. Organization — Clear structure, paragraphs, use of connectors/linking words?
3. Grammar — Range and accuracy of grammatical structures (tenses, conditionals, passives, modals)?
4. Lexis — Vocabulary range, collocations, B2-appropriate word choice?

Determine overall CEFR level: A2, B1, B2, or C1.

IMPORTANT: Respond ONLY with valid raw JSON (no markdown code blocks). Use this exact structure:
{
  "taskFulfillment": { "score": number, "max": 5, "comment": "feedback in Spanish" },
  "organization": { "score": number, "max": 5, "comment": "feedback in Spanish" },
  "grammar": { "score": number, "max": 5, "comment": "feedback in Spanish" },
  "lexis": { "score": number, "max": 5, "comment": "feedback in Spanish" },
  "overall": "B1",
  "generalComment": "encouraging overall feedback in Spanish, max 2 sentences"
}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(systemPrompt);
    const textResp = result.response.text();

    let parsedFeedback;
    try {
      const cleanJson = textResp
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      parsedFeedback = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", textResp);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      feedback: parsedFeedback
    });

  } catch (error) {
    console.error('Error in evaluation route:', error);
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
