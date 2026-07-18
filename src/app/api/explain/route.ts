import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { question, options, correctIndex, selectedIndex, context } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        explanation: "La opción seleccionada es incorrecta. La opción correcta es la que mejor se alinea con la información del texto o audio."
      });
    }

    const correctText = options[correctIndex];
    const selectedText = options[selectedIndex];

    const systemPrompt = `You are an expert English teacher helping a student prepare for the Oxford Test of English (OTE) at B1/B2 level.

The student answered a multiple-choice question INCORRECTLY.

${context ? `Context (reading text or audio transcript):\n"${context}"\n` : ''}
Question: "${question}"

Options:
${options.map((opt: string, i: number) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

Correct answer: ${String.fromCharCode(65 + correctIndex)}) ${correctText}
Student's wrong answer: ${String.fromCharCode(65 + selectedIndex)}) ${selectedText}

Write a short explanation in Spanish (2-3 sentences max):
1. Why option ${String.fromCharCode(65 + selectedIndex)} is WRONG
2. Why option ${String.fromCharCode(65 + correctIndex)} is CORRECT (citing the text/audio if applicable)
3. Add a grammar tip if relevant (e.g., tense clue, vocabulary, inference strategy)

Tone: Warm, encouraging, like a good teacher. Do NOT start with "Explanation:" or similar.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(systemPrompt);
    const explanation = result.response.text().trim();

    return NextResponse.json({ explanation });

  } catch (error) {
    console.error('Error in explain route:', error);
    return NextResponse.json({ explanation: "Error al generar la explicación. Verifica que la API key de Gemini sea válida." });
  }
}
