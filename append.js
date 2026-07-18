const fs = require('fs');
const file = 'c:/Users/Dell/Documents/trae_projects/plataforma/oxford-platform/src/lib/question-bank.ts';
let content = fs.readFileSync(file, 'utf8');

const newListening = `
  // ── PREGUNTAS OFICIALES OTE (NOTEBOOKLM & SCRAPING) ──
  {
    id: "L2-OFF-1", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Robos a bancos (Historico)",
    partLabel: "Parte 2: Monólogo",
    audioScript: "More than 60 percent of bank robberies are quickly solved. Interestingly, George Leonidas Leslie sometimes broke into banks he planned to rob first without taking anything. In 1986 the hole in the ground gang created tunnels below Hollywood to escape. And James Verone walked into a bank and demanded one dollar because the only place he could get free health treatment was in prison.",
    prompt: "Why did James Verone only demand one dollar from the bank?",
    options: ["He wanted to be sent to prison for health treatment", "He felt sorry for the bank employees", "He was part of the hole in the ground gang"],
    correct: 0,
  },
  {
    id: "L3-OFF-1", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Meteoritos (Debate)",
    partLabel: "Parte 3: Debate",
    audioScript: "Prof. Santos: Large meteor strikes are very rare... once every half a million years.\\nProf. Martin: I think actually we should be concerned... small meteorites can be quite dangerous.\\nProf. Santos: I suppose you're right. Though we both agree that dinosaurs were probably killed by a climate change caused by a massive impact.",
    prompt: "What do the two professors agree on?",
    options: ["Small meteorites are very dangerous", "Meteor strikes happen every 500,000 years", "A meteor strike caused climate change that killed dinosaurs"],
    correct: 2,
  },`;

const newReading = `
  // ── PREGUNTAS OFICIALES OTE (NOTEBOOKLM & SCRAPING) ──
  {
    id: "R2-OFF-1", module: "reading", part: 2, difficulty: "B1", type: "choice", topic: "Salud y bienestar",
    partLabel: "Parte 2: Textos cortos",
    context: "How to stay fit, happy and healthy\\n\\nGet more sleep! Sleep at least 8 hours to be physically and mentally healthy.\\nStrive for a better diet: eat smaller portions, replace white bread with whole grains, and include fruits and vegetables.\\nStop all those bad habits: eliminate junk food, caffeine, tobacco, and alcohol.\\nExercise, exercise, exercise: 30 minutes, 3-4 times a week (walk, run, swim).",
    prompt: "What is NOT mentioned as a recommended action to improve health?",
    options: ["Sleeping exactly 6 hours a day", "Replacing white bread with whole grains", "Exercising 3-4 times a week"],
    correct: 0,
  },
  {
    id: "R3-OFF-1", module: "reading", part: 3, difficulty: "B2", type: "choice", topic: "Medio Ambiente (Plasticos)",
    partLabel: "Parte 3: Completar huecos",
    context: "Stopping Single Use Plastic a Good Idea?\\n\\nIn the last 65 years, we've relied more on plastic. [HUECO 1] These tiny bits, called micro-plastics, harm the environment... Stores are making plastic-free aisles... [HUECO 2] ... In fields like medicine, single-use plastic is crucial... [HUECO 3]",
    prompt: "Choose the sentence that best fits [HUECO 1].",
    options: [
      "Plastic doesn't break down completely, so it slowly breaks into tiny pieces by the wind, sun, or water.",
      "Soon things like cotton buds and straws might be forbidden too.",
      "Using things like dishes, syringes, and vials just once helps prevent infections."
    ],
    correct: 0,
  },
  {
    id: "R4-OFF-1", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "Ciencia (Pinguinos)",
    partLabel: "Parte 4: Texto largo",
    context: "Learning from penguin poop\\n\\nScientists have discovered a massive colony of Adélie penguins in the remote Danger Islands. Because this area is extremely difficult to access, the colony remained hidden for decades. Researchers finally located them using satellite imagery from space, by spotting the penguins' bright pink guano (poop), which gets its colour from their krill-rich diet.",
    prompt: "How were scientists able to find the penguin colony in the Danger Islands?",
    options: ["By traveling to the islands on a research boat", "By spotting their bright pink poop from space using satellites", "By tracking the penguins' krill diet in the ocean"],
    correct: 1,
  },`;

const newWriting = `
  // ── PREGUNTAS OFICIALES OTE (NOTEBOOKLM & SCRAPING) ──
  {
    id: "W1-OFF-1", module: "writing", part: 1, difficulty: "B1", type: "text", topic: "Escuela (Reunion de padres)",
    partLabel: "Parte 1: Email",
    prompt: "You recently attended a parent-teacher meeting. Reply to an email from Ms. Niki Meehan (Head of Primary).\\nWrite 80-130 words and include:\\n- How the meeting with the tutor went.\\n- What things you liked about the appointment.\\n- Suggest how to improve the appointment system so parents don't have to wait so long.",
    minWords: 80,
  },
  {
    id: "W2-OFF-1", module: "writing", part: 2, difficulty: "B2", type: "text", topic: "Medio Ambiente (Ensayo)",
    partLabel: "Parte 2: Ensayo",
    prompt: "Your teacher has asked you to write an essay based on a class discussion about environmental protection.\\nEssay Topic: 'What can citizens do to help protect the environment?'\\nWrite 100-160 words.",
    minWords: 100,
  },
  {
    id: "W2-OFF-2", module: "writing", part: 2, difficulty: "B2", type: "text", topic: "Cine (Resena)",
    partLabel: "Parte 2: Reseña",
    prompt: "Movie reviews wanted!\\nWrite a review of a film that surprised you. Include:\\n- Who the main character was.\\n- Why the film surprised you.\\n- What you liked the most about it.\\nWrite 100-160 words.",
    minWords: 100,
  },`;

const newSpeaking = `
  // ── PREGUNTAS OFICIALES OTE (NOTEBOOKLM & SCRAPING) ──
  {
    id: "S1-OFF-1", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Personal / Hobbies",
    partLabel: "Parte 1: Entrevista",
    prompt: "When was the last time you tried something new and exciting? What was it?",
    timeSeconds: 15,
  },
  {
    id: "S1-OFF-2", module: "speaking", part: 1, difficulty: "B2", type: "voice", topic: "Educacion",
    partLabel: "Parte 1: Entrevista",
    prompt: "Have you got a university degree? If not, why not? What is the best way to learn something new?",
    timeSeconds: 15,
  },
  {
    id: "S2-OFF-1", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Mensaje de voz (Gimnasio)",
    partLabel: "Parte 2: Mensaje de voz",
    prompt: "You would like to go to a new gym club with your friend. Leave a voicemail message for your friend and:\\n- Invite your friend to the gym club.\\n- Explain what you can do there.\\n- Suggest a time and place to meet.",
    timeSeconds: 40,
  },
  {
    id: "S3-OFF-1", module: "speaking", part: 3, difficulty: "B2", type: "voice", topic: "Moda y Ropa (Charla)",
    partLabel: "Parte 3: Charla",
    context: "[Imagen 1: Ropa formal de oficina] vs [Imagen 2: Ropa casual de verano]",
    prompt: "Give a talk to your English class about different types of fashion styles. Choose two photographs. Tell your class when it is more suitable to wear these two kinds of clothes.",
    timeSeconds: 60,
  },
  {
    id: "S4-OFF-1", module: "speaking", part: 4, difficulty: "B2", type: "voice", topic: "Moda y Personalidad",
    partLabel: "Parte 4: Preguntas de seguimiento",
    prompt: "Is the way you dress important? What does the way you dress say about your personality?",
    timeSeconds: 40,
  },`;

content = content.replace(/export const listeningBank: BankQuestion\[\] = \[/, 'export const listeningBank: BankQuestion[] = [' + newListening);
content = content.replace(/export const readingBank: BankQuestion\[\] = \[/, 'export const readingBank: BankQuestion[] = [' + newReading);
content = content.replace(/export const writingBank: BankQuestion\[\] = \[/, 'export const writingBank: BankQuestion[] = [' + newWriting);
content = content.replace(/export const speakingBank: BankQuestion\[\] = \[/, 'export const speakingBank: BankQuestion[] = [' + newSpeaking);

fs.writeFileSync(file, content);
console.log('Successfully updated question-bank.ts with official questions');
