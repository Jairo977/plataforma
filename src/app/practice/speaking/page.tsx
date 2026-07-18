"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import {
  Lightbulb, Edit3, Speech, Mic, Timer, Hourglass, Bot, BarChart3,
  Play, Square, RotateCcw, ChevronDown, ChevronUp, Languages, RefreshCw
} from "lucide-react";
import styles from "./speaking.module.css";
import { generatePracticeSession, BankQuestion } from "@/lib/question-bank";
import SpeakingEvaluator from "@/components/SpeakingEvaluator";

// ── Score bar helper ──────────────────────────────────────────────────────────
function scoreColor(score: number): string {
  if (score >= 4.5) return "#3BAF8E";
  if (score >= 3.5) return "#D4A830";
  if (score >= 2.5) return "#C87D50";
  return "#B05050";
}

// ── Part info content ─────────────────────────────────────────────────────────
const partDescriptions: Record<number, { time: string; tip: string }> = {
  1: { time: "10–20 seg por pregunta", tip: "Responde directo → razón → ejemplo corto." },
  2: { time: "20s preparación · 40s respuesta", tip: "Cubre los 3 puntos del prompt o perderás puntos." },
  3: { time: "30s preparación · 60s habla", tip: "Usa 'On the one hand… Conversely…' para estructurar." },
  4: { time: "30 seg por pregunta", tip: "Profundiza con ejemplos personales, no enumeres." },
};

// ── Speech Recognition hook ───────────────────────────────────────────────────
function useSpeechRecognition(onResult: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SR);
  }, []);

  const startRecording = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    let finalText = "";
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalText += event.results[i][0].transcript + " ";
        else interim += event.results[i][0].transcript;
      }
      const combined = (finalText + interim).trim();
      setTranscript(combined);
      onResult(combined);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setTranscript("");
  }, [onResult]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  return { startRecording, stopRecording, isRecording, isSupported, transcript };
}

// ── Model example card (collapsible) ─────────────────────────────────────────
function ModelCard({ example, translation, topic }: { example: string; translation?: string; topic?: string }) {
  const [open, setOpen] = useState(false);
  const [showEs, setShowEs] = useState(false);
  return (
    <div className={styles.modelCard}>
      <button className={styles.modelCardToggle} onClick={() => setOpen(!open)}>
        <Lightbulb size={15} />
        <span>Ver respuesta modelo — adapta a tu caso</span>
        <span className={styles.modelCardChevron}>{open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>
      {open && (
        <div className={styles.modelCardBody}>
          <p className={styles.modelText}>"{example}"</p>
          {translation && (
            <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              <button 
                onClick={() => setShowEs(!showEs)}
                style={{ fontSize: "0.85rem", background: "none", border: "none", color: "var(--accent-color)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: 0 }}
              >
                <Languages size={14} />
                {showEs ? "Ocultar traducción" : "Ver qué significa en español"}
              </button>
              {showEs && (
                <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic", paddingLeft: "12px", borderLeft: "2px solid var(--border-color)" }}>
                  {translation}
                </p>
              )}
            </div>
          )}
          <div className={styles.adaptNote}>
            <Edit3 size={15} style={{ flexShrink: 0 }} />
            <span>Sustituye los detalles personales del ejemplo por los tuyos propios.</span>
          </div>
          
          <div style={{ marginTop: "1.5rem" }}>
            <SpeakingEvaluator expectedText={example} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Score row component ───────────────────────────────────────────────────────
function ScoreRow({ label, score, comment }: { label: string; score: number; comment: string }) {
  const pct = Math.round((score / 5) * 100);
  return (
    <div className={styles.scoreRow}>
      <div className={styles.scoreRowHeader}>
        <span className={styles.scoreLabel}>{label}</span>
        <span className={styles.scoreNum}>{score}/5</span>
      </div>
      <div className={styles.scoreBar}>
        <div className={styles.scoreFill} style={{ width: `${pct}%`, background: scoreColor(score) }} />
      </div>
      <p className={styles.scoreComment}>{comment}</p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SpeakingPage() {
  const [activeTab, setActiveTab] = useState<"simulator" | "pronunciation">("simulator");
  const [exercises, setExercises] = useState<BankQuestion[]>([]);
  const [exIdx, setExIdx] = useState(0);
  const [status, setStatus] = useState<"idle" | "preparing" | "recording" | "evaluating" | "finished">("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [transcriptText, setTranscriptText] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [manualText, setManualText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { startRecording, stopRecording, isSupported } = useSpeechRecognition((text) => {
    setTranscriptText(text);
  });

  useEffect(() => {
    setExercises(generatePracticeSession("speaking"));
  }, []);

  const ex = exercises[exIdx];
  const partInfo = ex ? partDescriptions[ex.part] ?? null : null;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopRecording();
    };
  }, [stopRecording]);

  const startPrep = () => {
    setStatus("preparing");
    setTimeLeft(10);
    setTranscriptText("");
    setManualText("");
    setFeedback(null);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); startRecordingPhase(); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecordingPhase = () => {
    setStatus("recording");
    setTimeLeft(ex?.timeSeconds || 30);
    if (isSupported) startRecording();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); stopRecordingPhase(); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const forceStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopRecordingPhase();
  };

  const stopRecordingPhase = async () => {
    stopRecording();
    setStatus("evaluating");
    const finalAnswer = manualText || transcriptText;
    if (!finalAnswer || finalAnswer.trim().length === 0) {
      setFeedback({ generalComment: "No pudimos detectar audio. Intenta de nuevo hablando claramente.", overall: "N/A" });
      setStatus("finished");
      return;
    }
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: "speaking", prompt: ex.prompt, text: finalAnswer, minWords: 10 })
      });
      const data = await res.json();
      setFeedback(data.feedback ?? { generalComment: "Error al evaluar." });
    } catch {
      setFeedback({ generalComment: "Error de conexión." });
    }
    setStatus("finished");
  };

  const handleNext = () => {
    setExIdx((exIdx + 1) % exercises.length);
    setStatus("idle"); setTimeLeft(0);
    setTranscriptText(""); setManualText(""); setFeedback(null);
  };

  if (exercises.length === 0) return <div className="p-8 text-center text-white">Cargando ejercicios...</div>;

  const pronunciationSentences = exercises.flatMap(q => 
    (q.subQuestions || []).map(sq => sq.modelExample).filter(Boolean)
  ).filter(Boolean) as string[];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container container-lg">
          
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <button 
              className={`btn ${activeTab === "simulator" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("simulator")}
            >
              Simulador OTE
            </button>
            <button 
              className={`btn ${activeTab === "pronunciation" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("pronunciation")}
            >
              Mini-Juego: Reto de Pronunciación
            </button>
          </div>

          {activeTab === "simulator" ? (
          <div className={styles.layoutGrid}>
            
            {/* ── LEFT COLUMN ── */}
            <div className={styles.leftCol}>
              {/* ── Header ── */}
          <div className={styles.header}>
            <div className="flex gap-2" style={{ alignItems: "center" }}>
              <span className="badge badge-speaking"><Speech size={13} /> Speaking</span>
              <span className="text-muted text-sm">· Oxford Test of English B1/B2</span>
            </div>
            <h1 className={styles.heading}>Módulo Speaking</h1>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Habla con naturalidad — la IA evalúa según los 4 criterios OTE: Task Fulfilment, Fluency, Grammar y Lexis.
            </p>
          </div>

          {/* ── Exercise selector ── */}
          <div className={styles.exSelector}>
            {exercises.map((e, i) => (
              <button
                key={e.id}
                className={`${styles.exBtn} ${exIdx === i ? styles.exActive : ""}`}
                onClick={() => {
                  if (status !== "idle" && status !== "finished") return;
                  setExIdx(i); setStatus("idle"); setFeedback(null); setTranscriptText("");
                }}
                disabled={status === "preparing" || status === "recording" || status === "evaluating"}
              >
                <span><Mic size={15} /></span>
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
            onClick={() => { setExercises(generatePracticeSession("speaking")); setExIdx(0); setFeedback(null); }}
          >
            <RefreshCw size={14} style={{ display: "inline", marginRight: "6px" }} />
            Cargar nueva práctica aleatoria
          </button>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className={styles.rightCol}>
              {/* ── Part info strip ── */}
              {partInfo && (
            <div className={styles.partInfo}>
              <span><Timer size={14} style={{ display: "inline", marginBottom: "2px", marginRight: "4px" }} /> <strong>{partInfo.time}</strong></span>
              <span>·</span>
              <span>{partInfo.tip}</span>
            </div>
          )}

          {/* ── Exercise card ── */}
          <div className={styles.exerciseCard}>
            {/* Criteria pills */}
            <div className={styles.criteriaRow}>
              {["Task Fulfilment", "Fluency", "Grammar", "Lexis"].map(c => (
                <span key={c} className={styles.criteriaTag}>{c}</span>
              ))}
            </div>

            {ex.context && (
              <div className={styles.contextBox}>{ex.context}</div>
            )}

            {/* ── Images for Part 3 ── */}
            {ex.images && ex.images.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                {ex.images.map((img: string, i: number) => (
                  <img key={i} src={img} alt={`Imagen ${i+1}`} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-color)" }} />
                ))}
              </div>
            )}

            <div className={styles.promptBox} style={{ whiteSpace: "pre-wrap", marginBottom: ex.subQuestions ? "1.5rem" : "1.5rem" }}>
              {ex.prompt}
            </div>

            {/* ── Sub-questions for Part 1 and 4 ── */}
            {ex.subQuestions ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                {ex.subQuestions.map((sq: any, i: number) => (
                  <div key={i} style={{ padding: "1rem", backgroundColor: "var(--surface-color)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
                    <p style={{ fontWeight: 500, marginBottom: sq.modelExample || sq.grammarTip ? "0.75rem" : "0", color: "var(--text-color)" }}>
                      {i + 1}. {sq.question}
                    </p>
                    {sq.grammarTip && (
                       <div style={{ fontSize: "0.85rem", color: "var(--gold-400)", marginBottom: sq.modelExample ? "0.75rem" : "0", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                         <Lightbulb size={14} style={{ marginTop: "2px", flexShrink: 0 }} />
                         <span>{sq.grammarTip}</span>
                       </div>
                    )}
                    {sq.modelExample && (
                      <ModelCard example={sq.modelExample} translation={sq.modelTranslation} topic={ex.topic} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Model example — visible BEFORE answering */}
                {ex.modelExample && (
                  <ModelCard example={ex.modelExample} translation={ex.modelTranslation} topic={ex.topic} />
                )}
              </>
            )}

            {/* Recorder */}
            <div className={styles.recorderArea}>
              <div className={styles.statusDisplay}>
                {status === "idle" && <p className="text-muted" style={{ fontSize: "0.85rem" }}>Presiona 'Comenzar' → 10s preparación → grabación automática</p>}
                {status === "preparing" && (
                  <div className={styles.preparing}>
                    <Hourglass size={14} style={{ display: "inline", marginBottom: "2px" }} /> Prepárate — <span style={{ color: "var(--gold-300)" }}>{timeLeft}s</span>
                  </div>
                )}
                {status === "recording" && (
                  <div className={styles.recording}>
                    <span className={styles.recDot} />
                    Grabando — <span>{timeLeft}s restantes</span>
                  </div>
                )}
                {status === "evaluating" && (
                  <div className="animate-pulse-gold" style={{ fontSize: "0.9rem", color: "var(--gold-400)" }}>
                    <Bot size={15} style={{ display: "inline", marginBottom: "2px", marginRight: "4px" }} /> Analizando tu respuesta con IA…
                  </div>
                )}
              </div>

              {(status === "recording" || status === "finished") && (
                <div>
                  {!isSupported ? (
                    <textarea
                      className="textarea"
                      placeholder="Tu navegador no soporta micrófono. Escribe aquí tu respuesta simulada..."
                      value={manualText}
                      onChange={(e) => setManualText(e.target.value)}
                      disabled={status !== "recording"}
                    />
                  ) : (
                    <div className={styles.transcriptBox}>
                      <span className="text-muted" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}><Speech size={13} style={{ display: "inline", marginBottom: "2px", marginRight: "4px" }} /> Transcripción en vivo</span>
                      <p style={{ marginTop: "0.5rem", fontSize: "0.92rem" }}>{transcriptText || "Escuchando… habla ahora."}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── AI Feedback ── */}
              {status === "finished" && feedback && (
                <div className={styles.feedbackBox}>
                  <div className={styles.feedbackHeader}>
                    <h3><BarChart3 size={18} style={{ display: "inline", marginRight: "6px" }} /> Evaluación IA</h3>
                    {feedback.overall && feedback.overall !== "N/A" && (
                      <span className={`badge badge-${feedback.overall.toLowerCase()}`}>
                        Nivel estimado: {feedback.overall}
                      </span>
                    )}
                  </div>

                  <div className={styles.feedbackComment}>{feedback.generalComment}</div>

                  {feedback.taskFulfillment && (
                    <div className={styles.criteriaScores}>
                      <ScoreRow label="Task Fulfilment" score={feedback.taskFulfillment.score} comment={feedback.taskFulfillment.comment} />
                      {feedback.grammar && <ScoreRow label="Grammar" score={feedback.grammar.score} comment={feedback.grammar.comment} />}
                      {feedback.lexis && <ScoreRow label="Vocabulary (Lexis)" score={feedback.lexis.score} comment={feedback.lexis.comment} />}
                    </div>
                  )}
                </div>
              )}

              {/* ── Action buttons ── */}
              <div className={styles.actions}>
                {status === "idle" && (
                  <button className="btn btn-primary btn-lg" onClick={startPrep}>
                    <><Play size={14} style={{ display: "inline", marginBottom: "2px" }} /> Comenzar ejercicio</>
                  </button>
                )}
                {status === "recording" && (
                  <button className="btn btn-secondary" onClick={forceStop}>
                    <><Square size={14} style={{ display: "inline", marginBottom: "2px" }} /> Terminar antes</>
                  </button>
                )}
                {status === "finished" && (
                  <>
                    <button className="btn btn-secondary" onClick={() => setStatus("idle")}>
                      <><RotateCcw size={14} style={{ display: "inline", marginBottom: "2px" }} /> Reintentar</>
                    </button>
                    <button className="btn btn-primary" onClick={handleNext}>
                      Siguiente ejercicio →
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ── General tip ── */}
            {status !== "finished" && (
              <div className={styles.tipBox}>
                <span style={{ color: "var(--gold-400)" }}><Lightbulb size={15} /></span>
                <p>
                  Habla con naturalidad y llena los <strong>{ex.timeSeconds}s</strong> con ejemplos específicos.
                  Evita el silencio — usa conectores como <em>"well", "actually", "for instance"</em> para ganar tiempo.
                </p>
              </div>
            )}
          </div>
          </div>
          </div>
          ) : (
            <div style={{ display: "block" }}>
              <div className={styles.header} style={{ marginBottom: "2rem" }}>
                <h2 className={styles.heading}>Reto de Pronunciación</h2>
                <p className="text-muted">Lee las frases en voz alta. La IA validará qué palabras pronuncias correctamente (en verde) y cuáles debes mejorar (tachadas en rojo).</p>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {pronunciationSentences.map((sentence, idx) => (
                  <div key={idx} className={styles.modelCard} style={{ padding: "1.5rem" }}>
                    <p className={styles.modelText} style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>"{sentence}"</p>
                    <SpeakingEvaluator expectedText={sentence} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
