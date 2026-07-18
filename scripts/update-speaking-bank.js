const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

const newSpeakingBank = `export const speakingBank: BankQuestion[] = [
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
    prompt: '"Hey! I\\'m planning a barbecue next Saturday evening. I\\'d love you to come! Can you make it? What time works for you? And can you bring something to eat or drink?"\\n\\nDeja tu respuesta de voz respondiendo los 3 puntos.',
    modelExample: "Hi Dan! Thank you very much for the invitation to your barbecue, I would love to go. What can I bring? I can bring some drinks or a dessert if you want. Let me know what time works best for me to arrive. See you soon!", modelTranslation: "¡Hola Dan! Muchas gracias por la invitación a tu parrillada, me encantaría ir. ¿Qué puedo llevar? Puedo llevar algunas bebidas o un postre si quieres. Dime a qué hora te viene mejor que llegue. ¡Nos vemos pronto!" },
  { id: "SP2-002", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Taller (Dieta)", partLabel: "Parte 2: Mensaje de voz (40 seg)", timeSeconds: 40,
    context: " Llama al organizador de un taller al que vas a asistir:",
    prompt: "Leave a message for the workshop organizer. In your message:\\n• Introduce yourself and say you are attending the workshop this weekend.\\n• Explain that you have a special dietary requirement (e.g. vegetarian).\\n• Ask if it is possible to provide a suitable meal for you.",
    modelExample: "Hello, my name is Jairo Ruiz. I am attending the workshop this weekend. I just wanted to inform you that I am a vegetarian. Could you please check if it is possible to provide a vegetarian meal for me? Thank you very much.", modelTranslation: "Hola, mi nombre es Jairo Ruiz. Voy a asistir al taller de este fin de semana. Solo quería informarles que soy vegetariano. ¿Podrían comprobar si es posible proporcionarme una comida vegetariana? Muchas gracias." },
  { id: "SP2-003", module: "speaking", part: 2, difficulty: "B2", type: "voice", topic: "Negocios (Oferta)", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Has recibido este mensaje de Evan Fleming:",
    prompt: '"Hi, this is Evan Fleming from ActiveBrand. We\\'re looking for help to promote our new sports shoe range and increase orders. We\\'d love to know if you\\'d be interested in working with us and what your rates are."\\n\\nResponde con un tono profesional y haz al menos una pregunta de seguimiento.',
    modelExample: "Hello Mr. Fleming. Thank you for reaching out. I am definitely interested in working with ActiveBrand to promote your new sports shoe range. My rates depend on the scope of the project. Could you provide more details about the expected deliverables and timeline? Looking forward to hearing from you.", modelTranslation: "Hola Sr. Fleming. Gracias por contactarme. Definitivamente estoy interesado en trabajar con ActiveBrand para promover su nueva línea de zapatos deportivos. Mis tarifas dependen del alcance del proyecto. ¿Podría proporcionar más detalles sobre los entregables esperados y el cronograma? Espero sus noticias." },
  { id: "SP2-004", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Dentista", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Tienes una cita en el dentista pero no puedes ir.",
    prompt: "Leave a message for the dentist.\\n• Explain who you are\\n• Say why you cannot go to the appointment\\n• Suggest a time for another appointment",
    grammarTip: "Al ser un mensaje formal, usa un saludo apropiado y modal verbs para sugerir (Could we schedule...).",
    modelExample: "Hello, this is Jairo Ruiz. I am calling because I have an appointment today at 3 PM, but unfortunately, I cannot go because of an unexpected work meeting. Could we schedule another appointment for next Tuesday morning? Thank you.", modelTranslation: "Hola, soy Jairo Ruiz. Llamo porque tengo una cita hoy a las 3 p.m., pero lamentablemente no puedo ir debido a una reunión de trabajo inesperada. ¿Podríamos programar otra cita para el próximo martes por la mañana? Gracias." },
  { id: "SP2-005", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Librería", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Dejaste tu mochila olvidada en la biblioteca.",
    prompt: "Leave a message for the library manager.\\n• Explain who you are\\n• Describe your bag and what’s in it\\n• Say what you would like the manager to do",
    modelExample: "Hello, my name is Jairo Ruiz. I was studying at the library earlier and I left my backpack there. It is a black backpack and it has my laptop and some notebooks inside. Could you please keep it safe for me? I will go and pick it up tomorrow morning. Thank you.", modelTranslation: "Hola, mi nombre es Jairo Ruiz. Estuve estudiando en la biblioteca hace un rato y dejé mi mochila allí. Es una mochila negra y tiene mi computadora portátil y algunos cuadernos dentro. ¿Podría guardármela, por favor? Iré a recogerla mañana por la mañana. Gracias." },
  { id: "SP2-006", module: "speaking", part: 2, difficulty: "B2", type: "voice", topic: "Club local", partLabel: "Parte 2: Mensaje formal (40 seg)", timeSeconds: 40,
    context: " Escuchaste en la radio sobre un club de limpieza del barrio.",
    prompt: "Leave a message for the club.\\n• Explain why you want to join the club\\n• Ask some questions about the club\\n• Say how you could help",
    modelExample: "Hello, I am calling because I heard about your neighborhood cleaning club on the radio and I want to join because I care about the environment. What days do you usually meet? I could help by organizing volunteers and bringing cleaning supplies. Thank you.", modelTranslation: "Hola, llamo porque escuché sobre su club de limpieza del vecindario en la radio y quiero unirme porque me importa el medio ambiente. ¿Qué días suelen reunirse? Yo podría ayudar organizando voluntarios y trayendo artículos de limpieza. Gracias." },
  { id: "SP2-007", module: "speaking", part: 2, difficulty: "B1", type: "voice", topic: "Gimnasio", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Vas a invitar a un amigo al gimnasio.",
    prompt: "Leave a message for your friend.\\n• Invite your friend to the gym and explain what you can do there (sauna, pool)\\n• Suggest a time and place to meet\\n• Say what they need to bring",
    modelExample: "Hey! I am going to the new gym this Saturday and I would love you to come with me. We can use the weights and then relax in the sauna and the pool! Let's meet at the main entrance at 10 AM. Make sure to bring your swimsuit and a towel. See you!", modelTranslation: "¡Hola! Voy a ir al nuevo gimnasio este sábado y me encantaría que vinieras conmigo. ¡Podemos usar las pesas y luego relajarnos en el sauna y la piscina! Veámonos en la entrada principal a las 10 a.m. Asegúrate de traer tu traje de baño y una toalla. ¡Nos vemos!" },
  { id: "SP2-008", module: "speaking", part: 2, difficulty: "B2", type: "voice", topic: "Curso de inglés", partLabel: "Parte 2: Mensaje informal (40 seg)", timeSeconds: 40,
    context: " Anya ha ganado un curso gratis pero coincide con las vacaciones familiares.",
    prompt: "Leave a message for your friend Anya.\\n• Congratulate your friend\\n• Ask some questions about the course\\n• Say what you think your friend should do",
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
    prompt: "Imagen A: Persona leyendo un libro tranquilamente junto a un río.\\nImagen B: Persona corriendo por un parque con su perro.\\n\\nCompara estas dos formas de relajarse. ¿Qué beneficios tiene cada una? ¿Cuál prefieres tú?",
    modelExample: "Reading by the river is extremely relaxing for the mind, but it doesn't provide physical exercise. On the other hand, running in the park with a dog is great for cardiovascular health and energy, but it might be exhausting after a long day of work. I prefer reading by the river because I need mental rest.", modelTranslation: "Leer junto al río es extremadamente relajante para la mente, pero no proporciona ejercicio físico. Por otro lado, correr en el parque con un perro es genial para la salud cardiovascular y la energía, pero puede ser agotador después de un largo día de trabajo. Prefiero leer junto al río porque necesito descanso mental.",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=400&fit=crop"] },
  { id: "SP3-007", module: "speaking", part: 3, difficulty: "B2", type: "voice", topic: "Trabajo", partLabel: "Parte 3: Monólogo comparativo (1 min)", timeSeconds: 60,
    context: " Dos entornos de trabajo:",
    prompt: "Imagen A: Una oficina de planta abierta con muchos empleados.\\nImagen B: Una persona trabajando sola en una oficina privada y tranquila.\\n\\nCompara los dos entornos. ¿Cuáles son las ventajas e inconvenientes de cada uno para la productividad?",
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
];`;

const startIndex = content.indexOf('export const speakingBank: BankQuestion[] = [');
const endIndex = content.indexOf('];\\n\\n// ─────────────────────────────────────────────────────────────────────────────\\n// RANDOM SELECTION ENGINE');

if (startIndex === -1) {
  console.error("Could not find speakingBank array bounds.");
  process.exit(1);
}

// Fallback search since line endings may vary
const searchStr1 = '];\n\n// ─────────────────────────────────────────────────────────────────────────────\n// RANDOM SELECTION ENGINE';
const searchStr2 = '];\r\n\r\n// ─────────────────────────────────────────────────────────────────────────────\r\n// RANDOM SELECTION ENGINE';

let actualEnd = content.indexOf(searchStr1);
if (actualEnd === -1) actualEnd = content.indexOf(searchStr2);

if (actualEnd !== -1) {
  const updatedContent = content.substring(0, startIndex) + newSpeakingBank + content.substring(actualEnd + 2);
  fs.writeFileSync(bankPath, updatedContent, 'utf8');
  console.log("Successfully restored and updated speakingBank in question-bank.ts with TRANSLATIONS");
} else {
  // Try regex for robust matching
  const match = content.match(/];\s*\/\/\s*─────────────────────────────────────────────────────────────────────────────\s*\/\/\s*RANDOM SELECTION ENGINE/);
  if (match) {
    const updatedContent = content.substring(0, startIndex) + newSpeakingBank + content.substring(match.index + 2);
    fs.writeFileSync(bankPath, updatedContent, 'utf8');
    console.log("Successfully restored via regex in question-bank.ts with TRANSLATIONS");
  } else {
    console.error("End bounds not found");
    process.exit(1);
  }
}
