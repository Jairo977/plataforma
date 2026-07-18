const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

const newWritingItems = `
  // ── MORE WRITING PART 1: Emails ──
  {
    id: "W1-007", module: "writing", part: 1, difficulty: "B1", type: "text", topic: "Agradecer hospitalidad",
    partLabel: "Tarea 1: Email informal (80-130 palabras)",
    context: "Acabas de volver de pasar un fin de semana en casa de tu amigo inglés Alex.",
    prompt: "Write a thank-you email to Alex. Include:\\n- Thank them for having you stay.\\n- Mention something you particularly enjoyed.\\n- Invite Alex to visit you.\\n\\nWrite 80-130 words.",
    minWords: 80,
    textType: "email_informal",
    structureGuide: "1. Saludo informal (Hi Alex!)\\n2. Agradecer por la hospitalidad\\n3. Mencionar algo específico que disfrutaste\\n4. Invitar a Alex a visitarte\\n5. Despedida informal",
    usefulPhrases: ["Hi Alex!", "I just wanted to say a huge thank you for...", "I had such a wonderful time!", "The thing I enjoyed most was...", "You are welcome to come and stay with me...", "It would be great to see you again!", "Take care,"],
    grammarTips: ["Usa Past Simple para describir lo que hiciste ('We visited...', 'I really enjoyed...').", "Usa 'would' para invitaciones educadas ('It would be lovely if you could visit...')."],
    modelExample: "Hi Alex!\\n\\nI just wanted to say a huge thank you for having me to stay last weekend. I had such a wonderful time!\\n\\nThe thing I enjoyed most was the barbecue on Saturday evening. The food was delicious and it was so nice to meet your family. I also loved our walk along the river — the views were beautiful.\\n\\nYou are welcome to come and stay with me any time. It would be great to show you around my city. We could visit the old town and try some local food. I think you would love it!\\n\\nTake care and see you soon,\\nJairo",
    modelTranslation: "¡Hola Alex!\\n\\nSolo quería darte las gracias por dejarme quedarme el fin de semana pasado. ¡La pasé increíble!\\n\\nLo que más disfruté fue la barbacoa del sábado por la noche. La comida estuvo deliciosa y fue genial conocer a tu familia. También me encantó nuestro paseo por el río — las vistas eran preciosas.\\n\\nEres bienvenido a quedarte conmigo cuando quieras. Me encantaría enseñarte mi ciudad. Podríamos visitar el casco antiguo y probar comida local. ¡Creo que te encantaría!\\n\\nCuídate y nos vemos pronto,\\nJairo"
  },
  {
    id: "W1-008", module: "writing", part: 1, difficulty: "B2", type: "text", topic: "Cancelar reserva",
    partLabel: "Tarea 1: Email formal (80-130 palabras)",
    context: "Reservaste una habitación de hotel pero necesitas cancelar por un cambio de planes.",
    prompt: "Write a formal email to the hotel manager to cancel your reservation. Include:\\n- Give your booking reference and dates.\\n- Explain the reason for cancellation.\\n- Ask about the cancellation policy and refund.\\n\\nWrite 80-130 words.",
    minWords: 80,
    textType: "email_formal",
    structureGuide: "1. Dear Sir/Madam\\n2. State your booking details\\n3. Explain the reason clearly\\n4. Ask about refund/policy\\n5. Formal close",
    usefulPhrases: ["Dear Sir/Madam,", "I am writing to inform you that I need to cancel...", "My booking reference is...", "Unfortunately, due to...", "I would be grateful if you could...", "Could you please confirm whether...", "I apologise for any inconvenience.", "Yours faithfully,"],
    grammarTips: ["Usa 'I am writing to inform you...' como apertura formal.", "Usa 'due to' seguido de un sustantivo para dar razones ('due to a family emergency')."],
    modelExample: "Dear Sir/Madam,\\n\\nI am writing to inform you that I need to cancel my hotel reservation. My booking reference is HB-4521, for two nights from the 15th to the 17th of August.\\n\\nUnfortunately, due to a family emergency, I am no longer able to travel on those dates. I apologise for any inconvenience this may cause.\\n\\nCould you please confirm whether a full refund is possible, or if there is a cancellation fee? I would be grateful if you could let me know as soon as possible.\\n\\nThank you for your understanding.\\n\\nYours faithfully,\\nJairo Mendez",
    modelTranslation: "Estimado/a señor/a:\\n\\nLe escribo para informarle que necesito cancelar mi reserva de hotel. Mi referencia de reserva es HB-4521, por dos noches del 15 al 17 de agosto.\\n\\nLamentablemente, debido a una emergencia familiar, ya no puedo viajar en esas fechas. Pido disculpas por cualquier inconveniente que esto pueda causar.\\n\\n¿Podría confirmarme si es posible un reembolso completo o si hay un cargo por cancelación? Le agradecería que me informara lo antes posible.\\n\\nGracias por su comprensión.\\n\\nAtentamente,\\nJairo Mendez"
  },
  {
    id: "W1-009", module: "writing", part: 1, difficulty: "B1", type: "text", topic: "Recomendar restaurante",
    partLabel: "Tarea 1: Email informal (80-130 palabras)",
    context: "Tu amigo Mark te ha pedido que le recomiendes un buen restaurante para celebrar su cumpleaños.",
    prompt: "Write an email to Mark. Include:\\n- Recommend a restaurant and say where it is.\\n- Describe what kind of food they serve and what you recommend ordering.\\n- Suggest what time to go.\\n\\nWrite 80-130 words.",
    minWords: 80,
    textType: "email_informal",
    structureGuide: "1. Saludo informal\\n2. Recomendar el restaurante + ubicación\\n3. Describir el tipo de comida + plato recomendado\\n4. Sugerir hora\\n5. Despedida",
    usefulPhrases: ["Hi Mark!", "I'd recommend...", "It's located in...", "They serve amazing...", "You should definitely try the...", "I'd suggest going around...", "You won't be disappointed!"],
    grammarTips: ["Usa 'I'd recommend' + -ing o sustantivo para sugerencias.", "Usa imperativo para recomendaciones directas ('Try the...', 'Ask for...')."],
    modelExample: "Hi Mark!\\n\\nHappy birthday! For your celebration, I'd recommend a restaurant called La Terraza. It's located in the old town, right next to the main square.\\n\\nThey serve amazing Mediterranean food — fresh pasta, grilled fish and incredible desserts. You should definitely try the seafood risotto; it's the best thing on the menu. The portions are generous and the prices are reasonable.\\n\\nI'd suggest going around 8 p.m. because it gets quite busy later in the evening. You might want to book a table in advance.\\n\\nI'm sure you'll have a great time. You won't be disappointed!\\n\\nEnjoy your birthday,\\nJairo",
    modelTranslation: "¡Hola Mark!\\n\\n¡Feliz cumpleaños! Para tu celebración, te recomendaría un restaurante llamado La Terraza. Está en el casco antiguo, justo al lado de la plaza principal.\\n\\nSirven comida mediterránea increíble — pasta fresca, pescado a la parrilla y postres increíbles. Definitivamente deberías probar el risotto de mariscos; es lo mejor del menú. Las porciones son generosas y los precios son razonables.\\n\\nTe sugeriría ir alrededor de las 8 p.m. porque se llena bastante más tarde. Quizás quieras reservar una mesa con anticipación.\\n\\nEstoy seguro de que la pasarás genial. ¡No te decepcionará!\\n\\nDisfruta tu cumpleaños,\\nJairo"
  },
  // ── MORE WRITING PART 2: Essays/Articles/Reviews ──
  {
    id: "W2-007", module: "writing", part: 2, difficulty: "B2", type: "text", topic: "Deporte",
    partLabel: "Tarea 2: Ensayo (100-160 palabras)",
    context: "Tu profesor te ha pedido que escribas un ensayo sobre el deporte en la educación.",
    prompt: "Your teacher has asked you to write an essay with this title:\\n\\n'Should physical education be compulsory in schools?'\\n\\nWrite 100-160 words.",
    minWords: 100,
    textType: "essay",
    structureGuide: "1. Introducción: presenta el debate\\n2. Argumento a favor + ejemplo\\n3. Argumento en contra o matiz\\n4. Conclusión: tu opinión",
    usefulPhrases: ["It is widely believed that...", "Physical education plays a crucial role in...", "However, some students argue that...", "From my perspective,", "While it is true that...", "All things considered,"],
    grammarTips: ["Usa 'should' para obligación suave.", "Usa 'While it is true that..., ...' para concesiones B2.", "Usa sustantivos abstractos: 'discipline', 'teamwork', 'resilience'."],
    modelExample: "It is widely believed that physical education should be a compulsory part of the school curriculum, and I agree with this view.\\n\\nPhysical education plays a crucial role in promoting healthy habits from a young age. Regular exercise helps students maintain a healthy weight, reduces stress and improves concentration in other subjects. Furthermore, team sports teach valuable life skills such as teamwork, discipline and resilience.\\n\\nHowever, some students argue that PE should be optional because not everyone enjoys sport. While it is true that some students find it embarrassing or difficult, the health benefits are too important to ignore. Schools could offer a wider range of activities, including yoga or dance, to accommodate different interests.\\n\\nAll things considered, I believe PE should remain compulsory but with more variety to ensure every student can find something they enjoy.",
    modelTranslation: "Es ampliamente aceptado que la educación física debería ser obligatoria en el currículo escolar, y estoy de acuerdo con esta postura.\\n\\nLa educación física juega un papel crucial en promover hábitos saludables desde una edad temprana. El ejercicio regular ayuda a los estudiantes a mantener un peso saludable, reduce el estrés y mejora la concentración en otras materias. Además, los deportes de equipo enseñan habilidades valiosas como trabajo en equipo, disciplina y resiliencia.\\n\\nSin embargo, algunos estudiantes argumentan que la EF debería ser opcional porque no a todos les gusta el deporte. Si bien es cierto que algunos estudiantes lo encuentran vergonzoso o difícil, los beneficios para la salud son demasiado importantes para ignorarlos. Las escuelas podrían ofrecer una gama más amplia de actividades, incluyendo yoga o danza.\\n\\nEn resumen, creo que la EF debería seguir siendo obligatoria pero con más variedad."
  },
  {
    id: "W2-008", module: "writing", part: 2, difficulty: "B1", type: "text", topic: "Mascotas",
    partLabel: "Tarea 2: Artículo (100-160 palabras)",
    context: "Una revista estudiantil quiere artículos sobre tener mascotas.",
    prompt: "A student magazine wants articles about keeping pets.\\n\\nWrite an article about the advantages and disadvantages of having a pet. Include examples from your own experience if possible.\\n\\nWrite 100-160 words.",
    minWords: 100,
    textType: "article",
    structureGuide: "1. Título llamativo\\n2. Introducción: ¿Tienes o has tenido mascota?\\n3. Ventajas + ejemplo personal\\n4. Desventajas + ejemplo\\n5. Conclusión: recomendación",
    usefulPhrases: ["Is a Pet Right for You?", "Having a pet can be...", "One of the best things about...", "On the downside,", "From my own experience,", "Overall, I would say that..."],
    grammarTips: ["Usa Present Simple para verdades generales ('Dogs need...').", "Usa Past Simple para experiencias ('When I was younger, I had...').", "Usa conectores de contraste: 'However', 'On the other hand'."],
    modelExample: "Is a Pet Right for You?\\n\\nHaving a pet can be one of the most rewarding experiences, but it also comes with responsibilities.\\n\\nOne of the best things about having a pet is the companionship. From my own experience, my dog always greets me when I come home, and it immediately makes me feel happier. Pets can also teach children about responsibility, because you need to feed them and take them for walks regularly.\\n\\nOn the downside, pets can be expensive. Veterinary bills, food and accessories all add up. Another disadvantage is that you cannot travel easily because someone needs to look after your pet while you are away.\\n\\nOverall, I would say that the advantages outweigh the disadvantages. If you have the time and money, a pet can bring a lot of joy to your life.",
    modelTranslation: "¿Es una Mascota lo Adecuado para Ti?\\n\\nTener una mascota puede ser una de las experiencias más gratificantes, pero también conlleva responsabilidades.\\n\\nUno de los mejores aspectos de tener una mascota es la compañía. Desde mi propia experiencia, mi perro siempre me recibe cuando llego a casa, y eso inmediatamente me hace sentir más feliz. Las mascotas también pueden enseñar a los niños sobre responsabilidad.\\n\\nPor el lado negativo, las mascotas pueden ser costosas. Las facturas veterinarias, la comida y los accesorios se acumulan. Otra desventaja es que no puedes viajar fácilmente.\\n\\nEn general, diría que las ventajas superan las desventajas. Si tienes tiempo y dinero, una mascota puede traer mucha alegría a tu vida."
  },
  {
    id: "W2-009", module: "writing", part: 2, difficulty: "B2", type: "text", topic: "Transporte público",
    partLabel: "Tarea 2: Ensayo (100-160 palabras)",
    context: "Tu profesor quiere un ensayo sobre transporte urbano.",
    prompt: "Your teacher has asked you to write an essay with this title:\\n\\n'Should public transport be free for everyone?'\\n\\nWrite 100-160 words.",
    minWords: 100,
    textType: "essay",
    structureGuide: "1. Introducción: presenta el debate\\n2. Argumento a favor + razonamiento\\n3. Argumento en contra + razonamiento\\n4. Tu opinión final",
    usefulPhrases: ["There is a growing debate about whether...", "Supporters of this idea argue that...", "Critics, however, point out that...", "While the idea is appealing,", "A possible compromise would be...", "In my view,"],
    grammarTips: ["Usa condicional tipo 2 para hipótesis: 'If transport were free, more people would...'.", "Usa passive voice para sonar más formal: 'It has been suggested that...'."],
    modelExample: "There is a growing debate about whether public transport should be free for everyone. While the idea is appealing, there are valid arguments on both sides.\\n\\nSupporters argue that free transport would reduce car use, leading to less pollution and fewer traffic jams. It would also help people on low incomes who spend a significant part of their salary on bus or train fares.\\n\\nCritics, however, point out that free transport would be extremely expensive for governments. The money would have to come from higher taxes, which not everyone would support. There are also concerns about overcrowding if everyone used public transport.\\n\\nIn my view, a possible compromise would be to make public transport free for students, pensioners and people on low incomes, while keeping reasonable fares for everyone else.",
    modelTranslation: "Existe un debate creciente sobre si el transporte público debería ser gratuito para todos. Si bien la idea es atractiva, hay argumentos válidos en ambos lados.\\n\\nLos defensores argumentan que el transporte gratuito reduciría el uso del coche, llevando a menos contaminación y atascos. También ayudaría a las personas con bajos ingresos.\\n\\nLos críticos, sin embargo, señalan que sería extremadamente costoso para los gobiernos. El dinero tendría que venir de impuestos más altos. También hay preocupaciones sobre la saturación.\\n\\nEn mi opinión, un posible compromiso sería hacer el transporte gratuito para estudiantes, pensionistas y personas con bajos ingresos, manteniendo tarifas razonables para los demás."
  },
  {
    id: "W2-010", module: "writing", part: 2, difficulty: "B1", type: "text", topic: "Festivales",
    partLabel: "Tarea 2: Reseña (100-160 palabras)",
    context: "Una revista online pide reseñas de festivales o eventos culturales.",
    prompt: "Write a review of a festival or cultural event you have attended. Include:\\n- What the event was and where it took place.\\n- What you enjoyed most.\\n- Whether you would recommend it to others.\\n\\nWrite 100-160 words.",
    minWords: 100,
    textType: "review",
    structureGuide: "1. Introduce the event\\n2. Describe what happened\\n3. Highlight what you enjoyed\\n4. Give your recommendation",
    usefulPhrases: ["I recently attended...", "The event took place in...", "What made it special was...", "The atmosphere was...", "I would definitely recommend it to...", "It is an experience you don't want to miss!"],
    grammarTips: ["Usa Past Simple para la experiencia ('I attended...', 'We watched...').", "Usa Present Simple para recomendaciones ('It is...', 'I recommend...')."],
    modelExample: "I recently attended the Inti Raymi festival in Cusco, Peru, and it was an unforgettable experience.\\n\\nThe event took place in the main square and at the ancient fortress of Sacsayhuamán. Hundreds of performers dressed in traditional Inca clothing re-enacted the Festival of the Sun, with music, dancing and ceremonies. The colours were absolutely stunning.\\n\\nWhat made it special was the energy of the crowd. Thousands of people from all over the world gathered to watch, and the atmosphere was electric. I also loved learning about Inca history and traditions in such a vivid way.\\n\\nI would definitely recommend it to anyone interested in culture and history. Just remember to book your accommodation early because the city gets very busy!\\n\\nIt is an experience you don't want to miss!",
    modelTranslation: "Recientemente asistí al festival del Inti Raymi en Cusco, Perú, y fue una experiencia inolvidable.\\n\\nEl evento tuvo lugar en la plaza principal y en la antigua fortaleza de Sacsayhuamán. Cientos de artistas vestidos con ropa tradicional inca recrearon el Festival del Sol, con música, danzas y ceremonias. Los colores eran absolutamente impresionantes.\\n\\nLo que lo hizo especial fue la energía de la multitud. Miles de personas de todo el mundo se reunieron para ver, y el ambiente era electrizante.\\n\\nDefinitivamente lo recomendaría a cualquiera interesado en cultura e historia. ¡Solo recuerda reservar tu alojamiento temprano porque la ciudad se llena mucho!"
  }
`;

// Append before end of writingBank
const startIdx = content.indexOf('export const writingBank: BankQuestion[] = [');
if (startIdx === -1) { console.error("writingBank not found"); process.exit(1); }

let depth = 0;
let endIdx = -1;
const arrayStart = content.indexOf('=', startIdx);
const searchStart = content.indexOf('[', arrayStart);
for (let i = searchStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  if (content[i] === ']') { depth--; if (depth === 0) { endIdx = i; break; } }
}

if (endIdx === -1) { console.error("Could not find end of writingBank"); process.exit(1); }

const updatedContent = content.substring(0, endIdx) + ',' + newWritingItems + content.substring(endIdx);
fs.writeFileSync(bankPath, updatedContent, 'utf8');
console.log("Successfully appended new Writing items.");
