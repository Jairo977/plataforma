"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import {
  Play, Volume2, Pause, CheckCircle2, Headphones, MessageCircle, Mic, Speech,
  Radio, Target, Music, Square, FileText, Lightbulb, User, Users, XCircle,
  BookOpen, Bot, ListChecks, ScanSearch, Quote, RefreshCw
} from "lucide-react";
import styles from "./listening.module.css";
import { generatePracticeSession, BankQuestion } from "@/lib/question-bank";
import { speakTwice, stopSpeech } from "@/lib/tts";

type PlayState = "idle" | "play1" | "pause" | "play2" | "done";
type SpeakerChoice = "A" | "B" | "both";

const OTE_STRATEGY = {
  1: "Lee la situación y decide el foco: detalle, opinión, razón o acuerdo. Luego confirma la decisión final en la segunda escucha.",
  2: "Usa headings y orden de notas para ubicarte. Predice qué tipo de palabra o idea falta antes de escuchar.",
  3: "Divide el diálogo por statements. Escucha señales como 'having said that', 'mind you' o 'nevertheless' antes de elegir.",
  4: "No esperes las palabras exactas de las opciones. Infere significado, relación, intención o sentimiento desde todo el audio.",
};

const speakerChoices: { value: SpeakerChoice; label: string }[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "both", label: "Ambos" },
];

export default function ListeningPage() {
  const [exercises, setExercises] = useState<BankQuestion[]>([]);
  const [exIdx, setExIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [noteAnswers, setNoteAnswers] = useState<Record<number, number>>({});
  const [speakerAnswers, setSpeakerAnswers] = useState<Record<number, SpeakerChoice>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [playbackRate, setPlaybackRate] = useState<number>(0.85);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => { setExercises(generatePracticeSession("listening")); }, []);
  useEffect(() => { return () => { cancelRef.current?.(); stopSpeech(); }; }, [exIdx]);

  if (exercises.length === 0) return (
    <div className="p-8 text-center text-white" style={{ paddingTop: "8rem" }}>Cargando ejercicios...</div>
  );

  const ex = exercises[exIdx];
  const isNoteTask = Boolean(ex.noteCompletion);
  const isSpeakerTask = Boolean(ex.speakerStatements?.length);
  const isP3 = ex.part === 3;
  const optionLabels = isP3 && !isSpeakerTask
    ? [`Solo ${ex.speakerA || "Hablante A"}`, `Solo ${ex.speakerB || "Hablante B"}`, "Ambos"]
    : ex.options || [];
  const strategyText = ex.studySkill || OTE_STRATEGY[ex.part as keyof typeof OTE_STRATEGY] || OTE_STRATEGY[1];

  const noteItems = ex.noteCompletion?.sections.flatMap(section => section.items) || [];
  const noteCorrect = noteItems.length > 0 && noteItems.every(item => noteAnswers[item.id] === item.correct);
  const speakerCorrect = Boolean(ex.speakerStatements?.length) &&
    ex.speakerStatements!.every((item, i) => speakerAnswers[i] === item.correct);
  const mcqCorrect = selected === ex.correct;
  const isOverallCorrect = isNoteTask ? noteCorrect : isSpeakerTask ? speakerCorrect : mcqCorrect;

  const isCheckDisabled = () => {
    if (isNoteTask) return noteItems.some(item => noteAnswers[item.id] === undefined);
    if (isSpeakerTask) return (ex.speakerStatements || []).some((_, i) => !speakerAnswers[i]);
    return selected === null;
  };

  const handlePlay = () => {
    if (!ex.audioScript) return;
    setPlayState("play1");
    cancelRef.current = speakTwice(
      ex.audioScript,
      { rate: playbackRate },
      () => setPlayState("pause"),
      () => setPlayState("done"),
      () => setPlayState("play1"),
      () => setPlayState("play2")
    );
  };

  const handleStop = () => { cancelRef.current?.(); stopSpeech(); setPlayState("idle"); };

  const handleCheck = async () => {
    setIsChecked(true);
    const localExplanation = ex.answerExplanation || buildLocalExplanation();
    if (localExplanation) {
      setExplanation(localExplanation);
      return;
    }
    if (selected !== ex.correct) {
      setIsExplaining(true);
      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: ex.prompt, options: optionLabels, correctIndex: ex.correct, selectedIndex: selected, context: ex.audioScript }),
        });
        const data = await res.json();
        setExplanation(data.explanation);
      } catch { setExplanation("Error al obtener la explicación."); }
      finally { setIsExplaining(false); }
    }
  };

  const buildLocalExplanation = () => {
    if (isNoteTask) return "Revisa cada gap: las explicaciones debajo muestran el fragmento o paráfrasis que justifica la respuesta correcta.";
    if (isSpeakerTask) return "Revisa las señales de acuerdo, contraste o cambio de opinión marcadas en cada statement.";
    return "";
  };

  const handleReset = () => {
    handleStop();
    setSelected(null);
    setNoteAnswers({});
    setSpeakerAnswers({});
    setIsChecked(false);
    setShowTranscript(false);
    setShowHint(false);
    setExplanation("");
    setPlayState("idle");
  };

  const playLabel =
    playState === "idle" ? <><Play size={14} style={{ display: "inline", marginBottom: "2px" }} /> Reproducir x2</>
    : playState === "play1" ? <><Volume2 size={14} style={{ display: "inline", marginBottom: "2px" }} /> 1ª escucha...</>
    : playState === "pause" ? <><Pause size={14} style={{ display: "inline", marginBottom: "2px" }} /> Pausa - 2ª en 2s...</>
    : playState === "play2" ? <><Volume2 size={14} style={{ display: "inline", marginBottom: "2px" }} /> 2ª escucha...</>
    : <><CheckCircle2 size={14} style={{ display: "inline", marginBottom: "2px" }} /> Audio completo</>;

  const currentPartIcon = ex.part === 1 ? <MessageCircle size={15} /> : ex.part === 2 ? <Mic size={15} /> : ex.part === 3 ? <Speech size={15} /> : <Radio size={15} />;

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container container-lg">
          <div className={styles.layoutGrid}>
            <div className={styles.leftCol}>
              <div className={styles.header}>
                <div className="flex gap-2" style={{ alignItems: "center" }}>
                  <span className="badge badge-listening"><Headphones size={13} /> Listening</span>
                  <span className="text-muted text-sm">· Oxford Test of English B1/B2</span>
                </div>
                <h1 className={styles.heading}>Módulo Listening</h1>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Practica con audio x2, predicción, transcripción y explicación por distractores.
                </p>
              </div>

              <div className={styles.exSelector}>
                {exercises.map((e, i) => (
                  <button
                    key={e.id}
                    className={`${styles.exBtn} ${exIdx === i ? styles.exActive : ""}`}
                    onClick={() => { setExIdx(i); handleReset(); }}
                  >
                    <span className={styles.exIcon}>
                      {e.part === 1 ? <MessageCircle size={15} /> : e.part === 2 ? <Mic size={15} /> : e.part === 3 ? <Speech size={15} /> : <Radio size={15} />}
                    </span>
                    <div style={{ textAlign: "left" }}>
                      <p className={styles.exPart}>{e.partLabel}</p>
                      <p className={styles.exType}>{e.topic}</p>
                    </div>
                    <span className={`badge badge-${e.difficulty.toLowerCase()}`}>{e.difficulty}</span>
                  </button>
                ))}
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ width: "100%", marginTop: "1rem" }}
                onClick={() => { setExercises(generatePracticeSession("listening")); setExIdx(0); handleReset(); }}
              >
                <RefreshCw size={14} style={{ display: "inline", marginRight: "6px" }} />
                Cargar nueva práctica aleatoria
              </button>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.exerciseCard}>
                <div className={styles.strategyBox}>
                  <span className="icon" style={{ color: "var(--listening-color)", display: "flex", alignItems: "center" }}><Target size={16} /></span>
                  <div>
                    <p><strong>Estrategia OTE Parte {ex.part}:</strong> {strategyText}</p>
                    {ex.strategySteps && (
                      <ol className={styles.strategyList}>
                        {ex.strategySteps.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    )}
                  </div>
                </div>

                {ex.predictionPrompt && (
                  <div className={styles.predictionBox}>
                    <ScanSearch size={16} />
                    <p><strong>Antes de escuchar:</strong> {ex.predictionPrompt}</p>
                  </div>
                )}

                <div className={styles.audioPlayer}>
                  <div className={styles.audioVisual}>
                    <div className={`${styles.audioIcon} ${playState !== "idle" && playState !== "done" ? styles.audioPlaying : ""}`}>
                      {playState === "done" ? <CheckCircle2 size={18} style={{ color: "var(--writing-color)" }} /> : <Music size={18} style={{ color: "var(--listening-color)" }} />}
                    </div>
                    <div className={styles.audioInfo}>
                      <p className={styles.audioTitle}>
                        {isP3 ? `Diálogo: ${ex.speakerA || "Hablante A"} y ${ex.speakerB || "Hablante B"}` : `${ex.partLabel} · ${ex.topic}`}
                      </p>
                      <p className={styles.audioNote}>{playLabel}</p>
                      {playState !== "idle" && (
                        <div className={styles.playProgress}>
                          <div className={`${styles.playDot} ${["play1","pause","play2","done"].includes(playState) ? styles.dotActive : ""}`} />
                          <div className={styles.playLine} />
                          <div className={`${styles.playDot} ${["play2","done"].includes(playState) ? styles.dotActive : ""}`} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.audioControls}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <button
                        className={`btn ${playState === "idle" || playState === "done" ? "btn-primary" : "btn-secondary"} btn-sm`}
                        onClick={playState === "idle" || playState === "done" ? handlePlay : handleStop}
                        disabled={!ex.audioScript}
                      >
                        {playState === "idle" || playState === "done" ? <><Play size={14} style={{ display: "inline", marginBottom: "2px" }} /> Escuchar</> : <><Square size={14} style={{ display: "inline", marginBottom: "2px" }} /> Parar</>}
                      </button>
                      
                      <select 
                        value={playbackRate} 
                        onChange={(e) => setPlaybackRate(Number(e.target.value))}
                        disabled={playState !== "idle" && playState !== "done"}
                        style={{ padding: "0.3rem 0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-card)", color: "var(--text-color)", fontSize: "0.85rem", cursor: "pointer" }}
                        title="Velocidad de reproducción"
                      >
                        <option value={0.75}>Lento (0.75x)</option>
                        <option value={0.85}>Normal (0.85x)</option>
                        <option value={1.0}>Rápido (1.0x)</option>
                        <option value={1.15}>Muy rápido (1.15x)</option>
                      </select>
                    </div>

                    <button
                      className={`${styles.transcriptBtn} btn btn-ghost btn-sm`}
                      onClick={() => setShowTranscript(!showTranscript)}
                    >
                      {showTranscript ? "Ocultar" : "Ver"} transcripción
                    </button>
                  </div>
                </div>

                {showTranscript && (
                  <div className={styles.transcript}>
                    {isP3 && (
                      <div className={styles.speakerLegend}>
                        <span className={styles.speakerTagA}><User size={12} style={{ display: "inline", marginRight: "4px" }} /> {ex.speakerA || "Hablante A"}</span>
                        <span className={styles.speakerTagB}><User size={12} style={{ display: "inline", marginRight: "4px" }} /> {ex.speakerB || "Hablante B"}</span>
                      </div>
                    )}
                    <p className={styles.transcriptLabel} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><FileText size={14} /> Transcripción del audio</p>
                    <p style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>{ex.audioScript}</p>
                    {ex.transcriptHighlights && (
                      <div className={styles.highlights}>
                        {ex.transcriptHighlights.map((item) => <span key={item}><Quote size={12} /> {item}</span>)}
                      </div>
                    )}
                  </div>
                )}

                {ex.listenForHint && !isChecked && (
                  <div className={styles.listenHint}>
                    <button className={styles.hintToggle} onClick={() => setShowHint(!showHint)}>
                      <span style={{ color: "var(--gold-400)" }}><Lightbulb size={15} /></span>
                      <span>{showHint ? "Ocultar pista de escucha" : "Ver pista de escucha"}</span>
                      <span className={styles.hintChevron}>{showHint ? "▲" : "▼"}</span>
                    </button>
                    {showHint && <p className={styles.hintText}>{ex.listenForHint}</p>}
                  </div>
                )}

                <div className={styles.instruction}>
                  <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.4rem", color: "var(--listening-color)" }}>{currentPartIcon}</span>
                  {ex.prompt}
                </div>

                {isNoteTask && ex.noteCompletion && (
                  <div className={styles.noteTask}>
                    <div className={styles.noteTitle}><ListChecks size={16} /> {ex.noteCompletion.title}</div>
                    {ex.noteCompletion.sections.map((section) => (
                      <div key={section.heading} className={styles.noteSection}>
                        <h3>{section.heading}</h3>
                        {section.items.map((item) => {
                          const selectedAnswer = noteAnswers[item.id];
                          const isItemCorrect = selectedAnswer === item.correct;
                          return (
                            <div key={item.id} className={`${styles.noteItem} ${isChecked ? (isItemCorrect ? styles.noteCorrect : styles.noteWrong) : ""}`}>
                              <p><strong>{item.id}.</strong> {item.stem}</p>
                              <select
                                value={selectedAnswer ?? ""}
                                onChange={(event) => setNoteAnswers({ ...noteAnswers, [item.id]: Number(event.target.value) })}
                                disabled={isChecked}
                              >
                                <option value="" disabled>Selecciona</option>
                                {item.options.map((option, idx) => (
                                  <option key={option} value={idx}>{String.fromCharCode(65 + idx)}. {option}</option>
                                ))}
                              </select>
                              {isChecked && <p className={styles.itemExplanation}>{item.explanation}</p>}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {isSpeakerTask && ex.speakerStatements && (
                  <div className={styles.speakerTask}>
                    <div className={styles.p3Notice}>
                      <span style={{ color: "var(--text-secondary)" }}><Speech size={15} /></span>
                      <div>
                        <strong>Parte 3 - Speaker matching</strong>
                        <p>Marca si la idea la expresa <strong>{ex.speakerA || "A"}</strong>, <strong>{ex.speakerB || "B"}</strong> o <strong>Ambos</strong>.</p>
                      </div>
                    </div>
                    {ex.speakerStatements.map((item, idx) => {
                      const selectedAnswer = speakerAnswers[idx];
                      const isItemCorrect = selectedAnswer === item.correct;
                      return (
                        <div key={item.statement} className={`${styles.statementRow} ${isChecked ? (isItemCorrect ? styles.noteCorrect : styles.noteWrong) : ""}`}>
                          <p>{idx + 1}. {item.statement}</p>
                          <div className={styles.speakerChoices}>
                            {speakerChoices.map((choice) => (
                              <button
                                key={choice.value}
                                className={`${styles.speakerChoiceBtn} ${selectedAnswer === choice.value ? styles.speakerChoiceActive : ""}`}
                                onClick={() => !isChecked && setSpeakerAnswers({ ...speakerAnswers, [idx]: choice.value })}
                                disabled={isChecked}
                              >
                                {choice.value === "both" ? <Users size={13} /> : <User size={13} />}
                                {choice.label}
                              </button>
                            ))}
                          </div>
                          {isChecked && (
                            <div className={styles.itemExplanation}>
                              {item.signal && <p><strong>Señal:</strong> {item.signal}</p>}
                              <p>{item.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {!isNoteTask && !isSpeakerTask && (
                  <div className={styles.options}>
                    {optionLabels.map((opt, i) => {
                      const state = !isChecked
                        ? selected === i ? "selected" : "idle"
                        : i === ex.correct ? "correct"
                        : selected === i ? "wrong" : "idle";
                      return (
                        <button
                          key={i}
                          className={`${styles.optionBtn} ${styles[`opt_${state}`] || ""}`}
                          onClick={() => !isChecked && setSelected(i)}
                          disabled={isChecked}
                        >
                          {isP3 ? (
                            <span className={`${styles.speakerBadge} ${i === 0 ? styles.badgeA : i === 1 ? styles.badgeB : styles.badgeBoth}`}>
                              {i === 0 ? <><User size={12} style={{ display: "inline", marginBottom: "2px", marginRight: "2px" }} /> A</> : i === 1 ? <><User size={12} style={{ display: "inline", marginBottom: "2px", marginRight: "2px" }} /> B</> : <><Users size={12} style={{ display: "inline", marginBottom: "2px", marginRight: "2px" }} /> Ambos</>}
                            </span>
                          ) : (
                            <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                          )}
                          <span>{opt}</span>
                          {isChecked && i === ex.correct && <span className={styles.optCheck}>✓</span>}
                          {isChecked && selected === i && i !== ex.correct && <span className={styles.optCross}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {isChecked && !isOverallCorrect && ex.grammarTip && (
                  <div className={styles.grammarTip}>
                    <p style={{ fontWeight: 700, marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}><BookOpen size={14} style={{ color: "var(--gold-400)" }} /> Tip gramatical</p>
                    <p>{ex.grammarTip}</p>
                  </div>
                )}

                {isChecked && explanation && (
                  <div className={styles.explanation}>
                    <p style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-primary)" }}><Bot size={15} /><strong>Explicación:</strong></p>
                    <p style={{ marginTop: "0.5rem" }}>{isExplaining ? "Analizando con IA..." : explanation}</p>
                  </div>
                )}

                <div className={styles.actions}>
                  {!isChecked ? (
                    <button className="btn btn-primary" onClick={handleCheck} disabled={isCheckDisabled() || isExplaining}>
                      {isExplaining ? "Analizando..." : "Comprobar respuesta →"}
                    </button>
                  ) : (
                    <>
                      <div className={styles.result}>
                        <span style={{ color: isOverallCorrect ? "#3BAF8E" : "#B05050" }}>
                          {isOverallCorrect ? <><CheckCircle2 size={15} style={{ display: "inline", marginBottom: "2px" }} /> ¡Correcto!</> : <><XCircle size={15} style={{ display: "inline", marginBottom: "2px" }} /> Hay errores</>}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary btn-sm" onClick={handleReset} disabled={isExplaining}>Reintentar</button>
                        <button className="btn btn-primary btn-sm" onClick={() => { setExIdx((exIdx + 1) % exercises.length); handleReset(); }} disabled={isExplaining}>
                          Siguiente →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
