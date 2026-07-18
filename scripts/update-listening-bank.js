const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

const newListeningItems = `
  // ── PREGUNTAS OFICIALES OTE PDF ──
  {
    id: "L1-PDF-1", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Vacaciones (Alojamiento)", partLabel: "Parte 1: MCQ Corto",
    audioScript: "Woman: Any plans for half term?\\nMan: Well, we did think about camping in Cornwall, but it'd mean buying all the kit.\\nWoman: There's a cottage we stayed in last year... and it'd sleep five of you.\\nMan: It's just me and Jane this time.\\nWoman: Then just borrow our stuff. I thought you needed one of those big family tents. We'll be down there at the hotel on the cliff at Westernhead.\\nMan: That'd be brilliant, and we could all meet up.",
    prompt: "Two teachers are talking about their next holiday. Where will the man stay on his holiday?",
    options: ["In a tent", "In a hotel", "In a cottage"],
    correct: 0,
    listenForHint: "Escucha con atención qué decide usar el hombre al final: decide aceptar prestado el equipo de acampar de su colega ('borrow our stuff' -> 'tents')."
  },
  {
    id: "L1-PDF-2", module: "listening", part: 1, difficulty: "B1", type: "choice", topic: "Pérdida de tarjeta", partLabel: "Parte 1: MCQ Corto",
    audioScript: "Woman: I'm trying not to panic, but I think I've lost my bank card.\\nMan: You didn't leave it in the machine, did you?\\nWoman: I couldn't have because you don't get any cash unless you remove your card first, and I've still got some. Anyway, I distinctly remember putting it back in my wallet.\\nMan: Maybe you dropped it accidentally when you were shopping.\\nWoman: I don't think so.\\nMan: You must have. I paid for the coffees and critically, you didn't even take your coat off or get the wallet out.\\nWoman: No, I didn't, did I?",
    prompt: "A husband and wife are talking about a lost bank card. Where do they think it might be?",
    options: ["At the ATM", "At the café", "At the outdoor market"],
    correct: 1,
    listenForHint: "Escucha dónde pagaron los cafés y si la mujer llegó a sacar su cartera en ese lugar ('I paid for the coffees and you didn't even get your wallet out')."
  },
  {
    id: "L1-PDF-3", module: "listening", part: 1, difficulty: "B2", type: "choice", topic: "Viaje a Escocia", partLabel: "Parte 1: MCQ Corto",
    audioScript: "Woman: How do you think I should get to Scotland next week?\\nMan: I'd fly. It takes no time, though it is expensive.\\nWoman: You can say that again. It's way more than the train, which'd be nice, though even that's still a lot.\\nMan: Yeah, but with all these strikes, you never know if they'll be running. The safest thing would be to just drive.\\nWoman: That's what I was thinking until I remembered the parking nightmare at the other end. But it is cheap, I suppose... Oh, maybe I'll just take my chances and hope they've reached an agreement and everyone's back at work.",
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
    audioScript: "Man: Following complaints by viewers, we have investigated the fees that young drivers have to pay for car insurance... Surely it can’t be right that first-time drivers can pay more for one year’s insurance than the cost of their car.\\nWoman: To be honest, it’s all down to statistics. We know exactly how the risks vary according to age, and the costs reflect that, which is as it should be. Having said that, young women are now forced to pay the same premiums as men even though the figures show that women are safer drivers. That’s because men and women have to be treated equally by law.",
    prompt: "Who agrees with the statement: 'The way insurance companies set charges is unfair.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 1,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "El hombre dice directamente que no es justo ('Surely it can't be right'). La mujer defiende las tarifas basándose en estadísticas ('which is as it should be')."
  },
  {
    id: "L3-PDF-2", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Teletrabajo (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Woman: Changes to working patterns can take quite a bit of getting used to... That’s why returning to the office five days a week has proved surprisingly popular with people.\\nMan: Yes, like my brother, he couldn’t wait to get back. I think though, that people like him are an exception to the rule, and most people appreciate the flexibility that a less strict working pattern offers.",
    prompt: "Who agrees with the statement: 'Office staff prefer working from home some of the time.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 1,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "El hombre sostiene que la mayoría valora la flexibilidad del teletrabajo ('most people appreciate the flexibility'). La mujer dice que volver a la oficina 5 días es lo popular."
  },
  {
    id: "L3-PDF-3", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Turismo (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Woman: I was in the centre this morning. Everywhere I went, the streets were jammed with tourists. In the end, I had enough and came straight home without buying anything.\\nMan: I know what you mean. You can barely walk down the pavement for all the tour groups. Mind you, it’s good for the shops and brings in lots of money for the local economy, so I’m not going to complain about that.",
    prompt: "Who agrees with the statement: 'Tourism is damaging the town.'?",
    options: ["The woman", "The man", "Both speakers"],
    correct: 2,
    opinionFormat: true, speakerA: "Woman", speakerB: "Man",
    listenForHint: "Ambos coinciden en las molestias del turismo: la mujer regresó a casa frustrada ('jammed with tourists') y el hombre concuerda ('You can barely walk')."
  },
  {
    id: "L3-PDF-4", module: "listening", part: 3, difficulty: "B2", type: "choice", topic: "Arquitectura Moderna (Debate)", partLabel: "Parte 3: Diálogo (Man/Woman/Both)",
    audioScript: "Woman: I’m not sure that modern architecture is really delivering for society as a whole. Surely, we’ve had enough of these box-like buildings with their great slabs of concrete and huge windows. And actually, it’s not even accurate to call that sort of thing modern.\\nMan: Or even architecture, come to think of it. Nevertheless, I’d say that applies more to public architecture – libraries, office blocks and so on – than to individual projects, where I think the spirit of inventiveness and creativity is very much alive.",
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
    audioScript: "Man: There’s a good movie on at the cinema tonight.\\nWoman: Oh yes, the one about mysterious creatures. I saw the advert.\\nMan: No, that finished last week. It’s the one about the couple who visit the rainforest together and get lost.\\nWoman: Now I know the one you mean. They come across this village in the middle of nowhere and the local people are very unfriendly.\\nMan: Yes. But actually it’s just a big misunderstanding and they have ridiculous adventures getting to know each other. It’s meant to be hilarious.\\nWoman: Sounds perfect. I need something to cheer me up.",
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
    audioScript: "Woman: We haven’t talked about that show.\\nMan: The one with the singer and the footballer?\\nWoman: That’s right. It sounded weird, not really my cup of tea.\\nMan: Well, I was prepared to give it a go, but you’re absolutely right.\\nWoman: I guess it was popular. When a celebrity is involved, it’s impossible to get tickets and you’re packed in like sardines.\\nMan: Actually, there was no danger of that with this one. It was half empty.\\nWoman: Really? Well, you’ve probably got the reviews to thank for that.\\nMan: I wish I’d read them. I could have saved myself the time and money.",
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
`;

const startIndex = content.indexOf('export const listeningBank: BankQuestion[] = [');
if (startIndex === -1) {
  console.error("Could not find listeningBank array bounds.");
  process.exit(1);
}

const appendIndex = content.indexOf('];', startIndex);
if (appendIndex !== -1) {
  const updatedContent = content.substring(0, appendIndex) + ',' + newListeningItems + content.substring(appendIndex);
  fs.writeFileSync(bankPath, updatedContent, 'utf8');
  console.log("Successfully updated listeningBank in question-bank.ts");
} else {
  console.error("Could not find the end of listeningBank.");
  process.exit(1);
}
