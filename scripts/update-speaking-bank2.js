const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

// We will replace the speakingBank definition. To do this safely, we will extract it, parse it or just append the new ones using string manipulation.

const newSpeakingItems = `
  // ── NEW PART 2 ──
  { id: "SP2-009", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Sports Centre (Clima)", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Has reservado una fiesta en un centro deportivo local. Incluye juegos al aire libre, pero el pronóstico del clima ahora es malo.",
    prompt: "Leave a voicemail message for the sports centre manager. In your message, you should:\\n• say who you are\\n• explain why you are concerned\\n• say what you want the manager to do.",
    modelExample: "Hello, my name is Jairo Ruiz. I booked a party at your sports centre for this weekend, but I saw that the weather forecast is predicting heavy rain. I am concerned that we won't be able to play the outdoor games. Could you please let me know if we can move the activities indoors? Thank you." },
  { id: "SP2-010", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Cookery Course", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Viste un anuncio para un curso de cocina de dos días y quieres reservar un lugar.",
    prompt: "Leave a voice message for the organizer of the course and:\\n• explain who you are\\n• say what experience you have had\\n• ask about the availability of places on the course.",
    modelExample: "Hello, my name is Jairo Ruiz. I am calling because I saw the advertisement for your two-day cookery course and I am very interested. I have basic cooking experience at home, but I want to improve. Could you please tell me if there are still places available for this weekend? Thanks." },
  { id: "SP2-011", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Planes (Cine/Teatro)", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Tu amigo Chris te dejó este mensaje:",
    prompt: '"Hi, it\\'s me, Chris. Listen, I was just ringing to see if you\\'d like to do something tomorrow evening and maybe have a meal. There\\'s a film at the cinema which finishes at 9 or there\\'s a musical at the New Theatre which finishes at 10.30. What do you think?"\\n\\nLeave a voice message for your friend. In your message, you should:\\n• thank Chris for the invitation\\n• say what you would prefer to do and why\\n• suggest a time and a place to meet.',
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
    prompt: "Leave a voicemail message for your teacher. In your message, you should:\\n• say who you are and when your lesson is\\n• apologize and describe your transport problems\\n• arrange another lesson.",
    modelExample: "Hello, my name is Jairo Ruiz. I have an English lesson with you today at 4 p.m., but unfortunately I cannot make it because my train has been cancelled due to technical problems and there are no buses. I would like to apologize for the short notice. Would it be possible to reschedule the lesson to Friday afternoon at the same time? Thank you." },
  { id: "SP2-B1-T1-2", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Bienvenida al college", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Tu amigo acaba de empezar en la misma escuela donde tú estudias y te dejó un mensaje.",
    prompt: "Leave a voicemail message for your friend. In your message, you should:\\n• welcome your friend\\n• give your friend some advice about clubs\\n• suggest a time and place to meet.",
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
`;

const endIndex = content.indexOf('];\n\n// ─────────────────────────────────────────────────────────────────────────────\n// RANDOM SELECTION ENGINE');
if (endIndex !== -1) {
  const updatedContent = content.substring(0, endIndex) + ',' + newSpeakingItems + content.substring(endIndex);
  fs.writeFileSync(bankPath, updatedContent, 'utf8');
  console.log("Appended new Speaking items successfully.");
} else {
  // Fallback
  const match = content.match(/];\s*\/\/\s*─────────────────────────────────────────────────────────────────────────────\s*\/\/\s*RANDOM SELECTION ENGINE/);
  if (match) {
    const updatedContent = content.substring(0, match.index) + ',' + newSpeakingItems + content.substring(match.index);
    fs.writeFileSync(bankPath, updatedContent, 'utf8');
    console.log("Appended new Speaking items via regex successfully.");
  } else {
    console.log("Could not find the end of speakingBank.");
  }
}
