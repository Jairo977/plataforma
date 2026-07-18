"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import GrammarTip from "@/components/GrammarTip";
import {
  Shuffle, CheckCircle2, XCircle, RotateCcw, ArrowRight,
  Timer, Trophy, Zap, BookMarked, Layers3, Gamepad2
} from "lucide-react";
import styles from "./games.module.css";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

// ── Word Order Game ──────────────────────────────────────────────────────────
const WORD_ORDER_SENTENCES = [
  {
    words: ["I", "every", "English", "study", "morning"],
    correct: ["I", "study", "English", "every", "morning"],
    grammar: {
      concept: "Present Simple — Orden de oración afirmativa",
      formula: "Subject + Verb (base/+s) + Object + Time\nI study English every morning.",
      example: "She reads the newspaper every night.",
      highlights: ["reads"],
    },
    translation: "Yo estudio inglés cada mañana.",
  },
  {
    words: ["have", "been", "working", "here", "I", "for", "two", "years"],
    correct: ["I", "have", "been", "working", "here", "for", "two", "years"],
    grammar: {
      concept: "Present Perfect Continuous — Duración hasta ahora",
      formula: "Subject + have/has + been + V-ing + for/since + time\nI have been working here for two years.",
      example: "She has been studying Spanish for six months.",
      highlights: ["has been studying"],
    },
    translation: "He estado trabajando aquí por dos años.",
  },
  {
    words: ["if", "I", "would", "I", "studied", "more", "pass"],
    correct: ["If", "I", "studied", "more", "I", "would", "pass"],
    grammar: {
      concept: "Conditional Tipo 2 — Hipótesis en el presente",
      formula: "If + Subject + V(past simple), Subject + would + V(base)\nIf I studied more, I would pass.",
      example: "If she had more time, she would travel more.",
      highlights: ["had", "would travel"],
    },
    translation: "Si estudiara más, aprobaría.",
  },
  {
    words: ["not", "been", "to", "I", "Oxford", "have", "yet"],
    correct: ["I", "have", "not", "been", "to", "Oxford", "yet"],
    grammar: {
      concept: "Present Perfect — Negativo con 'yet'",
      formula: "Subject + have/has + not + past participle + yet\nI have not been to Oxford yet.",
      example: "She hasn't finished the exam yet.",
      highlights: ["hasn't finished", "yet"],
    },
    translation: "No he ido a Oxford todavía.",
  },
  {
    words: ["longer", "Oxford", "the", "is", "test", "than", "IELTS"],
    correct: ["The", "Oxford", "test", "is", "longer", "than", "IELTS"],
    grammar: {
      concept: "Comparativo de superioridad — adjetivos largos y cortos",
      formula: "Short adj: Subject + is + adj-er + than + Object\nThe Oxford test is longer than IELTS.",
      example: "Speaking is harder than Reading for most students.",
      highlights: ["harder than"],
    },
    translation: "El examen Oxford es más largo que el IELTS.",
  },
];

// ── Vocabulary Match ─────────────────────────────────────────────────────────
const VOCAB_PAIRS = [
  { word: "elaborate", def: "To explain in more detail" },
  { word: "concise", def: "Brief and clear, without extra words" },
  { word: "fluent", def: "Speaking smoothly without pausing" },
  { word: "coherent", def: "Logical and easy to understand" },
  { word: "paraphrase", def: "Restate using different words" },
  { word: "infer", def: "Reach a conclusion from evidence" },
  { word: "proficient", def: "Skilled and competent in something" },
  { word: "lexis", def: "The vocabulary of a language" },
];

// ── Grammar Quick Quiz ───────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: "Choose the correct sentence:",
    options: [
      "She have been studying for three hours.",
      "She has been studying for three hours.",
      "She is studying since three hours.",
      "She was studying for three hours ago.",
    ],
    correct: 1,
    grammar: {
      concept: "Present Perfect Continuous — con 'for'",
      formula: "Subject + has/have + been + V-ing + for + duration",
      example: "She has been studying for three hours.",
      highlights: ["has been studying"],
    },
  },
  {
    q: "Which word best completes this sentence? 'The exam was difficult; ___, I passed.'",
    options: ["because", "although", "however", "despite"],
    correct: 2,
    grammar: {
      concept: "Conectores de contraste — 'however'",
      formula: "Clause 1; however, + Clause 2\n(contrasts two ideas — use after a semicolon or new sentence)",
      example: "It was raining; however, we went for a walk.",
      highlights: ["however"],
    },
  },
  {
    q: "Choose the correct passive form: 'They test candidates every year.'",
    options: [
      "Candidates are testing every year.",
      "Candidates are tested every year.",
      "Candidates were tested every year.",
      "Candidates have tested every year.",
    ],
    correct: 1,
    grammar: {
      concept: "Pasiva — Present Simple",
      formula: "Subject + am/is/are + past participle (+ by + agent)\nCandidates are tested every year.",
      example: "English is spoken in more than 50 countries.",
      highlights: ["is spoken"],
    },
  },
  {
    q: "Which sentence uses the correct register for a formal email?",
    options: [
      "Hey, just writing to ask about the test.",
      "I am writing to enquire about the examination.",
      "Wanna know more about the exam btw.",
      "Can u send me info about the test?",
    ],
    correct: 1,
    grammar: {
      concept: "Registro formal en Writing — OTE Part 1",
      formula: "I am writing to + infinitive\nI am writing to enquire / inform / request / confirm...",
      example: "I am writing to enquire about the date of the Oxford examination.",
      highlights: ["am writing to enquire"],
    },
  },
  {
    q: "Select the sentence with a correct relative clause:",
    options: [
      "The student which passed is my friend.",
      "The student, whose grade was highest, won.",
      "The student who's grade was highest won.",
      "The student that's grade was highest won.",
    ],
    correct: 1,
    grammar: {
      concept: "Cláusula relativa con 'whose' (posesión)",
      formula: "Noun + , + whose + noun + verb + , + main clause\nThe student, whose grade was highest, won.",
      example: "She is the teacher whose students all passed B2.",
      highlights: ["whose students"],
    },
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   WORD ORDER GAME
───────────────────────────────────────────────────────────────────────────── */
function WordOrderGame() {
  const [idx, setIdx] = useState(0);
  const [available, setAvailable] = useState<string[]>([]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const sentence = WORD_ORDER_SENTENCES[idx];

  const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setAvailable(shuffle(sentence.words));
    setPlaced([]);
    setChecked(false);
  }, [idx]);

  const addWord = (word: string, i: number) => {
    if (checked) return;
    setAvailable(a => a.filter((_, j) => j !== i));
    setPlaced(p => [...p, word]);
  };

  const removeWord = (word: string, i: number) => {
    if (checked) return;
    setPlaced(p => p.filter((_, j) => j !== i));
    setAvailable(a => [...a, word]);
  };

  const check = () => {
    setChecked(true);
    const correct = placed.every((w, i) =>
      w.toLowerCase() === sentence.correct[i]?.toLowerCase()
    ) && placed.length === sentence.correct.length;
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    setIdx((idx + 1) % WORD_ORDER_SENTENCES.length);
  };

  const isCorrectSentence =
    checked &&
    placed.every((w, i) => w.toLowerCase() === sentence.correct[i]?.toLowerCase()) &&
    placed.length === sentence.correct.length;

  return (
    <div className={styles.gameSection}>
      <div className={styles.gameHeader}>
        <div className={styles.gameTitle}>
          <Shuffle size={18} strokeWidth={2} />
          <h2>Ordena la Oración</h2>
        </div>
        <div className={styles.scorePill}>
          <Trophy size={13} /> {score}/{WORD_ORDER_SENTENCES.length}
        </div>
      </div>
      <p className={styles.gameDesc}>
        Toca las palabras en el orden correcto para formar la oración en inglés.
      </p>

      <div className={styles.translationHint}>
        <BookMarked size={13} />
        <span>{sentence.translation}</span>
      </div>

      {/* Drop zone — placed words */}
      <div className={`${styles.dropZone} ${isCorrectSentence ? styles.dropCorrect : checked ? styles.dropWrong : ""}`}>
        {placed.length === 0 && (
          <span className={styles.dropPlaceholder}>Toca las palabras de abajo para ordenarlas aquí...</span>
        )}
        {placed.map((w, i) => (
          <button
            key={i}
            className={`${styles.tile} ${checked ? isCorrectSentence ? styles.tileCorrect : styles.tileWrong : styles.tilePlaced}`}
            onClick={() => removeWord(w, i)}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Available tiles */}
      <div className={styles.tilesRow}>
        {available.map((w, i) => (
          <button key={i} className={styles.tile} onClick={() => addWord(w, i)}>
            {w}
          </button>
        ))}
      </div>

      {/* Result */}
      {checked && (
        <div className={isCorrectSentence ? styles.resultCorrect : styles.resultWrong}>
          {isCorrectSentence
            ? <><CheckCircle2 size={16} /> ¡Correcto! <span className={styles.resultSub}>"{sentence.correct.join(" ")}"</span></>
            : <><XCircle size={16} /> Incorrecto — respuesta: <span className={styles.resultSub}>"{sentence.correct.join(" ")}"</span></>
          }
        </div>
      )}

      {/* Grammar Tip */}
      <GrammarTip data={sentence.grammar} defaultOpen={checked} />

      {/* Actions */}
      <div className={styles.gameActions}>
        {!checked ? (
          <>
            <button className="btn btn-secondary btn-sm" onClick={() => { setAvailable(shuffle(sentence.words)); setPlaced([]); }}>
              <RotateCcw size={13} /> Reiniciar
            </button>
            <button className="btn btn-primary btn-sm" onClick={check} disabled={placed.length === 0}>
              <CheckCircle2 size={13} /> Comprobar
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={next}>
            Siguiente <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   VOCABULARY MATCH
───────────────────────────────────────────────────────────────────────────── */
function VocabMatch() {
  const [pairs] = useState(() => VOCAB_PAIRS.sort(() => Math.random() - 0.5).slice(0, 5));
  const [shuffledDefs] = useState(() => [...pairs].sort(() => Math.random() - 0.5).map(p => p.def));
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedWord && selectedDef) {
      const correct = pairs.find(p => p.word === selectedWord)?.def === selectedDef;
      if (correct) {
        setMatched(m => ({ ...m, [selectedWord]: selectedDef }));
        setScore(s => s + 1);
        setSelectedWord(null); setSelectedDef(null);
      } else {
        setWrong(selectedWord);
        setTimeout(() => { setWrong(null); setSelectedWord(null); setSelectedDef(null); }, 700);
      }
    }
  }, [selectedWord, selectedDef, pairs]);

  const allDone = Object.keys(matched).length === pairs.length;

  return (
    <div className={styles.gameSection}>
      <div className={styles.gameHeader}>
        <div className={styles.gameTitle}>
          <Layers3 size={18} strokeWidth={2} />
          <h2>Vocabulario OTE</h2>
        </div>
        <div className={styles.scorePill}>
          <Trophy size={13} /> {score}/{pairs.length}
        </div>
      </div>
      <p className={styles.gameDesc}>
        Conecta cada palabra con su definición en inglés — vocabulario real del examen OTE.
      </p>

      {allDone ? (
        <div className={styles.resultCorrect} style={{ justifyContent: "center", padding: "1.5rem" }}>
          <Trophy size={20} />
          <span>¡Completado! Puntuación: {score}/{pairs.length}</span>
        </div>
      ) : (
        <div className={styles.matchGrid}>
          <div className={styles.matchCol}>
            <p className={styles.matchColLabel}>Palabra</p>
            {pairs.map(p => (
              <button
                key={p.word}
                className={`${styles.matchItem} ${matched[p.word] ? styles.matchDone : selectedWord === p.word ? styles.matchSelected : wrong === p.word ? styles.matchWrong : ""}`}
                onClick={() => !matched[p.word] && setSelectedWord(p.word)}
                disabled={!!matched[p.word]}
              >
                {p.word}
              </button>
            ))}
          </div>
          <div className={styles.matchCol}>
            <p className={styles.matchColLabel}>Definición</p>
            {shuffledDefs.map((def, i) => {
              const isMatchedDef = Object.values(matched).includes(def);
              const isSelected = selectedDef === def;
              return (
                <button
                  key={i}
                  className={`${styles.matchItem} ${isMatchedDef ? styles.matchDone : isSelected ? styles.matchSelected : ""}`}
                  onClick={() => !isMatchedDef && setSelectedDef(def)}
                  disabled={isMatchedDef}
                  style={{ textAlign: "left" }}
                >
                  {def}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   GRAMMAR QUICK QUIZ
───────────────────────────────────────────────────────────────────────────── */
const TIMER_TOTAL = 20;

function GrammarQuiz() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_TOTAL);
  const [done, setDone] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = QUIZ_QUESTIONS[qIdx];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIMER_TOTAL);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handleCheck(null); return 0; }
        return t - 1;
      });
    }, 1000);
  }, [qIdx]);

  useEffect(() => {
    setSelected(null); setChecked(false);
    if (!done) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [qIdx, done]);

  const handleCheck = (sel: number | null) => {
    if (checked) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const finalSel = sel ?? selected;
    setSelected(finalSel);
    setChecked(true);
    if (finalSel === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) { setDone(true); return; }
    setQIdx(i => i + 1);
  };

  const reset = () => {
    setQIdx(0); setScore(0); setDone(false);
    setSelected(null); setChecked(false);
  };

  const pct = (timeLeft / TIMER_TOTAL) * 100;
  const urgent = timeLeft <= 7;

  if (done) {
    const stars = score >= 5 ? "B2" : score >= 3 ? "B1" : "A2/B1";
    return (
      <div className={styles.gameSection}>
        <div className={styles.gameHeader}>
          <div className={styles.gameTitle}><Zap size={18} /><h2>Quiz Rápido</h2></div>
        </div>
        <div className={styles.quizDone}>
          <Trophy size={36} style={{ color: "var(--gold-400)" }} />
          <p className={styles.quizScore}>{score}/{QUIZ_QUESTIONS.length}</p>
          <p className={styles.quizLevel}>Nivel estimado: <strong>{stars}</strong></p>
          <button className="btn btn-primary" onClick={reset}>
            <RotateCcw size={14} /> Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gameSection}>
      <div className={styles.gameHeader}>
        <div className={styles.gameTitle}><Zap size={18} /><h2>Quiz Rápido de Gramática</h2></div>
        <div className={styles.scorePill}><Trophy size={13} /> {score}/{QUIZ_QUESTIONS.length}</div>
      </div>
      <p className={styles.gameDesc}>
        {TIMER_TOTAL}s por pregunta — igual que la presión del examen real.
      </p>

      {/* Timer */}
      <div className={`quiz-timer ${urgent ? "urgent" : ""}`}>
        <Timer size={14} />
        <span>{timeLeft}s</span>
        <div className="quiz-progress">
          <div className={`quiz-progress-fill ${urgent ? "urgent" : ""}`} style={{ width: `${pct}%` }} />
        </div>
        <span style={{ fontSize: "0.72rem" }}>{qIdx + 1}/{QUIZ_QUESTIONS.length}</span>
      </div>

      {/* Question */}
      <div className={styles.quizQuestion}>{q.q}</div>

      {/* Options */}
      <div className={styles.quizOptions}>
        {q.options.map((opt, i) => {
          const state = !checked ? (selected === i ? "selected" : "idle")
            : i === q.correct ? "correct"
            : selected === i ? "wrong" : "idle";
          return (
            <button
              key={i}
              className={`${styles.quizOpt} ${styles[`opt_${state}`] || ""}`}
              onClick={() => { if (!checked) { setSelected(i); handleCheck(i); } }}
              disabled={checked}
            >
              <span className={styles.quizOptLetter}>{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
              {checked && i === q.correct && <CheckCircle2 size={15} style={{ marginLeft: "auto", color: "var(--writing-color)" }} />}
              {checked && selected === i && i !== q.correct && <XCircle size={15} style={{ marginLeft: "auto", color: "#B05050" }} />}
            </button>
          );
        })}
      </div>

      {/* Grammar tip — shown after answering */}
      {checked && <GrammarTip data={q.grammar} defaultOpen />}

      {checked && (
        <div className={styles.gameActions}>
          <button className="btn btn-primary btn-sm" onClick={handleNext}>
            {qIdx + 1 >= QUIZ_QUESTIONS.length ? "Ver resultado" : "Siguiente"} <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
const GAMES = [
  { id: "wordorder", label: "Ordena la Oración", Icon: Shuffle, desc: "Ordena las palabras para formar una oración correcta. Fórmula gramatical en cada ejercicio." },
  { id: "vocab",     label: "Vocabulario OTE",   Icon: Layers3, desc: "Conecta palabras académicas con sus definiciones en inglés." },
  { id: "quiz",      label: "Quiz Rápido",        Icon: Zap,    desc: "5 preguntas de gramática con temporizador de 20 segundos." },
];

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState("quiz");

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container container-sm">
          <div className={styles.header}>
            <span className="badge badge-gold">
              <Gamepad2 size={11} /> Juegos de práctica
            </span>
            <h1 className={styles.heading}>Aprende jugando</h1>
            <p className={styles.headerDesc}>
              Ejercicios interactivos diseñados para reforzar gramática y vocabulario
              real del Oxford Test of English.
            </p>
          </div>

          {/* Game selector */}
          <div className={styles.gameSelector}>
            {GAMES.map(({ id, label, Icon, desc }) => (
              <button
                key={id}
                className={`${styles.gameSelectorBtn} ${activeGame === id ? styles.gameSelectorActive : ""}`}
                onClick={() => setActiveGame(id)}
              >
                <Icon size={20} strokeWidth={1.8} />
                <div>
                  <p className={styles.gameSelectorLabel}>{label}</p>
                  <p className={styles.gameSelectorDesc}>{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Active game */}
          {activeGame === "wordorder" && <WordOrderGame />}
          {activeGame === "vocab"     && <VocabMatch />}
          {activeGame === "quiz"      && <GrammarQuiz />}
        </div>
      </main>
    </>
  );
}


