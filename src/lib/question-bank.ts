// ─────────────────────────────────────────────────────────────────────────────
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
export const listeningBank: BankQuestion[] = [
  // ── PREGUNTAS OFICIALES OTE PDF ──
  {
    id: "L1-PDF-1", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Vacaciones (Alojamiento)", partLabel: "Parte 1: MCQ Corto",
    audioScript: "Woman: Any plans for half term?\nMan: Well, we did think about camping in Cornwall, but it'd mean buying all the kit.\nWoman: There's a cottage we stayed in last year... and it'd sleep five of you.\nMan: It's just me and Jane this time.\nWoman: Then just borrow our stuff. I thought you needed one of those big family tents. We'll be down there at the hotel on the cliff at Westernhead.\nMan: That'd be brilliant, and we could all meet up.",
    prompt: "Two teachers are talking about their next holiday. Where will the man stay on his holiday?",
    options: ["In a tent", "In a hotel", "In a cottage"],
    correct: 0,
    listenForHint: "Escucha con atención qué decide usar el hombre al final: decide aceptar prestado el equipo de acampar de su colega ('borrow our stuff' -> 'tents')."
  },
  {
    id: "L1-PDF-2", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Pérdida de tarjeta", partLabel: "Parte 1: MCQ Corto",
    audioScript: "Woman: I'm trying not to panic, but I think I've lost my bank card.\nMan: You didn't leave it in the machine, did you?\nWoman: I couldn't have because you don't get any cash unless you remove your card first, and I've still got some. Anyway, I distinctly remember putting it back in my wallet.\nMan: Maybe you dropped it accidentally when you were shopping.\nWoman: I don't think so.\nMan: You must have. I paid for the coffees and critically, you didn't even take your coat off or get the wallet out.\nWoman: No, I didn't, did I?",
    prompt: "A husband and wife are talking about a lost bank card. Where do they think it might be?",
    options: ["At the ATM", "At the café", "At the outdoor market"],
    correct: 1,
    listenForHint: "Escucha dónde pagaron los cafés y si la mujer llegó a sacar su cartera en ese lugar ('I paid for the coffees and you didn't even get your wallet out')."
  },
  {
    id: "L1-PDF-3", module: "listening", part: 1, difficulty: "B2", type: "choice", topic: "Viaje a Escocia", partLabel: "Parte 1: MCQ Corto",
    audioScript: "Woman: How do you think I should get to Scotland next week?\nMan: I'd fly. It takes no time, though it is expensive.\nWoman: You can say that again. It's way more than the train, which'd be nice, though even that's still a lot.\nMan: Yeah, but with all these strikes, you never know if they'll be running. The safest thing would be to just drive.\nWoman: That's what I was thinking until I remembered the parking nightmare at the other end. But it is cheap, I suppose... Oh, maybe I'll just take my chances and hope they've reached an agreement and everyone's back at work.",
    prompt: "Two colleagues are talking about a business trip. How will the woman travel to Scotland?",
    options: ["By train", "By plane", "By car"],
    correct: 0,
    listenForHint: "Escucha la decisión final de la mujer ('hope they've reached an agreement and everyone's back at work' se refiere a las huelgas de trenes)."
  },
  {
    id: "L2-PDF-1", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Banca con MZB", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "Hello and welcome to MZB bank. Our aim is to offer our customers the best experience... If you're interested in a credit card, we need proof that you earn above a certain level although it doesn't matter what your job is. If you're in full-time employment, we offer discounts on leisure activities... If you've reached the end of your career, we provide a train and bus pass at a reduced price. We also used to offer a travel pass to those at school or university, but after some research we realized that they preferred a welcome payment of £200. Another great offer is that you get 2% credit back on some regular payments. The current deal is on monthly energy or internet costs. The maximum credit you can receive is £20 per payment. If something strange is detected, the system prevents the payment from leaving your account until we’ve confirmed it with you. We also issue frequent security improvements, so it’s vital to make sure you keep up with the latest version of MZB’s online banking.",
    prompt: "Listen to the talk about MZB bank and answer: Qualifying for a credit card depends on your...",
    options: ["profession", "income", "nationality"],
    correct: 1,
    listenForHint: "Escucha la palabra clave 'credit card' y 'earn above a certain level' (ingresos/income)."
  },
  {
    id: "L2-PDF-2", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Banca con MZB (Ofertas)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "[Same audio script: Banking with MZB] ...If you've reached the end of your career, we provide a train and bus pass at a reduced price...",
    prompt: "According to the speaker, if you're a _______, you will receive a discounted travel card.",
    options: ["worker", "student", "pensioner"],
    correct: 2,
    listenForHint: "Relaciona 'reached the end of your career' con jubilado/pensionista ('pensioner') y 'reduced price pass' con 'discounted travel card'."
  },
  {
    id: "L2-PDF-3", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Banca con MZB (Reembolso)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "[Same audio script: Banking with MZB] ...Another great offer is that you get 2% credit back on some regular payments. The current deal is on monthly energy or internet costs...",
    prompt: "MZB bank provides money back to your account for payments...",
    options: ["of over £20", "for household bills", "at selected shops"],
    correct: 1,
    listenForHint: "Relaciona 'regular payments on energy or internet costs' con facturas del hogar ('household bills')."
  },
  {
    id: "L2-PDF-4", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Banca con MZB (Seguridad)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "[Same audio script: Banking with MZB] ...If something strange is detected, the system prevents the payment from leaving your account until we’ve confirmed it with you...",
    prompt: "If MZB bank spots an unusual payment, they will...",
    options: ["automatically block the payment", "instantly send a text message", "temporarily stop your account"],
    correct: 0,
    listenForHint: "Relaciona 'prevents the payment from leaving your account' con bloquear automáticamente el pago ('automatically block')."
  },
  {
    id: "L2-PDF-5", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Banca con MZB (Seguridad Web)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "[Same audio script: Banking with MZB] ...We also issue frequent security improvements, so it’s vital to make sure you keep up with the latest version of MZB’s online banking.",
    prompt: "To keep your money safe online, you should _______ regularly.",
    options: ["log in to your account", "change your password", "update the app"],
    correct: 2,
    listenForHint: "Relaciona 'keep up with the latest version of online banking' con actualizar la app ('update the app')."
  },
  {
    id: "L3-PDF-1", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Seguro de Auto (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Man: Following complaints by viewers, we have investigated the fees that young drivers have to pay for car insurance... Surely it can’t be right that first-time drivers can pay more for one year’s insurance than the cost of their car.\nWoman: To be honest, it’s all down to statistics. We know exactly how the risks vary according to age, and the costs reflect that, which is as it should be. Having said that, young women are now forced to pay the same premiums as men even though the figures show that women are safer drivers. That’s because men and women have to be treated equally by law.",
    prompt: "Who agrees with the statement: 'The way insurance companies set charges is unfair.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 1,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "El hombre dice directamente que no es justo ('Surely it can't be right'). La mujer defiende las tarifas basándose en estadísticas ('which is as it should be')."
  },
  {
    id: "L3-PDF-2", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Teletrabajo (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Woman: Changes to working patterns can take quite a bit of getting used to... That’s why returning to the office five days a week has proved surprisingly popular with people.\nMan: Yes, like my brother, he couldn’t wait to get back. I think though, that people like him are an exception to the rule, and most people appreciate the flexibility that a less strict working pattern offers.",
    prompt: "Who agrees with the statement: 'Office staff prefer working from home some of the time.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 1,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "El hombre sostiene que la mayoría valora la flexibilidad del teletrabajo ('most people appreciate the flexibility'). La mujer dice que volver a la oficina 5 días es lo popular."
  },
  {
    id: "L3-PDF-3", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Turismo (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Woman: I was in the centre this morning. Everywhere I went, the streets were jammed with tourists. In the end, I had enough and came straight home without buying anything.\nMan: I know what you mean. You can barely walk down the pavement for all the tour groups. Mind you, it’s good for the shops and brings in lots of money for the local economy, so I’m not going to complain about that.",
    prompt: "Who agrees with the statement: 'Tourism is damaging the town.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 2,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "Ambos coinciden en las molestias del turismo: la mujer regresó a casa frustrada ('jammed with tourists') y el hombre concuerda ('You can barely walk')."
  },
  {
    id: "L3-PDF-4", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Arquitectura Moderna (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Woman: I’m not sure that modern architecture is really delivering for society as a whole. Surely, we’ve had enough of these box-like buildings with their great slabs of concrete and huge windows. And actually, it’s not even accurate to call that sort of thing modern.\nMan: Or even architecture, come to think of it. Nevertheless, I’d say that applies more to public architecture – libraries, office blocks and so on – than to individual projects, where I think the spirit of inventiveness and creativity is very much alive.",
    prompt: "Who agrees with the statement: 'Modern architecture is disappointing.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 2,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "Ambos expresan desilusión. La mujer critica los edificios cuadrados de concreto ('box-like buildings') y el hombre concuerda llamándolos 'ni siquiera arquitectura' ('Or even architecture, come to think of it')."
  },
  {
    id: "L4-PDF-1", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Análisis Académico", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "You’ve clearly taken on board what I said about structure, and your analysis is clear and logical. The only issue is that your conclusion, though well constructed, could be a little better developed, but all in all this is a fine job.",
    prompt: "Listen to the speaker. Who is talking to whom?",
    options: ["a therapist and a patient", "an architect and a builder", "a professor and a student"],
    correct: 2,
    listenForHint: "Escucha palabras académicas como 'structure', 'analysis', 'conclusion' y la frase de evaluación 'all in all this is a fine job'."
  },
  {
    id: "L4-PDF-2", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Planes de Cine", partLabel: "Parte 4: Diálogo Corto",
    audioScript: "Man: There’s a good movie on at the cinema tonight.\nWoman: Oh yes, the one about mysterious creatures. I saw the advert.\nMan: No, that finished last week. It’s the one about the couple who visit the rainforest together and get lost.\nWoman: Now I know the one you mean. They come across this village in the middle of nowhere and the local people are very unfriendly.\nMan: Yes. But actually it’s just a big misunderstanding and they have ridiculous adventures getting to know each other. It’s meant to be hilarious.\nWoman: Sounds perfect. I need something to cheer me up.",
    prompt: "Listen to the conversation. What type of movie are they thinking of seeing?",
    options: ["Comedy drama", "Science fiction", "Travel documentary"],
    correct: 0,
    listenForHint: "El hombre dice que la película es 'hilarious' (divertidísima) y la mujer dice que necesita algo para alegrarse ('cheer me up')."
  },
  {
    id: "L4-PDF-3", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Discurso de Agradecimiento", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "If you would like to show your appreciation for our speaker today, we would welcome any donations, and all the funds we raise will be assigned to our projects in disadvantaged inner-city areas.",
    prompt: "Listen to the speaker. What is the speaker's main aim?",
    options: ["to express gratitude to someone", "to encourage people to be generous", "to remind an audience of their responsibility"],
    correct: 1,
    listenForHint: "El locutor pide donaciones voluntarias ('we would welcome any donations... to raise funds'), lo cual incita a la generosidad."
  },
  {
    id: "L4-PDF-4", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Opinión de un show", partLabel: "Parte 4: Diálogo Corto",
    audioScript: "Woman: We haven’t talked about that show.\nMan: The one with the singer and the footballer?\nWoman: That’s right. It sounded weird, not really my cup of tea.\nMan: Well, I was prepared to give it a go, but you’re absolutely right.\nWoman: I guess it was popular. When a celebrity is involved, it’s impossible to get tickets and you’re packed in like sardines.\nMan: Actually, there was no danger of that with this one. It was half empty.\nWoman: Really? Well, you’ve probably got the reviews to thank for that.\nMan: I wish I’d read them. I could have saved myself the time and money.",
    prompt: "Two friends talk about a show they watched. The woman is explaining why...",
    options: ["she didn't enjoy the show.", "she recommended the show.", "she didn't go to the show."],
    correct: 0,
    listenForHint: "La mujer dice que 'not really my cup of tea' (no fue de su agrado) y que se siente mal por gastar dinero."
  },
  {
    id: "L4-PDF-5", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Inspiración de Geología", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "It’s your geology presentation tomorrow, isn’t it? How are you getting on? You’re probably sick and tired of it. But funnily enough, I’ve just seen an interesting YouTube video about glaciers. Probably beneficial for a bit of last-minute inspiration. By the way, Sam is in town tomorrow evening, so you could drop by, depending on how you feel after the presentation.",
    prompt: "Listen to the message. What is the speaker's purpose?",
    options: ["to ask about someone’s health", "to offer some advice", "to arrange an evening out"],
    correct: 1,
    listenForHint: "El hablante sugiere ver un video de YouTube como 'last-minute inspiration' (inspiración de último minuto), lo cual es un consejo."
  },
  {
    id: "L4-PDF-6", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Ánimo pre-examen", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "You’ll be absolutely fine, I’m sure. You’ve done all the work, you’ve prepared well, and you’ll sail through, believe me.",
    prompt: "Listen to the speaker. The speaker's tone is...",
    options: ["encouraging", "patient", "sensitive"],
    correct: 0,
    listenForHint: "El tono es claramente motivador e inspirador ('You'll be absolutely fine... you've prepared well... you'll sail through')."
  },
  {
    id: "L4-PDF-7", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Reacción a comportamiento", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "How dare he speak to me like that? How dare he? Who does he think he is?",
    prompt: "Listen to the speaker. How does the speaker feel?",
    options: ["surprised", "furious", "confused"],
    correct: 1,
    listenForHint: "Usa exclamaciones de enojo extremo ('How dare he speak to me like that? How dare he?')."
  },
  {
    id: "L4-PDF-8", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Aceptación de situación", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "Well, that’s life, I suppose. There’s nothing we can do about it now. Keep calm and carry on.",
    prompt: "Listen to the speaker. The speaker is...",
    options: ["prepared to accept the situation", "depressed by the way things turned out", "unable to believe what happened"],
    correct: 0,
    listenForHint: "Expresa aceptación resignada de las circunstancias ('Well, that's life... nothing we can do about it now')."
  },
  {
    id: "L4-PDF-9", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Sensación de alivio", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "Thank heavens for that. It’s a massive weight off my shoulders, I can tell you.",
    prompt: "Listen to the speaker. The speaker feels...",
    options: ["relieved", "anxious", "regretful"],
    correct: 0,
    listenForHint: "Dice 'Thank heavens for that' y que se quitó un gran peso de encima ('a massive weight off my shoulders')."
  },
  {
    id: "L4-PDF-10", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Frustración con servicio", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "This is driving me round the bend. I’ve rung them again and again and they’re permanently engaged. And then when I finally do get through, they put me on hold and then cut me off.",
    prompt: "Listen to the speaker. The speaker is...",
    options: ["frustrated", "bored", "disappointed"],
    correct: 0,
    listenForHint: "Expresa desesperación y enojo ante la mala atención telefónica repetitiva ('driving me round the bend', 'put me on hold and then cut me off')."
  },
  {
    id: "L4-PDF-11", module: "listening", part: 4, difficulty: "B2", type: "choice", topic: "Empatía ante error", partLabel: "Parte 4: Monólogo Corto",
    audioScript: "Don’t worry about it. We all make mistakes. But let’s see what we can learn from this and work out the best way forward.",
    prompt: "Listen to the speaker. The speaker is...",
    options: ["critical", "optimistic", "sympathetic"],
    correct: 2,
    listenForHint: "Se muestra comprensivo y empático ante el error ajeno ('Don't worry... We all make mistakes')."
  },
  {
    id: "L2-PDF-6", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Urban Games", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "So, what do all urban games have in common? They take place in public spaces. Often this is a city or a defined area within a city. Some take place in wilderness areas, such as forests. The play space is always larger in scale than, say, traditional games in a school playground, and instructions are kept to an absolute minimum. Finally, all urban games involve things like mobile phones and GPS receivers – that’s Global Positioning System receivers.",
    prompt: "According to the speaker, all urban games...",
    options: ["have numerous and strict rules", "involve modern technology", "take place in an urban environment"],
    correct: 1,
    listenForHint: "Escucha el final del audio donde se menciona que 'all urban games involve things like mobile phones and GPS receivers' (tecnología moderna)."
  },
  {
    id: "L2-PDF-7", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "Urban Games (Propósito)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "The games may involve various activities. And they can take almost any form. Usually, though, the point is the location of someone or something, for example an item that has been buried in the ground. Or they can occasionally be concerned with players trying to avoid being traced. Sometimes there isn’t really a point to the game, other than the experience itself.",
    prompt: "The purpose of most games is...",
    options: ["to hide an object", "to search for a person", "to move without leaving clues"],
    correct: 1,
    listenForHint: "Presta atención a la palabra 'Usually' que equivale a 'most'. Dice: 'Usually, though, the point is the location of someone or something' (buscar a una persona)."
  },
  {
    id: "L2-PDF-8", module: "listening", part: 2, difficulty: "B2", type: "choice", topic: "LARP (Objetivo)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "So, in a Live Action Roleplay, or LARP, each participant takes on the role of a character within the game, and the players interact with each other ‘in character’. Different LARPs have different rules governing interactions. There’s really no way to win at LARP – the point is simply to advance the ongoing plot, although each character has specific motivations.",
    prompt: "In Live-action role playing (LARP), the main aim is...",
    options: ["to take the story further", "to beat opponents in the game", "to encourage cooperation"],
    correct: 0,
    listenForHint: "Escucha el motivo/punto principal: 'the point is simply to advance the ongoing plot' (avanzar la trama/hacer avanzar la historia)."
  },
  {
    id: "L1-B1-T1-1", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Regalo de cumpleaños", partLabel: "Parte 1: MCQ Diálogo",
    audioScript: "Man: I was thinking of getting Sophie some perfume for her birthday, though it's twice as much as we were planning to spend. Woman: Yeah, and actually I was in the garden centre the other day and they've got some lovely indoor plants I know she'd like. Or they've also got some nice vases which are even better value. Man: On the other hand, she is giving us a party, so I think we should be generous.",
    prompt: "A man and a woman are talking about a birthday present for a friend. What do they decide to give her?",
    options: ["Perfume", "An indoor plant", "A vase"],
    correct: 0,
    listenForHint: "Presta atención a la decisión final del hombre: 'she is giving us a party, so I think we should be generous' (ser generosos implica gastar más en el perfume)."
  },
  {
    id: "L1-B1-T1-2", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Transporte a fiesta", partLabel: "Parte 1: MCQ Diálogo",
    audioScript: "Girl: Dad, can I borrow the car to go to the party in Bristol? Father: Sorry, but I need it. Why don't you take the train? Girl: I don't have my student card yet, so it's too expensive. Father: What about the bus? Girl: It takes forever. Actually, Annie just called. She's driving there and said she can give me a lift. I'll just take the bus back on Sunday because she is staying there.",
    prompt: "A girl is talking to her father about a party. How will the girl get to the party?",
    options: ["By car (friend's lift)", "By bus", "By train"],
    correct: 0,
    listenForHint: "Escucha con quién irá: Annie va en coche y le dará un aventón ('give me a lift')."
  },
  {
    id: "L1-B1-T1-3", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Almuerzo", partLabel: "Parte 1: MCQ Diálogo",
    audioScript: "Father: Is Jo coming for lunch? What are we making? Is she a vegetarian? Girl: No, she had steak and chips the last time she was here. Father: Well, I'm not sure what we've got apart from some bread and cheese. Girl: That doesn't sound very exciting. Let's make beef burgers instead. Father: I'm afraid Tom finished them the other night. So we have to stick to what is in the fridge.",
    prompt: "A girl is talking to her father. What will the girl have for lunch?",
    options: ["Steak and chips", "Bread and cheese", "Beef burgers"],
    correct: 1,
    listenForHint: "Identifica qué comida tienen disponible realmente en este momento. Los burgers se terminaron y el bistec fue la vez pasada."
  },
  {
    id: "L1-B1-T1-4", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Trabajo en restaurante", partLabel: "Parte 1: MCQ Diálogo",
    audioScript: "Cousin: How is your new job at Smith's Restaurant? Do you serve the celebrities who go there? Girl: Oh no, I don't work as a waitress. I don't deal with customers at all. I'm based in the kitchen. Cousin: So are you preparing the dishes? Girl: Not yet, I'm currently responsible for the washing up, though I hope they'll train me to cook soon.",
    prompt: "A girl is talking to her cousin about her job. What does she do at the restaurant?",
    options: ["Server / Waitress", "Dishwasher (washing up)", "Assistant chef / Cook"],
    correct: 1,
    listenForHint: "Presta atención a su función actual: 'currently responsible for the washing up'."
  },
  {
    id: "L1-B1-T1-5", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Deporte", partLabel: "Parte 1: MCQ Diálogo",
    audioScript: "Man: Do you want to play rugby tomorrow? Woman: I can't, I'm busy. What about soccer? Man: Actually, I have to take my son to football practice in the afternoon. But I'm hoping to play some tennis in the morning if I can find a partner. Woman: Oh, I'd love to! Shall we book a court for 9 o'clock?",
    prompt: "What sport is the man hoping to take part in tomorrow?",
    options: ["Football / Soccer", "Rugby", "Tennis"],
    correct: 2,
    listenForHint: "Distingue entre lo que el hombre 'tiene' que hacer (llevar a su hijo al fútbol) y lo que 'espera' hacer él mismo ('hoping to play some tennis')."
  },
  {
    id: "L2-B1-T1-1", module: "listening", part: 2, difficulty: "B1", type: "choice", topic: "Detalles de viaje (Mrs Wilson)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "Jenny: Hello Mrs Wilson, this is Jenny from Executive Travel. I'm calling to update you on your upcoming trip. For your stay in Edmonton on Friday, I have confirmed your booking at the Wayside Hotel. They have promised to allocate a quiet room at the back of the building, away from the traffic, as you requested. The next morning, you are flying back via Vancouver on Icelandic Air. Please allow extra time to get to the airport because it's a public holiday and there will be heavy traffic on the motorway. The connection time in Vancouver is about three hours, which is the most convenient option for you. During your stopover in Reykjavik, which is ten hours, I highly recommend going on an excursion to the Blue Lagoon instead of staying at a hotel. Finally, when you return, we need to discuss your short break in Paris next month.",
    prompt: "At the Wayside Hotel, the travel agent has arranged...",
    options: ["a discount", "a quiet room", "a special meal"],
    correct: 1,
    listenForHint: "Escucha dónde solicitó la habitación la agente de viajes: 'a quiet room at the back of the building'."
  },
  {
    id: "L2-B1-T1-2", module: "listening", part: 2, difficulty: "B1", type: "choice", topic: "Detalles de viaje (Mrs Wilson)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "Jenny: Hello Mrs Wilson, this is Jenny from Executive Travel. I'm calling to update you on your upcoming trip. For your stay in Edmonton on Friday, I have confirmed your booking at the Wayside Hotel. They have promised to allocate a quiet room at the back of the building, away from the traffic, as you requested. The next morning, you are flying back via Vancouver on Icelandic Air. Please allow extra time to get to the airport because it's a public holiday and there will be heavy traffic on the motorway. The connection time in Vancouver is about three hours, which is the most convenient option for you. During your stopover in Reykjavik, which is ten hours, I highly recommend going on an excursion to the Blue Lagoon instead of staying at a hotel. Finally, when you return, we need to discuss your short break in Paris next month.",
    prompt: "Allow extra time to get to the airport because of the...",
    options: ["roadworks", "heavy traffic", "extra security checks"],
    correct: 1,
    listenForHint: "Identifica por qué habrá demoras en el trayecto al aeropuerto: 'there will be heavy traffic on the motorway'."
  },
  {
    id: "L2-B1-T1-3", module: "listening", part: 2, difficulty: "B1", type: "choice", topic: "Detalles de viaje (Mrs Wilson)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "Jenny: Hello Mrs Wilson, this is Jenny from Executive Travel. I'm calling to update you on your upcoming trip. For your stay in Edmonton on Friday, I have confirmed your booking at the Wayside Hotel. They have promised to allocate a quiet room at the back of the building, away from the traffic, as you requested. The next morning, you are flying back via Vancouver on Icelandic Air. Please allow extra time to get to the airport because it's a public holiday and there will be heavy traffic on the motorway. The connection time in Vancouver is about three hours, which is the most convenient option for you. During your stopover in Reykjavik, which is ten hours, I highly recommend going on an excursion to the Blue Lagoon instead of staying at a hotel. Finally, when you return, we need to discuss your short break in Paris next month.",
    prompt: "The Icelandic Air flight is...",
    options: ["the most direct", "the cheapest", "the most convenient"],
    correct: 2,
    listenForHint: "Escucha los pros y contras del vuelo que seleccionaron: 'the connection time ... is the most convenient option for you'."
  },
  {
    id: "L2-B1-T1-4", module: "listening", part: 2, difficulty: "B1", type: "choice", topic: "Detalles de viaje (Mrs Wilson)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "Jenny: Hello Mrs Wilson, this is Jenny from Executive Travel. I'm calling to update you on your upcoming trip. For your stay in Edmonton on Friday, I have confirmed your booking at the Wayside Hotel. They have promised to allocate a quiet room at the back of the building, away from the traffic, as you requested. The next morning, you are flying back via Vancouver on Icelandic Air. Please allow extra time to get to the airport because it's a public holiday and there will be heavy traffic on the motorway. The connection time in Vancouver is about three hours, which is the most convenient option for you. During your stopover in Reykjavik, which is ten hours, I highly recommend going on an excursion to the Blue Lagoon instead of staying at a hotel. Finally, when you return, we need to discuss your short break in Paris next month.",
    prompt: "The best thing to do in Reykjavik is to go...",
    options: ["to a restaurant", "on an excursion", "to a hotel"],
    correct: 1,
    listenForHint: "Escucha la recomendación para las 10 horas de escala: 'I highly recommend going on an excursion'."
  },
  {
    id: "L2-B1-T1-5", module: "listening", part: 2, difficulty: "B1", type: "choice", topic: "Detalles de viaje (Mrs Wilson)", partLabel: "Parte 2: MCQ Monólogo",
    audioScript: "Jenny: Hello Mrs Wilson, this is Jenny from Executive Travel. I'm calling to update you on your upcoming trip. For your stay in Edmonton on Friday, I have confirmed your booking at the Wayside Hotel. They have promised to allocate a quiet room at the back of the building, away from the traffic, as you requested. The next morning, you are flying back via Vancouver on Icelandic Air. Please allow extra time to get to the airport because it's a public holiday and there will be heavy traffic on the motorway. The connection time in Vancouver is about three hours, which is the most convenient option for you. During your stopover in Reykjavik, which is ten hours, I highly recommend going on an excursion to the Blue Lagoon instead of staying at a hotel. Finally, when you return, we need to discuss your short break in Paris next month.",
    prompt: "The travel agent wants to talk about...",
    options: ["a short break", "a business trip", "a discount scheme"],
    correct: 0,
    listenForHint: "Identifica el tema final mencionado: 'we need to discuss your short break in Paris'."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// READING BANK — 40 questions across 4 parts
// ─────────────────────────────────────────────────────────────────────────────
export const readingBank: BankQuestion[] = [
  // ── PART 1: Short Texts (Multiple Choice) ──
  {
    id: "RD1-001", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Mensaje informal", partLabel: "Part 1: Short Text",
    context: "Read the email from Annie to Jack.",
    prompt: "Hi Jack\nI’m stuck at work, so could you possibly drop round my house and check on Georgie? It should only take a couple of minutes – he can just keep wandering round outside as long as the gate’s shut. If he’s not happy to see you, treat him with a biscuit. Don’t worry about giving him anything else – I’ll sort that out when I get back. The back gate’s unlocked, by the way.\nAnnie\n\nWhat favour does Annie want Jack to do?",
    options: ["give the dog some food", "take the dog for a walk", "check the dog is in the garden"],
    correct: 2,
    inferenceHint: "Look at the phrase 'check on Georgie' and 'keep wandering round outside'."
  },
  {
    id: "RD1-002", module: "reading", part: 1, difficulty: "B2", type: "choice", topic: "Aviso de disculpa", partLabel: "Part 1: Short Text",
    context: "Read Molly's message to Emma.",
    prompt: "Emma,\nI've had time to think about what happened yesterday. I realize you were just trying to help when you made that suggestion about my project, even though I reacted badly. I completely understand why you did it, and we are absolutely fine now. Let's meet for coffee tomorrow.\nMolly\n\nWhat was the purpose of Molly’s message?",
    options: ["to forgive Emma for her behaviour", "to criticize Emma for her suggestion", "to urge Emma to alter her decision"],
    correct: 0,
    inferenceHint: "Rephrase the options to simplify them. Option A means she is not angry anymore."
  },

  // ── PART 2: Multiple Matching ──
  {
    id: "RD2-001", module: "reading", part: 2, difficulty: "B2", type: "choice", topic: "Life in the media", partLabel: "Part 2: Multiple Matching",
    prompt: "Read the profiles of three people who work in the media. Match the questions to the correct person.",
    matchingProfiles: [
      {
        id: "A", title: "Extract A: The Photojournalist",
        text: "I took people's advice and went to college to study photojournalism. It didn't actually teach me anything I didn't already know, but at least it introduced me to the world of professional photography. When I eventually got a job, it was for a small newspaper. Then, an American celebrity came to open a hospital and I was sent to record the event. I don't care about celebrities myself but I realize people want to know what they're doing. One of my photos was printed in the following day's newspaper, and pretty soon it was appearing in newspapers across the world. A few days later, I was happy to accept the offer of a job with one of the country's best-known papers."
      },
      {
        id: "B", title: "Extract B: The TV Presenter",
        text: "At university, I did media studies and that gave me some useful information about life in the media. I suppose it confirmed my parents' thoughts. After that, I walked straight into a job at an Internet radio station. For the first two years I did various jobs there, but then last month I applied to be the presenter of a new children's TV programme. I was successful and the job's just right for me. It was a fast-moving world full of experienced professionals, but I adapted quickly."
      },
      {
        id: "C", title: "Extract C: The Blogger",
        text: "I've never had training of any kind but that's never done me any harm. I actually got into journalism by accident. I only write serious news stories – there are plenty of other places people can read the gossip. After a while, a few friends suggested I write more reports about stories not covered by the mainstream media. This is why I put a few more things up on social media, and then I started my own blog, a move I've never regretted. Now, nearly fifteen thousand people read everything I write."
      }
    ],
    matchingQuestions: [
      { question: "Who thinks they gained little from doing a course?", correctProfileId: "A" },
      { question: "Who says they found work as soon as they had finished their education?", correctProfileId: "B" },
      { question: "Who admits that chance played a big part at the start of their career?", correctProfileId: "C" },
      { question: "Who comments that they have no interest in famous people?", correctProfileId: "A" },
      { question: "Who is pleased about recently moving jobs?", correctProfileId: "B" }
    ],
    inferenceHint: "Look for synonyms. 'gained little from a course' matches 'didn't actually teach me anything' in Extract A."
  },

  // ── PART 3: Gapped Text ──
  {
    id: "RD3-001", module: "reading", part: 3, difficulty: "B2", type: "choice", topic: "Bush Riders", partLabel: "Part 3: Gapped Text",
    prompt: "Read the text about horse riders in Australia. Six sentences have been removed. Choose the correct sentence for each gap.",
    gappedText: "In the Australian bush – the famously dry, rural part of the country – there are many talented horse riders to be found.\n\nIn the bush, there are certain occupations, such as farming, that keep workers stuck to their horses for the majority of daylight hours. In reality, they spend more time on horseback than off it. Indeed, tales have been told of one rider who actually wore out two horses in one working day. [1] In fact, his preferred way of going from place to place was on four legs instead of two.\n\nFor these farmers, horses are necessary for handling large groups of cows on the vast areas they manage. Moving their cows from one place to another is known as 'driving', and the workers, in turn, are known as 'drovers'. They even take part in a competitive sport involving cows, which demands outstanding command over the horse. This sport developed as a result of earlier drovers' battles against boredom. [2] The competitions are commonly known as 'drafts'.",
    gappedSentences: [
      { id: "A", text: "When they spent a few days in one spot, they organized these challenges to pass the time." },
      { id: "B", text: "Being able to do this is undoubtedly important to keep tight control over the animal.", isDistractor: true },
      { id: "C", text: "Like others who enjoy that deep connection between human and animal, riding came as naturally to him as walking." },
      { id: "D", text: "They are, however, perfectly trained for it and seem to know what is required of them by their masters.", isDistractor: true }
    ],
    gappedAnswers: [
      { gapNumber: 1, correctSentenceId: "C" },
      { gapNumber: 2, correctSentenceId: "A" }
    ],
    inferenceHint: "For gap 1, 'him' refers to the 'one rider' mentioned before. For gap 2, 'these challenges' refers to the 'sport' organized to fight boredom."
  },

  // ── PART 4: Longer Text (MCQ) ──
  {
    id: "RD4-001", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "The Future of Film", partLabel: "Part 4: Longer Text",
    context: "Read the article about the future of film.",
    prompt: "The idea that cinema is dying is nothing new; the death of cinema has been announced many times before, starting in the 1920s when sound was first added to film. There has been a real flood of such claims lately, however, and for an extraordinary number of reasons. In comparable cases, such as the predicted death of the novel, announcements of this kind seem to have led to nothing but renewed interest. Still, something is happening to excite these ideas and arguments, and it’s worth trying to find out what it is.\n\nIn a feature film, a detective is presented with a crime that traditional police methods have failed to solve, and through keen observation, extraordinary powers of perception and pure luck somehow ends up solving the mystery. In an online video, a teenager is filmed on a friend’s phone playing a trick on another friend, which goes badly wrong, to the sounds of wild laughter. Whatever the long-term future of the cinema may be, I believe the notion of film will survive in two senses. There is the dictionary definition of a film as ‘a representation of a story, drama, episode, event, etc.'. When people say they have been watching a film, this is what we understand they mean. The other sense is that of fragments or sequences, short or long, fictional or actual, of motion captured in the moment. These may or may not add up to a film in the traditional sense, but the requirement that they don’t have to is part of the freedom the social-media form provides.\n\nThe writer suggests that predictions made about the future of cinema...",
    options: ["are influenced by the publishing industry.", "are more serious than previous concerns.", "are easy to dismiss at the moment."],
    correct: 1,
    inferenceHint: "The text says there is a 'flood of such claims lately... for an extraordinary number of reasons', implying current concerns are greater/more serious than before."
  },
  {
    id: "RD4-002", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "The Future of Film", partLabel: "Part 4: Longer Text",
    context: "Read the article about the future of film.",
    prompt: "The idea that cinema is dying is nothing new... [Text continues]\n\nThe writer refers to the experience of the teenagers to illustrate...",
    options: ["a type of behaviour that she thinks is threatening conventional film-making.", "a way in which she thinks the idea of film-making is likely to continue.", "an aspect of film-making that she thinks will prove very influential."],
    correct: 1,
    inferenceHint: "She mentions the teenagers filming on a phone as 'fragments or sequences... of motion captured in the moment' which is one of the two senses in which film will survive."
  },
  {
    id: "RD1-B1-T1-1", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Estudiar vocabulario", partLabel: "Part 1: Short Text",
    context: "Read the email from Mr Stevens.",
    prompt: "FROM: Mr Stevens\nSUBJECT: Learning English words\n\nLearning long lists of vocabulary isn’t a very good idea – I know you can learn maybe 200 words in a day, but you soon forget them. Some people learn by watching films regularly and that sounds a lot more fun.\n\nWhat does Mr Stevens say about vocabulary?",
    options: ["It is important to make learning an enjoyable experience.", "It is always difficult to remember new vocabulary.", "You should not try to learn too many words at once."],
    correct: 2,
    inferenceHint: "Mr. Stevens dice que aprender listas largas (200 palabras al día) no es buena idea porque se olvidan rápido. Por tanto, no debes intentar aprender demasiadas palabras a la vez."
  },
  {
    id: "RD1-B1-T1-2", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Mensaje sobre coche", partLabel: "Part 1: Short Text",
    context: "Read the text message from Tom to Jane.",
    prompt: "Hi Jane\nI went to see that car your friend is selling – it was very kind of you to send me the info, I’m really grateful. It’s really good value, too, but I think I’ll keep looking for a five-door model.\nTom\n\nWhy has Tom written this text message to Jane?",
    options: ["to thank Jane for trying to help him", "to explain what sort of cars he likes", "to suggest Jane buys a car he has seen"],
    correct: 0,
    inferenceHint: "Tom dice 'it was very kind of you ... I'm really grateful', lo cual expresa gratitud por la ayuda."
  },
  {
    id: "RD1-B1-T1-3", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Programa de cocina", partLabel: "Part 1: Short Text",
    context: "Read the email from Thomas.",
    prompt: "FROM: Thomas\nSUBJECT: Help with cooking\n\nI watched that new programme you recommended – 30-minute Cook – and I’ll definitely try a few of those recipes. I can’t quite see why every cookery programme these days has to be a competition, but I suppose they think that’s what viewers want.\n\nWhat does Thomas think about the TV programme Jack recommended?",
    options: ["It was an exciting programme to watch.", "It is certain to be popular with audiences.", "It showed some interesting things to cook."],
    correct: 2,
    inferenceHint: "Dice: 'I'll definitely try a few of those recipes', lo que significa que el programa le mostró cosas interesantes para cocinar."
  },
  {
    id: "RD1-B1-T1-4", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Invitación a fiesta", partLabel: "Part 1: Short Text",
    context: "Read the email from Laura to Jan.",
    prompt: "FROM: Laura\nSUBJECT: Your party\n\nHi Jan\nThanks for the invite, only we can’t make it to the party on Friday as it’s my mum’s birthday. Still, that other weekend you mentioned would be fine and, as you say, it’ll be fun to see your new place.\n\nWhy is Laura writing to Jan?",
    options: ["to accept an invitation", "to suggest a new date to visit", "to apologize for cancelling"],
    correct: 2,
    inferenceHint: "Laura escribe para decir que no puede ir el viernes ('we can't make it to the party...'), lo cual equivale a disculparse por no poder asistir/cancelar."
  },
  {
    id: "RD1-B1-T1-5", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Nota a cliente", partLabel: "Part 1: Short Text",
    context: "Read the note to the customer.",
    prompt: "We hope you will be delighted with this 30 ml Sage and Sea Salt perfume. Please find enclosed a voucher for 20% off your next order, which will come with a free 5 ml bottle of Sensation. Offer ends in 30 days.\n\nThe note to the customer has information about...",
    options: ["what the benefits of accepting the offer are.", "how the customer should apply for a free gift.", "why it is important to place an order immediately."],
    correct: 0,
    inferenceHint: "La nota detalla los beneficios (20% de descuento y botella gratis de Sensation)."
  },
  {
    id: "RD1-B1-T1-6", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Club de lectura", partLabel: "Part 1: Short Text",
    context: "Read the text message from Annie.",
    prompt: "Hi everyone\nJust a reminder about the time for next week’s book club – 8:30 at my place. And as we agreed at the last meeting, it would be great if everyone could actually read it this time. It would be nice to hear each other’s opinions rather than everyone’s excuses.\nAnnie\n\nWhy is Annie writing to the members of her book club?",
    options: ["to persuade them to come to a meeting", "to encourage them to finish a book", "to inform them of a change in plan"],
    correct: 1,
    inferenceHint: "Annie pide que 'everyone could actually read it this time' en lugar de dar excusas, lo cual fomenta terminar el libro."
  },
  {
    id: "RD2-B1-T1-SHOPPING", module: "reading", part: 2, difficulty: "B1", type: "choice", topic: "Guía de compras de la ciudad", partLabel: "Part 2: Multiple Matching",
    prompt: "Read the guide of four shopping areas in town. Match the statements of the buyers to the correct shopping area.",
    matchingProfiles: [
      { id: "A", title: "Middle Market", text: "Middle Market is a charming, old-fashioned market in the centre of the city, just off the high street, behind the Marathon Sports Superstore. With over 40 individual shops, it’s the perfect place for anything from designer clothes for kids, to fine footwear for adults, to fun covers for your mobile phone. Famous for its butchers and greengrocers, it’s also a great place for original modern jewellery. Top tip: stop for a hot drink and a snack at Georgina’s – everyone’s favourite café, just across from the flower shop." },
      { id: "B", title: "Westway Walk", text: "Westway Walk is a bright shopping centre with over 20 modern stores including two discount sports stores, the town’s biggest bookshop, and the Bucket Shop which sells really cheap flights. The burger bar opposite the phone shop is always popular with kids, and teenagers love the clothes at Cool Gear – and their amazing prices. For older shoppers, there’s also a branch of P&Q with a good range of traditional good quality clothes for men and women." },
      { id: "C", title: "The Old Factory", text: "On your first visit, you’ll find this place a confusing mix of tiny stalls. Next to a woman selling antique rings – some with real diamonds – you may easily find another selling old books or tables and chairs, or second hand children’s clothes and boots. So take your time, look around, there’s lots to see and do – and finish up at Polly’s on the ground floor – open from 12:00 every day, it’s a great place for a hot chocolate and a slice of cake." },
      { id: "D", title: "Pettifer Street", text: "This lively part of town is a popular area for young people. The street has an international feel, with a famous night market selling Asian food to take away. More famous for its food than its fashion, this is the place to go to for unusual fruit and vegetables. Further down the street, past the newsagent’s selling papers and magazines and the jeweller’s, there is a wider variety of businesses, including a travel agent, a sofa and bed shop, a shoe shop, and even a mobile phone repair shop." }
    ],
    matchingQuestions: [
      { question: "Bella: wants roses for sister, new dress for 5-year-old niece, nice place for cup of tea.", correctProfileId: "A" },
      { question: "Dieter: wants cheap T-shirt for school friend, tennis balls, new mobile phone battery.", correctProfileId: "B" },
      { question: "Hasan: wants quick Asian lunch, necklace for wife's birthday, fruit and salad for dinner.", correctProfileId: "D" },
      { question: "Jana: wants meeting in cafe, old-fashioned jewellery, second-hand tables and chairs.", correctProfileId: "C" },
      { question: "Ken: wants boots after work, info about last-minute holidays, take-away dinner.", correctProfileId: "D" },
      { question: "Marie-Claire: wants smart jumper for father, book to read on plane, quick lunch.", correctProfileId: "B" }
    ]
  },
  {
    id: "RD3-B1-T1-CAMBODIA", module: "reading", part: 3, difficulty: "B1", type: "choice", topic: "Cambodia Calling (Mina Lim)", partLabel: "Part 3: Gapped Text",
    prompt: "Read the article about Australian designer Mina Lim. Six sentences have been removed. Choose the correct sentence for each gap.",
    gappedText: "My parents left Cambodia in 1980 when I was just two years old and I’ve grown up feeling that I belong to both Australian and Cambodian cultures. [1] My brother and I love Australia too, and we were always encouraged to join in and enjoy the way of life here.\n\nMy first trip to Cambodia was when I was eight, and it was a big culture shock. It was so different to our life in Australia, where we weren’t rich but we didn’t need anything. [2] Nevertheless, they seemed really happy and spent a lot of time helping each other out. I have never forgotten that first trip – I left Cambodia with a heart full of love for the country and I promised that I would be back.\n\nAfter leaving university, I got a job with a small independent fashion designer and my boss was great to work for. [3] Looking back, I now realize how lucky I was – there aren’t many people who get such a good start.\n\nEven so, by the time I was 26, I felt the need to try something different and I thought about Cambodia again. [4] So that is what I did and I started working with families and small businesses that made clothes.\n\nI stayed a lot longer than I had planned – in the end it was more than two years, but it gave me the chance to meet some jewellers and designers, and they introduced me to their friends, who often invited me to their homes to show me their own artwork. [5] Before long, I was connected with a whole network of talented jewellers, sculptors and designers, and that is when I started my own business.\n\nI now have a dream job – designing beautiful products and working with the artists in Cambodia who make them. [6] This means the customer is connected to the maker. It also means that, in a small way, I am helping the people I work with in Cambodia, and I hope that we will continue to work together in this way for many more years.",
    gappedSentences: [
      { id: "A", text: "Back in Cambodia we had family who were poor and had very little." },
      { id: "B", text: "It seemed like a good opportunity to visit and live there for a few months." },
      { id: "C", text: "I learned a huge amount about business in my time working there." },
      { id: "D", text: "At home, we learned about Cambodian traditions and the Khmer language." },
      { id: "E", text: "Because a lot of them live in the same area, they all know each other." },
      { id: "F", text: "My dad was always keen that we should work hard and do our best at school.", isDistractor: true },
      { id: "G", text: "The people who buy them love them because no two pieces are exactly the same." }
    ],
    gappedAnswers: [
      { gapNumber: 1, correctSentenceId: "D" },
      { gapNumber: 2, correctSentenceId: "A" },
      { gapNumber: 3, correctSentenceId: "C" },
      { gapNumber: 4, correctSentenceId: "B" },
      { gapNumber: 5, correctSentenceId: "E" },
      { gapNumber: 6, correctSentenceId: "G" }
    ],
    inferenceHint: "Busca referencias claras. El hueco 1 habla de las tradiciones en casa, el 2 sobre la familia pobre en contraste con 'Nevertheless they seemed happy', el 3 sobre el buen inicio laboral, el 4 sobre mudarse a Camboya, el 5 sobre la red local de artistas y el 6 sobre las piezas únicas que compra el cliente."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\n\nWhat was the writer’s reaction to seeing the Glasgow School of Art?",
    options: ["He wanted to learn more about the building’s architect.", "He started to feel differently about buildings.", "He was surprised he had not noticed the building before."],
    correct: 1,
    inferenceHint: "En el primer párrafo, el escritor dice: 'I suddenly realized how beautiful a building could be ... and from then on I started appreciating the architecture I saw' (empezó a ver los edificios de otra forma)."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH-2", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\n\nWhat does the writer say about the other Mackintosh buildings in the city?",
    options: ["They are as attractive today as they were originally.", "They are painted in bright colours.", "They were designed to replace some older buildings."],
    correct: 0,
    inferenceHint: "En el segundo párrafo, dice: 'many other buildings in the city that still seem so beautiful today' (siguen siendo tan bellos como al principio)."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH-3", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\n\nWhat was unusual about the way that Mackintosh worked?",
    options: ["He preferred designing the inside to the outside.", "He made sure that everything was built perfectly.", "He liked to be in control of every detail of a project."],
    correct: 2,
    inferenceHint: "El tercer párrafo explica que Mackintosh ponía atención a todo: 'inside and out. You didn't just get the house, you got Mackintosh furniture, wallpaper, curtains, door handles...'."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH-4", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\n\nMackintosh retired to France because...",
    options: ["he no longer wanted to design buildings.", "he was unable to find work as an architect.", "he was too ill to continue with architecture."],
    correct: 1,
    inferenceHint: "El último párrafo menciona: 'With little demand for his services, his difficult financial situation led him to retire to France' (la falta de demanda de sus servicios significa que no encontraba trabajo)."
  }
,
  // ── NEW PART 1: More Short Texts ──
  {
    id: "RD1-003", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Nota de vecino", partLabel: "Part 1: Short Text",
    context: "Read the notice pinned to the apartment building's noticeboard.",
    prompt: "Dear Residents,\nPlease note that the water supply to the building will be switched off between 10 a.m. and 2 p.m. on Thursday for essential maintenance. We apologise for any inconvenience. Please make sure you store enough water for this period.\nBuilding Management\n\nWhat is the purpose of this notice?",
    options: ["to warn residents about a temporary service disruption", "to ask residents to reduce their water usage", "to announce a permanent change to the water supply"],
    correct: 0,
    inferenceHint: "The notice says the water will be off BETWEEN 10 and 2 — it's temporary, not permanent."
  },
  {
    id: "RD1-004", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Anuncio de curso", partLabel: "Part 1: Short Text",
    context: "Read the advertisement.",
    prompt: "Learn Photography in 6 Weeks!\nOur popular evening course is back. Classes run every Wednesday from 7 to 9 p.m. No previous experience needed — just bring your camera (or smartphone). Places are limited, so book early to avoid disappointment.\nCity Arts Centre — £120 per person\n\nWhat does the advertisement tell us?",
    options: ["The course is only for experienced photographers.", "People should register quickly because space is limited.", "Cameras will be provided by the centre."],
    correct: 1,
    inferenceHint: "'Book early to avoid disappointment' and 'Places are limited' both signal that you should register quickly."
  },
  {
    id: "RD1-005", module: "reading", part: 1, difficulty: "B2", type: "choice", topic: "Email de cancelación", partLabel: "Part 1: Short Text",
    context: "Read this email from a colleague.",
    prompt: "Hi Tom,\nI'm afraid I won't be able to make the project meeting this afternoon. Something urgent has come up with the Henderson account and I need to deal with it right away. Could you take notes for me and send them over later? I'll catch up on everything first thing tomorrow.\nThanks,\nLisa\n\nWhat is Lisa doing in this email?",
    options: ["apologising for a mistake she made at work", "explaining why she cannot attend a meeting and asking for help", "requesting that Tom cancel the meeting"],
    correct: 1,
    inferenceHint: "Lisa explains she 'won't be able to make' the meeting (reason: urgent account) and asks Tom to 'take notes' (help)."
  },
  {
    id: "RD1-006", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Aviso de biblioteca", partLabel: "Part 1: Short Text",
    context: "Read the sign at the library entrance.",
    prompt: "NOTICE: From January, library opening hours will change. We will now open at 8 a.m. instead of 9 a.m. on weekdays. Weekend hours remain the same. Members can now also renew books online through our new website.\n\nWhat TWO changes are being announced?",
    options: ["earlier opening on weekdays and online book renewal", "longer weekend hours and a new membership system", "later closing times and a new library building"],
    correct: 0,
    inferenceHint: "The text mentions two things: opening at 8 instead of 9 (earlier) and renewing books online (new service)."
  },
  {
    id: "RD1-007", module: "reading", part: 1, difficulty: "B2", type: "choice", topic: "Reseña de restaurante", partLabel: "Part 1: Short Text",
    context: "Read this restaurant review.",
    prompt: "The food at La Casa was delicious and beautifully presented. The staff were welcoming and attentive. However, I was surprised by how expensive the bill was, especially given the small portion sizes. While I would return for a special occasion, it's certainly not somewhere I'd eat every week.\n\nWhat is the reviewer's overall opinion?",
    options: ["The restaurant is excellent value for money.", "The restaurant is enjoyable but overpriced for regular visits.", "The restaurant has poor service but good food."],
    correct: 1,
    inferenceHint: "The reviewer praises food and staff but criticises the price ('surprised by how expensive') and says it's 'not somewhere I'd eat every week'."
  },
  // ── NEW PART 2: More Matching ──
  {
    id: "RD2-002", module: "reading", part: 2, difficulty: "B2", type: "choice", topic: "Three students abroad", partLabel: "Part 2: Multiple Matching",
    prompt: "Read about three students who studied abroad. Match the questions to the correct student.",
    matchingProfiles: [
      {
        id: "A", title: "Extract A: Maria",
        text: "I chose to study in Germany because I wanted to challenge myself. At first, I struggled with the language — lectures were fast and I could barely keep up. But within a few months, my German improved dramatically. What I valued most was the independence I gained. Nobody was there to remind me to study or cook dinner. I had to manage everything alone, and that made me grow up quickly."
      },
      {
        id: "B", title: "Extract B: Tomás",
        text: "I went to Canada for a year and it was the best decision I ever made. The university had amazing facilities, especially the science labs. I didn't have language problems since classes were in English, which I already spoke well. What surprised me was how welcoming the other students were. I made friends from all over the world, and we still keep in touch."
      },
      {
        id: "C", title: "Extract C: Yuki",
        text: "I spent a semester in Australia and I have to say, the academic side was less demanding than at home. The approach was more relaxed and creative, which I enjoyed. What made the experience special was travelling during the breaks. I visited the Great Barrier Reef and the Outback. The only difficulty was being so far from my family — I missed them terribly at times."
      }
    ],
    matchingQuestions: [
      { question: "Who found the academic work easier than expected?", correctProfileId: "C" },
      { question: "Who says they developed important life skills?", correctProfileId: "A" },
      { question: "Who didn't have difficulty communicating?", correctProfileId: "B" },
      { question: "Who found it hard being away from family?", correctProfileId: "C" },
      { question: "Who was impressed by the university's resources?", correctProfileId: "B" },
      { question: "Who initially found it hard to follow classes?", correctProfileId: "A" }
    ],
    inferenceHint: "Look for paraphrases: 'life skills' = 'independence', 'resources' = 'facilities', 'easier' = 'less demanding'."
  },
  // ── NEW PART 3: More Gapped Text ──
  {
    id: "RD3-002", module: "reading", part: 3, difficulty: "B2", type: "choice", topic: "Street Art", partLabel: "Part 3: Gapped Text",
    prompt: "Read the article about street art. Four sentences have been removed. Choose the correct sentence for each gap.",
    gappedText: "Street art has become one of the most talked-about forms of creative expression in recent years. What was once considered vandalism is now exhibited in galleries and celebrated by critics.\n\nThe most famous street artist is undoubtedly Banksy, whose identity remains a mystery. [1] His works often carry strong political or social messages, using humour and irony to make people think.\n\nMany cities have now embraced street art as a way of regenerating neglected areas. In Melbourne, for example, entire laneways have been dedicated to murals and graffiti. [2] Local businesses have reported increased foot traffic and tourism as a result.\n\nHowever, not everyone is convinced. [3] They point out that without proper regulation, any wall could become a target. The debate between art and vandalism continues, but one thing is clear: street art has changed the way we think about public spaces.",
    gappedSentences: [
      { id: "A", text: "Some property owners argue that unsolicited artwork damages their buildings and reduces their value." },
      { id: "B", text: "Despite this secrecy, his pieces sell for millions at auction and attract huge crowds wherever they appear." },
      { id: "C", text: "These colourful streets have become tourist attractions in their own right, drawing visitors from around the world." },
      { id: "D", text: "Most artists begin by practising on paper before moving to larger surfaces.", isDistractor: true }
    ],
    gappedAnswers: [
      { gapNumber: 1, correctSentenceId: "B" },
      { gapNumber: 2, correctSentenceId: "C" },
      { gapNumber: 3, correctSentenceId: "A" }
    ],
    inferenceHint: "Gap 1: 'Despite this secrecy' refers to Banksy's mystery identity. Gap 2: 'These colourful streets' refers to the Melbourne laneways. Gap 3: 'property owners argue' connects to 'not everyone is convinced'."
  },
  // ── NEW PART 4: More Long Texts ──
  {
    id: "RD4-003", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "Remote Work Revolution", partLabel: "Part 4: Longer Text",
    context: "Read the article about remote working.",
    prompt: "The shift to remote working, accelerated by the pandemic, has fundamentally altered the relationship between employers and employees. While many companies initially resisted the change, the evidence increasingly suggests that productivity has not suffered — and in many cases has actually improved.\n\nYet the picture is not entirely positive. Some workers report feeling isolated and struggling to separate their professional and personal lives. The lack of casual office interactions — the so-called 'water cooler' conversations — has also raised concerns about creativity and team cohesion.\n\nThe most likely outcome is a hybrid model, where employees split their time between home and the office. This approach attempts to capture the benefits of both arrangements while minimising their disadvantages.\n\nAccording to the writer, the main challenge of remote working is that it...",
    options: ["reduces the quality of work produced.", "can negatively affect workers' wellbeing and team dynamics.", "makes it impossible for companies to monitor staff."],
    correct: 1,
    inferenceHint: "The writer mentions 'feeling isolated', 'struggling to separate professional and personal lives' and concerns about 'creativity and team cohesion' — all wellbeing and team dynamics issues."
  },
  {
    id: "RD4-004", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "Sushi 501 (Reseña)", partLabel: "Part 4: Longer Text",
    context: "Read the restaurant review.",
    prompt: "Sushi 501 has been on my radar for weeks, ever since a colleague raved about it. Walking in, I was immediately struck by the minimalist décor — clean lines, warm wood and soft lighting. It felt like stepping into a Tokyo side street.\n\nThe omakase menu (chef's choice) was extraordinary. Each piece of fish was prepared with precision and care. The highlight was the otoro tuna — rich, buttery and quite literally melting on the tongue. My only criticism would be the pace: courses arrived so quickly that I barely had time to appreciate one before the next appeared.\n\nAt £85 per person, it's not cheap, but for a special occasion, I'd argue it's worth every penny. Just make sure you book well in advance — tables are notoriously hard to get.\n\nThe reviewer's attitude towards the price of Sushi 501 is that it is...",
    options: ["unreasonable given the quality of service.", "justified for the right kind of occasion.", "surprisingly affordable for what you get."],
    correct: 1,
    inferenceHint: "The reviewer says 'it's not cheap, but for a special occasion... worth every penny' — meaning the price is justified under the right circumstances."
  },
  {
    id: "RD4-005", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Social Media and Teens", partLabel: "Part 4: Longer Text",
    context: "Read the article about teenagers and social media.",
    prompt: "A recent study found that teenagers who spend more than three hours a day on social media are twice as likely to report symptoms of anxiety and depression compared to those who use it for less than an hour. The researchers were careful to note that social media use does not directly cause these problems — the relationship is more complex than that.\n\nSome experts believe the issue is not the platforms themselves but how they are used. Passive scrolling, where users simply consume content without interacting, appears to be particularly harmful. In contrast, using social media to actively communicate with friends and family can actually have positive effects on wellbeing.\n\nWhat does the writer mean by saying 'the relationship is more complex'?",
    options: ["Social media definitely causes mental health problems.", "There are other factors involved, not just social media.", "Teenagers don't understand how social media works."],
    correct: 1,
    inferenceHint: "'More complex' means it's not a simple cause-and-effect; other factors (like how it's used, personality, existing conditions) play a role."
  }
];


// ─────────────────────────────────────────────────────────────────────────────
// WRITING BANK — 12 tasks (6 emails + 6 essay/article/review)
// ─────────────────────────────────────────────────────────────────────────────
export const writingBank: BankQuestion[] = [
  {
  id: "W1-OFF-1",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Escuela (Reunion de padres)",
  partLabel: "Parte 1: Email",
  context: "️ Recibiste este email de Ms. Niki Meehan (Directora de Primaria) pidiendo tu opinión sobre la última reunión de padres:",
  prompt: "You recently attended a parent-teacher meeting. Reply to an email from Ms. Niki Meehan (Head of Primary).\nWrite 80-130 words and include:\n- How the meeting with the tutor went.\n- What things you liked about the appointment.\n- Suggest how to improve the appointment system so parents don't have to wait so long.",
  minWords: 80,
  structureGuide: "1. Saludo formal (Dear Ms. Meehan)\n2. Agradecer la oportunidad de dar feedback\n3. Describir cómo fue la reunión (Past Simple)\n4. Mencionar qué te gustó\n5. Sugerir una mejora para el sistema de citas\n6. Despedida formal (Yours sincerely / Kind regards)",
  usefulPhrases: [
    "Dear Ms. Meehan,",
    "Thank you for asking for our feedback.",
    "The meeting went very well.",
    "I particularly liked...",
    "One suggestion I would make is...",
    "Kind regards,"
  ],
  grammarTips: [
    "Usa Past Simple ('went', 'liked', 'found') para describir la reunión.",
    "Usa 'could' o 'would suggest' para hacer sugerencias educadas."
  ],
  modelExample: "Dear Ms. Meehan,\n\nThank you for asking for our feedback about Parents' Evening. I found the event very useful overall.\n\nThe meeting with my son's tutor went very well. She explained his progress clearly and gave me some helpful advice about how to support his reading at home.\n\nI particularly liked the fact that we could see examples of the children's work displayed in the classrooms. It was great to see what they have been learning.\n\nHowever, I would suggest introducing an online booking system for appointments. I had to wait almost 30 minutes, and a scheduled time slot would make it much more efficient for everyone.\n\nKind regards,\nJairo",
  modelTranslation: "Estimada Sra. Meehan:\n\nGracias por pedir nuestro feedback sobre la Tarde de Padres. En general, encontré el evento muy útil.\n\nLa reunión con el tutor de mi hijo fue muy bien. Explicó claramente su progreso y me dio consejos útiles para apoyar su lectura en casa.\n\nMe gustó especialmente el hecho de que pudimos ver ejemplos de los trabajos de los niños expuestos en las aulas.\n\nSin embargo, sugeriría introducir un sistema de reserva en línea. Tuve que esperar casi 30 minutos, y una cita programada lo haría mucho más eficiente para todos.\n\nAtentamente,\nJairo"
},
  {
  id: "W2-OFF-1",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Medio Ambiente (Ensayo)",
  partLabel: "Parte 2: Ensayo",
  context: " Tu profesor te ha pedido que escribas un ensayo basado en una discusión en clase sobre protección ambiental:",
  prompt: "Your teacher has asked you to write an essay on how to protect the local environment. Write 100-160 words. Include:\n- How to reduce pollution in your town.\n- How young people can get involved.\n- Which action is more important.",
  minWords: 100,
  textType: "essay",
  structureGuide: "1. Introducción: plantea el problema\n2. Párrafo 1: reducción de la contaminación (transporte/reciclaje)\n3. Párrafo 2: participación de jóvenes (colegios/campañas)\n4. Conclusión: cuál es más importante y por qué",
  usefulPhrases: [
    "Protecting our local environment is crucial...",
    "To begin with, we can reduce pollution by...",
    "Furthermore, young people can get involved by...",
    "In my opinion, the most important action is...",
    "In conclusion,"
  ],
  grammarTips: [
    "Usa conectores como 'Furthermore', 'On the one hand', 'In addition'.",
    "Usa condicionales para proponer soluciones: 'If we used public transport, pollution would decrease.'"
  ],
  modelExample: "Protecting our local environment is crucial for our health and future. There are several ways to improve our town, and everyone should participate.\n\nTo begin with, we can reduce pollution by encouraging people to use public transport or bicycles instead of cars. Implementing a strict recycling scheme for plastics and paper would also significantly decrease waste in our streets.\n\nFurthermore, young people can get involved by participating in clean-up campaigns organized by schools. They can also use social media to raise awareness about environmental issues among their friends and families.\n\nIn my opinion, reducing pollution through public transport is the most important action because it directly improves the air quality we breathe every day.\n\nIn conclusion, small changes in our daily routine can have a major impact. Both local actions and youth involvement are necessary to protect our town.",
  modelTranslation: "Proteger nuestro entorno local es crucial para nuestra salud y futuro. Hay varias formas de mejorar nuestro pueblo, y todos deberían participar.\n\nPara empezar, podemos reducir la contaminación animando a la gente a usar el transporte público o la bicicleta. Implementar un plan de reciclaje estricto también reduciría significativamente los residuos.\n\nAdemás, los jóvenes pueden involucrarse participando en campañas de limpieza organizadas por las escuelas.\n\nEn mi opinión, reducir la contaminación mediante el transporte público es la acción más importante porque mejora directamente la calidad del aire.\n\nEn conclusión, pequeños cambios en nuestra rutina pueden tener un gran impacto."
},
  {
  id: "W2-OFF-2",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Cine (Reseña)",
  partLabel: "Parte 2: Reseña",
  context: " Escribe una reseña sobre una película o libro que te haya gustado para una revista escolar:",
  prompt: "Write a review of a book or film you have recently enjoyed. Include:\n- What it is about and the main characters.\n- What you liked or disliked.\n- Why you would recommend it to other students.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "review",
  structureGuide: "1. Título de la reseña\n2. Párrafo 1: Presenta el libro/película, tema y personajes\n3. Párrafo 2: Aspectos que te gustaron (efectos, actuaciones, trama)\n4. Párrafo 3: Aspectos negativos (si los hay)\n5. Conclusión: Recomendación final",
  usefulPhrases: [
    "I recently watched...",
    "The story is set in...",
    "The main character is...",
    "What I liked most was...",
    "On the other hand, I found...",
    "I would highly recommend this to...",
    "It is definitely worth watching/reading."
  ],
  grammarTips: [
    "Usa adjetivos descriptivos variados: 'gripping', 'hilarious', 'stunning', 'disappointing'.",
    "Usa voz pasiva para describir la producción: 'It was directed by...', 'The book was written by...'."
  ],
  modelExample: "A Masterpiece of Science Fiction\n\nI recently watched 'Interstellar', a science fiction film directed by Christopher Nolan. The story is set in a future where Earth is dying, and a group of astronauts travels through a wormhole to find a new home for humanity. The main character is Cooper, a former pilot.\n\nWhat I liked most was the stunning visual effects and the emotional soundtrack composed by Hans Zimmer. The acting was incredible, especially by Matthew McConaughey. On the other hand, I found the plot a bit confusing towards the end, as it deals with complex physics theories.\n\nHowever, I would highly recommend this film to other students. It is not just an action movie; it makes you think about humanity's future and the power of love across time and space. It is definitely worth watching!",
  modelTranslation: "Una Obra Maestra de la Ciencia Ficción\n\nRecientemente vi 'Interstellar', una película de ciencia ficción dirigida por Christopher Nolan. La historia se desarrolla en un futuro donde la Tierra está muriendo. El personaje principal es Cooper.\n\nLo que más me gustó fueron los impresionantes efectos visuales y la banda sonora de Hans Zimmer. Por otro lado, encontré la trama un poco confusa hacia el final.\n\nSin embargo, recomendaría encarecidamente esta película. Hace pensar sobre el futuro de la humanidad. ¡Definitivamente vale la pena verla!"
},
  {
  id: "W1-OUP-SPORTS-PARTY",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Fiesta en centro deportivo",
  partLabel: "Parte 1: Email",
  context: "️ Recibiste este email de la administración del club deportivo local sobre una reserva de fiesta:",
  prompt: "Reply to Ms Maxwell, the sports centre manager. Write 80-130 words and include:\n- Say you think it's a great idea and why.\n- State which option you prefer (outdoor games vs indoor party room) and why.\n- Suggest a suitable day and time for the party.",
  minWords: 80,
  structureGuide: "1. Saludo formal (Dear Ms Maxwell)\n2. Agradecer y opinar sobre la idea de la fiesta\n3. Elegir una opción con justificación (outdoor vs indoor)\n4. Proponer día y hora\n5. Cierre formal",
  usefulPhrases: [
    "Dear Ms Maxwell,",
    "Thank you for your email.",
    "I think organizing a party is a wonderful idea because...",
    "Regarding the options, I would prefer...",
    "I would suggest holding the party on...",
    "Yours sincerely,"
  ],
  grammarTips: [
    "Usa condicionales para preferencias: 'I would prefer the indoor room because it might rain.'",
    "Usa preposiciones de tiempo correctas: 'on Saturday', 'at 4 p.m.'."
  ],
  modelExample: "Dear Ms Maxwell,\n\nThank you for your email regarding my party booking. I think organizing a party at the sports centre is a wonderful idea because it will be a great way to celebrate with my friends.\n\nRegarding the options, I would prefer to book the indoor party room rather than the outdoor games. I am concerned that the weather might be bad next weekend, so being indoors is safer and more comfortable for everyone.\n\nI would suggest holding the party on Saturday afternoon, from 3 p.m. to 6 p.m., as most of my guests are free at that time.\n\nCould you please confirm the availability and let me know the total cost?\n\nYours sincerely,\nJairo Ruiz",
  modelTranslation: "Estimada Sra. Maxwell:\n\nGracias por su correo sobre mi reserva. Creo que organizar una fiesta en el centro deportivo es una idea maravillosa porque será una gran forma de celebrar con mis amigos.\n\nRespecto a las opciones, preferiría reservar la sala de fiestas interior en lugar de los juegos al aire libre. Me preocupa que el clima pueda ser malo, por lo que estar bajo techo es más seguro.\n\nSugeriría celebrar la fiesta el sábado por la tarde, de 3 p.m. a 6 p.m., ya que la mayoría de mis invitados están libres a esa hora.\n\nAtentamente,\nJairo Ruiz"
},
  {
  id: "W1-OUP-HOTEL-JOB",
  module: "writing",
  part: 1,
  difficulty: "B2",
  type: "text",
  topic: "Solicitud de empleo",
  partLabel: "Parte 1: Email formal",
  context: "️ Formato OTE: responde a un email formal y usa lenguaje funcional apropiado.",
  prompt: "You applied for a summer job at a hotel. The manager has invited you to an interview next Tuesday at 11 a.m.\n\nWrite an email to the manager. Include:\n- Explain that you cannot attend at that time and suggest another time.\n- Ask what documents you should bring.\n- Ask one question about the job.\n\nWrite 80-130 words.",
  minWords: 80,
  textType: "email_formal",
  structureGuide: "1. Dear Mrs Wilson\n2. Thank her for the invitation\n3. Apologize and suggest another time\n4. Ask what documents to bring\n5. Ask one clear question about the job\n6. Formal closing",
  usefulPhrases: [
    "Dear Mrs Wilson,",
    "Thank you for inviting me to an interview.",
    "Unfortunately, I am not available at that time.",
    "Would it be possible to meet...",
    "Could you please let me know...",
    "I look forward to hearing from you.",
    "Yours sincerely,"
  ],
  grammarTips: [
    "Evita contracciones en emails formales: 'I am' en vez de 'I'm'.",
    "Usa 'Would it be possible...' para sonar educado.",
    "Incluye una pregunta completa, no solo una frase suelta."
  ],
  modelExample: "Dear Mrs Wilson,\n\nThank you for inviting me to an interview for the summer hotel job.\n\nUnfortunately, I am not available next Tuesday at 11 a.m. because I have an important school exam at that time. Would it be possible to meet later the same day, perhaps at 3 p.m., or on Wednesday morning?\n\nCould you please let me know if I should bring any documents, such as my CV, identification or references?\n\nI would also like to ask whether the job includes evening shifts, as I need to organize my transport in advance.\n\nI look forward to hearing from you.\n\nYours sincerely,\nJairo Mendez",
  modelTranslation: "Estimada Sra. Wilson:\n\nGracias por invitarme a una entrevista para el trabajo de verano en el hotel.\n\nLamentablemente, no estoy disponible el próximo martes a las 11 a.m. porque tengo un examen importante en la escuela a esa hora. ¿Sería posible reunirnos más tarde ese mismo día, quizá a las 3 p.m., o el miércoles por la mañana?\n\n¿Podría indicarme si debo llevar algún documento, como mi CV, identificación o referencias?\n\nTambién quisiera preguntar si el trabajo incluye turnos por la tarde/noche, ya que necesito organizar mi transporte con anticipación.\n\nEspero su respuesta.\n\nAtentamente,\nJairo Mendez"
},
  {
  id: "W2-OUP-HEALTH-ESSAY",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Salud (Ensayo)",
  partLabel: "Parte 2: Ensayo",
  context: " Tu clase ha tenido una discusión sobre salud. Tu profesor te pide un ensayo con este título:",
  prompt: "Write an essay about how young people can stay healthy. Include:\n- The importance of regular exercise.\n- The role of diet and nutrition.\n- Which is more important for long-term health.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  structureGuide: "1. Introducción: plantea la importancia de la salud en la juventud\n2. Deporte: beneficios físicos y mentales\n3. Dieta: evitar comida chatarra, comer frutas y verduras\n4. Conclusión: balance entre ambos o prioridad justificada",
  usefulPhrases: [
    "It is vital for young people to...",
    "Regular exercise not only keeps you fit but also...",
    "In addition, a balanced diet plays a key role...",
    "While some people argue that exercise is key, I believe...",
    "In conclusion,"
  ],
  grammarTips: [
    "Usa gerundios como sujetos: 'Eating healthy foods is essential...'.",
    "Usa 'not only... but also...' para estructura paralela B2."
  ],
  modelExample: "It is vital for young people to establish healthy habits early in life. In today's fast-paced world, staying healthy involves both physical activity and nutrition.\n\nRegular exercise is crucial. It not only keeps you fit and maintains a healthy weight, but also reduces stress and improves mental focus. Activities like swimming, running or playing team sports can easily fit into a student's weekly schedule.\n\nIn addition, a balanced diet plays a key role in long-term health. Eating fruits, vegetables and whole grains provides the necessary energy for study, whereas consuming too much fast food leads to fatigue and health problems.\n\nWhile some people argue that exercise is key, I believe that diet is more important for long-term health because you cannot exercise away a poor diet.\n\nIn conclusion, both regular exercise and nutrition are necessary, but maintaining healthy eating habits is the foundation of a healthy life.",
  modelTranslation: "Es vital que los jóvenes establezcan hábitos saludables temprano en la vida. En el mundo acelerado de hoy, mantenerse saludable involucra tanto la actividad física como la nutrición.\n\nEl ejercicio regular es crucial. No solo te mantiene en forma y con un peso saludable, sino que también reduce el estrés.\n\nAdemás, una dieta equilibrada juega un papel clave en la salud a largo plazo. Comer frutas y verduras proporciona la energía necesaria.\n\nAunque algunos argumentan que el ejercicio es clave, creo que la dieta es más importante porque no se puede compensar una mala alimentación con ejercicio.\n\nEn conclusión, ambos son necesarios, pero una buena alimentación es la base."
},
  {
  id: "W2-OUP-COOKING-ESSAY",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Life skills (Ensayo)",
  partLabel: "Parte 2: Ensayo",
  context: " Tu profesor de inglés quiere que escribas un ensayo sobre habilidades para la vida:",
  prompt: "Write an essay with the title: 'Should cooking be taught in all secondary schools?'\nInclude:\n- The health benefits of knowing how to cook.\n- Independence and saving money.\n- Your opinion on whether it should be a compulsory subject.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  structureGuide: "1. Introducción: introduce el tema de las habilidades prácticas\n2. Salud y alimentación saludable\n3. Independencia, ahorro y preparación para la vida universitaria\n4. Conclusión: tu opinión sobre si debe ser obligatorio",
  usefulPhrases: [
    "There is an ongoing debate about whether...",
    "Knowing how to cook allows young people to...",
    "Furthermore, it fosters independence and helps...",
    "In my opinion, cooking should be compulsory because...",
    "To sum up,"
  ],
  grammarTips: [
    "Usa la voz pasiva: 'Cooking should be taught...', 'Students are prepared...'.",
    "Usa 'should' y 'ought to' para recomendaciones formales."
  ],
  modelExample: "There is an ongoing debate about whether practical life skills, such as cooking, should be part of the school curriculum. I strongly believe it should be taught to all students.\n\nFirstly, knowing how to cook has significant health benefits. It allows young people to prepare fresh meals instead of relying on processed foods, which are often high in salt and sugar. This is essential for preventing future health issues.\n\nFurthermore, cooking fosters independence and helps students save money, especially when they leave home for university. Eating out or ordering food daily is extremely expensive, whereas cooking at home is highly affordable.\n\nIn my opinion, cooking should be a compulsory subject in secondary schools. It is a vital life skill that every adult needs, just like mathematics or languages.\n\nTo sum up, teaching students how to cook prepares them for a healthier and more independent future, making it a valuable addition to any curriculum.",
  modelTranslation: "Existe un debate continuo sobre si las habilidades prácticas para la vida, como la cocina, deberían ser parte del currículo escolar. Creo firmemente que debería enseñarse.\n\nEn primer lugar, saber cocinar tiene beneficios significativos para la salud. Permite a los jóvenes preparar comidas frescas en lugar de depender de alimentos procesados.\n\nAdemás, fomenta la independencia y ayuda a los estudiantes a ahorrar dinero, especialmente cuando se van de casa para ir a la universidad.\n\nEn mi opinión, la cocina debería ser una asignatura obligatoria en secundaria.\n\nEn resumen, enseñar a cocinar prepara a los estudiantes para un futuro más saludable e independiente."
},
  {
  id: "W2-OUP-NEWS-REVIEW",
  module: "writing",
  part: 2,
  difficulty: "B1",
  type: "text",
  topic: "Noticias online (Reseña)",
  partLabel: "Parte 2: Reseña",
  context: " Una revista estudiantil busca reseñas de sitios web de noticias:",
  prompt: "Write a review of a news website you read regularly. Include:\n- What the website is and what kind of news it covers.\n- What you like or dislike about the design and articles.\n- Whether you would recommend it to other young people.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "review",
  structureGuide: "1. Título de la reseña\n2. Nombre del sitio y contenido general\n3. Aspectos positivos (diseño limpio, rapidez, interactividad) y negativos (anuncios)\n4. Recomendación final con justificación",
  usefulPhrases: [
    "The website I read regularly is...",
    "It covers a wide range of topics, including...",
    "One of the best features is...",
    "On the other hand, the main drawback is...",
    "I would highly recommend this website to anyone who..."
  ],
  grammarTips: [
    "Usa pronombres relativos: '...which is very useful', '...who want to stay informed'.",
    "Usa conectores de contraste como 'Although', 'Despite'."
  ],
  modelExample: "Stay Informed with BBC News\n\nThe website I read regularly to keep up with current events is BBC News. It covers a wide range of topics, including international politics, science, technology and entertainment.\n\nOne of the best features of the site is its clean and user-friendly design. It is very easy to navigate, and the articles are written in a clear, concise language, which is perfect for language learners. I also appreciate the short video summaries included in most stories. On the other hand, the main drawback is the large number of advertisements on the mobile version, which can be distracting.\n\nAlthough it has some ads, I would highly recommend this website to other students. It is a reliable source of information that helps you improve your English vocabulary while learning about what is happening in the world.\n\nIt is definitely worth visiting daily!",
  modelTranslation: "Mantente Informado con BBC News\n\nEl sitio web que leo regularmente para estar al día es BBC News. Cubre una amplia gama de temas.\n\nUna de las mejores características del sitio es su diseño limpio y fácil de usar. Los artículos están escritos en un lenguaje claro y conciso. Por otro lado, el principal inconveniente es la gran cantidad de anuncios.\n\nAunque tiene algunos anuncios, recomendaría encarecidamente este sitio a otros estudiantes. ¡Definitivamente vale la pena visitarlo a diario!"
},
  {
  id: "W2-OUP-SUMMER-ARTICLE",
  module: "writing",
  part: 2,
  difficulty: "B1",
  type: "text",
  topic: "Vacaciones (Artículo)",
  partLabel: "Parte 2: Artículo",
  context: " Una revista de viajes ha pedido artículos sobre vacaciones de verano memorables:",
  prompt: "Write an article for a travel magazine about a memorable summer holiday. Include:\n- Where you went and who you went with.\n- What activities you did during the holiday.\n- Why this holiday was so special to you.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "article",
  structureGuide: "1. Título llamativo e intrigante\n2. Párrafo 1: Destino y compañeros de viaje\n3. Párrafo 2: Actividades principales (lugares visitados, deportes, anécdotas)\n4. Párrafo 3: Razón por la que fue especial (aprendizaje, desconexión)\n5. Cierre con gancho o pregunta",
  usefulPhrases: [
    "An Unforgettable Adventure...",
    "Last summer, I travelled to...",
    "We spent our days...",
    "What made this holiday so special was...",
    "It was a unique experience that...",
    "If you ever get the chance, you should..."
  ],
  grammarTips: [
    "Usa Past Continuous para dar contexto: 'While we were hiking...', 'The sun was shining...'.",
    "Usa adjetivos vívidos: 'breathtaking views', 'crystal clear water', 'unforgettable'."
  ],
  modelExample: "An Unforgettable Adventure in the Andes\n\nLast summer, I travelled to Baños, a beautiful town in Ecuador, with my three best friends. We wanted to escape the city and spend some time in nature.\n\nWe spent our days doing outdoor activities. We rented mountain bikes and rode along the famous Route of the Waterfalls, enjoying the breathtaking views. We also tried rafting on the Pastaza River, which was thrilling. One afternoon, while we were hiking near a waterfall, it started to rain heavily, but we just laughed and kept walking.\n\nWhat made this holiday so special was the opportunity to disconnect from technology and strengthen our friendship. We cooked together, talked for hours in the evenings, and shared unforgettable moments.\n\nIt was a unique experience that I will treasure forever. If you ever get the chance to visit Ecuador, you should definitely go to Baños!",
  modelTranslation: "Una Aventura Inolvidable en los Andes\n\nEl verano pasado viajé a Baños, un hermoso pueblo de Ecuador, con mis tres mejores amigos.\n\nPasamos los días haciendo actividades al aire libre. Alquilamos bicicletas de montaña y recorrimos la Ruta de las Cascadas. También probamos el rafting.\n\nLo que hizo que estas vacaciones fueran tan especiales fue la oportunidad de desconectarnos de la tecnología y fortalecer nuestra amistad.\n\nFue una experiencia única que atesoraré para siempre. ¡Si alguna vez tienes la oportunidad de visitar Ecuador, definitivamente deberías ir a Baños!"
},
  {
  id: "W1-001",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Escuela",
  partLabel: "Tarea 1: Email informal",
  context: "Tu amigo inglés Chris te ha invitado a pasar el fin de semana en su casa de campo.",
  prompt: "Write an email to Chris. Include:\n- Thank Chris for the invitation.\n- Explain why you would like to go.\n- Suggest something you would like to do there.\n\nWrite 80-130 words.",
  minWords: 80,
  usefulPhrases: [
    "Hi Chris,",
    "Thanks so much for the invitation!",
    "I'd love to come because...",
    "It would be great to...",
    "Let me know if...",
    "Best,"
  ],
  grammarTips: [
    "Usa 'I would love to...' para expresar entusiasmo.",
    "Usa condicionales sencillos para propuestas."
  ],
  modelExample: "Hi Chris,\n\nThanks so much for the invitation to stay at your cottage next weekend! I'd absolutely love to come because I really need a break from studying, and the countryside sounds perfect right now.\n\nWhile I am there, it would be great to go for a long walk in the hills, as you know I love hiking and taking photos of nature. Maybe we could also cook a nice dinner together on Saturday evening.\n\nLet me know if there is anything I should bring, like some local snacks or board games.\n\nCan't wait to see you next Friday!\n\nBest,\nJairo"
},
  {
  id: "W1-002",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Reunion padres",
  partLabel: "Tarea 1: Email informal",
  context: "Formato OTE Tarea 1: Responder a Ms. Niki Meehan sobre una reunión de padres.",
  prompt: "You recently attended a parent-teacher meeting. Reply to the email from Ms. Niki Meehan (Head of Primary).\nWrite 80-130 words and include:\n- How the meeting with the tutor went.\n- What things you liked about the appointment.\n- Suggest how to improve the appointment system.",
  minWords: 80,
  usefulPhrases: [
    "Dear Ms. Meehan,",
    "The meeting with the tutor went very well...",
    "I really liked that...",
    "To improve the system, I suggest...",
    "Kind regards,"
  ],
  grammarTips: [
    "Usa vocabulario formal apropiado.",
    "Estructura tus ideas en párrafos separados para cada punto."
  ],
  modelExample: "Dear Ms. Meehan,\n\nThank you for your email. The meeting with my daughter's tutor went very well. We discussed her academic progress, and the tutor was very supportive and informative.\n\nI really liked that the appointment started on time, and we had enough time to discuss everything without feeling rushed. The classroom displays of children's work were also a lovely touch.\n\nTo improve the system, I suggest introducing an online booking portal. This would allow parents to choose their preferred slots in advance and reduce waiting times in the corridors.\n\nKind regards,\nJairo Ruiz"
},
  {
  id: "W1-003",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Centro de ciencias",
  partLabel: "Tarea 1: Email informal",
  context: "Tu amigo Alex quiere visitar el nuevo Centro de Ciencias de la ciudad.",
  prompt: "Write an email to Alex. Include:\n- Say you would like to go with him.\n- Suggest a day and time to visit.\n- Ask about transport options to get there.\n\nWrite 80-130 words.",
  minWords: 80,
  usefulPhrases: [
    "Hi Alex,",
    "I'd love to go with you to the Science Centre!",
    "How about we go on...",
    "Do you know how we can get there?",
    "See you,"
  ],
  grammarTips: [
    "Usa frases interrogativas indirectas para preguntar educadamente: 'Do you know if...'."
  ],
  modelExample: "Hi Alex,\n\nI'd love to go with you to the new Science Centre! I've heard the interactive exhibitions are amazing.\n\nHow about we go this Saturday morning around 10:00 AM? That way we can beat the crowds and have plenty of time to explore all the rooms.\n\nDo you know what the best transport options are to get there? I'm not sure if there's a direct bus from the station or if we should just take a taxi.\n\nLet me know if that day works for you.\n\nSee you,\nJairo"
},
  {
  id: "W1-004",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Vacaciones",
  partLabel: "Tarea 1: Email informal",
  context: "Tu primo Sam te ha preguntado sobre tus planes de vacaciones.",
  prompt: "Write an email to Sam. Include:\n- Tell Sam where you are going and who you are going with.\n- Describe what you plan to do there.\n- Ask Sam about his summer plans.\n\nWrite 80-130 words.",
  minWords: 80,
  usefulPhrases: [
    "Hi Sam,",
    "I'm going to...",
    "I'm travelling with...",
    "We plan to...",
    "What are you doing this summer?",
    "Best,"
  ],
  grammarTips: [
    "Usa 'going to' para planes futuros firmes.",
    "Usa Present Continuous para arreglos de viaje ('We are flying on...')."
  ],
  modelExample: "Hi Sam,\n\nIt's great to hear from you! This summer, I'm going to a beautiful beach town called Mompiche in Ecuador. I'm travelling with my family, including my parents and sister.\n\nWe plan to relax on the beach, learn how to surf, and visit a nearby ecological reserve. We are also looking forward to trying the local seafood, which is famous for being delicious.\n\nWhat are you doing this summer? Have you made any plans yet? I'd love to hear all about it.\n\nWrite back soon,\nJairo"
},
  {
  id: "W1-005",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Trabajo",
  partLabel: "Tarea 1: Email informal",
  context: "Tu amigo inglés Harry ha conseguido un nuevo trabajo.",
  prompt: "Write an email to Harry. Include:\n- Congratulate Harry on his new job.\n- Ask what his duties will be.\n- Suggest meeting up to celebrate.\n\nWrite 80-130 words.",
  minWords: 80,
  usefulPhrases: [
    "Hi Harry,",
    "Congratulations on the new job!",
    "What exactly will you be doing?",
    "We should meet up to celebrate...",
    "Cheers,"
  ],
  grammarTips: [
    "Usa exclamaciones informales para felicitar.",
    "Usa verbos modales para proponer reuniones ('should', 'could')."
  ],
  modelExample: "Hi Harry,\n\nCongratulations on the new job! That is absolutely fantastic news, and I am so happy for you. You really deserved it after all those interviews.\n\nWhat exactly will your duties be? I'd love to know more about the projects you will be working on and what a typical day will look like for you.\n\nWe should definitely meet up next Friday evening to celebrate. We could go to that new Italian restaurant in the city centre. Let me know if that works for you!\n\nCheers,\nJairo"
},
  {
  id: "W1-006",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Queja",
  partLabel: "Tarea 1: Email informal",
  context: "Compraste un artículo online que llegó dañado.",
  prompt: "Write an email to the customer service. Include:\n- State what you bought and when.\n- Explain the damage to the item.\n- Say what action you expect the company to take.\n\nWrite 80-130 words.",
  minWords: 80,
  usefulPhrases: [
    "Dear Customer Service,",
    "I am writing to complain about...",
    "I purchased a...",
    "Upon arrival, I noticed that...",
    "I would appreciate a full refund...",
    "Yours sincerely,"
  ],
  grammarTips: [
    "Mantén un tono educado pero firme.",
    "Usa la voz pasiva para describir el daño ('the screen was broken')."
  ],
  modelExample: "Dear Customer Service,\n\nI am writing to complain about a recent purchase. I ordered a mechanical keyboard (Order #77439) from your website on the 10th of July, and it arrived yesterday.\n\nUnfortunately, when I opened the package, I noticed that the item was damaged. Several keycaps were broken, and the USB connection cable was missing. The box itself was also badly crushed.\n\nBecause of this, I would appreciate a full refund or a replacement keyboard sent as soon as possible. I have attached photos of the damage for your reference.\n\nI look forward to your prompt response.\n\nYours sincerely,\nJairo Ruiz"
},
  {
  id: "W2-001",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Medio ambiente",
  partLabel: "Tarea 2: Ensayo",
  context: "Tu profesor quiere que escribas un ensayo sobre la contaminación.",
  prompt: "Write an essay with this title: 'Should private cars be banned from city centres?'\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  usefulPhrases: [
    "It is widely argued that...",
    "On the one hand, banning cars would...",
    "On the other hand, it could cause...",
    "In conclusion, I believe that..."
  ],
  grammarTips: [
    "Escribe un ensayo estructurado con introducción, desarrollo y conclusión.",
    "Usa conectores de contraste para balancear argumentos."
  ],
  modelExample: "It is widely argued that private cars should be banned from city centres to reduce rising pollution levels. While this proposal has clear benefits, it also presents challenges.\n\nOn the one hand, banning cars would significantly improve air quality and reduce traffic noise, making city centres safer and more pleasant for pedestrians. It would also encourage people to walk, cycle or use public transport, which is healthier for everyone.\n\nOn the other hand, a complete ban could cause major problems for residents and local businesses. Many people rely on cars to transport heavy goods or commute from areas without good public transport links. Business owners worry they might lose customers who prefer driving.\n\nIn conclusion, I believe that while a total ban is too extreme, cities should restrict car access during peak hours and invest more in clean public transport to find a balance."
},
  {
  id: "W2-002",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Tecnologia",
  partLabel: "Tarea 2: Ensayo",
  context: "Tu profesor quiere un ensayo sobre la tecnología.",
  prompt: "Write an essay with this title: 'Has technology made our lives simpler or more complicated?'\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  usefulPhrases: [
    "Technology has transformed...",
    "Undoubtedly, it has made...",
    "However, it has also introduced...",
    "In my view, the benefits outweigh..."
  ],
  grammarTips: [
    "Usa Present Perfect para hablar de cambios históricos.",
    "Usa adverbios de grado para matizar ('significantly', 'considerably')."
  ],
  modelExample: "Technology has transformed every aspect of our lives in recent decades. While it has undoubtedly made many daily tasks much simpler, it has also introduced new complications.\n\nOn the one hand, technology saves us a significant amount of time. We can now communicate instantly with anyone in the world, access unlimited information, and manage our finances online. Tasks that used to take days can now be completed in a few clicks.\n\nOn the other hand, the pressure to be constantly connected has made our lives more stressful. Many people struggle to separate work from their personal life, and social media often leads to anxiety and distraction. Furthermore, keeping up with constant updates can be frustrating.\n\nIn my view, although technology makes life more complex, the benefits of convenience and global connection outweigh these drawbacks. It is up to us to manage its use."
},
  {
  id: "W2-003",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Redes sociales",
  partLabel: "Tarea 2: Ensayo",
  context: "Tu profesor quiere un ensayo sobre las redes sociales.",
  prompt: "Write an essay with this title: 'Are social media sites good for friendships?'\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  usefulPhrases: [
    "Social media platforms have...",
    "One advantage is that they allow...",
    "However, virtual connections can...",
    "Overall, I think that..."
  ],
  grammarTips: [
    "Usa preguntas retóricas en la introducción para enganchar.",
    "Usa 'although' y 'even though' para oraciones complejas."
  ],
  modelExample: "Social media platforms have changed how we maintain friendships. But are these digital connections actually good for our relationships?\n\nOne major advantage is that they allow us to stay in touch with friends who live far away. We can share photos, send messages and celebrate milestones instantly, which prevents people from growing apart. It also helps shy individuals find communities with shared interests.\n\nHowever, virtual connections can sometimes replace real-world interactions. Spending hours scrolling through feeds often leads to superficial relationships rather than deep, meaningful friendships. Moreover, misunderstandings are common in text messages, which can lead to unnecessary conflicts.\n\nOverall, I think that social media is a useful tool for staying connected, but it should not replace face-to-face contact. A real friendship requires shared physical experiences to remain strong."
},
  {
  id: "W2-004",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Turismo",
  partLabel: "Tarea 2: Ensayo",
  context: "Tu profesor quiere un ensayo sobre el turismo.",
  prompt: "Write an essay with this title: 'Does tourism bring more benefits than problems to a country?'\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  usefulPhrases: [
    "Tourism is a major industry...",
    "The primary benefit is...",
    "On the negative side, tourism...",
    "To sum up, I believe..."
  ],
  grammarTips: [
    "Usa sustantivos colectivos y de abstractos ('economy', 'pollution', 'infrastructure').",
    "Usa la estructura 'on the one hand/on the other hand'."
  ],
  modelExample: "Tourism is a major industry that affects many nations. While it brings significant economic growth, it also causes social and environmental issues.\n\nThe primary benefit of tourism is economic. It creates thousands of jobs in hotels, restaurants and transport, which boosts the local economy. Furthermore, the money generated can be used by governments to improve public infrastructure, such as roads and airports, benefiting residents too.\n\nOn the negative side, tourism can lead to overcrowding and increased pollution in popular areas. In some cities, local residents are forced to move out because housing prices rise due to holiday rentals. Moreover, local culture can sometimes be lost to accommodate foreign tastes.\n\nTo sum up, I believe that tourism brings more benefits than problems, provided that governments manage it responsibly to protect local communities and the environment."
},
  {
  id: "W2-005",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Entretenimiento",
  partLabel: "Tarea 2: Ensayo",
  context: "Tu profesor quiere un ensayo sobre entretenimiento.",
  prompt: "Write an essay with this title: 'Is it better to watch live music or recorded music?'\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  usefulPhrases: [
    "Music is an essential part...",
    "Watching a live concert offers...",
    "However, recorded music is...",
    "Personally, I prefer..."
  ],
  grammarTips: [
    "Usa adjetivos comparativos ('cheaper', 'more convenient', 'louder').",
    "Usa oraciones con 'while' para comparar."
  ],
  modelExample: "Music is an essential part of daily life, but people have different preferences regarding how they listen to it. Is it better to experience it live or recorded?\n\nOn the one hand, watching a live concert offers an incomparable atmosphere. The energy of the crowd, the volume of the sound, and seeing the artists perform in person make it an unforgettable experience. It creates a strong feeling of connection with the music and other fans.\n\nOn the other hand, recorded music is much more convenient and affordable. You can listen to your favorite tracks anytime, anywhere, for a fraction of the cost of a concert ticket. Moreover, the sound quality is often better because it is produced in a studio.\n\nPersonally, I believe that while recorded music is practical for daily life, nothing can replace the unique excitement of a live performance."
},
  {
  id: "W2-006",
  module: "writing",
  part: 2,
  difficulty: "B2",
  type: "text",
  topic: "Educación",
  partLabel: "Tarea 2: Artículo (100-160 palabras)",
  context: "Una revista estudiantil busca artículos sobre aprender idiomas.",
  prompt: "Write an article with this title: 'Why learning a new language is essential today.'\nWrite 100-160 words.",
  minWords: 100,
  textType: "article",
  usefulPhrases: [
    "In today's globalized world...",
    "First of all, it opens up...",
    "Additionally, it improves...",
    "So what are you waiting for?"
  ],
  grammarTips: [
    "Usa un título llamativo.",
    "Usa imperativos al final para motivar al lector.",
    "Usa conectores lógicos."
  ],
  modelExample: "Why You Should Learn a New Language Today!\n\nIn today's globalized world, speaking only one language is no longer enough. Learning a new language is one of the most rewarding decisions you can make.\n\nFirst of all, it opens up incredible career opportunities. Many international companies look for employees who can communicate with global clients, which gives bilingual candidates a major advantage. It also makes travelling much more enjoyable, as you can chat with local people and understand their culture.\n\nAdditionally, studies show that learning a language is excellent exercise for the brain. It improves your memory, concentration, and problem-solving skills, keeping your mind sharp.\n\nIn conclusion, learning another language is not just about memorizing words; it is a key that opens doors to new opportunities, friendships and experiences, helping you connect with people from around the world in a deeper, more meaningful way.\n\nSo what are you waiting for? Start today and you won't regret it!"
},
  {
  id: "W1-OUP-PABLO-CLASS",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Salida de la clase",
  partLabel: "Tarea 1: Email informal (80-130 palabras)",
  context: "You are doing an English course at a language school. Reply to the email from Pablo, one of the students in your class.",
  prompt: "First, read the email from Pablo. Then, write an email to Pablo. In your email, you should:\n- say what you think of the idea of organizing an afternoon out\n- say which activity you would prefer (cinema vs cafe) and why\n- suggest a good day and time to go out.\n\nWrite 80-130 words.",
  minWords: 80,
  textType: "email_informal",
  structureGuide: "1. Saludo informal (Hi Pablo,)\n2. Opinión positiva sobre la idea + razón (Great, because...)\n3. Preferencia de actividad + por qué (Say which and why)\n4. Sugerencia de día y hora (Suggest...)\n5. Cierre informal",
  usefulPhrases: [
    "Hi Pablo,",
    "I think organizing a class afternoon out is a great idea because...",
    "Regarding the options, I would prefer...",
    "I would suggest going on...",
    "Hope to hear from you soon,"
  ],
  grammarTips: [
    "Usa 'prefer' o 'would rather' para elecciones.",
    "Usa preposiciones adecuadas: 'on Friday afternoon', 'at 4:30 p.m.'."
  ],
  modelExample: "Hi Pablo,\n\nI think organizing a class afternoon out is a great idea because it will be a wonderful way for all of us to say goodbye and celebrate completing the course together.\n\nRegarding the activities, I would prefer to go to a cafe rather than the cinema. In a cafe, we can easily sit together, talk about our future plans and share memories, which would be difficult to do during a movie.\n\nI would suggest going out next Friday afternoon around 5:00 PM, as we won't have classes the next day and everyone should be relaxed.\n\nHope to hear from you soon!\n\nBest,\nJairo",
  modelTranslation: "Hola Pablo:\n\nCreo que organizar una tarde de salida de la clase es una gran idea porque será una forma maravillosa de despedirnos y celebrar que terminamos el curso juntos.\n\nRespecto a las actividades, preferiría ir a una cafetería en lugar del cine. En una cafetería podemos sentarnos juntos, hablar de planes futuros y compartir recuerdos.\n\nSugeriría salir el próximo viernes por la tarde alrededor de las 5:00 PM, ya que no tendremos clases al día siguiente.\n\n¡Espero saber de ti pronto!\n\nSaludos,\nJairo"
},
  {
  id: "W1-OUP-PRINCIPAL-PARTY",
  module: "writing",
  part: 1,
  difficulty: "B2",
  type: "text",
  topic: "Fiesta de fin de curso",
  partLabel: "Tarea 1: Email formal (80-130 palabras)",
  context: "There is going to be a party at your international language school because it is the end of your English course. Reply to the email from the school principal, Mark Lester.",
  prompt: "First, read the email from the principal, Mark Lester. Then, write an email to the principal. In your email, you should:\n- say which day you think would be best for the party and why\n- explain why you are unable to cook food from your country\n- suggest how to make the party special.\n\nWrite 80-130 words.",
  minWords: 80,
  textType: "email_formal",
  structureGuide: "1. Saludo formal (Dear Mr Lester,)\n2. Elección de día + justificación (Say which day and why)\n3. Explicación educada de por qué no puedes cocinar (No, because...)\n4. Sugerencia creativa para hacer la fiesta especial (Suggest...)\n5. Despedida formal",
  usefulPhrases: [
    "Dear Mr Lester,",
    "I am writing to reply to your email about the end-of-course party.",
    "In my opinion, Saturday would be the best day because...",
    "Unfortunately, I am unable to cook food because...",
    "To make the party special, I would suggest...",
    "Thank you for your time.",
    "Yours sincerely,"
  ],
  grammarTips: [
    "Mantén un registro formal sin contracciones ('I am', 'do not').",
    "Usa modal verbs para sugerir ideas: 'We could organize...', 'I would suggest...'."
  ],
  modelExample: "Dear Mr Lester,\n\nI am writing to reply to your email about the end-of-course party. In my opinion, Saturday would be the best day because students will not have classes and will be more relaxed.\n\nUnfortunately, I am unable to cook food from my country because my student accommodation does not have kitchen facilities, and I am not very experienced at cooking traditional dishes.\n\nTo make the party special, I would suggest organizing a short talent show or playing music from all the different countries represented at our school. This would make it highly memorable for everyone.\n\nThank you for organizing the event.\n\nYours sincerely,\nJairo Ruiz",
  modelTranslation: "Estimado Sr. Lester:\n\nLe escribo para responder a su correo sobre la fiesta de fin de curso. En mi opinión, el sábado sería el mejor día porque los estudiantes no tendrán clases y estarán más relajados.\n\nLamentablemente, no puedo cocinar comida de mi país porque mi alojamiento de estudiantes no tiene instalaciones de cocina y no tengo experiencia cocinando platos tradicionales.\n\nPara hacer la fiesta especial, sugeriría organizar un pequeño show de talentos o poner música de los diferentes países. Esto lo haría muy memorable.\n\nGracias por organizar el evento.\n\nAtentamente,\nJairo Ruiz"
},
  {
  id: "W1-B1-T1-LONDON",
  module: "writing",
  part: 1,
  difficulty: "B1",
  type: "text",
  topic: "Viaje a Londres",
  partLabel: "Parte 1: Email (80-130 palabras)",
  context: "Tú y tu amigo Sam van a hacer un viaje corto. Lee el email de Sam sobre el viaje y las tres notas que has escrito.",
  prompt: "First, read the email from Sam. Then, write an email to Sam. In your email, you should:\n- say if you agree to stay in a hotel the night before\n- choose which hotel (Air North Hotel vs Runway Hotel) would be best and explain why\n- suggest ideas on the best way to get there.\n\nWrite 80-130 words.",
  minWords: 80,
  textType: "email_informal",
  structureGuide: "1. Saludo informal (Hi Sam,)\n2. Aceptar quedarse en el hotel la noche antes (Yes, because...)\n3. Elegir el hotel y dar la razón (Say which and why)\n4. Sugerir cómo llegar (What about...)\n5. Cierre informal (Write soon / Best,)",
  usefulPhrases: [
    "Hi Sam,",
    "Yes, I completely agree that we should stay in a hotel because...",
    "Looking at their websites, I think the Runway Hotel would be best because...",
    "As for getting there, what about taking the train?",
    "Write soon,"
  ],
  grammarTips: [
    "Usa comparativas para justificar tu elección de hotel (e.g. 'cheaper than', 'more convenient').",
    "Usa expresiones informales para sugerir: 'What about + -ing?' o 'How about?'."
  ],
  modelExample: "Hi Sam,\n\nYes, I completely agree that we should stay in a hotel the night before. Since our flight leaves so early at 5:00 in the morning, it will save us a lot of stress.\n\nLooking at their websites, I think the Runway Hotel would be best because it is located right next to the airport terminal, so we won't have to worry about transport in the morning.\n\nAs for getting to the hotel, what about taking the train from the central station? It is very fast and cheap. Let me know what you think.\n\nWrite soon,\nAlex",
  modelTranslation: "Hola Sam:\n\nSí, estoy totalmente de acuerdo en que deberíamos quedarnos en un hotel la noche anterior. Como nuestro vuelo sale tan temprano a las 5:00 de la mañana, nos ahorrará mucho estrés.\n\nMirando sus sitios web, creo que el Runway Hotel sería el mejor porque está ubicado justo al lado de la terminal del aeropuerto, por lo que no tendremos que preocuparnos por el transporte en la mañana.\n\nEn cuanto a cómo llegar al hotel, ¿qué tal si tomamos el tren desde la estación central? Es muy rápido y barato. Dime qué piensas.\n\nEscribe pronto,\nAlex"
},
  {
  id: "W2-B1-T1-VIDEOGAMES",
  module: "writing",
  part: 2,
  difficulty: "B1",
  type: "text",
  topic: "Videojuegos y niños (Ensayo)",
  partLabel: "Parte 2: Ensayo",
  context: "Tu clase ha tenido una discusión sobre videojuegos. Tu profesor quiere que escribas un ensayo con este título:",
  prompt: "Write an essay with the title: 'Are video games bad for children?'\nInclude:\n- How video games can be helpful.\n- The negative consequences of playing too much.\n- Your conclusion and opinion.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "essay",
  structureGuide: "1. Introducción: plantea el debate sobre los videojuegos\n2. Beneficios: desarrollo de habilidades (coordinación, estrategia)\n3. Consecuencias negativas: sedentarismo, falta de estudio\n4. Conclusión: tu opinión equilibrada",
  usefulPhrases: [
    "Nowadays, video games are extremely popular...",
    "On the one hand, video games can help children...",
    "On the other hand, playing too much can lead to...",
    "To sum up, I believe that..."
  ],
  grammarTips: [
    "Usa conectores de contraste: 'On the one hand', 'On the other hand', 'However'.",
    "Usa gerundios como sujetos: 'Playing video games can help...'."
  ],
  modelExample: "Nowadays, video games are extremely popular among children, but there is a lot of debate about whether they are harmful. In my opinion, video games can have both positive and negative effects, depending on how they are used.\n\nOn the one hand, many video games can help children develop important skills. For example, some games encourage strategic thinking, problem-solving, and hand-eye coordination. Furthermore, playing games with friends can improve teamwork and communication.\n\nOn the other hand, playing too much can lead to negative consequences. If children spend hours in front of a screen, they may not do enough physical exercise or study. In addition, some games are violent and may not be suitable for young minds.\n\nTo sum up, video games are not bad in themselves. However, parents should monitor the time children spend playing and ensure they maintain a healthy balance.",
  modelTranslation: "Hoy en día, los videojuegos son extremadamente populares entre los niños, pero hay mucho debate sobre si son dañinos. En mi opinión, los videojuegos pueden tener efectos tanto positivos como negativos, dependiendo de cómo se utilicen.\n\nPor un lado, muchos videojuegos pueden ayudar a los niños a desarrollar habilidades importantes. Por ejemplo, algunos juegos fomentan el pensamiento estratégico y la resolución de problemas.\n\nPor otro lado, jugar demasiado puede tener consecuencias negativas. Si los niños pasan horas frente a una pantalla, es posible que no hagan suficiente ejercicio físico.\n\nEn resumen, los videojuegos no son malos en sí mismos. Sin embargo, los padres deben controlar el tiempo de juego."
},
  {
  id: "W2-B1-T1-SHOPPING",
  module: "writing",
  part: 2,
  difficulty: "B1",
  type: "text",
  topic: "Sitio web de compras (Reseña)",
  partLabel: "Parte 2: Reseña",
  context: "Has visto el anuncio de una revista en línea para estudiantes de inglés. Escribe una reseña sobre un sitio web de compras.",
  prompt: "Write a review of a shopping website you have visited. Include:\n- What sort of things they sell.\n- What you like and dislike about it.\n- Why you would recommend it to other students.\n\nWrite 100-160 words.",
  minWords: 100,
  textType: "review",
  structureGuide: "1. Título llamativo de la reseña\n2. Nombre del sitio y qué tipo de artículos vende\n3. Aspectos positivos (diseño, envíos) y negativos (atención al cliente)\n4. Conclusión y por qué lo recomiendas a estudiantes",
  usefulPhrases: [
    "Recently, I have visited...",
    "What I like most about this website is...",
    "However, one thing I dislike is...",
    "Overall, I highly recommend this to..."
  ],
  grammarTips: [
    "Usa el Present Perfect para introducir la experiencia: 'I have visited...'.",
    "Usa adjetivos de opinión: 'reliable', 'affordable', 'convenient'."
  ],
  modelExample: "A Reliable Store for Readers\n\nRecently, I have visited 'BookDepot', a popular online bookstore that sells all kinds of books, from English textbooks to novels. I decided to use it to buy some reading materials.\n\nWhat I like most about this website is the search engine and the user interface. It is very easy to find books by category or author. In addition, they offer free worldwide shipping, which is great for students on a budget. The books arrived in perfect condition and on time.\n\nHowever, one thing I dislike is that they do not have a live chat for customer service. When I had a question about my order, I had to send an email, and it took them two days to reply.\n\nOverall, I highly recommend BookDepot to anyone looking for cheap books, despite the slow customer support. It is a reliable and easy-to-use website.",
  modelTranslation: "Una Tienda Confiable para Lectores\n\nRecientemente visité 'BookDepot', una librería en línea popular que vende todo tipo de libros, desde textos de inglés hasta novelas.\n\nLo que más me gusta de este sitio web es el motor de búsqueda y la interfaz de usuario. Es muy fácil encontrar libros. Además, ofrecen envío mundial gratuito, lo cual es excelente para estudiantes.\n\nSin embargo, una cosa que no me gusta es que no tienen chat en vivo para atención al cliente. Tuve que enviar un correo y tardaron dos días en responder.\n\nEn general, recomiendo encarecidamente BookDepot a cualquiera que busque libros baratos."
}
,
  // ── MORE WRITING PART 1: Emails ──
  {
    id: "W1-007", module: "writing", part: 1, difficulty: "B1", type: "text", topic: "Agradecer hospitalidad",
    partLabel: "Tarea 1: Email informal (80-130 palabras)",
    context: "Acabas de volver de pasar un fin de semana en casa de tu amigo inglés Alex.",
    prompt: "Write a thank-you email to Alex. Include:\n- Thank them for having you stay.\n- Mention something you particularly enjoyed.\n- Invite Alex to visit you.\n\nWrite 80-130 words.",
    minWords: 80,
    textType: "email_informal",
    structureGuide: "1. Saludo informal (Hi Alex!)\n2. Agradecer por la hospitalidad\n3. Mencionar algo específico que disfrutaste\n4. Invitar a Alex a visitarte\n5. Despedida informal",
    usefulPhrases: ["Hi Alex!", "I just wanted to say a huge thank you for...", "I had such a wonderful time!", "The thing I enjoyed most was...", "You are welcome to come and stay with me...", "It would be great to see you again!", "Take care,"],
    grammarTips: ["Usa Past Simple para describir lo que hiciste ('We visited...', 'I really enjoyed...').", "Usa 'would' para invitaciones educadas ('It would be lovely if you could visit...')."],
    modelExample: "Hi Alex!\n\nI just wanted to say a huge thank you for having me to stay last weekend. I had such a wonderful time!\n\nThe thing I enjoyed most was the barbecue on Saturday evening. The food was delicious and it was so nice to meet your family. I also loved our walk along the river — the views were beautiful.\n\nYou are welcome to come and stay with me any time. It would be great to show you around my city. We could visit the old town and try some local food. I think you would love it!\n\nTake care and see you soon,\nJairo",
    modelTranslation: "¡Hola Alex!\n\nSolo quería darte las gracias por dejarme quedarme el fin de semana pasado. ¡La pasé increíble!\n\nLo que más disfruté fue la barbacoa del sábado por la noche. La comida estuvo deliciosa y fue genial conocer a tu familia. También me encantó nuestro paseo por el río — las vistas eran preciosas.\n\nEres bienvenido a quedarte conmigo cuando quieras. Me encantaría enseñarte mi ciudad. Podríamos visitar el casco antiguo y probar comida local. ¡Creo que te encantaría!\n\nCuídate y nos vemos pronto,\nJairo"
  },
  {
    id: "W1-008", module: "writing", part: 1, difficulty: "B2", type: "text", topic: "Cancelar reserva",
    partLabel: "Tarea 1: Email formal (80-130 palabras)",
    context: "Reservaste una habitación de hotel pero necesitas cancelar por un cambio de planes.",
    prompt: "Write a formal email to the hotel manager to cancel your reservation. Include:\n- Give your booking reference and dates.\n- Explain the reason for cancellation.\n- Ask about the cancellation policy and refund.\n\nWrite 80-130 words.",
    minWords: 80,
    textType: "email_formal",
    structureGuide: "1. Dear Sir/Madam\n2. State your booking details\n3. Explain the reason clearly\n4. Ask about refund/policy\n5. Formal close",
    usefulPhrases: ["Dear Sir/Madam,", "I am writing to inform you that I need to cancel...", "My booking reference is...", "Unfortunately, due to...", "I would be grateful if you could...", "Could you please confirm whether...", "I apologise for any inconvenience.", "Yours faithfully,"],
    grammarTips: ["Usa 'I am writing to inform you...' como apertura formal.", "Usa 'due to' seguido de un sustantivo para dar razones ('due to a family emergency')."],
    modelExample: "Dear Sir/Madam,\n\nI am writing to inform you that I need to cancel my hotel reservation. My booking reference is HB-4521, for two nights from the 15th to the 17th of August.\n\nUnfortunately, due to a family emergency, I am no longer able to travel on those dates. I apologise for any inconvenience this may cause.\n\nCould you please confirm whether a full refund is possible, or if there is a cancellation fee? I would be grateful if you could let me know as soon as possible.\n\nThank you for your understanding.\n\nYours faithfully,\nJairo Mendez",
    modelTranslation: "Estimado/a señor/a:\n\nLe escribo para informarle que necesito cancelar mi reserva de hotel. Mi referencia de reserva es HB-4521, por dos noches del 15 al 17 de agosto.\n\nLamentablemente, debido a una emergencia familiar, ya no puedo viajar en esas fechas. Pido disculpas por cualquier inconveniente que esto pueda causar.\n\n¿Podría confirmarme si es posible un reembolso completo o si hay un cargo por cancelación? Le agradecería que me informara lo antes posible.\n\nGracias por su comprensión.\n\nAtentamente,\nJairo Mendez"
  },
  {
    id: "W1-009", module: "writing", part: 1, difficulty: "B1", type: "text", topic: "Recomendar restaurante",
    partLabel: "Tarea 1: Email informal (80-130 palabras)",
    context: "Tu amigo Mark te ha pedido que le recomiendes un buen restaurante para celebrar su cumpleaños.",
    prompt: "Write an email to Mark. Include:\n- Recommend a restaurant and say where it is.\n- Describe what kind of food they serve and what you recommend ordering.\n- Suggest what time to go.\n\nWrite 80-130 words.",
    minWords: 80,
    textType: "email_informal",
    structureGuide: "1. Saludo informal\n2. Recomendar el restaurante + ubicación\n3. Describir el tipo de comida + plato recomendado\n4. Sugerir hora\n5. Despedida",
    usefulPhrases: ["Hi Mark!", "I'd recommend...", "It's located in...", "They serve amazing...", "You should definitely try the...", "I'd suggest going around...", "You won't be disappointed!"],
    grammarTips: ["Usa 'I'd recommend' + -ing o sustantivo para sugerencias.", "Usa imperativo para recomendaciones directas ('Try the...', 'Ask for...')."],
    modelExample: "Hi Mark!\n\nHappy birthday! For your celebration, I'd recommend a restaurant called La Terraza. It's located in the old town, right next to the main square.\n\nThey serve amazing Mediterranean food — fresh pasta, grilled fish and incredible desserts. You should definitely try the seafood risotto; it's the best thing on the menu. The portions are generous and the prices are reasonable.\n\nI'd suggest going around 8 p.m. because it gets quite busy later in the evening. You might want to book a table in advance.\n\nI'm sure you'll have a great time. You won't be disappointed!\n\nEnjoy your birthday,\nJairo",
    modelTranslation: "¡Hola Mark!\n\n¡Feliz cumpleaños! Para tu celebración, te recomendaría un restaurante llamado La Terraza. Está en el casco antiguo, justo al lado de la plaza principal.\n\nSirven comida mediterránea increíble — pasta fresca, pescado a la parrilla y postres increíbles. Definitivamente deberías probar el risotto de mariscos; es lo mejor del menú. Las porciones son generosas y los precios son razonables.\n\nTe sugeriría ir alrededor de las 8 p.m. porque se llena bastante más tarde. Quizás quieras reservar una mesa con anticipación.\n\nEstoy seguro de que la pasarás genial. ¡No te decepcionará!\n\nDisfruta tu cumpleaños,\nJairo"
  },
  // ── MORE WRITING PART 2: Essays/Articles/Reviews ──
  {
    id: "W2-007", module: "writing", part: 2, difficulty: "B2", type: "text", topic: "Deporte",
    partLabel: "Tarea 2: Ensayo (100-160 palabras)",
    context: "Tu profesor te ha pedido que escribas un ensayo sobre el deporte en la educación.",
    prompt: "Your teacher has asked you to write an essay with this title:\n\n'Should physical education be compulsory in schools?'\n\nWrite 100-160 words.",
    minWords: 100,
    textType: "essay",
    structureGuide: "1. Introducción: presenta el debate\n2. Argumento a favor + ejemplo\n3. Argumento en contra o matiz\n4. Conclusión: tu opinión",
    usefulPhrases: ["It is widely believed that...", "Physical education plays a crucial role in...", "However, some students argue that...", "From my perspective,", "While it is true that...", "All things considered,"],
    grammarTips: ["Usa 'should' para obligación suave.", "Usa 'While it is true that..., ...' para concesiones B2.", "Usa sustantivos abstractos: 'discipline', 'teamwork', 'resilience'."],
    modelExample: "It is widely believed that physical education should be a compulsory part of the school curriculum, and I agree with this view.\n\nPhysical education plays a crucial role in promoting healthy habits from a young age. Regular exercise helps students maintain a healthy weight, reduces stress and improves concentration in other subjects. Furthermore, team sports teach valuable life skills such as teamwork, discipline and resilience.\n\nHowever, some students argue that PE should be optional because not everyone enjoys sport. While it is true that some students find it embarrassing or difficult, the health benefits are too important to ignore. Schools could offer a wider range of activities, including yoga or dance, to accommodate different interests.\n\nAll things considered, I believe PE should remain compulsory but with more variety to ensure every student can find something they enjoy.",
    modelTranslation: "Es ampliamente aceptado que la educación física debería ser obligatoria en el currículo escolar, y estoy de acuerdo con esta postura.\n\nLa educación física juega un papel crucial en promover hábitos saludables desde una edad temprana. El ejercicio regular ayuda a los estudiantes a mantener un peso saludable, reduce el estrés y mejora la concentración en otras materias. Además, los deportes de equipo enseñan habilidades valiosas como trabajo en equipo, disciplina y resiliencia.\n\nSin embargo, algunos estudiantes argumentan que la EF debería ser opcional porque no a todos les gusta el deporte. Si bien es cierto que algunos estudiantes lo encuentran vergonzoso o difícil, los beneficios para la salud son demasiado importantes para ignorarlos. Las escuelas podrían ofrecer una gama más amplia de actividades, incluyendo yoga o danza.\n\nEn resumen, creo que la EF debería seguir siendo obligatoria pero con más variedad."
  },
  {
    id: "W2-008", module: "writing", part: 2, difficulty: "B1", type: "text", topic: "Mascotas",
    partLabel: "Tarea 2: Artículo (100-160 palabras)",
    context: "Una revista estudiantil quiere artículos sobre tener mascotas.",
    prompt: "A student magazine wants articles about keeping pets.\n\nWrite an article about the advantages and disadvantages of having a pet. Include examples from your own experience if possible.\n\nWrite 100-160 words.",
    minWords: 100,
    textType: "article",
    structureGuide: "1. Título llamativo\n2. Introducción: ¿Tienes o has tenido mascota?\n3. Ventajas + ejemplo personal\n4. Desventajas + ejemplo\n5. Conclusión: recomendación",
    usefulPhrases: ["Is a Pet Right for You?", "Having a pet can be...", "One of the best things about...", "On the downside,", "From my own experience,", "Overall, I would say that..."],
    grammarTips: ["Usa Present Simple para verdades generales ('Dogs need...').", "Usa Past Simple para experiencias ('When I was younger, I had...').", "Usa conectores de contraste: 'However', 'On the other hand'."],
    modelExample: "Is a Pet Right for You?\n\nHaving a pet can be one of the most rewarding experiences, but it also comes with responsibilities.\n\nOne of the best things about having a pet is the companionship. From my own experience, my dog always greets me when I come home, and it immediately makes me feel happier. Pets can also teach children about responsibility, because you need to feed them and take them for walks regularly.\n\nOn the downside, pets can be expensive. Veterinary bills, food and accessories all add up. Another disadvantage is that you cannot travel easily because someone needs to look after your pet while you are away.\n\nOverall, I would say that the advantages outweigh the disadvantages. If you have the time and money, a pet can bring a lot of joy to your life.",
    modelTranslation: "¿Es una Mascota lo Adecuado para Ti?\n\nTener una mascota puede ser una de las experiencias más gratificantes, pero también conlleva responsabilidades.\n\nUno de los mejores aspectos de tener una mascota es la compañía. Desde mi propia experiencia, mi perro siempre me recibe cuando llego a casa, y eso inmediatamente me hace sentir más feliz. Las mascotas también pueden enseñar a los niños sobre responsabilidad.\n\nPor el lado negativo, las mascotas pueden ser costosas. Las facturas veterinarias, la comida y los accesorios se acumulan. Otra desventaja es que no puedes viajar fácilmente.\n\nEn general, diría que las ventajas superan las desventajas. Si tienes tiempo y dinero, una mascota puede traer mucha alegría a tu vida."
  },
  {
    id: "W2-009", module: "writing", part: 2, difficulty: "B2", type: "text", topic: "Transporte público",
    partLabel: "Tarea 2: Ensayo (100-160 palabras)",
    context: "Tu profesor quiere un ensayo sobre transporte urbano.",
    prompt: "Your teacher has asked you to write an essay with this title:\n\n'Should public transport be free for everyone?'\n\nWrite 100-160 words.",
    minWords: 100,
    textType: "essay",
    structureGuide: "1. Introducción: presenta el debate\n2. Argumento a favor + razonamiento\n3. Argumento en contra + razonamiento\n4. Tu opinión final",
    usefulPhrases: ["There is a growing debate about whether...", "Supporters of this idea argue that...", "Critics, however, point out that...", "While the idea is appealing,", "A possible compromise would be...", "In my view,"],
    grammarTips: ["Usa condicional tipo 2 para hipótesis: 'If transport were free, more people would...'.", "Usa passive voice para sonar más formal: 'It has been suggested that...'."],
    modelExample: "There is a growing debate about whether public transport should be free for everyone. While the idea is appealing, there are valid arguments on both sides.\n\nSupporters argue that free transport would reduce car use, leading to less pollution and fewer traffic jams. It would also help people on low incomes who spend a significant part of their salary on bus or train fares.\n\nCritics, however, point out that free transport would be extremely expensive for governments. The money would have to come from higher taxes, which not everyone would support. There are also concerns about overcrowding if everyone used public transport.\n\nIn my view, a possible compromise would be to make public transport free for students, pensioners and people on low incomes, while keeping reasonable fares for everyone else.",
    modelTranslation: "Existe un debate creciente sobre si el transporte público debería ser gratuito para todos. Si bien la idea es atractiva, hay argumentos válidos en ambos lados.\n\nLos defensores argumentan que el transporte gratuito reduciría el uso del coche, llevando a menos contaminación y atascos. También ayudaría a las personas con bajos ingresos.\n\nLos críticos, sin embargo, señalan que sería extremadamente costoso para los gobiernos. El dinero tendría que venir de impuestos más altos. También hay preocupaciones sobre la saturación.\n\nEn mi opinión, un posible compromiso sería hacer el transporte gratuito para estudiantes, pensionistas y personas con bajos ingresos, manteniendo tarifas razonables para los demás."
  },
  {
    id: "W2-010", module: "writing", part: 2, difficulty: "B1", type: "text", topic: "Festivales",
    partLabel: "Tarea 2: Reseña (100-160 palabras)",
    context: "Una revista online pide reseñas de festivales o eventos culturales.",
    prompt: "Write a review of a festival or cultural event you have attended. Include:\n- What the event was and where it took place.\n- What you enjoyed most.\n- Whether you would recommend it to others.\n\nWrite 100-160 words.",
    minWords: 100,
    textType: "review",
    structureGuide: "1. Introduce the event\n2. Describe what happened\n3. Highlight what you enjoyed\n4. Give your recommendation",
    usefulPhrases: ["I recently attended...", "The event took place in...", "What made it special was...", "The atmosphere was...", "I would definitely recommend it to...", "It is an experience you don't want to miss!"],
    grammarTips: ["Usa Past Simple para la experiencia ('I attended...', 'We watched...').", "Usa Present Simple para recomendaciones ('It is...', 'I recommend...')."],
    modelExample: "I recently attended the Inti Raymi festival in Cusco, Peru, and it was an unforgettable experience.\n\nThe event took place in the main square and at the ancient fortress of Sacsayhuamán. Hundreds of performers dressed in traditional Inca clothing re-enacted the Festival of the Sun, with music, dancing and ceremonies. The colours were absolutely stunning.\n\nWhat made it special was the energy of the crowd. Thousands of people from all over the world gathered to watch, and the atmosphere was electric. I also loved learning about Inca history and traditions in such a vivid way.\n\nI would definitely recommend it to anyone interested in culture and history. Just remember to book your accommodation early because the city gets very busy!\n\nIt is an experience you don't want to miss!",
    modelTranslation: "Recientemente asistí al festival del Inti Raymi en Cusco, Perú, y fue una experiencia inolvidable.\n\nEl evento tuvo lugar en la plaza principal y en la antigua fortaleza de Sacsayhuamán. Cientos de artistas vestidos con ropa tradicional inca recrearon el Festival del Sol, con música, danzas y ceremonias. Los colores eran absolutamente impresionantes.\n\nLo que lo hizo especial fue la energía de la multitud. Miles de personas de todo el mundo se reunieron para ver, y el ambiente era electrizante.\n\nDefinitivamente lo recomendaría a cualquiera interesado en cultura e historia. ¡Solo recuerda reservar tu alojamiento temprano porque la ciudad se llena mucho!"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING BANK — 40 questions across 4 parts
// ─────────────────────────────────────────────────────────────────────────────
export const speakingBank: BankQuestion[] = [
  // ── PART 1: Interview (Agrupadas por tema) ──
  // Originales
  { id: "SP1-001", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Rutina diaria", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you about your daily routine.",
    subQuestions: [
      { question: "What do you usually do in the morning?", modelExample: "I usually wake up early to check my Proxmox servers and start working as a programmer.", modelTranslation: "Suelo despertarme temprano para revisar mis servidores Proxmox y empezar a trabajar como programador." },
      { question: "How do you like to spend your evenings?", modelExample: "I like to spend my evenings working on programming projects or repairing laptops.", modelTranslation: "Me gusta pasar mis tardes trabajando en proyectos de programación o reparando computadoras portátiles." },
      { question: "Do you prefer having a busy day or a more relaxed one? Why?", modelExample: "I prefer a busy day because I feel more productive when I am solving technical problems.", modelTranslation: "Prefiero un día ocupado porque me siento más productivo cuando estoy resolviendo problemas técnicos." }
    ]
  },
  { id: "SP1-002", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Cine y Libros", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you about entertainment.",
    subQuestions: [
      { question: "What’s your favourite genre?", modelExample: "My favorite genre is science fiction because it is very creative.", modelTranslation: "Mi género favorito es la ciencia ficción porque es muy creativo." },
      { question: "Can you tell me about a book or film that made a strong impression on you?", modelExample: "I really like movies about artificial intelligence, as they are related to my field of work.", modelTranslation: "Me gustan mucho las películas sobre inteligencia artificial, ya que están relacionadas con mi campo de trabajo." },
      { question: "Do you prefer reading books or watching movies? Why?", modelExample: "I prefer watching movies because the visual format is more dynamic and entertaining for me.", modelTranslation: "Prefiero ver películas porque el formato visual es más dinámico y entretenido para mí." }
    ]
  },
  { id: "SP1-003", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Origen y ciudad", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you about where you are from.",
    subQuestions: [
      { question: "What’s your name?", modelExample: "My name is Jairo Ruiz.", modelTranslation: "Mi nombre es Jairo Ruiz." },
      { question: "Which country do you come from?", modelExample: "I come from Ecuador, and I live in Riobamba.", modelTranslation: "Vengo de Ecuador y vivo en Riobamba." },
      { question: "Tell me about where you live. What do you like or dislike about it?", modelExample: "I live in Riobamba. I like the calm atmosphere and the views of the volcano, but I dislike the cold weather.", modelTranslation: "Vivo en Riobamba. Me gusta el ambiente tranquilo y las vistas al volcán, pero no me gusta el clima frío." }
    ]
  },
  { id: "SP1-004", module: "speaking", part: 1, difficulty: "B2", type: "voice", topic: "Tecnología y Redes", partLabel: "Parte 1: Entrevista", timeSeconds: 25, prompt: "I'm going to ask you about technology.",
    subQuestions: [
      { question: "How has technology changed the way people spend their free time compared to 20 years ago?", modelExample: "Technology has changed things significantly; now people spend most of their free time scrolling on social media instead of playing outside.", modelTranslation: "La tecnología ha cambiado las cosas significativamente; ahora la gente pasa la mayor parte de su tiempo libre navegando en redes sociales en lugar de jugar al aire libre." },
      { question: "How do you use social media in your daily life? Do you think it has more positive or negative effects?", modelExample: "I use social media to read tech news. I think it has positive effects if used for learning, but it can be a distraction.", modelTranslation: "Uso las redes sociales para leer noticias de tecnología. Creo que tiene efectos positivos si se usa para aprender, pero puede ser una distracción." },
      { question: "What kind of job would be ideal for you and why? What skills would you need?", modelExample: "My ideal job is being a senior software engineer because I love creating apps. I would need advanced programming and problem-solving skills.", modelTranslation: "Mi trabajo ideal es ser un ingeniero de software senior porque me encanta crear aplicaciones. Necesitaría habilidades avanzadas de programación y resolución de problemas." }
    ]
  },

  // Nuevas (NotebookLM / OTE)
  { id: "SP1-005", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Learning languages", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about learning languages.",
    subQuestions: [
      { question: "Can you describe an English lesson that you really enjoyed?", grammarTip: "Usa el 'Past Simple' (ej. 'I really enjoyed when we played...').", modelExample: "I really enjoyed an English lesson where we played a vocabulary game. It was fun and interactive.", modelTranslation: "Realmente disfruté una clase de inglés donde jugamos un juego de vocabulario. Fue divertido e interactivo." },
      { question: "Tell me what you do to practise English outside the classroom.", modelExample: "I watch movies in English and listen to podcasts when I am driving.", modelTranslation: "Veo películas en inglés y escucho podcasts cuando estoy conduciendo." },
      { question: "What other languages apart from English would you like to learn?", modelExample: "I would like to learn Japanese because I am interested in their culture and technology.", modelTranslation: "Me gustaría aprender japonés porque me interesa su cultura y su tecnología." }
    ]
  },
  { id: "SP1-006", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Travel", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about travel.",
    subQuestions: [
      { question: "Can you describe a journey you make regularly?", modelExample: "I regularly travel from Riobamba to Quito for work. The journey takes about three hours by bus.", modelTranslation: "Viajo regularmente de Riobamba a Quito por trabajo. El viaje dura unas tres horas en autobús." },
      { question: "Have you ever travelled to other countries?", grammarTip: "Responde usando 'Present Perfect' (ej. 'Yes, I have travelled to...').", modelExample: "No, I haven't travelled to other countries yet, but I would love to visit the United States.", modelTranslation: "No, aún no he viajado a otros países, pero me encantaría visitar los Estados Unidos." },
      { question: "Tell me about a place you would like to visit.", modelExample: "I would like to visit Silicon Valley in California because it is the center of the tech industry.", modelTranslation: "Me gustaría visitar Silicon Valley en California porque es el centro de la industria tecnológica." }
    ]
  },
  { id: "SP1-007", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Reading", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about reading.",
    subQuestions: [
      { question: "Can you describe something you have read that you really enjoyed?", modelExample: "I recently read a book about artificial intelligence algorithms. It was very interesting and helpful for my job.", modelTranslation: "Recientemente leí un libro sobre algoritmos de inteligencia artificial. Fue muy interesante y útil para mi trabajo." },
      { question: "Do you prefer reading e-books or reading real books?", modelExample: "I prefer reading real books because it feels more relaxing for my eyes after working on a screen all day.", modelTranslation: "Prefiero leer libros físicos porque se siente más relajante para mis ojos después de trabajar frente a una pantalla todo el día." },
      { question: "What things can you do to improve your reading in English?", modelExample: "I can read tech articles and English news websites every morning to improve my vocabulary.", modelTranslation: "Puedo leer artículos de tecnología y sitios web de noticias en inglés cada mañana para mejorar mi vocabulario." }
    ]
  },
  { id: "SP1-008", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Holidays", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about holidays.",
    subQuestions: [
      { question: "What did you do on your last holiday?", modelExample: "On my last holiday, I stayed at home and spent time organizing my computer lab.", modelTranslation: "En mis últimas vacaciones, me quedé en casa y pasé el tiempo organizando mi laboratorio de computadoras." },
      { question: "Which would you prefer: one long holiday each year or a lot of short holidays?", modelExample: "I would prefer a lot of short holidays because they give me frequent breaks to rest and recharge.", modelTranslation: "Preferiría muchas vacaciones cortas porque me dan descansos frecuentes para descansar y recargar energías." },
      { question: "Where would you like to go on holiday in the future?", modelExample: "I would like to go to a quiet beach to disconnect completely from technology for a few days.", modelTranslation: "Me gustaría ir a una playa tranquila para desconectarme completamente de la tecnología por unos días." }
    ]
  },
  { id: "SP1-009", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Friends", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about your friends.",
    subQuestions: [
      { question: "What do you like doing with your friends?", modelExample: "I like hanging out with my friends at a coffee shop to talk and relax.", modelTranslation: "Me gusta salir con mis amigos a una cafetería para hablar y relajarme." },
      { question: "Tell me how you met your best friend.", grammarTip: "Usa conectores secuenciales como 'first', 'then', 'after that' en pasado.", modelExample: "I met my best friend at university. First, we had a group project together, and then we realized we shared many interests.", modelTranslation: "Conocí a mi mejor amigo en la universidad. Primero, tuvimos un proyecto de grupo juntos, y luego nos dimos cuenta de que compartíamos muchos intereses." },
      { question: "When do you prefer to be with friends, and when do you prefer to be with your family?", modelExample: "I prefer to be with friends on Friday nights, and I prefer to be with my family on Sunday afternoons.", modelTranslation: "Prefiero estar con amigos los viernes por la noche, y prefiero estar con mi familia los domingos por la tarde." }
    ]
  },
  { id: "SP1-010", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Family", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about your family.",
    subQuestions: [
      { question: "Do you have a big family, or do you have a small family?", modelExample: "I have a small family. It is just my parents, my sister, and me.", modelTranslation: "Tengo una familia pequeña. Solo somos mis padres, mi hermana y yo." },
      { question: "Tell me about what your family did last weekend.", modelExample: "Last weekend, my family and I had a special lunch together and then we watched a movie.", modelTranslation: "El fin de semana pasado, mi familia y yo tuvimos un almuerzo especial juntos y luego vimos una película." },
      { question: "Do you spend more time with family or with friends?", modelExample: "I spend more time with my family because we live in the same city and see each other frequently.", modelTranslation: "Paso más tiempo con mi familia porque vivimos en la misma ciudad y nos vemos con frecuencia." }
    ]
  },
  { id: "SP1-011", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Sport", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about sport.",
    subQuestions: [
      { question: "Do you prefer to watch sport, or do you prefer to play sport?", modelExample: "I prefer to play sport because it keeps me healthy and active.", modelTranslation: "Prefiero hacer deporte porque me mantiene sano y activo." },
      { question: "Tell me about the last time you did some sport.", modelExample: "The last time I did sport was yesterday evening when I went running in the park for 30 minutes.", modelTranslation: "La última vez que hice deporte fue ayer por la tarde cuando salí a correr al parque por 30 minutos." },
      { question: "What sports are popular in your country?", modelExample: "Football is definitely the most popular sport in my country. Everyone loves watching and playing it.", modelTranslation: "El fútbol es definitivamente el deporte más popular en mi país. A todos les encanta verlo y jugarlo." }
    ]
  },
  { id: "SP1-012", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Festivals and celebrations", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about festivals.",
    subQuestions: [
      { question: "How do people celebrate birthdays in your country?", modelExample: "In my country, people usually have a party with family and friends, eat a cake, and give presents.", modelTranslation: "En mi país, la gente suele hacer una fiesta con familiares y amigos, comer un pastel y dar regalos." },
      { question: "Can you describe a present someone gave you that you really liked?", modelExample: "My parents gave me a mechanical keyboard for my birthday, and I really liked it because it is great for programming.", modelTranslation: "Mis padres me regalaron un teclado mecánico por mi cumpleaños, y me gustó mucho porque es genial para programar." },
      { question: "Tell me about an important national holiday in your country.", modelExample: "Independence Day is very important. There are parades in the streets and families gather to celebrate.", modelTranslation: "El Día de la Independencia es muy importante. Hay desfiles en las calles y las familias se reúnen para celebrar." }
    ]
  },
  { id: "SP1-013", module: "speaking", part: 1, difficulty: "B1", type: "voice", topic: "Free time", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about your free time.",
    subQuestions: [
      { question: "Do you prefer to spend your free time alone, or do you prefer to spend your free time with other people?", modelExample: "I prefer to spend my free time alone so I can focus on my personal projects and relax in silence.", modelTranslation: "Prefiero pasar mi tiempo libre solo para poder concentrarme en mis proyectos personales y relajarme en silencio." },
      { question: "Do you think you have enough free time?", modelExample: "No, I don't think I have enough free time because my job as a programmer keeps me busy all day.", modelTranslation: "No, no creo que tenga suficiente tiempo libre porque mi trabajo como programador me mantiene ocupado todo el día." },
      { question: "What did you do last weekend?", modelExample: "Last weekend, I stayed home, repaired a couple of laptops, and rested.", modelTranslation: "El fin de semana pasado, me quedé en casa, reparé un par de computadoras portátiles y descansé." }
    ]
  },
  { id: "SP1-014", module: "speaking", part: 1, difficulty: "B2", type: "voice", topic: "Hobbies and changes", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about hobbies.",
    subQuestions: [
      { question: "When was the last time you tried something new and exciting?", modelExample: "The last time I tried something new was last month when I learned a new programming framework. It was challenging but exciting.", modelTranslation: "La última vez que probé algo nuevo fue el mes pasado cuando aprendí un nuevo framework de programación. Fue un desafío pero emocionante." },
      { question: "How has the way we spend our free time changed in recent years?", modelExample: "Nowadays, people spend much more time looking at screens and smartphones than they did in the past.", modelTranslation: "Hoy en día, la gente pasa mucho más tiempo mirando pantallas y teléfonos inteligentes que en el pasado." },
      { question: "Where do you normally spend your spare time?", modelExample: "I normally spend my spare time at home, working on my computer or listening to music.", modelTranslation: "Normalmente paso mi tiempo libre en casa, trabajando en mi computadora o escuchando música." }
    ]
  },
  { id: "SP1-015", module: "speaking", part: 1, difficulty: "B2", type: "voice", topic: "Education", partLabel: "Parte 1: Entrevista", timeSeconds: 20, prompt: "I'm going to ask you some questions about education.",
    subQuestions: [
      { question: "Have you got a university degree? If not, why not?", modelExample: "Yes, I have a degree in Systems Engineering from my local university.", modelTranslation: "Sí, tengo un título en Ingeniería de Sistemas de mi universidad local." },
      { question: "Do you enjoy learning languages or do you prefer other topics?", modelExample: "I enjoy learning technology topics more, but I recognize that English is very important for my career.", modelTranslation: "Disfruto más aprendiendo temas de tecnología, pero reconozco que el inglés es muy importante para mi carrera." },
      { question: "What is the best way to learn something new?", modelExample: "In my opinion, the best way to learn is by practicing and doing hands-on projects rather than just reading.", modelTranslation: "En mi opinión, la mejor manera de aprender es practicando y haciendo proyectos prácticos en lugar de solo leer." }
    ]
  },

  // ── PART 2: Voicemails ──
  { id: "SP2-001", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Planes (BBQ)", partLabel: "Parte 2: Mensaje de voz (40 seg)", timeSeconds: 40,
    context: " Tu amigo Dan te dejó este mensaje:",
    prompt: '"Hey! I\'m planning a barbecue next Saturday evening. I\'d love you to come! Can you make it? What time works for you? And can you bring something to eat or drink?"\n\nDeja tu respuesta de voz respondiendo los 3 puntos.',
    modelExample: "Hi Dan! Thank you very much for the invitation to your barbecue, I would love to go. What can I bring? I can bring some drinks or a dessert if you want. Let me know what time works best for me to arrive. See you soon!", modelTranslation: "¡Hola Dan! Muchas gracias por la invitación a tu parrillada, me encantaría ir. ¿Qué puedo llevar? Puedo llevar algunas bebidas o un postre si quieres. Dime a qué hora te viene mejor que llegue. ¡Nos vemos pronto!" },
  { id: "SP2-002", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Taller (Dieta)", partLabel: "Parte 2: Mensaje de voz (40 seg)", timeSeconds: 40,
    context: " Llama al organizador de un taller al que vas a asistir:",
    prompt: "Leave a message for the workshop organizer. In your message:\n• Introduce yourself and say you are attending the workshop this weekend.\n• Explain that you have a special dietary requirement (e.g. vegetarian).\n• Ask if it is possible to provide a suitable meal for you.",
    modelExample: "Hello, my name is Jairo Ruiz. I am attending the workshop this weekend. I just wanted to inform you that I am a vegetarian. Could you please check if it is possible to provide a vegetarian meal for me? Thank you very much.", modelTranslation: "Hola, mi nombre es Jairo Ruiz. Voy a asistir al taller de este fin de semana. Solo quería informarles que soy vegetariano. ¿Podrían comprobar si es posible proporcionarme una comida vegetariana? Muchas gracias." },
  { id: "SP2-003", module: "speaking", part: 2, difficulty: "B2", type: "voice", topic: "Negocios (Oferta)", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Has recibido este mensaje de Evan Fleming:",
    prompt: '"Hi, this is Evan Fleming from ActiveBrand. We\'re looking for help to promote our new sports shoe range and increase orders. We\'d love to know if you\'d be interested in working with us and what your rates are."\n\nResponde con un tono profesional y haz al menos una pregunta de seguimiento.',
    modelExample: "Hello Mr. Fleming. Thank you for reaching out. I am definitely interested in working with ActiveBrand to promote your new sports shoe range. My rates depend on the scope of the project. Could you provide more details about the expected deliverables and timeline? Looking forward to hearing from you.", modelTranslation: "Hola Sr. Fleming. Gracias por contactarme. Definitivamente estoy interesado en trabajar con ActiveBrand para promover su nueva línea de zapatos deportivos. Mis tarifas dependen del alcance del proyecto. ¿Podría proporcionar más detalles sobre los entregables esperados y el cronograma? Espero sus noticias." },
  { id: "SP2-004", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Dentista", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Tienes una cita en el dentista pero no puedes ir.",
    prompt: "Leave a message for the dentist.\n• Explain who you are\n• Say why you cannot go to the appointment\n• Suggest a time for another appointment",
    grammarTip: "Al ser un mensaje formal, usa un saludo apropiado y modal verbs para sugerir (Could we schedule...).",
    modelExample: "Hello, this is Jairo Ruiz. I am calling because I have an appointment today at 3 PM, but unfortunately, I cannot go because of an unexpected work meeting. Could we schedule another appointment for next Tuesday morning? Thank you.", modelTranslation: "Hola, soy Jairo Ruiz. Llamo porque tengo una cita hoy a las 3 p.m., pero lamentablemente no puedo ir debido a una reunión de trabajo inesperada. ¿Podríamos programar otra cita para el próximo martes por la mañana? Gracias." },
  { id: "SP2-005", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Librería", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Dejaste tu mochila olvidada en la biblioteca.",
    prompt: "Leave a message for the library manager.\n• Explain who you are\n• Describe your bag and what’s in it\n• Say what you would like the manager to do",
    modelExample: "Hello, my name is Jairo Ruiz. I was studying at the library earlier and I left my backpack there. It is a black backpack and it has my laptop and some notebooks inside. Could you please keep it safe for me? I will go and pick it up tomorrow morning. Thank you.", modelTranslation: "Hola, mi nombre es Jairo Ruiz. Estuve estudiando en la biblioteca hace un rato y dejé mi mochila allí. Es una mochila negra y tiene mi computadora portátil y algunos cuadernos dentro. ¿Podría guardármela, por favor? Iré a recogerla mañana por la mañana. Gracias." },
  { id: "SP2-006", module: "speaking", part: 2, difficulty: "B2", type: "voice", topic: "Club local", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Escuchaste en la radio sobre un club de limpieza del barrio.",
    prompt: "Leave a message for the club.\n• Explain why you want to join the club\n• Ask some questions about the club\n• Say how you could help",
    modelExample: "Hello, I am calling because I heard about your neighborhood cleaning club on the radio and I want to join because I care about the environment. What days do you usually meet? I could help by organizing volunteers and bringing cleaning supplies. Thank you.", modelTranslation: "Hola, llamo porque escuché sobre su club de limpieza del vecindario en la radio y quiero unirme porque me importa el medio ambiente. ¿Qué días suelen reunirse? Yo podría ayudar organizando voluntarios y trayendo artículos de limpieza. Gracias." },
  { id: "SP2-007", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Gimnasio", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Vas a invitar a un amigo al gimnasio.",
    prompt: "Leave a message for your friend.\n• Invite your friend to the gym and explain what you can do there (sauna, pool)\n• Suggest a time and place to meet\n• Say what they need to bring",
    modelExample: "Hey! I am going to the new gym this Saturday and I would love you to come with me. We can use the weights and then relax in the sauna and the pool! Let's meet at the main entrance at 10 AM. Make sure to bring your swimsuit and a towel. See you!", modelTranslation: "¡Hola! Voy a ir al nuevo gimnasio este sábado y me encantaría que vinieras conmigo. ¡Podemos usar las pesas y luego relajarnos en el sauna y la piscina! Veámonos en la entrada principal a las 10 a.m. Asegúrate de traer tu traje de baño y una toalla. ¡Nos vemos!" },
  { id: "SP2-008", module: "speaking", part: 2, difficulty: "B2", type: "voice", topic: "Curso de inglés", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Anya ha ganado un curso gratis pero coincide con las vacaciones familiares.",
    prompt: "Leave a message for your friend Anya.\n• Congratulate your friend\n• Ask some questions about the course\n• Say what you think your friend should do",
    modelExample: "Hi Anya! Congratulations on winning the free English course, that is amazing news! What level is the course, and how long does it last? Even though it happens during the family holiday, I think you should take the course because it is a great opportunity for your career. You can travel with your family another time. Let me know what you decide!", modelTranslation: "¡Hola Anya! Felicitaciones por ganar el curso de inglés gratis, ¡son noticias increíbles! ¿De qué nivel es el curso y cuánto dura? Aunque coincida con las vacaciones familiares, creo que deberías tomar el curso porque es una gran oportunidad para tu carrera. Puedes viajar con tu familia en otro momento. ¡Avisame qué decides!" },

  // ── PART 3: Monologue ──
  { id: "SP3-001", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Estudio", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Dos formas de estudiar:",
    prompt: "Compara estudiar a solas en una biblioteca silenciosa vs estudiar en grupo en una cafetería. ¿Cuáles son las ventajas y desventajas de cada una? ¿Cuál prefieres?",
    modelExample: "The first image shows a quiet library, which is great for concentration because there are no distractions. However, it can be boring. The second picture shows a group in a cafe. This is good for discussing ideas, but it might be too noisy to focus. I personally prefer studying alone in a library because I can finish my work faster.", modelTranslation: "La primera imagen muestra una biblioteca silenciosa, lo cual es excelente para la concentración porque no hay distracciones. Sin embargo, puede ser aburrido. La segunda imagen muestra a un grupo en una cafetería. Esto es bueno para discutir ideas, pero puede ser demasiado ruidoso para concentrarse. Personalmente, prefiero estudiar solo en una biblioteca porque puedo terminar mi trabajo más rápido.",
    images: ["https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"] },
  { id: "SP3-002", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Ropa/Moda", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Explica a tu clase cuándo es más apropiado llevar estos dos estilos de ropa.",
    prompt: "Escoge las 2 imágenes y compara las ventajas y desventajas de cada estilo de ropa (formal vs informal). ¿Cuándo es más apropiado llevar cada uno?",
    modelExample: "The formal style in the first image looks very professional, but it might be uncomfortable to wear all day. It is appropriate for a job interview or a wedding. The casual style in the second picture is much more comfortable and relaxed, but it is not suitable for formal events. It is perfect for hanging out with friends or studying.", modelTranslation: "El estilo formal de la primera imagen parece muy profesional, pero puede ser incómodo llevarlo todo el día. Es apropiado para una entrevista de trabajo o una boda. El estilo informal de la segunda foto es mucho más cómodo y relajado, pero no es adecuado para eventos formales. Es perfecto para salir con amigos o estudiar.",
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop"] },
  { id: "SP3-003", module: "speaking", part: 3, difficulty: "B2", type: "voice", topic: "Ice-breaker activities", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " El colegio busca actividades para estudiantes nuevos.",
    prompt: "Compara estas dos actividades (Country walk vs Restaurant meal). Indica las ventajas y desventajas de estas actividades para que los estudiantes se conozcan.",
    modelExample: "A country walk is a great way to talk while enjoying nature, and it reduces the pressure of making eye contact. However, bad weather could ruin the plan. A restaurant meal is a classic way to socialize because everyone loves food, but it might be expensive for students and hard to hear everyone. I think the walk is a better idea.", modelTranslation: "Un paseo por el campo es una excelente manera de hablar mientras se disfruta de la naturaleza, y reduce la presión del contacto visual. Sin embargo, el mal tiempo podría arruinar el plan. Una comida en un restaurante es una forma clásica de socializar porque a todos les gusta la comida, pero puede ser costosa para los estudiantes y difícil escuchar a todos. Creo que el paseo es una mejor idea.",
    images: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"] },
  { id: "SP3-004", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Places to live", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Tu clase debate dónde vive la gente.",
    prompt: "Compara vivir en un apartamento céntrico vs vivir en una casa en el campo (Cottage). ¿Cuáles son las ventajas y desventajas de vivir en esos lugares?",
    modelExample: "Living in a city apartment means you are close to shops and your workplace, but it can be noisy and small. Living in a cottage in the countryside offers peace, quiet, and fresh air, but you might need a car to get anywhere. I prefer the city because I like convenience and technology.", modelTranslation: "Vivir en un apartamento en la ciudad significa que estás cerca de las tiendas y de tu lugar de trabajo, pero puede ser ruidoso y pequeño. Vivir en una casa en el campo ofrece paz, tranquilidad y aire fresco, pero es posible que necesites un automóvil para llegar a cualquier parte. Prefiero la ciudad porque me gusta la comodidad y la tecnología.",
    images: ["https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop"] },
  { id: "SP3-005", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Remembering a teacher", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Un profesor favorito se va de la escuela y quieren hacer algo para recordarlo.",
    prompt: "Escoge 2 de estas actividades y compara las ventajas y desventajas de cada una para recordar al profesor.",
    modelExample: "We could organize a goodbye party or give him a personalized gift. A party is fun and everyone can participate, but it takes a lot of time to organize. A personalized gift, like a photo album, is something he can keep forever to remember us, but it doesn't allow everyone to say goodbye in person. I think a small party with the gift is best.", modelTranslation: "Podríamos organizar una fiesta de despedida o darle un regalo personalizado. Una fiesta es divertida y todos pueden participar, pero lleva mucho tiempo organizarla. Un regalo personalizado, como un álbum de fotos, es algo que él puede guardar para siempre para recordarnos, pero no permite que todos se despidan en persona. Creo que una pequeña fiesta con el regalo es lo mejor.",
    images: ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop"] },
  { id: "SP3-006", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Hobbies", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Dos formas de relajarse:",
    prompt: "Imagen A: Persona leyendo un libro tranquilamente junto a un río.\nImagen B: Persona corriendo por un parque con su perro.\n\nCompara estas dos formas de relajarse. ¿Qué beneficios tiene cada una? ¿Cuál prefieres tú?",
    modelExample: "Reading by the river is extremely relaxing for the mind, but it doesn't provide physical exercise. On the other hand, running in the park with a dog is great for cardiovascular health and energy, but it might be exhausting after a long day of work. I prefer reading by the river because I need mental rest.", modelTranslation: "Leer junto al río es extremadamente relajante para la mente, pero no proporciona ejercicio físico. Por otro lado, correr en el parque con un perro es genial para la salud cardiovascular y la energía, pero puede ser agotador después de un largo día de trabajo. Prefiero leer junto al río porque necesito descanso mental.",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=400&fit=crop"] },
  { id: "SP3-007", module: "speaking", part: 3, difficulty: "B2", type: "voice", topic: "Trabajo", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Dos entornos de trabajo:",
    prompt: "Imagen A: Una oficina de planta abierta con muchos empleados.\nImagen B: Una persona trabajando sola en una oficina privada y tranquila.\n\nCompara los dos entornos. ¿Cuáles son las ventajas e inconvenientes de cada uno para la productividad?",
    modelExample: "An open-plan office encourages teamwork and easy communication, but it can be very noisy and distracting, which reduces focus. A private office allows for deep concentration and privacy, but it can make you feel isolated from your colleagues. I prefer the private office because I need silence to write code.", modelTranslation: "Una oficina de planta abierta fomenta el trabajo en equipo y la comunicación fácil, pero puede ser muy ruidosa y distraer, lo que reduce la concentración. Una oficina privada permite una concentración profunda y privacidad, pero puede hacerte sentir aislado de tus colegas. Prefiero la oficina privada porque necesito silencio para escribir código.",
    images: ["https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=400&fit=crop"] },

  // ── PART 4: Follow-up questions ──
  { id: "SP4-001", module: "speaking", part: 4, difficulty: "B1", type: "voice", topic: "Fashion", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about fashion styles.",
    subQuestions: [
      { question: "Tell me how much money you usually spend on clothes a year.", modelExample: "I don't spend much, maybe around $200 a year, because I only buy clothes when I really need them.", modelTranslation: "No gasto mucho, tal vez alrededor de $200 al año, porque solo compro ropa cuando realmente la necesito." },
      { question: "Is the way you dress important?", grammarTip: "No uses solo 'yes' o 'no'. Empieza con 'To be honest...' o 'I believe so because...'.", modelExample: "I believe so because the way you dress affects how others perceive your professionalism.", modelTranslation: "Creo que sí porque la forma en que te vistes afecta cómo los demás perciben tu profesionalismo." },
      { question: "What does the way you dress say about your personality?", modelExample: "My casual style says that I am a practical person who values comfort over trends.", modelTranslation: "Mi estilo informal dice que soy una persona práctica que valora la comodidad sobre las tendencias." },
      { question: "What items of clothing are worth spending a lot of money on?", modelExample: "I think good quality shoes and a warm winter coat are worth spending money on because they last for years.", modelTranslation: "Creo que vale la pena gastar dinero en zapatos de buena calidad y un abrigo cálido de invierno porque duran años." },
      { question: "Do you think that a model's job is difficult?", modelExample: "Yes, I think it is very difficult because they have to travel constantly and face a lot of pressure to look perfect.", modelTranslation: "Sí, creo que es muy difícil porque tienen que viajar constantemente y enfrentan mucha presión para lucir perfectos." },
      { question: "Would you like to work in a clothes shop?", modelExample: "No, I wouldn't like to work in a clothes shop because standing all day and dealing with difficult customers sounds exhausting.", modelTranslation: "No, no me gustaría trabajar en una tienda de ropa porque estar de pie todo el día y tratar con clientes difíciles suena agotador." }
    ]
  },
  { id: "SP4-002", module: "speaking", part: 4, difficulty: "B1", type: "voice", topic: "Environment", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about looking after the environment.",
    subQuestions: [
      { question: "Tell me about what people you know do to look after the environment.", modelExample: "My family always recycles plastic and paper, and my friends try to use bicycles instead of cars when possible.", modelTranslation: "Mi familia siempre recicla plástico y papel, y mis amigos intentan usar bicicletas en lugar de autos cuando es posible." },
      { question: "Why do you think some people don't care about looking after the environment?", modelExample: "I think some people don't care because they believe one person cannot make a difference.", modelTranslation: "Creo que a algunas personas no les importa porque creen que una sola persona no puede marcar la diferencia." },
      { question: "Some people say that tourism is always bad for the environment. Do you agree?", modelExample: "I don't completely agree. Mass tourism is bad, but eco-tourism can actually help protect natural parks.", modelTranslation: "No estoy completamente de acuerdo. El turismo masivo es malo, pero el ecoturismo puede ayudar a proteger los parques naturales." },
      { question: "In some cities, people have to pay money to drive their car into the city centre. Is this a good thing?", modelExample: "Yes, I think it is a great idea to reduce traffic pollution and encourage people to use public transport.", modelTranslation: "Sí, creo que es una gran idea para reducir la contaminación del tráfico y animar a la gente a usar el transporte público." },
      { question: "Some people think problems with the environment will get worse in the future. What do you think?", grammarTip: "Puedes usar frases como 'I am quite optimistic because...' o 'Unfortunately, it seems to me that...'.", modelExample: "Unfortunately, it seems to me that it will get worse before it gets better because global temperatures are still rising.", modelTranslation: "Desafortunadamente, me parece que empeorará antes de mejorar porque las temperaturas globales siguen aumentando." },
      { question: "If someone wanted to visit a beautiful place in the countryside in your country, what advice would you give?", modelExample: "I would advise them to visit the Chimborazo volcano, but they should bring warm clothes because it is very cold.", modelTranslation: "Les aconsejaría que visitaran el volcán Chimborazo, pero deben llevar ropa abrigada porque hace mucho frío." }
    ]
  },
  { id: "SP4-003", module: "speaking", part: 4, difficulty: "B2", type: "voice", topic: "Remembering Events", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about remembering an important event.",
    subQuestions: [
      { question: "What events are important to remember?", modelExample: "I think family birthdays and national historical events are the most important things to remember.", modelTranslation: "Creo que los cumpleaños familiares y los eventos históricos nacionales son las cosas más importantes para recordar." },
      { question: "What is one of your earliest memories?", modelExample: "One of my earliest memories is playing with my first computer when I was about five years old.", modelTranslation: "Uno de mis primeros recuerdos es jugar con mi primera computadora cuando tenía unos cinco años." },
      { question: "What do you do to help you remember things?", modelExample: "I usually write everything down in my phone's calendar and set alarms to remind me of important tasks.", modelTranslation: "Por lo general, anoto todo en el calendario de mi teléfono y configuro alarmas para recordarme tareas importantes." },
      { question: "Is it a good idea to keep a diary about your everyday life?", modelExample: "Yes, keeping a diary is an excellent way to reflect on your life and remember small details that you would otherwise forget.", modelTranslation: "Sí, llevar un diario es una excelente manera de reflexionar sobre tu vida y recordar pequeños detalles que de otro modo olvidarías." },
      { question: "A lot of people put their photographs on social media. What do you think about this?", modelExample: "In my opinion, it is a great way to keep memories alive and share them, although it can have privacy risks.", modelTranslation: "En mi opinión, es una excelente manera de mantener vivos los recuerdos y compartirlos, aunque puede tener riesgos de privacidad." }
    ]
  },
  { id: "SP4-004", module: "speaking", part: 4, difficulty: "B1", type: "voice", topic: "Hobbies", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about hobbies.",
    subQuestions: [
      { question: "What is your favorite hobby?", modelExample: "My favorite hobby is programming because I love creating solutions and fixing hardware.", modelTranslation: "Mi pasatiempo favorito es la programación porque me encanta crear soluciones y arreglar hardware." },
      { question: "Are hobbies important for young people?", modelExample: "Yes, I think they are very important because they help young people learn new skills outside of school.", modelTranslation: "Sí, creo que son muy importantes porque ayudan a los jóvenes a aprender nuevas habilidades fuera de la escuela." },
      { question: "How do hobbies help people relax?", modelExample: "They help by distracting the mind from daily pressure, just like running at the park does for me.", modelTranslation: "Ayudan distrayendo la mente de la presión diaria, al igual que correr en el parque hace por mí." },
      { question: "Do you prefer doing your hobbies in groups or alone?", modelExample: "I prefer doing things alone, like coding or reading, because it helps me concentrate better.", modelTranslation: "Prefiero hacer cosas solo, como programar o leer, porque me ayuda a concentrarme mejor." },
      { question: "How would you recommend starting a new hobby?", modelExample: "A good way is to look for online tutorials or videos about topics that make you curious.", modelTranslation: "Una buena manera es buscar tutoriales o videos en línea sobre temas que te den curiosidad." },
      { question: "What new skill would you like to learn in the future?", modelExample: "I would like to learn more about advanced artificial intelligence to apply it to my own software projects.", modelTranslation: "Me gustaría aprender más sobre inteligencia artificial avanzada para aplicarla a mis propios proyectos de software." }
    ]
  }
,
  // ── NEW PART 2 ──
  { id: "SP2-009", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Sports Centre (Clima)", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Has reservado una fiesta en un centro deportivo local. Incluye juegos al aire libre, pero el pronóstico del clima ahora es malo.",
    prompt: "Leave a voicemail message for the sports centre manager. In your message, you should:\n• say who you are\n• explain why you are concerned\n• say what you want the manager to do.",
    modelExample: "Hello, my name is Jairo Ruiz. I booked a party at your sports centre for this weekend, but I saw that the weather forecast is predicting heavy rain. I am concerned that we won't be able to play the outdoor games. Could you please let me know if we can move the activities indoors? Thank you." },
  { id: "SP2-010", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Cookery Course", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Viste un anuncio para un curso de cocina de dos días y quieres reservar un lugar.",
    prompt: "Leave a voice message for the organizer of the course and:\n• explain who you are\n• say what experience you have had\n• ask about the availability of places on the course.",
    modelExample: "Hello, my name is Jairo Ruiz. I am calling because I saw the advertisement for your two-day cookery course and I am very interested. I have basic cooking experience at home, but I want to improve. Could you please tell me if there are still places available for this weekend? Thanks." },
  { id: "SP2-011", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Planes (Cine/Teatro)", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Tu amigo Chris te dejó este mensaje:",
    prompt: '"Hi, it\'s me, Chris. Listen, I was just ringing to see if you\'d like to do something tomorrow evening and maybe have a meal. There\'s a film at the cinema which finishes at 9 or there\'s a musical at the New Theatre which finishes at 10.30. What do you think?"\n\nLeave a voice message for your friend. In your message, you should:\n• thank Chris for the invitation\n• say what you would prefer to do and why\n• suggest a time and a place to meet.',
    modelExample: "Hi Chris! Thank you so much for the invitation. I would prefer to go to the cinema because the film finishes earlier and we can have a relaxed meal afterwards. Why don't we meet at 6:30 PM in front of the cinema? See you tomorrow!" },

  // ── NEW PART 3 ──
  { id: "SP3-008", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Viaje escolar", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Tu escuela está planeando un viaje escolar. Te piden ideas.",
    prompt: "Elige dos lugares (ej. Parque de diversiones vs. Edificios históricos). Compara las ventajas y desventajas de estos dos lugares para un viaje escolar.",
    images: ["https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop"],
    modelExample: "An amusement park is very fun and all the students will love it, but its educational value is limited. On the other hand, visiting historical buildings is highly educational and you can learn a lot about the past, but some students might find it a bit boring. I think the historical buildings are better for a school trip because we can learn together." },
  { id: "SP3-009", module: "speaking", part: 3, difficulty: "B2", type: "voice", topic: "Buena vida", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Estás dando una charla sobre las cosas importantes para una buena vida.",
    prompt: "Elige dos cosas (ej. Amigos vs. Dinero). Dile a tu clase por qué estas dos cosas son importantes para una buena vida.",
    images: ["https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop"],
    modelExample: "First of all, I think money is one of the keys to a good life. It gives you security and allows you to buy yourself an education. However, another important thing is friendship. A good friend will help you when you are in trouble and support you. While money can buy most things, it can't buy real friends." },

  // ── NEW PART 4 ──
  { id: "SP4-005", module: "speaking", part: 4, difficulty: "B2", type: "voice", topic: "Celebraciones", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about celebrations.",
    subQuestions: [
      { question: "Tell me about the last celebration you went to." },
      { question: "What is more important for a party: good food or good music?" },
      { question: "Some people think there are too many national holidays and it would be sensible to reduce the number of them. Do you agree?" },
      { question: "Some people say that it’s a waste of money to organize a big wedding. What do you think?" },
      { question: "If a family celebration and a friend’s party happen on the same day, which should you attend?" },
      { question: "The best way to celebrate is at home rather than going out somewhere. Do you agree?" }
    ]
  },
  { id: "SP4-006", module: "speaking", part: 4, difficulty: "B2", type: "voice", topic: "Tecnología y Sociedad", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about modern life.",
    subQuestions: [
      { question: "Some people think that social media is dangerous for children. What do you think?" },
      { question: "What would you recommend to someone who wants to spend less time on social media?" },
      { question: "Should parents control how long their children use the internet for each day?" },
      { question: "Artificial intelligence will be more of a benefit to society than a threat. What do you think?" },
      { question: "Which is better: working in an office or working from home?" }
    ]
  },
  { id: "SP2-B1-T1-1", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Clase de inglés (Problemas de transporte)", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Tienes una clase de inglés hoy con un profesor particular. Tienes problemas de transporte y no puedes llegar.",
    prompt: "Leave a voicemail message for your teacher. In your message, you should:\n• say who you are and when your lesson is\n• apologize and describe your transport problems\n• arrange another lesson.",
    modelExample: "Hello, my name is Jairo Ruiz. I have an English lesson with you today at 4 p.m., but unfortunately I cannot make it because my train has been cancelled due to technical problems and there are no buses. I would like to apologize for the short notice. Would it be possible to reschedule the lesson to Friday afternoon at the same time? Thank you." },
  { id: "SP2-B1-T1-2", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Bienvenida al college", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Tu amigo acaba de empezar en la misma escuela donde tú estudias y te dejó un mensaje.",
    prompt: "Leave a voicemail message for your friend. In your message, you should:\n• welcome your friend\n• give your friend some advice about clubs\n• suggest a time and place to meet.",
    modelExample: "Hi Sam! Welcome to the college, it is great to have you here. Regarding the clubs, I highly recommend joining the photography club because the members are very friendly and they organize weekend trips. Why don't we meet tomorrow at 1 p.m. in the main cafeteria to talk about it? See you there!" },
  { id: "SP3-B1-T1-ACTIVITIES", module: "speaking", part: 3, difficulty: "B1", type: "voice", topic: "Actividades para jóvenes", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Vas a dar una charla sobre diferentes actividades para jóvenes (Viajar vs Acampar).",
    prompt: "Choose two activities (Travelling abroad vs Camping) and tell your class what young people can learn from them.",
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop"],
    modelExample: "I am going to compare travelling abroad and camping. On the one hand, travelling abroad helps young people learn about new cultures, meet different people, and improve their language skills. On the other hand, camping teaches them practical survival skills, how to respect nature, and the importance of teamwork when putting up tents. In my opinion, travelling abroad teaches more valuable lessons for their future." },
  { id: "SP4-B1-T1-ACTIVITIES-FOLLOWUP", module: "speaking", part: 4, difficulty: "B1", type: "voice", topic: "Actividades y Hobbies", partLabel: "Parte 4: Follow-up questions", timeSeconds: 30, prompt: "Your talk was about young people's activities.",
    subQuestions: [
      { question: "What did you learn from your favourite childhood hobby?" },
      { question: "Some people complain that hobbies are very expensive. Do you agree?" },
      { question: "What are the advantages and disadvantages of being in a club – for example, a cycling club or a reading club?" },
      { question: "Who do you most like spending your free time with, and why?" },
      { question: "How do you feel about spending time on your own?" },
      { question: "Should schools organize more extracurricular activities for students?" }
    ]
  }
];

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
