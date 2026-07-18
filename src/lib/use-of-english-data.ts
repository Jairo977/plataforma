export interface UoeQuestion {
  id: string;
  prompt: string;
  options?: string[];
  correct?: number; // For choice questions (0-indexed)
  correctText?: string[]; // For fill-in-the-gap text inputs (possible correct answers)
  explanation: string;
  strategy: string;
}

export interface UoeTextGroup {
  text: string; // The paragraph containing gaps like "Lucy is one of the most talented students 1._____ our school."
  gaps: {
    number: number;
    correctAnswers: string[];
    explanation: string;
    strategy: string;
  }[];
}

export interface UoeListeningMultiSelect {
  id: string;
  audioScript: string;
  prompt: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}

export interface UoeListeningMatch {
  id: string;
  conversations: { label: string; correctTopic: string }[];
  topics: string[];
  explanation: string;
}

export interface UoeListeningTrueFalse {
  id: string;
  audioScript: string;
  questions: { text: string; correct: boolean; explanation: string }[];
}

export const uoePart1: UoeQuestion[] = [
  {
    id: "p1-1",
    prompt: "A: Have you seen my glasses?\nB: No, but you _____ left them in the car.",
    options: ["can't", "might", "mustn't", "shouldn't"],
    correct: 1,
    explanation: "We use 'might' to express a possibility in the past. B doesn't know for sure but suggests it as a possibility ('might have left'). 'Can't' would mean it's impossible, and 'mustn't'/'shouldn't' express prohibition or negative recommendation.",
    strategy: "When speculating about past events with uncertainty, look for possibility modals like 'might', 'may', or 'could'."
  },
  {
    id: "p1-2",
    prompt: "A: Why don't you apply for the job?\nB: You're right. I _____ do that.",
    options: ["should", "would", "could", "need"],
    correct: 0,
    explanation: "In response to a suggestion ('Why don't you...'), 'I should do that' is the most natural way to express agreement and a sense of personal obligation or recommendation to act.",
    strategy: "Assess the level of obligation. 'Should' is standard for agreeing with friendly advice or recommendations."
  },
  {
    id: "p1-3",
    prompt: "A: I really like your jacket.\nB: Thanks. I bought it from a friend of _____.",
    options: ["me", "mine", "my", "myself"],
    correct: 1,
    explanation: "The double genitive structure is 'friend of mine' (noun + of + possessive pronoun). 'Friend of me' or 'friend of my' is grammatically incorrect.",
    strategy: "Remember the possessive pronoun pattern: 'a friend of mine/yours/his/hers/ours/theirs'."
  },
  {
    id: "p1-4",
    prompt: "A: Is Maria coming tonight?\nB: I don't know. She _____ be busy.",
    options: ["can't", "might", "must", "should"],
    correct: 1,
    explanation: "Since B says 'I don't know', they are uncertain, which requires a modal of possibility like 'might'. 'Must' indicates certainty, and 'can't' indicates negative certainty.",
    strategy: "If the speaker specifies 'I don't know' or 'I'm not sure', eliminate strong modals like 'must' and 'can't' and choose 'might', 'may' or 'could'."
  },
  {
    id: "p1-5",
    prompt: "A: How was the restaurant?\nB: The food wasn't as good _____ I expected.",
    options: ["than", "as", "like", "so"],
    correct: 1,
    explanation: "The comparative structure for equality/inequality is 'as + adjective + as'. Therefore, 'not as good as' is correct. 'Than' is only used with comparative adjectives like 'better than'.",
    strategy: "Always pair 'as' with another 'as' when making comparisons of similarity or equality (e.g., 'as good as', 'as fast as')."
  },
  {
    id: "p1-6",
    prompt: "A: Why are you carrying an umbrella?\nB: I'm expecting it _____ rain.",
    options: ["for", "about", "to", "with"],
    correct: 2,
    explanation: "The verb 'expect' is followed by an object + to-infinitive: 'expect something to happen'. So 'expecting it to rain' is grammatically correct.",
    strategy: "Learn verb patterns. 'Expect' + object + 'to' + verb is a standard structure."
  },
  {
    id: "p1-7",
    prompt: "A: Are you still angry with Tom?\nB: No, I'm _____ it now.",
    options: ["over", "through", "around", "into"],
    correct: 0,
    explanation: "The prepositional phrase 'to be over something' means to have recovered from something, or to no longer be angry/sad about it.",
    strategy: "Learn prepositions associated with emotional states. 'Get over' or 'be over' means recovery."
  },
  {
    id: "p1-8",
    prompt: "A: This computer is very slow.\nB: It _____ replacing soon.",
    options: ["should", "should be", "should being", "should have"],
    correct: 1,
    explanation: "The phrase 'needs replacing' or 'should be replaced' are standard. In this test format, 'should be replacing' (active continuous expressing necessity) was evaluated as the target answer to complete 'It should be replacing soon', though 'should be replaced' or 'needs replacing' are standard passive structures.",
    strategy: "Choose 'should be' to form the correct grammatical combination indicating a future necessity."
  },
  {
    id: "p1-9",
    prompt: "A: What do you think of the new teacher?\nB: She seems nice, _____ she's very strict.",
    options: ["because", "although", "so", "if"],
    correct: 1,
    explanation: "'Although' is a conjunction used to introduce a contrasting statement. Here, it contrasts 'nice' (positive) with 'very strict' (negative aspect).",
    strategy: "Identify the logical link. Contrast between positive and negative adjectives calls for concession connectors like 'although', 'but' or 'though'."
  },
  {
    id: "p1-10",
    prompt: "A: Do you mind opening the window?\nB: Not at _____.",
    options: ["all", "every", "once", "least"],
    correct: 0,
    explanation: "The phrase 'Not at all' is a polite way of saying 'No, I don't mind' to a request starting with 'Do you mind...'.",
    strategy: "Collocations: 'Not at all' is a fixed polite response."
  }
];

export const uoePart2: UoeQuestion[] = [
  {
    id: "p2-1",
    prompt: "Man: \"I wouldn't buy that laptop if I were you.\"\n\nWhat does he mean?",
    options: [
      "The laptop is expensive.",
      "He recommends not buying it.",
      "He wants to buy it himself."
    ],
    correct: 1,
    explanation: "The structure 'If I were you, I would(n't)...' is a standard B1/B2 English formula used for giving advice or recommendations. By saying 'I wouldn't buy it', he is advising the other person against buying it.",
    strategy: "Recognize the conditional structure for advice: 'If I were you, I would...' = giving a recommendation."
  },
  {
    id: "p2-2",
    prompt: "Woman: \"That exam was easier than I expected.\"\n\nWhat does she mean?",
    options: [
      "The exam was difficult.",
      "The exam was exactly as expected.",
      "The exam was not very difficult."
    ],
    correct: 2,
    explanation: "If something is 'easier than expected', it means the speaker thought it would be harder, so it was relatively easy or 'not very difficult'.",
    strategy: "Analyze comparison. 'Easier than expected' means low difficulty relative to expectations."
  },
  {
    id: "p2-3",
    prompt: "Man: \"I'm afraid we're too late.\"\n\nWhat does he mean?",
    options: [
      "They arrived early.",
      "They probably missed something.",
      "They're scared."
    ],
    correct: 1,
    explanation: "Being 'too late' implies they did not arrive in time, and as a result, they probably missed the beginning of an event, a train, or a meeting. 'I'm afraid' here is a polite filler meaning 'Lamento decir que / me temo que', not fear.",
    strategy: "Contextual meaning: 'I'm afraid' often means 'I regret to tell you'. 'Too late' means arriving after the start."
  },
  {
    id: "p2-4",
    prompt: "Woman: \"That's a pity.\"\n\nWhat does she mean?",
    options: [
      "That's great.",
      "That's unfortunate.",
      "That's funny."
    ],
    correct: 1,
    explanation: "'What a pity' or 'That's a pity' is a common expression of sympathy or mild regret used to say that something is unfortunate or sad.",
    strategy: "Idiomatic expressions: 'That's a pity' = 'Es una pena/lástima' = 'That's unfortunate'."
  },
  {
    id: "p2-5",
    prompt: "Man: \"No wonder she's tired.\"\n\nWhat does he mean?",
    options: [
      "It's surprising she's tired.",
      "It's understandable she's tired.",
      "He doesn't know why she's tired."
    ],
    correct: 1,
    explanation: "The expression 'No wonder...' means it is not surprising, or it is completely logical and understandable why something is the case.",
    strategy: "Idioms: 'No wonder' = 'No es de extrañar' = 'It is understandable'."
  }
];

export const uoePart3: UoeTextGroup[] = [
  {
    text: "Lucy is one of the most talented students 1.[in] our school. She enjoys science and hopes to work 2.[as] a doctor in the future. She studies hard, 3.[but] she also finds time to play sports.",
    gaps: [
      {
        number: 1,
        correctAnswers: ["in", "at"],
        explanation: "To specify membership in a group or location in a building/institution, 'in our school' or 'at our school' is used.",
        strategy: "Use 'in' for groups/organizations ('in the school', 'in the class')."
      },
      {
        number: 2,
        correctAnswers: ["as"],
        explanation: "We use 'work as' + profession (e.g. 'work as a doctor', 'work as a teacher').",
        strategy: "The preposition after 'work' describing a job title is always 'as'."
      },
      {
        number: 3,
        correctAnswers: ["but", "although", "yet"],
        explanation: "A contrast is needed between studying hard (demanding) and finding time for sports (positive balance). 'but' or 'although' fit perfectly.",
        strategy: "Read the clauses. If the second clause contrasts the first, look for coordinating conjunctions like 'but' or subordinators like 'although'."
      }
    ]
  },
  {
    text: "Last weekend we went 4.[on] a trip to the mountains. The weather was cold, 5.[but] everyone enjoyed the experience. We arrived home late 6.[on] Sunday evening.",
    gaps: [
      {
        number: 4,
        correctAnswers: ["on"],
        explanation: "The collocation is 'go on a trip' or 'go on a journey'.",
        strategy: "Collocations with 'trip': 'go on a trip' is a fixed phrase."
      },
      {
        number: 5,
        correctAnswers: ["but", "although", "yet"],
        explanation: "Contrast connector is needed: the weather was cold (negative), but they enjoyed it (positive).",
        strategy: "Look for contrast between cold weather and enjoyment."
      },
      {
        number: 6,
        correctAnswers: ["on"],
        explanation: "We use 'on' for specific days of the week, even when followed by part of the day (e.g., 'on Sunday evening', 'on Friday morning').",
        strategy: "Days of the week require 'on', not 'in' or 'at'."
      }
    ]
  },
  {
    text: "Tom has lived here 7.[for] five years. He moved here 8.[in] 2021 and has made many friends 9.[since] then.",
    gaps: [
      {
        number: 7,
        correctAnswers: ["for"],
        explanation: "We use 'for' with present perfect to indicate a duration of time ('for five years').",
        strategy: "'For' + period of time; 'since' + starting point."
      },
      {
        number: 8,
        correctAnswers: ["in"],
        explanation: "We use 'in' before specific years (e.g., 'in 2021', 'in 1999').",
        strategy: "Prepositions of time: 'in' + years/months."
      },
      {
        number: 9,
        correctAnswers: ["since"],
        explanation: "The phrase 'since then' means from that point in time until now.",
        strategy: "Use 'since then' to connect a past event with present perfect."
      }
    ]
  },
  {
    text: "Although Sarah was tired, she carried 10.[on] working until midnight. She wanted to finish the project 11.[on] time.",
    gaps: [
      {
        number: 10,
        correctAnswers: ["on"],
        explanation: "The phrasal verb 'carry on' means to continue doing something.",
        strategy: "Phrasal verbs: 'carry on' = 'continue'."
      },
      {
        number: 11,
        correctAnswers: ["on", "in"],
        explanation: "The collocations 'on time' (punctual/at the scheduled time) or 'in time' (with enough time before the deadline) both fit contextually.",
        strategy: "Collocations: 'on time' or 'in time' are standard prepositional phrases for deadlines."
      }
    ]
  }
];

export const uoePart4: UoeQuestion[] = [
  {
    id: "p4-1",
    prompt: "Can you _____ the lights before leaving?",
    options: ["turn off", "turn up", "turn into"],
    correct: 0,
    explanation: "'Turn off' means to stop a device from working (extinguir luces). 'Turn up' means to increase volume/heat, and 'turn into' means to transform.",
    strategy: "Look at the noun 'lights'. You turn them 'on' or 'off'."
  },
  {
    id: "p4-2",
    prompt: "I need to _____ this form before tomorrow.",
    options: ["fill in", "look after", "give away"],
    correct: 0,
    explanation: "'Fill in' (or 'fill out') means to complete a form with information. 'Look after' means to take care of, and 'give away' means to donate.",
    strategy: "Forms are completed using the phrasal verb 'fill in' or 'fill out'."
  },
  {
    id: "p4-3",
    prompt: "The meeting was _____ because the manager was sick.",
    options: ["called off", "looked up", "put on"],
    correct: 0,
    explanation: "'Called off' means to cancel an event. 'Looked up' means to search for information, and 'put on' means to wear or organize.",
    strategy: "Since the manager was sick, the meeting had to be cancelled ('called off')."
  },
  {
    id: "p4-4",
    prompt: "I don't _____ my brother. We are very different.",
    options: ["take after", "get over", "come across"],
    correct: 0,
    explanation: "In this test structure, 'take after' (resemble an older relative in appearance or character) is the intended response to express 'I don't behave like my brother' or 'I am not similar to him'. 'Get over' means recover, and 'come across' means meet by chance.",
    strategy: "Choose 'take after' to indicate similarity or resemblance to a family member."
  },
  {
    id: "p4-5",
    prompt: "The plane _____ two hours late.",
    options: ["took off", "got over", "came back"],
    correct: 0,
    explanation: "For planes, the phrasal verb 'take off' means to leave the ground and fly.",
    strategy: "Learn plane collocations: 'take off' (despegar) vs 'land' (aterrizar)."
  }
];

export const uoePart5: UoeQuestion[] = [
  {
    id: "p5-1",
    prompt: "I need to _____ a decision.",
    options: ["make", "do"],
    correct: 0,
    explanation: "The correct collocation is 'make a decision'. We do not say 'do a decision'.",
    strategy: "Make vs Do: we 'make' choices, decisions, plans, mistakes."
  },
  {
    id: "p5-2",
    prompt: "She _____ her homework every evening.",
    options: ["makes", "does"],
    correct: 1,
    explanation: "We say 'do homework', so for third person singular it is 'does homework'.",
    strategy: "Make vs Do: we 'do' work, chores, tasks, homework."
  },
  {
    id: "p5-3",
    prompt: "There was _____ traffic this morning.",
    options: ["heavy", "strong"],
    correct: 0,
    explanation: "The correct collocation to describe a lot of cars on the road is 'heavy traffic'.",
    strategy: "Adjective collocations: traffic is 'heavy' or 'light'."
  },
  {
    id: "p5-4",
    prompt: "The coffee is very _____.",
    options: ["heavy", "strong"],
    correct: 1,
    explanation: "Coffee with an intense flavor or concentration is described as 'strong coffee'.",
    strategy: "Adjective collocations: drinks (coffee, tea) are described as 'strong' or 'weak'."
  },
  {
    id: "p5-5",
    prompt: "We're going to _____ a break.",
    options: ["take", "have"],
    correct: 0,
    explanation: "In general English, both 'take a break' and 'have a break' are correct. The test lists 'take' or 'have' and both are common collocations. Here, 'take a break' is widely preferred in American English and common in British English.",
    strategy: "Either 'take' or 'have' can form a collocation with 'a break'."
  }
];

export const uoePart6: UoeQuestion[] = [
  {
    id: "p6-1",
    prompt: "A: Have you finished the report?\nB: Not yet. I'm still working _____ it.",
    options: ["at", "on", "in", "with"],
    correct: 1,
    explanation: "The preposition that collocated with the verb 'work' when referring to a project or task is 'on' ('work on it').",
    strategy: "Verb + Preposition: 'work on a project/report/task'."
  },
  {
    id: "p6-2",
    prompt: "A: What happened?\nB: My car broke _____ on the motorway.",
    options: ["out", "down", "up", "through"],
    correct: 1,
    explanation: "The phrasal verb 'break down' means to stop functioning (especially mechanical objects like cars, computers).",
    strategy: "Phrasal verbs: 'break down' = mechanical failure."
  },
  {
    id: "p6-3",
    prompt: "A: Do you know where Anna is?\nB: She _____ be at home. Her car is outside.",
    options: ["can't", "might", "must", "should"],
    correct: 2,
    explanation: "Since her car is outside, B has strong logical evidence to conclude she is inside. We use the modal 'must' for strong positive logical deductions.",
    strategy: "Look for the evidence. If the evidence is almost certain ('car is outside'), use 'must'. If it's negative, use 'can't'."
  },
  {
    id: "p6-4",
    prompt: "A: How long have you known James?\nB: _____ about ten years.",
    options: ["Since", "For", "During", "By"],
    correct: 1,
    explanation: "We use 'for' to describe a duration or period of time ('for ten years') with present perfect.",
    strategy: "Duration of time = 'for'. Specific starting point = 'since'."
  },
  {
    id: "p6-5",
    prompt: "A: Why didn't you call me?\nB: I forgot. It completely slipped my _____.",
    options: ["brain", "thought", "memory", "mind"],
    correct: 3,
    explanation: "The idiomatic collocation is 'slip someone's mind', meaning they forgot about it.",
    strategy: "Idioms: 'slip my mind' = to be forgotten."
  }
];

export const uoeListeningParty: UoeListeningMultiSelect = {
  id: "l-party",
  audioScript: "Man: Hi, is that Julie? Julie: Yes, hi. Man: Thanks for the birthday card you sent, that was really nice of you. Julie: You're welcome. Did you have a good day? Man: Yeah, great. Listen, I'm calling to invite you to our housewarming party. We moved in last week, you know. Julie: Oh, fantastic! When is it? Man: This Saturday. It starts at quarter to four. Julie: Quarter to four? That's an early start! Man: Yes, we have a swimming pool in the garden, so we want to make the most of the afternoon sun. Bring your swimwear! Julie: Sounds great. How do I get there? Man: It's quite easy. You can take the number 12 bus which stops right in front of the local park. From there, you walk past the post office and our house is the one with the big red door. It's a semi-detached house with a white fence.",
  prompt: "Listen to the phone call. Which sentences are in the message?",
  options: [
    { text: "The message was at quarter to four", correct: true },
    { text: "The woman gives directions", correct: false },
    { text: "The woman says thank you for the card", correct: false },
    { text: "The woman describes the house", correct: false },
    { text: "The woman talks about a bus", correct: false },
    { text: "The woman talks about a swimming pool", correct: true }
  ],
  explanation: "In the conversation, the man mentions the party starts at quarter to four, and he also mentions they have a swimming pool in the garden. The man (not the woman) gives directions, describes the house, and talks about the bus. Also, the man (not the woman) says thank you for the card."
};

export const uoeListeningMatch: UoeListeningMatch = {
  id: "l-match",
  conversations: [
    { label: "Conversation A", correctTopic: "A work interview" },
    { label: "Conversation B", correctTopic: "A holiday" },
    { label: "Conversation C", correctTopic: "An old photo" },
    { label: "Conversation D", correctTopic: "A university project" }
  ],
  topics: ["A work interview", "A holiday", "An old photo", "A university project"],
  explanation: "Matches the four dialogue sessions from the official mock listening tracks. Conversation A talks about job requirements and schedules. Conversation B mentions flight bookings and sightseeing. Conversation C discusses family members in a printed album. Conversation D details research methodology and surveys."
};

export const uoeListeningTrueFalse: UoeListeningTrueFalse = {
  id: "l-tf",
  audioScript: "Hello, this is Peter Griffin calling. I'm leaving a message for Maria. I wanted to let you know that I'm currently working on the figures for our new project, but I won't be able to finish them until tomorrow morning. I'm currently in a meeting, but if you need to contact me, you can call my mobile. The number is 07460 990128. I might be in another meeting later this afternoon, so if I don't answer, please send me an email at peter.griffin@pxo.com and I'll get back to you as soon as I can. Please don't call the office number as I won't be at my desk. Thank you.",
  questions: [
    { text: "Maria's in a meeting.", correct: false, explanation: "Peter says he is in a meeting ('I'm currently in a meeting'), not Maria." },
    { text: "Peter's number is 07460 990128.", correct: true, explanation: "Peter dictates his mobile number as: '07460 990128'." },
    { text: "Peter needs to give Maria the new project figures.", correct: false, explanation: "He states he won't be able to finish them until tomorrow morning, so he is not giving them now." },
    { text: "Peter might be in a meeting later that afternoon.", correct: true, explanation: "He explicitly warns: 'I might be in another meeting later this afternoon'." },
    { text: "Peter prefers Maria to email him back instead of calling back.", correct: false, explanation: "He says 'if you need to contact me, you can call my mobile', but if he doesn't answer, to send an email. He doesn't prefer email over calling in general." },
    { text: "Peter's email address is peter.griffin@pxo.com", correct: true, explanation: "He gives his email as 'peter.griffin@pxo.com'." }
  ]
};
