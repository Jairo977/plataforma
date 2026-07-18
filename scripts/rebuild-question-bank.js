const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
const writingItemsList = require('./original-writing-bank.js');

// Convert the JS array objects back into a pretty string representation to inject into the TS file
const writingItems = writingItemsList.map(item => {
  return JSON.stringify(item, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // convert quotes on keys to standard TS object syntax
    .trim();
}).join(',\n  ');

const baseTemplate = `// ─────────────────────────────────────────────────────────────────────────────
// OTE MASTER — QUESTION BANK
// Banco de preguntas del Oxford Test of English con selección aleatoria
// Basado en temas y formatos reales del OTE oficial (NotebookLM research)
// ─────────────────────────────────────────────────────────────────────────────

export type QuestionType = "choice" | "text" | "voice";
export type Difficulty = "B1" | "B2";
export type TextType = "email_formal" | "email_informal" | "essay" | "article" | "review";

export interface BankQuestion {
  id: string;
  module: "listening" | "reading" | "writing" | "speaking";
  part: 1 | 2 | 3 | 4;
  partLabel: string;
  difficulty: Difficulty;
  type: QuestionType;
  audioScript?: string;      // Listening: read via TTS
  context?: string;          // Reading/Speaking: passage or visual description
  images?: string[];         // Speaking Part 3: Images to compare
  subQuestions?: {           // Speaking Part 1 & 4: Multiple questions per topic
    question: string;
    modelExample?: string;
    modelTranslation?: string;
    grammarTip?: string;
  }[];
  prompt: string;
  options?: string[];
  correct?: number;
  minWords?: number;
  timeSeconds?: number;      // Speaking: suggested response time
  topic: string;             // e.g. "Vacaciones", "Medio ambiente", etc.

  // ── Pedagogical hints (all optional) ──────────────────────────────────────
  listenForHint?: string;    // Listening: what to focus on
  inferenceHint?: string;    // Reading: inference tip before answering
  grammarTip?: string;       // Grammar explanation shown after wrong answer
  grammarFormula?: string;   // e.g. "If + Past Simple, would + infinitive"

  // ── Listening Part 3: opinion format (man/woman/both) ─────────────────────
  opinionFormat?: boolean;   // true = Part 3 style
  speakerA?: string;         // Name/label for speaker A
  speakerB?: string;         // Name/label for speaker B
  studySkill?: string;        // Listening study focus
  strategySteps?: string[];   // Short study steps
  predictionPrompt?: string;  // What to predict before listening
  transcriptHighlights?: string[]; // Key phrases
  answerExplanation?: string; // Local explanation
  noteCompletion?: {
    title: string;
    sections: {
      heading: string;
      items: {
        id: number;
        stem: string;
        options: string[];
        correct: number;
        explanation: string;
      }[];
    }[];
  };
  speakerStatements?: {
    statement: string;
    correct: "A" | "B" | "both";
    explanation: string;
    signal?: string;
  }[];

  // ── Reading specific formats ──────────────────────────────────────────────
  matchingProfiles?: {
    id: string;
    title?: string;
    text: string;
  }[];
  matchingQuestions?: {
    question: string;
    correctProfileId: string;
  }[];
  gappedText?: string;
  gappedSentences?: {
    id: string;
    text: string;
    isDistractor?: boolean;
  }[];
  gappedAnswers?: {
    gapNumber: number;
    correctSentenceId: string;
  }[];
  
  // ── Writing pedagogical additions ──────────────────────────────────────────
  usefulPhrases?: string[];
  grammarTips?: string[];
  structureGuide?: string;
  textType?: TextType;
  modelExample?: string;
  modelTranslation?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTENING BANK — 40 questions across 4 parts
// ─────────────────────────────────────────────────────────────────────────────
export const listeningBank: BankQuestion[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// READING BANK — 40 questions across 4 parts
// ─────────────────────────────────────────────────────────────────────────────
export const readingBank: BankQuestion[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// WRITING BANK — 12 tasks (6 emails + 6 essay/article/review)
// ─────────────────────────────────────────────────────────────────────────────
export const writingBank: BankQuestion[] = [
  ${writingItems}
];

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING BANK — 40 questions across 4 parts
// ─────────────────────────────────────────────────────────────────────────────
export const speakingBank: BankQuestion[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// RANDOM SELECTION ENGINE
// Selects exactly N questions per part, shuffled randomly each time
// ─────────────────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export interface ExamSession {
  listening: BankQuestion[];
  reading: BankQuestion[];
  writing: BankQuestion[];
  speaking: BankQuestion[];
}

export function generateExamSession(): ExamSession {
  const listening = [
    ...pick(listeningBank.filter(q => q.part === 1), 5),
    ...pick(listeningBank.filter(q => q.part === 2), 5),
    ...pick(listeningBank.filter(q => q.part === 3), 5),
    ...pick(listeningBank.filter(q => q.part === 4), 5),
  ];

  const reading = [
    ...pick(readingBank.filter(q => q.part === 1), 6),
    ...pick(readingBank.filter(q => q.part === 2), 6),
    ...pick(readingBank.filter(q => q.part === 3), 6),
    ...pick(readingBank.filter(q => q.part === 4), 4),
  ];

  const writing = [
    ...pick(writingBank.filter(q => q.part === 1), 1),
    ...pick(writingBank.filter(q => q.part === 2), 1),
  ];

  const speaking = [
    ...pick(speakingBank.filter(q => q.part === 1), 8),
    ...pick(speakingBank.filter(q => q.part === 2), 2),
    ...pick(speakingBank.filter(q => q.part === 3), 1),
    ...pick(speakingBank.filter(q => q.part === 4), 6),
  ];

  return { listening, reading, writing, speaking };
}

export function generatePracticeSession(module: "listening" | "reading" | "writing" | "speaking", part?: number): BankQuestion[] {
  const banks = { listening: listeningBank, reading: readingBank, writing: writingBank, speaking: speakingBank };
  const bank = banks[module];
  const filtered = part ? bank.filter(q => q.part === part) : bank;
  if (module === "listening" && !part) {
    const studySet = filtered.filter(q => q.id.startsWith("L-STUDY"));
    const extra = filtered.filter(q => !q.id.startsWith("L-STUDY"));
    return [...studySet, ...pick(extra, Math.max(0, 10 - studySet.length))];
  }
  return shuffle(filtered).slice(0, Math.min(filtered.length, 10));
}
`;

fs.writeFileSync(bankPath, baseTemplate, 'utf8');
console.log("Template generated successfully.");
