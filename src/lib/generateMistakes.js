const fs = require("fs");
const path = require("path");

const newMistakes = `
export const writingMistakesBank: WritingMistake[] = [
  {
    id: "M1",
    wrongSentence: "Unfortunately, I am not available next Tuesday at 11 a.m. because I have an important school exam in that time.",
    options: ["in that time", "at that time", "on that time"],
    correctOption: "at that time",
    explanation: "Se usa la preposición \\"at\\" para horas específicas o momentos precisos (at that time, at 11 a.m.)."
  },
  {
    id: "M2",
    wrongSentence: "Would it be possible meet later the same day, perhaps at 3 p.m.?",
    options: ["possible meet", "possible to meet", "possible meeting"],
    correctOption: "possible to meet",
    explanation: "Después de \\"It is possible\\" o \\"Would it be possible\\", el verbo siguiente debe ir en infinitivo con \\"to\\" (to meet)."
  },
  {
    id: "M3",
    wrongSentence: "I look forward to hear from you.",
    options: ["to hear", "to hearing", "hear"],
    correctOption: "to hearing",
    explanation: "La expresión formal \\"look forward to\\" siempre va seguida de un verbo terminado en \\"-ing\\" (hearing)."
  },
  {
    id: "M4",
    wrongSentence: "It is vital for young people establish healthy habits early in life.",
    options: ["establish", "to establish", "establishing"],
    correctOption: "to establish",
    explanation: "La estructura \\"It is + adjetivo + for someone\\" requiere que el siguiente verbo sea en infinitivo con \\"to\\" (to establish)."
  },
  {
    id: "M5",
    wrongSentence: "The regular exercise is crucial. It keeps you fit and maintains a healthy weight.",
    options: ["The regular exercise", "Regular exercise", "A regular exercise"],
    correctOption: "Regular exercise",
    explanation: "Cuando se habla de conceptos generales o incontables en inglés (como el ejercicio en general), no se usa el artículo definido \\"The\\"."
  },
  {
    id: "M6",
    wrongSentence: "Eat fruits and vegetables provides the necessary energy for study.",
    options: ["Eat fruits", "Eating fruits", "To eating fruits"],
    correctOption: "Eating fruits",
    explanation: "Cuando un verbo funciona como el sujeto de una oración, generalmente se usa en su forma de gerundio (terminación -ing)."
  },
  {
    id: "M7",
    wrongSentence: "There is an ongoing debate about if practical life skills should be part of the school curriculum.",
    options: ["about if", "about whether", "about that"],
    correctOption: "about whether",
    explanation: "Después de preposiciones como \\"about\\" y en contextos formales, se usa \\"whether\\" en lugar de \\"if\\" para expresar alternativas."
  },
  {
    id: "M8",
    wrongSentence: "I strongly believe it should to be taught to all students.",
    options: ["should to be taught", "should be taught", "should taught"],
    correctOption: "should be taught",
    explanation: "Los verbos modales (como \\"should\\") van seguidos del verbo en infinitivo sin \\"to\\" (should be)."
  },
  {
    id: "M9",
    wrongSentence: "It allows young people to prepare fresh meals instead of rely on processed foods.",
    options: ["instead of rely", "instead of relying", "instead to rely"],
    correctOption: "instead of relying",
    explanation: "Después de cualquier preposición (como \\"of\\" en \\"instead of\\"), los verbos siempre deben ir en gerundio (-ing)."
  },
  {
    id: "M10",
    wrongSentence: "To be honest, it depends of my mood.",
    options: ["depends of", "depends on", "depends from"],
    correctOption: "depends on",
    explanation: "El verbo \\"depend\\" siempre rige la preposición \\"on\\", nunca \\"of\\"."
  },
  {
    id: "M11",
    wrongSentence: "Could you please to check if anyone has turned my bag in?",
    options: ["please to check", "please check", "please checking"],
    correctOption: "please check",
    explanation: "Después del modal \\"Could\\" (Could you please...), el verbo principal debe ir en su forma base sin \\"to\\" (check)."
  },
  {
    id: "M12",
    wrongSentence: "I was wondering how often do you meet in the club.",
    options: ["how often do you meet", "how often you meet", "how often are you meeting"],
    correctOption: "how often you meet",
    explanation: "En preguntas indirectas (I was wondering...), no se usa el auxiliar (do/does) y el orden es sujeto + verbo (how often you meet)."
  },
  {
    id: "M13",
    wrongSentence: "In one hand, organizing an outdoor sports day has the advantage of promoting teamwork.",
    options: ["In one hand", "On one hand", "At one hand"],
    correctOption: "On one hand",
    explanation: "La expresión fija correcta en inglés es \\"On one hand...\\" y \\"On the other hand...\\"."
  },
  {
    id: "M14",
    wrongSentence: "When considering different places to live, residing in a city center apartment offer major advantages.",
    options: ["offer", "offers", "offering"],
    correctOption: "offers",
    explanation: "El sujeto de la oración (residing in a city center apartment) es singular, por lo que el verbo debe llevar \\"s\\" en tercera persona (offers)."
  },
  {
    id: "M15",
    wrongSentence: "The advantage of a dinner is that it allow everyone to share memories and say goodbye.",
    options: ["it allow", "it allows", "it is allowing"],
    correctOption: "it allows",
    explanation: "El pronombre \\"it\\" es tercera persona del singular, por lo tanto el verbo en presente simple debe terminar en \\"s\\" (allows)."
  },
  {
    id: "M16",
    wrongSentence: "Most people I know is becoming increasingly aware of climate change.",
    options: ["is becoming", "are becoming", "becomes"],
    correctOption: "are becoming",
    explanation: "La palabra \\"people\\" es un sustantivo plural irregular en inglés, por lo que exige un verbo en plural (are)."
  },
  {
    id: "M17",
    wrongSentence: "It also encourages citizens utilizing public transportation or bicycles instead.",
    options: ["utilizing", "to utilize", "utilize"],
    correctOption: "to utilize",
    explanation: "El verbo \\"encourage\\" requiere la estructura: encourage + objeto + to + infinitivo (encourage citizens to utilize)."
  },
  {
    id: "M18",
    wrongSentence: "If someone wants to visit our countryside, I highly recommend to travel to the Andean highlands.",
    options: ["recommend to travel", "recommend traveling", "recommend travel"],
    correctOption: "recommend traveling",
    explanation: "El verbo \\"recommend\\" suele ir seguido de un gerundio (-ing) cuando no se menciona a una persona específica antes del verbo (recommend traveling)."
  },
  {
    id: "M19",
    wrongSentence: "I strongly believe we should always remember historical turning points, such like national independence days.",
    options: ["such like", "such as", "so as"],
    correctOption: "such as",
    explanation: "Para dar ejemplos se usa la expresión \\"such as\\" (tales como), no \\"such like\\"."
  },
  {
    id: "M20",
    wrongSentence: "While reflecting on past experiences helps us learn from our mistakes, obsessing over them hold us back.",
    options: ["hold us back", "holds us back", "holding us back"],
    correctOption: "holds us back",
    explanation: "El sujeto \\"obsessing over them\\" (obsesionarse con ellos) actúa como una idea singular (it), por lo que el verbo debe llevar \\"s\\" (holds)."
  }
];

export function generateMistakesSession(): WritingMistake[] {
  return writingMistakesBank.sort(() => 0.5 - Math.random()).slice(0, 5);
}
`;

const bankPath = path.join(__dirname, "question-bank.ts");
let content = fs.readFileSync(bankPath, "utf8");

// Find start and end of writingMistakesBank
const startIndex = content.indexOf("export const writingMistakesBank: WritingMistake[] = [");
if (startIndex !== -1) {
    const endIndex = content.indexOf("export function generateMistakesSession(): WritingMistake[] {");
    if (endIndex !== -1) {
        const finalContent = content.substring(0, startIndex) + newMistakes;
        fs.writeFileSync(bankPath, finalContent);
        console.log("Successfully replaced writingMistakesBank with custom derived mistakes.");
    }
}

