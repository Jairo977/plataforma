const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

const newReadingItems = `
  // ── NEW PART 1: More Short Texts ──
  {
    id: "RD1-003", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Nota de vecino", partLabel: "Part 1: Short Text",
    context: "Read the notice pinned to the apartment building's noticeboard.",
    prompt: "Dear Residents,\\nPlease note that the water supply to the building will be switched off between 10 a.m. and 2 p.m. on Thursday for essential maintenance. We apologise for any inconvenience. Please make sure you store enough water for this period.\\nBuilding Management\\n\\nWhat is the purpose of this notice?",
    options: ["to warn residents about a temporary service disruption", "to ask residents to reduce their water usage", "to announce a permanent change to the water supply"],
    correct: 0,
    inferenceHint: "The notice says the water will be off BETWEEN 10 and 2 — it's temporary, not permanent."
  },
  {
    id: "RD1-004", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Anuncio de curso", partLabel: "Part 1: Short Text",
    context: "Read the advertisement.",
    prompt: "Learn Photography in 6 Weeks!\\nOur popular evening course is back. Classes run every Wednesday from 7 to 9 p.m. No previous experience needed — just bring your camera (or smartphone). Places are limited, so book early to avoid disappointment.\\nCity Arts Centre — £120 per person\\n\\nWhat does the advertisement tell us?",
    options: ["The course is only for experienced photographers.", "People should register quickly because space is limited.", "Cameras will be provided by the centre."],
    correct: 1,
    inferenceHint: "'Book early to avoid disappointment' and 'Places are limited' both signal that you should register quickly."
  },
  {
    id: "RD1-005", module: "reading", part: 1, difficulty: "B2", type: "choice", topic: "Email de cancelación", partLabel: "Part 1: Short Text",
    context: "Read this email from a colleague.",
    prompt: "Hi Tom,\\nI'm afraid I won't be able to make the project meeting this afternoon. Something urgent has come up with the Henderson account and I need to deal with it right away. Could you take notes for me and send them over later? I'll catch up on everything first thing tomorrow.\\nThanks,\\nLisa\\n\\nWhat is Lisa doing in this email?",
    options: ["apologising for a mistake she made at work", "explaining why she cannot attend a meeting and asking for help", "requesting that Tom cancel the meeting"],
    correct: 1,
    inferenceHint: "Lisa explains she 'won't be able to make' the meeting (reason: urgent account) and asks Tom to 'take notes' (help)."
  },
  {
    id: "RD1-006", module: "reading", part: 1, difficulty: "B1", type: "choice", topic: "Aviso de biblioteca", partLabel: "Part 1: Short Text",
    context: "Read the sign at the library entrance.",
    prompt: "NOTICE: From January, library opening hours will change. We will now open at 8 a.m. instead of 9 a.m. on weekdays. Weekend hours remain the same. Members can now also renew books online through our new website.\\n\\nWhat TWO changes are being announced?",
    options: ["earlier opening on weekdays and online book renewal", "longer weekend hours and a new membership system", "later closing times and a new library building"],
    correct: 0,
    inferenceHint: "The text mentions two things: opening at 8 instead of 9 (earlier) and renewing books online (new service)."
  },
  {
    id: "RD1-007", module: "reading", part: 1, difficulty: "B2", type: "choice", topic: "Reseña de restaurante", partLabel: "Part 1: Short Text",
    context: "Read this restaurant review.",
    prompt: "The food at La Casa was delicious and beautifully presented. The staff were welcoming and attentive. However, I was surprised by how expensive the bill was, especially given the small portion sizes. While I would return for a special occasion, it's certainly not somewhere I'd eat every week.\\n\\nWhat is the reviewer's overall opinion?",
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
    gappedText: "Street art has become one of the most talked-about forms of creative expression in recent years. What was once considered vandalism is now exhibited in galleries and celebrated by critics.\\n\\nThe most famous street artist is undoubtedly Banksy, whose identity remains a mystery. [1] His works often carry strong political or social messages, using humour and irony to make people think.\\n\\nMany cities have now embraced street art as a way of regenerating neglected areas. In Melbourne, for example, entire laneways have been dedicated to murals and graffiti. [2] Local businesses have reported increased foot traffic and tourism as a result.\\n\\nHowever, not everyone is convinced. [3] They point out that without proper regulation, any wall could become a target. The debate between art and vandalism continues, but one thing is clear: street art has changed the way we think about public spaces.",
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
    prompt: "The shift to remote working, accelerated by the pandemic, has fundamentally altered the relationship between employers and employees. While many companies initially resisted the change, the evidence increasingly suggests that productivity has not suffered — and in many cases has actually improved.\\n\\nYet the picture is not entirely positive. Some workers report feeling isolated and struggling to separate their professional and personal lives. The lack of casual office interactions — the so-called 'water cooler' conversations — has also raised concerns about creativity and team cohesion.\\n\\nThe most likely outcome is a hybrid model, where employees split their time between home and the office. This approach attempts to capture the benefits of both arrangements while minimising their disadvantages.\\n\\nAccording to the writer, the main challenge of remote working is that it...",
    options: ["reduces the quality of work produced.", "can negatively affect workers' wellbeing and team dynamics.", "makes it impossible for companies to monitor staff."],
    correct: 1,
    inferenceHint: "The writer mentions 'feeling isolated', 'struggling to separate professional and personal lives' and concerns about 'creativity and team cohesion' — all wellbeing and team dynamics issues."
  },
  {
    id: "RD4-004", module: "reading", part: 4, difficulty: "B2", type: "choice", topic: "Sushi 501 (Reseña)", partLabel: "Part 4: Longer Text",
    context: "Read the restaurant review.",
    prompt: "Sushi 501 has been on my radar for weeks, ever since a colleague raved about it. Walking in, I was immediately struck by the minimalist décor — clean lines, warm wood and soft lighting. It felt like stepping into a Tokyo side street.\\n\\nThe omakase menu (chef's choice) was extraordinary. Each piece of fish was prepared with precision and care. The highlight was the otoro tuna — rich, buttery and quite literally melting on the tongue. My only criticism would be the pace: courses arrived so quickly that I barely had time to appreciate one before the next appeared.\\n\\nAt £85 per person, it's not cheap, but for a special occasion, I'd argue it's worth every penny. Just make sure you book well in advance — tables are notoriously hard to get.\\n\\nThe reviewer's attitude towards the price of Sushi 501 is that it is...",
    options: ["unreasonable given the quality of service.", "justified for the right kind of occasion.", "surprisingly affordable for what you get."],
    correct: 1,
    inferenceHint: "The reviewer says 'it's not cheap, but for a special occasion... worth every penny' — meaning the price is justified under the right circumstances."
  },
  {
    id: "RD4-005", module: "reading", part: 4, difficulty: "B1", type: "choice", topic: "Social Media and Teens", partLabel: "Part 4: Longer Text",
    context: "Read the article about teenagers and social media.",
    prompt: "A recent study found that teenagers who spend more than three hours a day on social media are twice as likely to report symptoms of anxiety and depression compared to those who use it for less than an hour. The researchers were careful to note that social media use does not directly cause these problems — the relationship is more complex than that.\\n\\nSome experts believe the issue is not the platforms themselves but how they are used. Passive scrolling, where users simply consume content without interacting, appears to be particularly harmful. In contrast, using social media to actively communicate with friends and family can actually have positive effects on wellbeing.\\n\\nWhat does the writer mean by saying 'the relationship is more complex'?",
    options: ["Social media definitely causes mental health problems.", "There are other factors involved, not just social media.", "Teenagers don't understand how social media works."],
    correct: 1,
    inferenceHint: "'More complex' means it's not a simple cause-and-effect; other factors (like how it's used, personality, existing conditions) play a role."
  }
`;

// Append before the end of readingBank array
const startIdx = content.indexOf('export const readingBank: BankQuestion[] = [');
if (startIdx === -1) { console.error("readingBank not found"); process.exit(1); }

// Find the closing ]; of readingBank
let depth = 0;
let endIdx = -1;
const arrayStart = content.indexOf('=', startIdx);
const searchStart = content.indexOf('[', arrayStart);
for (let i = searchStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  if (content[i] === ']') { depth--; if (depth === 0) { endIdx = i; break; } }
}

if (endIdx === -1) { console.error("Could not find end of readingBank"); process.exit(1); }

const updatedContent = content.substring(0, endIdx) + ',' + newReadingItems + content.substring(endIdx);
fs.writeFileSync(bankPath, updatedContent, 'utf8');
console.log("Successfully appended new Reading items. Total readingBank expanded.");
