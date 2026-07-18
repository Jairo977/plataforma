"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  BookOpen, FileText, Target, Lightbulb, Bot, CheckCircle2, XCircle, RefreshCw
} from "lucide-react";
import styles from "./reading.module.css";
import { generatePracticeSession, BankQuestion } from "@/lib/question-bank";

const OTE_STRATEGY = {
  1: "Lee la pregunta ANTES del texto para saber qué buscar. No leas el texto entero primero. Cuidado con los distractores que dicen algo cierto pero no responden la pregunta.",
  2: "Busca 'keywords' en las preguntas y luego escanea (scan) los textos buscando sinónimos o parafraseo, nunca las mismas palabras exactas.",
  3: "Lee el texto rápido (skim) para entender el contexto. Luego analiza las palabras de referencia ('this', 'they', 'however') antes y después de cada hueco (gap).",
  4: "Para preguntas de significado implícito, busca el tono del autor (e.g. 'unfortunately', 'surprisingly'). La respuesta correcta a menudo resume todo un párrafo.",
};

export default function ReadingPage() {
  const [exercises, setExercises] = useState<BankQuestion[]>([]);
  const [exIdx, setExIdx] = useState(0);
  
  // State for MCQ (Parts 1 & 4)
  const [selected, setSelected] = useState<number | null>(null);
  
  // State for Matching (Part 2)
  const [matchingAnswers, setMatchingAnswers] = useState<Record<number, string>>({});
  
  // State for Gapped Text (Part 3)
  const [gappedAnswers, setGappedAnswers] = useState<Record<number, string>>({});
  
  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);

  useEffect(() => { setExercises(generatePracticeSession("reading")); }, []);

  if (exercises.length === 0) return <div className="p-8 text-center text-white">Cargando ejercicios...</div>;

  const ex = exercises[exIdx];
  const strategyText = OTE_STRATEGY[ex.part as keyof typeof OTE_STRATEGY] || OTE_STRATEGY[1];

  // Helper to check if completely correct
  const isPart1or4Correct = selected === ex.correct;
  const isPart2Correct = ex.matchingQuestions && ex.matchingQuestions.every((q, i) => matchingAnswers[i] === q.correctProfileId);
  const isPart3Correct = ex.gappedAnswers && ex.gappedAnswers.every(ans => gappedAnswers[ans.gapNumber] === ans.correctSentenceId);
  
  const isOverallCorrect = ex.part === 1 || ex.part === 4 ? isPart1or4Correct : ex.part === 2 ? isPart2Correct : isPart3Correct;

  const handleCheck = async () => {
    setIsChecked(true);
    // Basic AI explanation logic for Part 1/4 (can be expanded for 2/3)
    if ((ex.part === 1 || ex.part === 4) && !isOverallCorrect) {
      setIsExplaining(true);
      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: ex.prompt, options: ex.options, correctIndex: ex.correct, selectedIndex: selected, context: ex.context })
        });
        const data = await res.json();
        setExplanation(data.explanation);
      } catch { setExplanation("Error al obtener la explicación."); }
      finally { setIsExplaining(false); }
    } else {
      setExplanation("Revisa las respuestas marcadas en rojo para ver dónde te equivocaste.");
    }
  };

  const handleReset = () => { 
    setSelected(null); 
    setMatchingAnswers({});
    setGappedAnswers({});
    setIsChecked(false); 
    setExplanation(""); 
    setShowHint(false); 
  };

  const isCheckDisabled = () => {
    if (ex.part === 1 || ex.part === 4) return selected === null;
    if (ex.part === 2) return Object.keys(matchingAnswers).length < (ex.matchingQuestions?.length || 0);
    if (ex.part === 3) return Object.keys(gappedAnswers).length < (ex.gappedAnswers?.length || 0);
    return false;
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container container-lg">
          <div className={styles.layoutGrid}>
            
            {/* ── LEFT COLUMN ── */}
            <div className={styles.leftCol}>
              <div className={styles.header}>
                <div className="flex gap-2" style={{ alignItems: "center" }}>
                  <span className="badge badge-reading"><BookOpen size={13} /> Reading</span>
                  <span className="text-muted text-sm">· Oxford Test of English B1/B2</span>
                </div>
                <h1 className={styles.heading}>Módulo Reading</h1>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Textos reales tipo OTE — matching, gap-fill, opción múltiple y comprensión larga.
                </p>
              </div>

              <div className={styles.exSelector}>
                {exercises.map((e, i) => (
                  <button
                    key={e.id}
                    className={`${styles.exBtn} ${exIdx === i ? styles.exActive : ""}`}
                    onClick={() => { setExIdx(i); handleReset(); }}
                  >
                    <span><FileText size={15} /></span>
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
                onClick={() => { setExercises(generatePracticeSession("reading")); setExIdx(0); handleReset(); }}
              >
                <RefreshCw size={14} style={{ display: "inline", marginRight: "6px" }} />
                Cargar nueva práctica aleatoria
              </button>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className={styles.rightCol}>
              <div className={styles.exerciseCard}>

                {/* Strategy always visible */}
                <div className={styles.strategyBox}>
                  <span style={{ flexShrink: 0, marginTop: "2px", color: "var(--reading-color)" }}><Target size={15} /></span>
                  <p><strong>Estrategia OTE Parte {ex.part}:</strong> {strategyText}</p>
                </div>

                {/* ── PART 1 & 4 (Multiple Choice) ── */}
                {(ex.part === 1 || ex.part === 4) && (
                  <>
                    {ex.context && (
                      <div className={styles.textContainer} style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                        <p><i>{ex.context}</i></p>
                      </div>
                    )}
                    <div className={styles.textContainer} style={{ whiteSpace: "pre-wrap" }}>
                      {ex.prompt}
                    </div>
                    {ex.options && (
                      <div className={styles.options}>
                        {ex.options.map((opt, i) => {
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
                              <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                              <span>{opt}</span>
                              {isChecked && i === ex.correct && <span className={styles.optCheck}>✓</span>}
                              {isChecked && selected === i && i !== ex.correct && <span className={styles.optCross}>✗</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* ── PART 2 (Multiple Matching) ── */}
                {ex.part === 2 && ex.matchingProfiles && ex.matchingQuestions && (
                  <>
                    <div className={styles.instruction}>{ex.prompt}</div>
                    <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                      {ex.matchingProfiles.map(profile => (
                        <div key={profile.id} style={{ background: "var(--surface-color)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                          <h4 style={{ marginBottom: "0.5rem", color: "var(--text-primary)" }}>{profile.title}</h4>
                          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{profile.text}</p>
                        </div>
                      ))}
                    </div>
                    <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>Questions</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                      {ex.matchingQuestions.map((q, i) => {
                        const isQCorrect = matchingAnswers[i] === q.correctProfileId;
                        return (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-color)", padding: "0.8rem 1rem", borderRadius: "8px", border: isChecked ? (isQCorrect ? "1px solid #3BAF8E" : "1px solid #B05050") : "1px solid var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem", paddingRight: "1rem" }}>{i + 1}. {q.question}</span>
                            <select 
                              value={matchingAnswers[i] || ""} 
                              onChange={(e) => setMatchingAnswers({ ...matchingAnswers, [i]: e.target.value })}
                              disabled={isChecked}
                              style={{ padding: "0.4rem", borderRadius: "4px", background: "var(--surface-color)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}
                            >
                              <option value="" disabled>--</option>
                              {ex.matchingProfiles?.map(p => (
                                <option key={p.id} value={p.id}>{p.id}</option>
                              ))}
                            </select>
                            {isChecked && (
                              <span style={{ marginLeft: "0.5rem", color: isQCorrect ? "#3BAF8E" : "#B05050" }}>
                                {isQCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ── PART 3 (Gapped Text) ── */}
                {ex.part === 3 && ex.gappedText && ex.gappedSentences && ex.gappedAnswers && (
                  <>
                    <div className={styles.instruction}>{ex.prompt}</div>
                    
                    <div style={{ background: "var(--surface-color)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "2rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                      {/* Render text with gaps */}
                      {ex.gappedText.split(/(\[\d+\])/).map((segment, idx) => {
                        const match = segment.match(/\[(\d+)\]/);
                        if (match) {
                          const gapNum = parseInt(match[1]);
                          const correctSentence = ex.gappedAnswers?.find(a => a.gapNumber === gapNum)?.correctSentenceId;
                          const isGapCorrect = gappedAnswers[gapNum] === correctSentence;
                          
                          return (
                            <span key={idx} style={{ display: "inline-block", margin: "0 0.4rem" }}>
                              <select 
                                value={gappedAnswers[gapNum] || ""} 
                                onChange={(e) => setGappedAnswers({ ...gappedAnswers, [gapNum]: e.target.value })}
                                disabled={isChecked}
                                style={{ padding: "0.2rem 0.5rem", borderRadius: "4px", background: isChecked ? (isGapCorrect ? "rgba(59,175,142,0.1)" : "rgba(176,80,80,0.1)") : "var(--bg-color)", color: "var(--accent-color)", border: isChecked ? (isGapCorrect ? "1px solid #3BAF8E" : "1px solid #B05050") : "1px dashed var(--accent-color)", fontWeight: "bold" }}
                              >
                                <option value="" disabled>[{gapNum}]</option>
                                {ex.gappedSentences?.map(s => (
                                  <option key={s.id} value={s.id}>{s.id}</option>
                                ))}
                              </select>
                            </span>
                          );
                        }
                        return <span key={idx} dangerouslySetInnerHTML={{ __html: segment.replace(/\n/g, '<br/>') }} />;
                      })}
                    </div>

                    <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>Sentences</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                      {ex.gappedSentences.map(s => (
                        <div key={s.id} style={{ display: "flex", gap: "1rem", background: "var(--bg-color)", padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                          <strong style={{ color: "var(--accent-color)" }}>{s.id}</strong>
                          <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Inference hint (collapsible, before answering) */}
                {ex.inferenceHint && !isChecked && (
                  <div
                    className={styles.tipBox}
                    onClick={() => setShowHint(!showHint)}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <span style={{ color: "var(--gold-400)" }}><Lightbulb size={15} /></span>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>{showHint ? "Ocultar estrategia OTE" : "Ver estrategia de inferencia OTE"}</p>
                      {showHint && <p style={{ marginTop: "0.4rem", fontWeight: 400 }}>{ex.inferenceHint}</p>}
                    </div>
                  </div>
                )}

                {/* AI explanation or generic feedback */}
                {isChecked && !isOverallCorrect && explanation && (
                  <div className={styles.explanation} style={{ marginTop: "1.5rem" }}>
                    <p style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-primary)" }}><Bot size={15} /><strong>Feedback:</strong></p>
                    <p style={{ marginTop: "0.5rem", lineHeight: 1.6 }}>{isExplaining ? "Analizando con IA..." : explanation}</p>
                  </div>
                )}

                {/* Actions */}
                <div className={styles.actions} style={{ marginTop: "2rem" }}>
                  {!isChecked ? (
                    <button className="btn btn-primary" onClick={handleCheck} disabled={isCheckDisabled() || isExplaining}>
                      {isExplaining ? "Analizando..." : "Comprobar respuesta →"}
                    </button>
                  ) : (
                    <>
                      <div className={styles.result}>
                        <span style={{ color: isOverallCorrect ? "#3BAF8E" : "#B05050" }}>
                          {isOverallCorrect ? <><CheckCircle2 size={15} style={{ display: "inline", marginBottom: "2px" }} /> ¡Todo correcto!</> : <><XCircle size={15} style={{ display: "inline", marginBottom: "2px" }} /> Hay errores</>}
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
