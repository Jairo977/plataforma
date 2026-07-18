"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLevel, scoreToLevel, SkillProfile, LEVEL_CONFIG } from "@/lib/level-context";
import styles from "./placement.module.css";

type Skill = "listening" | "reading" | "writing" | "speaking";
type Question = {
  id: string;
  skill: Skill;
  difficulty: "B1" | "B2";
  type: "choice" | "text";
  part: string;
  source: string;
  prompt: string;
  context?: string;
  audioScript?: string;
  options?: string[];
  correct?: number;
  explanation: string;
  strategy: string;
  vocabulary: { term: string; meaning: string; example: string }[];
  distractors?: string[];
  modelAnswer?: string;
  minWordsB1?: number;
  minWordsB2?: number;
};

const questions: Question[] = [
  {
    id: "L1",
    skill: "listening",
    difficulty: "B1",
    type: "choice",
    part: "Listening Part 1 - short dialogue",
    source: "OTE-style original practice based on official task format",
    audioScript:
      "Mia: Are you still coming to the cinema on Saturday, Sam? We are meeting outside at six fifteen. Sam: I am really sorry, but I cannot. My history teacher moved the test to Monday, so I have to spend the weekend revising. Mia: Oh, that is a shame. Are you visiting your grandparents as well? Sam: No, that is next weekend. And football practice was cancelled because of the rain.",
    prompt: "Sam says he can't go to the cinema on Saturday because he:",
    options: ["Has to study for an exam", "Is visiting his grandparents", "Has football practice"],
    correct: 0,
    explanation:
      "The key sentence is: 'I have to spend the weekend revising.' Grandparents and football are distractors because they are mentioned but are not the reason.",
    strategy:
      "In Listening Part 1, do not choose an option just because you hear the word. Identify the reason, decision or change.",
    vocabulary: [
      { term: "revise / revising", meaning: "estudiar o repasar para un examen", example: "I have to spend the weekend revising." },
      { term: "moved the test", meaning: "cambiaron la fecha del examen", example: "My teacher moved the test to Monday." },
      { term: "cancelled", meaning: "cancelado", example: "Football practice was cancelled." },
      { term: "What a shame", meaning: "que pena / que lastima", example: "Oh, that is a shame." },
    ],
    distractors: [
      "Grandparents aparece en el audio, pero Sam dice que eso sera el siguiente fin de semana.",
      "Football aparece en el audio, pero la practica fue cancelada; no es la razon.",
    ],
  },
  {
    id: "L2",
    skill: "listening",
    difficulty: "B1",
    type: "choice",
    part: "Listening Part 2 - monologue",
    source: "OTE-style original practice based on official task format",
    audioScript:
      "Welcome to local radio. This Saturday, the food festival will be held in Riverside Park from ten in the morning until eight in the evening. In previous years it was in City Hall Square, but the organisers needed more space this year. Tickets are free, although you should bring some cash because not every stall accepts cards.",
    prompt: "The food festival will take place at:",
    options: ["City Hall Square", "Riverside Park", "The town museum"],
    correct: 1,
    explanation:
      "The correct place is Riverside Park. City Hall Square is a distractor because it was the old location.",
    strategy:
      "Listen for contrast markers like 'in previous years', 'but', 'this year'. They often introduce the correct answer.",
    vocabulary: [
      { term: "will be held", meaning: "se celebrara / tendra lugar", example: "The festival will be held in Riverside Park." },
      { term: "previous years", meaning: "anos anteriores", example: "In previous years it was in City Hall Square." },
      { term: "organisers", meaning: "organizadores", example: "The organisers needed more space." },
      { term: "stall", meaning: "puesto de comida o venta", example: "Not every stall accepts cards." },
    ],
    distractors: [
      "City Hall Square es el lugar de anos anteriores, no el de este ano.",
      "The town museum no se menciona; es una opcion inventada.",
    ],
  },
  {
    id: "L3",
    skill: "listening",
    difficulty: "B2",
    type: "choice",
    part: "Listening Part 3 - opinions",
    source: "OTE-style original practice based on official task format",
    audioScript:
      "Ana: Working from home has made me much more productive. I can concentrate better. Ben: I agree partly, but I miss quick conversations with colleagues. Clara: Honestly, I think it is a problem. People say it is flexible, but I feel isolated and I work longer hours than before. For me, the disadvantages are bigger than the benefits.",
    prompt: "Which speaker has a mainly negative view of working from home?",
    options: ["Ana", "Ben", "Clara"],
    correct: 2,
    explanation:
      "Clara gives the clearest negative opinion: isolated, longer hours, disadvantages bigger than benefits. Ben is mixed, not mainly negative.",
    strategy:
      "For opinion questions, classify each speaker as positive, negative or mixed before looking at the options.",
    vocabulary: [
      { term: "mainly negative", meaning: "principalmente negativa", example: "Which speaker has a mainly negative view?" },
      { term: "productive", meaning: "productivo/a", example: "Working from home has made me more productive." },
      { term: "isolated", meaning: "aislado/a", example: "I feel isolated." },
      { term: "disadvantages", meaning: "desventajas", example: "The disadvantages are bigger than the benefits." },
    ],
    distractors: [
      "Ana es positiva: dice que se concentra mejor.",
      "Ben tiene opinion mixta: acepta una parte, pero extrana conversar con colegas.",
    ],
  },
  {
    id: "R1",
    skill: "reading",
    difficulty: "B1",
    type: "choice",
    part: "Reading Part 1 - short text",
    source: "OTE-style original practice based on official task format",
    context:
      "Notice: The library study room is unavailable on Friday because of maintenance work. Students who need a quiet place can use Room 204. Group projects should use the cafeteria area after 3 p.m.",
    prompt: "What should students do if they need a quiet place on Friday?",
    options: ["Use the library study room", "Use Room 204", "Use the cafeteria area"],
    correct: 1,
    explanation:
      "The study room is unavailable. Room 204 is offered specifically for students who need a quiet place.",
    strategy:
      "In short texts, identify the problem first, then the instruction that solves it.",
    vocabulary: [
      { term: "unavailable", meaning: "no disponible", example: "The study room is unavailable." },
      { term: "maintenance work", meaning: "trabajos de mantenimiento", example: "Because of maintenance work." },
      { term: "quiet place", meaning: "lugar tranquilo", example: "Students who need a quiet place can use Room 204." },
    ],
    distractors: [
      "Library study room es lo que no se puede usar.",
      "Cafeteria area es para proyectos en grupo, no para estudiar en silencio.",
    ],
  },
  {
    id: "R2",
    skill: "reading",
    difficulty: "B2",
    type: "choice",
    part: "Reading Part 4 - long text inference",
    source: "OTE-style original practice based on official task format",
    context:
      "Although many people describe digital detox weekends as life-changing, researchers are more cautious. Some participants report sleeping better, but others feel anxious when they cannot check work messages. The benefits seem to depend less on the break itself and more on whether people change their daily habits afterwards.",
    prompt: "What is the writer's main point?",
    options: [
      "Digital detox weekends always improve sleep",
      "The long-term value depends on changing habits",
      "People should never check work messages",
    ],
    correct: 1,
    explanation:
      "The final sentence gives the main idea: benefits depend on changing daily habits afterwards.",
    strategy:
      "At B2, the answer is often a paraphrase of the author's conclusion, not one isolated detail.",
    vocabulary: [
      { term: "life-changing", meaning: "que cambia la vida", example: "People describe detox weekends as life-changing." },
      { term: "cautious", meaning: "prudente / cuidadoso", example: "Researchers are more cautious." },
      { term: "depend less on", meaning: "depender menos de", example: "The benefits depend less on the break itself." },
      { term: "afterwards", meaning: "despues", example: "Change their daily habits afterwards." },
    ],
    distractors: [
      "Sleeping better es un detalle, no la idea principal.",
      "Never check messages es demasiado absoluto; el texto no dice eso.",
    ],
  },
  {
    id: "R3",
    skill: "reading",
    difficulty: "B2",
    type: "choice",
    part: "Reading Part 3 - cohesion",
    source: "OTE-style original practice based on official task format",
    context:
      "Sentence before gap: Many schools now use tablets in class.\nGap: ____\nSentence after gap: However, teachers still need to design tasks carefully so that technology supports learning rather than distracts students.",
    prompt: "Choose the sentence that best fits the gap.",
    options: [
      "These devices can make lessons more interactive and give students instant access to information.",
      "Most students prefer playing sport after school.",
      "Libraries are usually quiet places for individual study.",
    ],
    correct: 0,
    explanation:
      "The missing sentence must connect tablets with the contrast in 'However'. Option A gives the benefit before the warning.",
    strategy:
      "For gap-fill, use reference words and connectors. 'However' tells you the previous sentence should be positive.",
    vocabulary: [
      { term: "gap", meaning: "hueco / espacio en blanco", example: "Choose the sentence that best fits the gap." },
      { term: "interactive", meaning: "interactivo/a", example: "Lessons can be more interactive." },
      { term: "instant access", meaning: "acceso inmediato", example: "Students get instant access to information." },
      { term: "rather than", meaning: "en vez de / en lugar de", example: "Technology supports learning rather than distracts students." },
    ],
    distractors: [
      "Sport after school no conecta con tablets.",
      "Libraries no conecta con technology ni con However.",
    ],
  },
  {
    id: "W1",
    skill: "writing",
    difficulty: "B1",
    type: "text",
    part: "Writing Part 1 - email",
    source: "OTE-style original practice based on official task format",
    prompt:
      "Write an email reply to your friend Jamie, who missed class yesterday.\n\nJamie asks:\n- What did we study?\n- Is there any homework?\n- Do you have one tip for the next test?\n\nWrite 80-130 words.",
    minWordsB1: 80,
    minWordsB2: 110,
    explanation:
      "This task checks whether you answer all three points, choose an informal friendly tone, and keep the word count under control.",
    strategy:
      "Use 4 short paragraphs: greeting, class summary, homework, test tip + closing.",
    vocabulary: [
      { term: "missed class", meaning: "faltar a clase", example: "Jamie missed class yesterday." },
      { term: "homework", meaning: "deberes / tarea", example: "Is there any homework?" },
      { term: "reported speech", meaning: "estilo indirecto", example: "We studied reported speech." },
      { term: "avoid mistakes", meaning: "evitar errores", example: "That helps you avoid mistakes." },
    ],
    modelAnswer:
      "Hi Jamie,\n\nYesterday we studied reported speech and practised changing direct questions into indirect questions. It was not too difficult, but you should review the examples in the book.\n\nFor homework, we have to finish exercise 4 on page 32 and write five sentences using reported speech. My tip for the next test is to underline the verb tense before you answer, because that helps you avoid mistakes.\n\nSee you tomorrow,\nAlex",
  },
  {
    id: "W2",
    skill: "writing",
    difficulty: "B2",
    type: "text",
    part: "Writing Part 2 - opinion essay",
    source: "OTE-style original practice based on official task format",
    prompt:
      "Write an opinion essay.\n\nSome people believe that social media does more harm than good. Do you agree or disagree? Give reasons and examples.\n\nWrite 100-160 words.",
    minWordsB1: 100,
    minWordsB2: 130,
    explanation:
      "A B2 answer needs a clear opinion, developed reasons, examples and linking language. Do not just list advantages and disadvantages.",
    strategy:
      "Plan: opinion in introduction, reason 1, reason 2, short conclusion. Use although/however/for example/as a result.",
    vocabulary: [
      { term: "does more harm than good", meaning: "hace mas dano que beneficio", example: "Social media does more harm than good." },
      { term: "confidence", meaning: "confianza / autoestima", example: "It can damage their confidence." },
      { term: "keep in touch", meaning: "mantenerse en contacto", example: "It helps people keep in touch." },
      { term: "on its own", meaning: "por si solo", example: "Technology is not enough on its own." },
    ],
    modelAnswer:
      "I partly agree that social media can do more harm than good, especially when people use it passively. Many teenagers compare their lives with unrealistic images online, which can damage their confidence. In addition, social media can waste a lot of time if users check it constantly.\n\nHowever, I do not think the problem is social media itself. It can help people keep in touch, learn languages and find communities with similar interests. For example, many students use short videos to practise listening or learn new vocabulary.\n\nOverall, social media is useful when people control how they use it, but it becomes harmful when it replaces real communication or study time.",
  },
  {
    id: "S1",
    skill: "speaking",
    difficulty: "B1",
    type: "text",
    part: "Speaking Part 1 - interview",
    source: "OTE-style original practice based on official task format",
    prompt:
      "Speaking practice: write what you would say in 20 seconds.\n\nQuestion: What do you usually do in your free time, and why do you enjoy it?",
    minWordsB1: 35,
    minWordsB2: 55,
    explanation:
      "A weak answer is one sentence. A stronger answer gives activity, reason and one small example.",
    strategy:
      "Use: direct answer + reason + example. Do not overthink grammar; keep speaking.",
    vocabulary: [
      { term: "free time", meaning: "tiempo libre", example: "In my free time, I usually watch films." },
      { term: "relax", meaning: "relajarse", example: "Films help me relax." },
      { term: "without subtitles", meaning: "sin subtitulos", example: "I watched a comedy without subtitles." },
    ],
    modelAnswer:
      "In my free time, I usually watch films or go for a walk with my friends. I enjoy films because they help me relax and I can also learn new English expressions. Last weekend, for example, I watched a comedy without subtitles, which was difficult but useful.",
  },
  {
    id: "S2",
    skill: "speaking",
    difficulty: "B1",
    type: "text",
    part: "Speaking Part 2 - voicemail",
    source: "OTE-style original practice based on official task format",
    prompt:
      "Speaking practice: write what you would say in a 40-second voicemail.\n\nYou want to invite a friend to a new gym. Mention:\n- why you want to go\n- what you can do there\n- when and where to meet",
    minWordsB1: 55,
    minWordsB2: 75,
    explanation:
      "This mirrors the voicemail task: you must cover all bullet points clearly within the time.",
    strategy:
      "Start naturally, answer the three bullets in order, finish with a clear suggestion.",
    vocabulary: [
      { term: "voicemail", meaning: "mensaje de voz", example: "Leave a voicemail for your friend." },
      { term: "free first session", meaning: "primera sesion gratis", example: "It has a free first session." },
      { term: "trainers", meaning: "zapatillas deportivas", example: "Bring trainers and a towel." },
      { term: "Let me know", meaning: "avisame / dime", example: "Let me know!" },
    ],
    modelAnswer:
      "Hi Tom, it is me. I found a new gym near the station and I think we should try it because it has a free first session this week. They have a swimming pool, yoga classes and a small cafe, so it looks really good. Do you want to meet there on Saturday at ten in the morning? Bring trainers and a towel. Let me know!",
  },
  {
    id: "S3",
    skill: "speaking",
    difficulty: "B2",
    type: "text",
    part: "Speaking Part 3 - compare and discuss",
    source: "OTE-style original practice based on official task format",
    prompt:
      "Speaking practice: write what you would say in one minute.\n\nCompare studying alone in a library with studying in a group in a cafe. What are the advantages and disadvantages of each?",
    minWordsB1: 80,
    minWordsB2: 110,
    explanation:
      "A B2 response compares both options, balances advantages/disadvantages and gives an opinion.",
    strategy:
      "Use comparison language: whereas, on the other hand, it depends on, I would choose...",
    vocabulary: [
      { term: "whereas", meaning: "mientras que", example: "The library is quiet, whereas a cafe can be noisy." },
      { term: "fewer distractions", meaning: "menos distracciones", example: "There are fewer distractions." },
      { term: "motivating", meaning: "motivador/a", example: "Studying in a group can be more motivating." },
      { term: "productive", meaning: "productivo/a", example: "The conversation may become social instead of productive." },
    ],
    modelAnswer:
      "Studying alone in a library is usually better for concentration because it is quiet and there are fewer distractions. It is useful when you need to read a difficult text or prepare for an exam. On the other hand, studying in a group can be more motivating, especially if you can explain ideas to each other. The disadvantage is that a cafe can be noisy and the conversation may become social instead of productive. Personally, I would use the library for serious revision, but a group session for practising speaking or checking homework.",
  },
  {
    id: "S4",
    skill: "speaking",
    difficulty: "B2",
    type: "text",
    part: "Speaking Part 4 - follow-up",
    source: "OTE-style original practice based on official task format",
    prompt:
      "Speaking practice: write what you would say in 35 seconds.\n\nDo you think technology has made learning languages easier? Why or why not?",
    minWordsB1: 60,
    minWordsB2: 85,
    explanation:
      "The examiner is looking for an opinion that is developed, not just 'yes, because apps are useful'.",
    strategy:
      "Give a balanced answer: yes/no, one benefit, one limitation, final opinion.",
    vocabulary: [
      { term: "powerful tool", meaning: "herramienta poderosa", example: "Technology is a powerful tool." },
      { term: "on its own", meaning: "por si solo", example: "Technology is not enough on its own." },
      { term: "real communication", meaning: "comunicacion real", example: "It works best with real communication." },
      { term: "nervous", meaning: "nervioso/a", example: "Students may feel nervous in conversation." },
    ],
    modelAnswer:
      "Yes, I think technology has made language learning easier because we can listen to real English every day through videos, podcasts and apps. It is also easier to practise vocabulary regularly. However, technology is not enough on its own. If students only use apps and never speak, they may understand English but feel nervous in conversation. So I think technology is a powerful tool, but it works best with real communication.",
  },
];

const skillOrder: Skill[] = ["listening", "reading", "writing", "speaking"];
const skillLabels: Record<Skill, string> = { listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking" };
const skillIcons: Record<Skill, string> = { listening: "L", reading: "R", writing: "W", speaking: "S" };
const skillColors: Record<Skill, string> = { listening: "listening", reading: "reading", writing: "writing", speaking: "speaking" };

function calcSkillScore(skill: Skill, answers: Record<string, string | number>): number {
  const skillQs = questions.filter(q => q.skill === skill);
  let score = 0;
  let total = 0;

  for (const q of skillQs) {
    total += 100;
    if (q.type === "choice") {
      if (answers[q.id] === q.correct) score += q.difficulty === "B2" ? 100 : 82;
    } else {
      const text = (answers[q.id] as string) || "";
      const wc = text.trim() ? text.trim().split(/\s+/).length : 0;
      if (wc >= (q.minWordsB2 ?? 90)) score += 95;
      else if (wc >= (q.minWordsB1 ?? 60)) score += 70;
      else if (wc >= 20) score += 35;
    }
  }

  return total > 0 ? Math.min(100, Math.round((score / total) * 100)) : 0;
}

type Phase = "intro" | "test" | "results";

export default function PlacementPage() {
  const router = useRouter();
  const { setProfile } = useLevel();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [profile, setLocalProfile] = useState<SkillProfile | null>(null);

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const answer = answers[currentQ?.id];
  const isChecked = !!checked[currentQ?.id];
  const canCheck = answer !== undefined && (currentQ.type === "choice" || String(answer).trim().length > 15);

  const skillGroup = skillOrder.indexOf(currentQ?.skill);

  const skillCounts = useMemo(() => {
    return Object.fromEntries(skillOrder.map(skill => [skill, questions.filter(q => q.skill === skill).length])) as Record<Skill, number>;
  }, []);

  const speakAudio = () => {
    if (!currentQ.audioScript || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQ.audioScript);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      /Google UK English Female|Microsoft Sonia|Microsoft Libby|Natural|Neural|Daniel|Serena/i.test(voice.name)
    ) || voices.find(voice => voice.lang.toLowerCase().startsWith("en-gb"))
      || voices.find(voice => voice.lang.toLowerCase().startsWith("en-us"))
      || voices.find(voice => voice.lang.toLowerCase().startsWith("en"));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.lang = preferredVoice?.lang || "en-GB";
    utterance.rate = 0.98;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      return;
    }

    const listeningScore = calcSkillScore("listening", answers);
    const readingScore = calcSkillScore("reading", answers);
    const writingScore = calcSkillScore("writing", answers);
    const speakingScore = calcSkillScore("speaking", answers);
    const overall = Math.round((listeningScore + readingScore + writingScore + speakingScore) / 4);

    const result: SkillProfile = {
      listening: scoreToLevel(listeningScore),
      reading: scoreToLevel(readingScore),
      writing: scoreToLevel(writingScore),
      speaking: scoreToLevel(speakingScore),
      overall: scoreToLevel(overall),
      score: overall,
      diagnosed: true,
    };

    setProfile(result);
    setLocalProfile(result);
    setPhase("results");
  };

  return (
    <main className={styles.main}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {phase === "intro" && (
        <div className={styles.introPage}>
          <div className={styles.introIcon}>OTE</div>
          <h1 className={styles.introTitle}>Diagnostico con repaso real</h1>
          <p className={styles.introSub}>
            Este diagnostico no es solo para sacar un nivel: cada pregunta incluye texto/audio,
            estrategia, explicacion y respuesta modelo cuando aplica.
          </p>
          <div className={styles.introSkills}>
            {skillOrder.map(skill => (
              <div key={skill} className={styles.introSkillChip}>
                <span>{skillLabels[skill]}</span>
                <span className={styles.introSkillCount}>{skillCounts[skill]} tareas</span>
              </div>
            ))}
          </div>
          <div className={styles.introInfo}>
            <div className={styles.infoItem}><span>Formato</span><span>Listening, Reading, Writing, Speaking</span></div>
            <div className={styles.infoItem}><span>Objetivo</span><span>A2-B2 del OTE normal</span></div>
            <div className={styles.infoItem}><span>Metodo</span><span>Responder, revisar, aprender</span></div>
            <div className={styles.infoItem}><span>Clave</span><span>No avanzar sin entender el error</span></div>
          </div>
          <button className={`btn btn-primary btn-lg ${styles.startBtn}`} onClick={() => setPhase("test")}>
            Empezar repaso
          </button>
        </div>
      )}

      {phase === "test" && currentQ && (
        <div className={styles.testLayout}>
          <div className={styles.testHeader}>
            <div className={styles.headerLeft}>
              <span className={`badge badge-${skillColors[currentQ.skill]}`}>
                {skillLabels[currentQ.skill]}
              </span>
              <span className={styles.diffBadge}>{currentQ.difficulty}</span>
            </div>
            <div className={styles.headerProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <span className={styles.progressLabel}>{currentIdx + 1} / {questions.length}</span>
            </div>
          </div>

          <div className={styles.skillProgress}>
            {skillOrder.map((skill, si) => {
              const done = questions.slice(0, currentIdx).filter(q => q.skill === skill).length;
              const total = skillCounts[skill];
              const isActive = skill === currentQ.skill;
              return (
                <div key={skill} className={`${styles.skillDot} ${isActive ? styles.skillDotActive : si < skillGroup ? styles.skillDotDone : ""}`}>
                  <span>{skillIcons[skill]}</span>
                  <div className={styles.skillMicroBar}>
                    <div style={{ width: `${(done / total) * 100}%`, height: "100%", background: `var(--${skill}-color, #fbbf24)`, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`${styles.questionCard} ${styles[`card_${currentQ.skill}`]}`}>
            <div className={styles.taskMeta}>
              <span>{currentQ.part}</span>
              <small>{currentQ.source}</small>
            </div>

            {currentQ.audioScript && (
              <div className={styles.audioBox}>
                <div>
                  <p className={styles.contextLabel}>Audio script de practica</p>
                  <p className={styles.contextText}>{currentQ.audioScript}</p>
                </div>
                <div className={styles.audioActions}>
                  <button className="btn btn-primary btn-sm" onClick={speakAudio}>Escuchar voz fluida</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => window.speechSynthesis.cancel()}>Parar</button>
                </div>
              </div>
            )}

            <div className={styles.vocabBox}>
              <div className={styles.vocabHeader}>
                <h3>Palabras clave</h3>
                <span>Si no conoces una, repasala antes de responder.</span>
              </div>
              <div className={styles.vocabGrid}>
                {currentQ.vocabulary.map(item => (
                  <div key={item.term} className={styles.vocabItem}>
                    <strong>{item.term}</strong>
                    <span>{item.meaning}</span>
                    <small>{item.example}</small>
                  </div>
                ))}
              </div>
            </div>

            {currentQ.context && (
              <div className={styles.contextBox}>
                <p className={styles.contextLabel}>Texto / contexto</p>
                <p className={styles.contextText}>{currentQ.context}</p>
              </div>
            )}

            <div className={styles.questionPrompt}>
              {currentQ.prompt.split("\n").map((line, i) =>
                line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
              )}
            </div>

            {currentQ.type === "choice" && currentQ.options && (
              <div className={styles.options}>
                {currentQ.options.map((opt, oi) => {
                  const selected = answer === oi;
                  const correct = isChecked && oi === currentQ.correct;
                  const wrong = isChecked && selected && oi !== currentQ.correct;
                  return (
                    <button
                      key={oi}
                      className={`${styles.optBtn} ${selected ? styles.optSelected : ""} ${correct ? styles.optCorrect : ""} ${wrong ? styles.optWrong : ""}`}
                      onClick={() => !isChecked && setAnswers(prev => ({ ...prev, [currentQ.id]: oi }))}
                      disabled={isChecked}
                    >
                      <span className={styles.optLetter}>{String.fromCharCode(65 + oi)}</span>
                      <span>{opt}</span>
                      {correct && <span className={styles.optCheck}>Correcta</span>}
                      {wrong && <span className={styles.optCross}>Revisar</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === "text" && (
              <div className={styles.textSection}>
                <textarea
                  className={`textarea ${styles.textAnswer}`}
                  placeholder={currentQ.skill === "speaking" ? "Escribe lo que dirias en voz alta..." : "Write your answer in English..."}
                  value={(answer as string) || ""}
                  onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                />
                <div className={styles.wordCount}>
                  <span className={styles.wordCountNum}>{String(answer || "").trim().split(/\s+/).filter(Boolean).length}</span>
                  <span> palabras</span>
                  <span className={styles.wordCountHint}> · objetivo minimo: {currentQ.minWordsB1}</span>
                </div>
              </div>
            )}

            {isChecked && (
              <div className={styles.feedbackPanel}>
                <div>
                  <h3>Revision</h3>
                  <p>{currentQ.explanation}</p>
                </div>
                <div>
                  <h3>Estrategia para el examen</h3>
                  <p>{currentQ.strategy}</p>
                </div>
                {currentQ.distractors && (
                  <div>
                    <h3>Distractores</h3>
                    <ul className={styles.feedbackList}>
                      {currentQ.distractors.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {currentQ.modelAnswer && (
                  <div>
                    <h3>Respuesta modelo</h3>
                    <pre>{currentQ.modelAnswer}</pre>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.testNav}>
            <button className="btn btn-ghost btn-sm" onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0}>
              Anterior
            </button>
            {!isChecked ? (
              <button className="btn btn-primary" onClick={() => setChecked(prev => ({ ...prev, [currentQ.id]: true }))} disabled={!canCheck}>
                Comprobar y repasar
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                {currentIdx === questions.length - 1 ? "Ver plan de estudio" : "Siguiente"}
              </button>
            )}
          </div>
        </div>
      )}

      {phase === "results" && profile && (
        <div className={styles.resultsPage}>
          <div className={styles.resultsBadge}>OTE</div>
          <h1 className={styles.resultsTitle}>Perfil inicial</h1>
          <p className={styles.resultsSub}>Usa esto como punto de partida. El objetivo no es presumir nivel, es saber que entrenar primero.</p>
          <div className={styles.overallBadge} style={{ borderColor: LEVEL_CONFIG[profile.overall].color + "60" }}>
            <div className={styles.overallLevelLabel} style={{ color: LEVEL_CONFIG[profile.overall].color }}>
              {LEVEL_CONFIG[profile.overall].label}
            </div>
            <p className={styles.overallDesc}>{LEVEL_CONFIG[profile.overall].desc}</p>
            <p className={styles.overallRange}>{LEVEL_CONFIG[profile.overall].range}</p>
          </div>

          <div className={styles.skillBreakdown}>
            {skillOrder.map(skill => {
              const lvl = profile[skill];
              const cfg = LEVEL_CONFIG[lvl];
              return (
                <div key={skill} className={styles.skillResult}>
                  <div className={styles.skillResultIcon}>{skillIcons[skill]}</div>
                  <div className={styles.skillResultInfo}>
                    <span className={styles.skillResultName}>{skillLabels[skill]}</span>
                    <div className={styles.skillLevelBar}>
                      <div className={styles.skillLevelFill} style={{ width: `${lvl === "A2" ? 25 : lvl === "B1" ? 55 : 82}%`, background: cfg.color }} />
                    </div>
                  </div>
                  <span className={styles.skillLevelBadge} style={{ color: cfg.color, borderColor: cfg.color + "40" }}>{cfg.label}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.personalMsg}>
            <p><strong>Siguiente paso:</strong> repasa primero el modulo mas bajo. Despues haz practica cronometrada y vuelve al simulador.</p>
          </div>
          <div className={styles.resultsActions}>
            <button className="btn btn-primary btn-lg" onClick={() => router.push("/knowledge")}>Ver guia de aprobacion</button>
            <button className="btn btn-secondary" onClick={() => { setPhase("intro"); setCurrentIdx(0); setAnswers({}); setChecked({}); }}>Repetir repaso</button>
          </div>
        </div>
      )}
    </main>
  );
}
