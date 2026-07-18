const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

const newReadingBank = `export const readingBank: BankQuestion[] = [
  // ── PART 1: Short Texts (Multiple Choice) ──
  {
    id: "RD1-001", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Mensaje informal", partLabel: "Part 1: Short Text",
    context: "Read the email from Annie to Jack.",
    prompt: "Hi Jack\\nI’m stuck at work, so could you possibly drop round my house and check on Georgie? It should only take a couple of minutes – he can just keep wandering round outside as long as the gate’s shut. If he’s not happy to see you, treat him with a biscuit. Don’t worry about giving him anything else – I’ll sort that out when I get back. The back gate’s unlocked, by the way.\\nAnnie\\n\\nWhat favour does Annie want Jack to do?",
    options: ["give the dog some food", "take the dog for a walk", "check the dog is in the garden"],
    correct: 2,
    inferenceHint: "Look at the phrase 'check on Georgie' and 'keep wandering round outside'."
  },
  {
    id: "RD1-002", module: "reading", part: 1, difficulty: "B2", type: "choice", topic: "Aviso de disculpa", partLabel: "Part 1: Short Text",
    context: "Read Molly's message to Emma.",
    prompt: "Emma,\\nI've had time to think about what happened yesterday. I realize you were just trying to help when you made that suggestion about my project, even though I reacted badly. I completely understand why you did it, and we are absolutely fine now. Let's meet for coffee tomorrow.\\nMolly\\n\\nWhat was the purpose of Molly’s message?",
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
    gappedText: "In the Australian bush – the famously dry, rural part of the country – there are many talented horse riders to be found.\\n\\nIn the bush, there are certain occupations, such as farming, that keep workers stuck to their horses for the majority of daylight hours. In reality, they spend more time on horseback than off it. Indeed, tales have been told of one rider who actually wore out two horses in one working day. [1] In fact, his preferred way of going from place to place was on four legs instead of two.\\n\\nFor these farmers, horses are necessary for handling large groups of cows on the vast areas they manage. Moving their cows from one place to another is known as 'driving', and the workers, in turn, are known as 'drovers'. They even take part in a competitive sport involving cows, which demands outstanding command over the horse. This sport developed as a result of earlier drovers' battles against boredom. [2] The competitions are commonly known as 'drafts'.",
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
    prompt: "The idea that cinema is dying is nothing new; the death of cinema has been announced many times before, starting in the 1920s when sound was first added to film. There has been a real flood of such claims lately, however, and for an extraordinary number of reasons. In comparable cases, such as the predicted death of the novel, announcements of this kind seem to have led to nothing but renewed interest. Still, something is happening to excite these ideas and arguments, and it’s worth trying to find out what it is.\\n\\nIn a feature film, a detective is presented with a crime that traditional police methods have failed to solve, and through keen observation, extraordinary powers of perception and pure luck somehow ends up solving the mystery. In an online video, a teenager is filmed on a friend’s phone playing a trick on another friend, which goes badly wrong, to the sounds of wild laughter. Whatever the long-term future of the cinema may be, I believe the notion of film will survive in two senses. There is the dictionary definition of a film as ‘a representation of a story, drama, episode, event, etc.'. When people say they have been watching a film, this is what we understand they mean. The other sense is that of fragments or sequences, short or long, fictional or actual, of motion captured in the moment. These may or may not add up to a film in the traditional sense, but the requirement that they don’t have to is part of the freedom the social-media form provides.\\n\\nThe writer suggests that predictions made about the future of cinema...",
    options: ["are influenced by the publishing industry.", "are more serious than previous concerns.", "are easy to dismiss at the moment."],
    correct: 1,
    inferenceHint: "The text says there is a 'flood of such claims lately... for an extraordinary number of reasons', implying current concerns are greater/more serious than before."
  },
  {
    id: "RD4-002", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "The Future of Film", partLabel: "Part 4: Longer Text",
    context: "Read the article about the future of film.",
    prompt: "The idea that cinema is dying is nothing new... [Text continues]\\n\\nThe writer refers to the experience of the teenagers to illustrate...",
    options: ["a type of behaviour that she thinks is threatening conventional film-making.", "a way in which she thinks the idea of film-making is likely to continue.", "an aspect of film-making that she thinks will prove very influential."],
    correct: 1,
    inferenceHint: "She mentions the teenagers filming on a phone as 'fragments or sequences... of motion captured in the moment' which is one of the two senses in which film will survive."
  },
  {
    id: "RD1-B1-T1-1", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Estudiar vocabulario", partLabel: "Part 1: Short Text",
    context: "Read the email from Mr Stevens.",
    prompt: "FROM: Mr Stevens\\nSUBJECT: Learning English words\\n\\nLearning long lists of vocabulary isn’t a very good idea – I know you can learn maybe 200 words in a day, but you soon forget them. Some people learn by watching films regularly and that sounds a lot more fun.\\n\\nWhat does Mr Stevens say about vocabulary?",
    options: ["It is important to make learning an enjoyable experience.", "It is always difficult to remember new vocabulary.", "You should not try to learn too many words at once."],
    correct: 2,
    inferenceHint: "Mr. Stevens dice que aprender listas largas (200 palabras al día) no es buena idea porque se olvidan rápido. Por tanto, no debes intentar aprender demasiadas palabras a la vez."
  },
  {
    id: "RD1-B1-T1-2", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Mensaje sobre coche", partLabel: "Part 1: Short Text",
    context: "Read the text message from Tom to Jane.",
    prompt: "Hi Jane\\nI went to see that car your friend is selling – it was very kind of you to send me the info, I’m really grateful. It’s really good value, too, but I think I’ll keep looking for a five-door model.\\nTom\\n\\nWhy has Tom written this text message to Jane?",
    options: ["to thank Jane for trying to help him", "to explain what sort of cars he likes", "to suggest Jane buys a car he has seen"],
    correct: 0,
    inferenceHint: "Tom dice 'it was very kind of you ... I'm really grateful', lo cual expresa gratitud por la ayuda."
  },
  {
    id: "RD1-B1-T1-3", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Programa de cocina", partLabel: "Part 1: Short Text",
    context: "Read the email from Thomas.",
    prompt: "FROM: Thomas\\nSUBJECT: Help with cooking\\n\\nI watched that new programme you recommended – 30-minute Cook – and I’ll definitely try a few of those recipes. I can’t quite see why every cookery programme these days has to be a competition, but I suppose they think that’s what viewers want.\\n\\nWhat does Thomas think about the TV programme Jack recommended?",
    options: ["It was an exciting programme to watch.", "It is certain to be popular with audiences.", "It showed some interesting things to cook."],
    correct: 2,
    inferenceHint: "Dice: 'I'll definitely try a few of those recipes', lo que significa que el programa le mostró cosas interesantes para cocinar."
  },
  {
    id: "RD1-B1-T1-4", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Invitación a fiesta", partLabel: "Part 1: Short Text",
    context: "Read the email from Laura to Jan.",
    prompt: "FROM: Laura\\nSUBJECT: Your party\\n\\nHi Jan\\nThanks for the invite, only we can’t make it to the party on Friday as it’s my mum’s birthday. Still, that other weekend you mentioned would be fine and, as you say, it’ll be fun to see your new place.\\n\\nWhy is Laura writing to Jan?",
    options: ["to accept an invitation", "to suggest a new date to visit", "to apologize for cancelling"],
    correct: 2,
    inferenceHint: "Laura escribe para decir que no puede ir el viernes ('we can't make it to the party...'), lo cual equivale a disculparse por no poder asistir/cancelar."
  },
  {
    id: "RD1-B1-T1-5", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Nota a cliente", partLabel: "Part 1: Short Text",
    context: "Read the note to the customer.",
    prompt: "We hope you will be delighted with this 30 ml Sage and Sea Salt perfume. Please find enclosed a voucher for 20% off your next order, which will come with a free 5 ml bottle of Sensation. Offer ends in 30 days.\\n\\nThe note to the customer has information about...",
    options: ["what the benefits of accepting the offer are.", "how the customer should apply for a free gift.", "why it is important to place an order immediately."],
    correct: 0,
    inferenceHint: "La nota detalla los beneficios (20% de descuento y botella gratis de Sensation)."
  },
  {
    id: "RD1-B1-T1-6", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Club de lectura", partLabel: "Part 1: Short Text",
    context: "Read the text message from Annie.",
    prompt: "Hi everyone\\nJust a reminder about the time for next week’s book club – 8:30 at my place. And as we agreed at the last meeting, it would be great if everyone could actually read it this time. It would be nice to hear each other’s opinions rather than everyone’s excuses.\\nAnnie\\n\\nWhy is Annie writing to the members of her book club?",
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
    gappedText: "My parents left Cambodia in 1980 when I was just two years old and I’ve grown up feeling that I belong to both Australian and Cambodian cultures. [1] My brother and I love Australia too, and we were always encouraged to join in and enjoy the way of life here.\\n\\nMy first trip to Cambodia was when I was eight, and it was a big culture shock. It was so different to our life in Australia, where we weren’t rich but we didn’t need anything. [2] Nevertheless, they seemed really happy and spent a lot of time helping each other out. I have never forgotten that first trip – I left Cambodia with a heart full of love for the country and I promised that I would be back.\\n\\nAfter leaving university, I got a job with a small independent fashion designer and my boss was great to work for. [3] Looking back, I now realize how lucky I was – there aren’t many people who get such a good start.\\n\\nEven so, by the time I was 26, I felt the need to try something different and I thought about Cambodia again. [4] So that is what I did and I started working with families and small businesses that made clothes.\\n\\nI stayed a lot longer than I had planned – in the end it was more than two years, but it gave me the chance to meet some jewellers and designers, and they introduced me to their friends, who often invited me to their homes to show me their own artwork. [5] Before long, I was connected with a whole network of talented jewellers, sculptors and designers, and that is when I started my own business.\\n\\nI now have a dream job – designing beautiful products and working with the artists in Cambodia who make them. [6] This means the customer is connected to the maker. It also means that, in a small way, I am helping the people I work with in Cambodia, and I hope that we will continue to work together in this way for many more years.",
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
    prompt: "Charles Rennie Mackintosh (1868–1928)...\\n\\nWhat was the writer’s reaction to seeing the Glasgow School of Art?",
    options: ["He wanted to learn more about the building’s architect.", "He started to feel differently about buildings.", "He was surprised he had not noticed the building before."],
    correct: 1,
    inferenceHint: "En el primer párrafo, el escritor dice: 'I suddenly realized how beautiful a building could be ... and from then on I started appreciating the architecture I saw' (empezó a ver los edificios de otra forma)."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH-2", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\\n\\nWhat does the writer say about the other Mackintosh buildings in the city?",
    options: ["They are as attractive today as they were originally.", "They are painted in bright colours.", "They were designed to replace some older buildings."],
    correct: 0,
    inferenceHint: "En el segundo párrafo, dice: 'many other buildings in the city that still seem so beautiful today' (siguen siendo tan bellos como al principio)."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH-3", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\\n\\nWhat was unusual about the way that Mackintosh worked?",
    options: ["He preferred designing the inside to the outside.", "He made sure that everything was built perfectly.", "He liked to be in control of every detail of a project."],
    correct: 2,
    inferenceHint: "El tercer párrafo explica que Mackintosh ponía atención a todo: 'inside and out. You didn't just get the house, you got Mackintosh furniture, wallpaper, curtains, door handles...'."
  },
  {
    id: "RD4-B1-T1-MACKINTOSH-4", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Charles Rennie Mackintosh", partLabel: "Part 4: Longer Text",
    context: "Read the article about Charles Rennie Mackintosh.",
    prompt: "Charles Rennie Mackintosh (1868–1928)...\\n\\nMackintosh retired to France because...",
    options: ["he no longer wanted to design buildings.", "he was unable to find work as an architect.", "he was too ill to continue with architecture."],
    correct: 1,
    inferenceHint: "El último párrafo menciona: 'With little demand for his services, his difficult financial situation led him to retire to France' (la falta de demanda de sus servicios significa que no encontraba trabajo)."
  }
];
`
;

const startIndex = content.indexOf('export const readingBank: BankQuestion[] = [');
const endIndex = content.indexOf('];\n\n// ─────────────────────────────────────────────────────────────────────────────\n// WRITING BANK');

if (startIndex === -1) {
  console.error("Could not find readingBank array bounds.");
  process.exit(1);
}

// Fallback search since line endings may vary
const searchStr1 = '];\n\n// ─────────────────────────────────────────────────────────────────────────────\n// WRITING BANK';
const searchStr2 = '];\r\n\r\n// ─────────────────────────────────────────────────────────────────────────────\r\n// WRITING BANK';

let actualEnd = content.indexOf(searchStr1);
if (actualEnd === -1) actualEnd = content.indexOf(searchStr2);

if (actualEnd !== -1) {
  const updatedContent = content.substring(0, startIndex) + newReadingBank + content.substring(actualEnd + 2);
  fs.writeFileSync(bankPath, updatedContent, 'utf8');
  console.log("Successfully updated readingBank in question-bank.ts");
} else {
  // Try regex for robust matching
  const match = content.match(/];\s*\/\/\s*─────────────────────────────────────────────────────────────────────────────\s*\/\/\s*WRITING BANK/);
  if (match) {
    const updatedContent = content.substring(0, startIndex) + newReadingBank + content.substring(match.index + 2);
    fs.writeFileSync(bankPath, updatedContent, 'utf8');
    console.log("Successfully updated via regex in question-bank.ts");
  } else {
    console.error("End bounds not found");
    process.exit(1);
  }
}
