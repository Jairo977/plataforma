"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { generateExamSession, AdaptiveExamSession, BankQuestion } from "@/lib/question-bank";
import { getEnglishVoice } from "@/lib/tts";
import { Mic, PenTool, Headphones, BookOpen, Clock, AlertTriangle, AlertCircle, Target, CheckCircle2, Bot, ArrowRight, Home, RefreshCw, LogOut, CheckSquare, PlayCircle, Loader2 } from "lucide-react";
import styles from "./simulator.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type ModuleId = "listening" | "reading" | "writing" | "speaking";
type Phase = "setup" | "exam" | "results";
type QuestionType = "choice" | "match" | "gap" | "text" | "voice";

interface Question {
  id: string;
  difficulty?: "B1" | "B2" | "A2";
  part: number;
  partLabel: string;
  type: QuestionType;
  audioScript?: string;     // For listening: read aloud via TTS
  context?: string;         // Reading passage or audio description
  prompt: string;
  options?: string[];
  correct?: number | string;
  matchItems?: { profile: string; texts: { id: string; title: string; desc: string }[] };
  gapSentences?: string[];  // For gap fill: sentences to choose from
  minWords?: number;
  timeSeconds?: number;     // For speaking: per-question time limit
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC QUESTION MAPPING
// ─────────────────────────────────────────────────────────────────────────────
function mapBankToSimulator(bankQs: BankQuestion[]): Question[] {
  const result: Question[] = [];
  for (const q of bankQs) {
    if (q.module === 'listening' || q.module === 'speaking' || q.module === 'writing') {
      result.push({
        id: q.id,
        part: q.part,
        partLabel: q.partLabel,
        type: q.type as QuestionType,
                audioScript: q.audioScript,
        context: q.context,
        prompt: q.prompt,
        options: q.options,
        correct: q.correct,
        minWords: q.minWords,
        timeSeconds: q.timeSeconds,
        difficulty: q.difficulty as "B1" | "B2" | "A2" | undefined,
      });
    } else if (q.module === 'reading') {
      if (q.part === 1 || q.part === 4) {
        result.push({
          id: q.id,
          part: q.part,
          partLabel: q.partLabel,
          type: 'choice',
                    context: q.context,
          prompt: q.prompt,
          options: q.options,
          correct: q.correct,
          difficulty: q.difficulty as "B1" | "B2" | "A2" | undefined,
        });
      } else if (q.part === 2) {
        if (q.matchingQuestions && q.matchingProfiles) {
          const profileText = q.matchingProfiles.map((p) => `Texto ${p.id} — "${p.title}": ${p.text}`).join('\n\n');
          q.matchingQuestions.forEach((mq, idx) => {
            result.push({
              id: `${q.id}-${idx}`,
              part: 2,
              partLabel: q.partLabel,
              type: 'choice',
                        context: `Textos para emparejar:\n\n${profileText}`,
              prompt: mq.question,
              options: q.matchingProfiles!.map((p) => `Texto ${p.id}`),
              correct: q.matchingProfiles!.findIndex((p) => p.id === mq.correctProfileId),
              difficulty: q.difficulty as "B1" | "B2" | "A2" | undefined,
            });
          });
        }
      } else if (q.part === 3) {
        if (q.gappedText && q.gappedSentences && q.gappedAnswers) {
          q.gappedAnswers.forEach((ga, idx) => {
            result.push({
              id: `${q.id}-${idx}`,
              part: 3,
              partLabel: q.partLabel,
              type: 'choice',
                        context: q.gappedText!,
              prompt: `¿Qué frase completa mejor el HUECO ${ga.gapNumber}?`,
              options: q.gappedSentences!.map((s) => s.text),
              correct: q.gappedSentences!.findIndex((s) => s.id === ga.correctSentenceId),
              difficulty: q.difficulty as "B1" | "B2" | "A2" | undefined,
            });
          });
        }
      }
    }
  }
  return result;
}

const moduleConfig = {
  listening: { icon: <Headphones size={15}/>, label: "Listening", time: 30, color: "listening", totalQ: 20 },
  reading:   { icon: <BookOpen size={15}/>, label: "Reading",   time: 35, color: "reading",   totalQ: 22 },
  writing:   { icon: <PenTool size={15}/>, label: "Writing",   time: 45, color: "writing",   totalQ: 2 },
  speaking:  { icon: <Mic size={15}/>, label: "Speaking",  time: 15, color: "speaking",  totalQ: 17 },
};

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTENING AUDIO — Web Speech API TTS
// ─────────────────────────────────────────────────────────────────────────────
function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    // Try to pick the best natural English voice using our shared algorithm
    const bestVoice = getEnglishVoice(utterance.lang);
    if (bestVoice) utterance.voice = bestVoice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); setPlayCount(c => c + 1); };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, playCount };
}

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING — Web Speech Recognition
// ─────────────────────────────────────────────────────────────────────────────
function useSpeechRecognition(onResult: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    let finalText = "";
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SimulatorPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedModules, setSelectedModules] = useState<ModuleId[]>(["listening", "reading", "writing", "speaking"]);
  const [activeModIdx, setActiveModIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeWarning, setIsTimeWarning] = useState(false);
  const [playedAudio, setPlayedAudio] = useState<Record<string, number>>({}); // how many times played per question
  const [voiceAnswer, setVoiceAnswer] = useState("");
  const [adaptivePools, setAdaptivePools] = useState<AdaptiveExamSession | null>(null);
  const [sessionData, setSessionData] = useState<Record<ModuleId, Question[]> | null>(null);

  useEffect(() => {
    const raw = generateExamSession() as AdaptiveExamSession;
    setAdaptivePools(raw);
    
    const initialSession: any = {};
    if (raw.listening?.B1) {
       const firstL = raw.listening.B1.pop();
       initialSession.listening = firstL ? mapBankToSimulator([firstL]) : [];
    }
    if (raw.reading?.B1) {
       const firstR = raw.reading.B1.pop();
       initialSession.reading = firstR ? mapBankToSimulator([firstR]) : [];
    }
    initialSession.writing = mapBankToSimulator(raw.writing);
    initialSession.speaking = mapBankToSimulator(raw.speaking);
    
    setSessionData(initialSession);
  }, []);

  const { speak, stop, isSpeaking, playCount } = useTextToSpeech();
  const handleVoiceResult = useCallback((text: string) => {
    setVoiceAnswer(text);
    setAnswers(prev => ({ ...prev, [activeQ?.id ?? ""]: text }));
  }, []);
  const { startRecording, stopRecording, isRecording, isSupported: speechSupported, transcript } = useSpeechRecognition(handleVoiceResult);

  const activeMod = selectedModules[activeModIdx] as ModuleId;
  const questions = sessionData ? sessionData[activeMod] || [] : [];
  const activeQ = questions[qIdx];

  // Reset voice answer on question change
  useEffect(() => { setVoiceAnswer(""); }, [qIdx, activeModIdx]);

  // Prevent accidental reload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (phase === "exam") {
        e.preventDefault();
        e.returnValue = ""; // Most modern browsers ignore the custom string anyway
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [phase]);

  const nextModule = useCallback(() => {
    stop();
    stopRecording();
    if (activeModIdx < selectedModules.length - 1) {
      const ni = activeModIdx + 1;
      setActiveModIdx(ni);
      setQIdx(0);
      const nm = selectedModules[ni] as ModuleId;
      setTimeLeft(moduleConfig[nm].time * 60);
      setIsTimeWarning(false);
    } else {
      setPhase("results");
    }
  }, [activeModIdx, selectedModules, stop, stopRecording]);

  // Timer
  useEffect(() => {
    if (phase !== "exam") return;
    if (timeLeft <= 0) { nextModule(); return; }
    setIsTimeWarning(timeLeft <= 120);
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, nextModule]);

  const startExam = () => {
    if (!selectedModules.length) return;
    setActiveModIdx(0);
    setQIdx(0);
    setAnswers({});
    setPlayedAudio({});
    const fm = selectedModules[0] as ModuleId;
    setTimeLeft(moduleConfig[fm].time * 60);
    setIsTimeWarning(false);
    setPhase("exam");
  };

  const handleNextQuestion = () => {
    stop(); stopRecording();
    setPlayedAudio({});
    
    const isAdaptive = activeMod === "listening" || activeMod === "reading";
    const totalQ = moduleConfig[activeMod].totalQ;
    
    if (qIdx < totalQ - 1) {
      if (isAdaptive && adaptivePools && sessionData) {
        if (qIdx === sessionData[activeMod].length - 1) {
          const currentQ = sessionData[activeMod][qIdx];
          const isCorrect = answers[currentQ.id] === currentQ.correct;
          const nextLevel = isCorrect ? "B2" : "B1";
          const pool = adaptivePools[activeMod as "listening" | "reading"][nextLevel];
          let nextBankQ = pool.pop();
          if (!nextBankQ) {
            nextBankQ = adaptivePools[activeMod as "listening" | "reading"][nextLevel === "B2" ? "B1" : "B2"].pop();
          }
          if (nextBankQ) {
            const nextQList = mapBankToSimulator([nextBankQ]);
            setSessionData(prev => ({
              ...prev!,
              [activeMod]: [...prev![activeMod], nextQList[0]]
            }));
          }
        }
      }
      setQIdx(q => q + 1);
    } else {
      nextModule();
    }
  };

  const playAudio = () => {
    if (!activeQ?.audioScript) return;
    const count = playedAudio[activeQ.id] || 0;
    if (count >= 2) return; // max 2 plays
    speak(activeQ.audioScript);
    setPlayedAudio(prev => ({ ...prev, [activeQ.id]: count + 1 }));
  };

  const setAnswer = (key: string, val: string | number) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const canAdvance = (() => {
    if (!activeQ) return false;
    if (activeQ.type === "choice") return answers[activeQ.id] !== undefined;
    if (activeQ.type === "text") {
      const wc = ((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length;
      return wc >= (activeQ.minWords ? activeQ.minWords * 0.3 : 20);
    }
    if (activeQ.type === "voice") {
      return (answers[activeQ.id] as string || "").trim().length > 10;
    }
    return false;
  })();

  // Results calc
  const calcResults = () => {
    const byModule: Record<string, { correct: number; total: number }> = {};
    selectedModules.forEach(mid => {
      const qs = sessionData ? sessionData[mid as ModuleId] || [] : [];
      let correct = 0, total = 0;
      qs.forEach(q => {
        if (q.type === "choice") {
          total++;
          if (answers[q.id] === q.correct) correct++;
        }
      });
      byModule[mid] = { correct, total };
    });
    return byModule;
  };

  const moduleOrder: ModuleId[] = ["listening", "reading", "writing", "speaking"];

  if (!sessionData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', gap: '1rem', background: '#0a0e1a' }}><Loader2 className="animate-spin" /> Generando examen dinámico...</div>;
  }

  return (
    <>
      {phase !== "exam" && (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0.875rem 1.5rem", background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span></span><span style={{ fontWeight: 800, color: "#f1f5f9" }}>OTE<span style={{ color: "#fbbf24" }}>Master</span></span>
          </Link>
          <Link href="/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </nav>
      )}

      <main className={`${styles.main} ${phase === "exam" ? styles.examMode : ""}`}>

        {/* ── SETUP ── */}
        {phase === "setup" && (
          <div className={styles.setupPage}>
            <div className={styles.setupHeader}>
              <span className="badge badge-gold"> Simulador Oficial</span>
              <h1 className={styles.setupTitle}>Simulador Oxford Test of English</h1>
              <p className={styles.setupSub}>
                Examen completo con <strong>59 preguntas reales</strong>: Listening con audio, Reading con textos, Speaking con tu voz y Writing con feedback
              </p>
            </div>

            {/* Module grid */}
            <div className={styles.modulePicker}>
              {moduleOrder.map(mid => {
                const m = moduleConfig[mid];
                const sel = selectedModules.includes(mid);
                return (
                  <button key={mid}
                    className={`${styles.modCard} ${sel ? styles.modCardActive : ""} ${styles[`mod_${m.color}`]}`}
                    onClick={() => setSelectedModules(p => sel ? p.filter(x => x !== mid) : [...p, mid])}>
                    <div className={styles.modCardTop}>
                      <span className={styles.modCardIcon}>{m.icon}</span>
                      <span className={`badge badge-${m.color}`}>{m.label}</span>
                      {sel && <span className={styles.modCheck}>✓</span>}
                    </div>
                    <div className={styles.modCardStats}>
                      <span> {m.time} min</span>
                      <span> {m.totalQ} preguntas</span>
                      <span> 4 partes</span>
                    </div>
                    <div className={styles.modCardFeature}>
                      {mid === "listening" && " Audio real con TTS"}
                      {mid === "reading" && " Textos oficiales OTE"}
                      {mid === "writing" && "️ 2 tareas con feedback"}
                      {mid === "speaking" && " Reconocimiento de voz"}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles.setupSummary}>
              <div className={styles.sumItem}><span className={styles.sumNum}>{selectedModules.reduce((a, m) => a + moduleConfig[m as ModuleId].totalQ, 0)}</span><span className={styles.sumLabel}>preguntas</span></div>
              <div className={styles.sumItem}><span className={styles.sumNum}>{selectedModules.reduce((a, m) => a + moduleConfig[m as ModuleId].time, 0)}</span><span className={styles.sumLabel}>minutos</span></div>
              <div className={styles.sumItem}><span className={styles.sumNum}>{selectedModules.length}</span><span className={styles.sumLabel}>módulos</span></div>
            </div>

            <div className={styles.setupNote}>
              <p> <strong>Listening</strong>: el audio se reproduce directamente en tu navegador (Web Speech API)</p>
              <p> <strong>Speaking</strong>: usa el micrófono de tu dispositivo para responder en voz alta (requiere Chrome/Edge)</p>
            </div>

            <button className={`btn btn-primary btn-lg ${styles.startBtn}`} onClick={startExam} disabled={!selectedModules.length}>
               Comenzar examen →
            </button>
          </div>
        )}

        {/* ── EXAM ── */}
        {phase === "exam" && activeQ && (
          <div className={styles.examLayout}>
            {/* Sticky header */}
            <div className={`${styles.examBar} ${isTimeWarning ? styles.examBarWarn : ""}`}>
              <div className={styles.examBarLeft}>
                <span className={`badge badge-${moduleConfig[activeMod].color}`}>
                  {moduleConfig[activeMod].icon} {moduleConfig[activeMod].label}
                </span>
                <span className={styles.partLabel}>{activeQ.partLabel}</span>
              </div>
              <div className={`${styles.timerBox} ${isTimeWarning ? styles.timerWarn : ""}`}>
                 {formatTime(timeLeft)}
              </div>
              <div className={styles.examBarRight}>
                <span className={styles.qCounter}>{qIdx + 1} / {moduleConfig[activeMod].totalQ}</span>
              </div>
            </div>

            {/* Module progress strip */}
            <div className={styles.modStrip}>
              {selectedModules.map((mid, i) => (
                <div key={mid} className={`${styles.modStripItem} ${i === activeModIdx ? styles.modStripActive : i < activeModIdx ? styles.modStripDone : ""}`}>
                  {moduleConfig[mid as ModuleId].icon} {moduleConfig[mid as ModuleId].label}
                </div>
              ))}
            </div>

            {/* Question progress bar */}
            <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
              <div style={{ height: "100%", width: `${((qIdx + 1) / moduleConfig[activeMod].totalQ) * 100}%`, background: `var(--${moduleConfig[activeMod].color}-color, #fbbf24)`, transition: "width 0.4s ease" }} />
            </div>

            <div className={styles.examContent}>
              <div className={styles.examCard}>

                {/* LISTENING: Audio Player */}
                {activeMod === "listening" && activeQ.audioScript && (
                  <div className={styles.audioPanel}>
                    <div className={styles.audioPanelLeft}>
                      <div className={`${styles.audioWave} ${isSpeaking ? styles.audioWaveActive : ""}`}>
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className={styles.audioBar} style={{ animationDelay: `${i * 0.08}s` }} />
                        ))}
                      </div>
                      <div>
                        <p className={styles.audioPanelLabel}>Audio del examen</p>
                        <p className={styles.audioPanelSub}>
                          {isSpeaking ? " Reproduciendo..." : `Reproducciones: ${playedAudio[activeQ.id] || 0}/2`}
                        </p>
                      </div>
                    </div>
                    <div className={styles.audioBtns}>
                      <button
                        className={`btn ${isSpeaking ? "btn-secondary" : "btn-primary"} btn-sm`}
                        onClick={isSpeaking ? stop : playAudio}
                        disabled={(playedAudio[activeQ.id] || 0) >= 2 && !isSpeaking}
                      >
                        {isSpeaking ? " Parar" : (playedAudio[activeQ.id] || 0) === 0 ? " Escuchar audio" : " Escuchar de nuevo"}
                      </button>
                      {(playedAudio[activeQ.id] || 0) >= 2 && !isSpeaking && (
                        <span className={styles.audioLimit}>Límite de 2 reproducciones alcanzado</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Context (Reading passages) */}
                {activeQ.context && activeMod !== "listening" && (
                  <div className={styles.contextBox}>
                    {activeQ.context.split("\n").map((line, i) =>
                      line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
                    )}
                  </div>
                )}

                {/* Prompt */}
                <div className={styles.qPrompt}>
                  {activeQ.prompt.split("\n").map((line, i) =>
                    line.startsWith("•") ? <li key={i} style={{ marginLeft: "1.5rem", color: "#94a3b8", marginBottom: "0.25rem" }}>{line.slice(1).trim()}</li>
                    : line.trim() === "" ? <br key={i} />
                    : <p key={i}>{line}</p>
                  )}
                </div>

                {/* CHOICE */}
                {activeQ.type === "choice" && (
                  <div className={styles.optionsList}>
                    {activeQ.options!.map((opt, oi) => (
                      <button key={oi}
                        className={`${styles.optBtn} ${answers[activeQ.id] === oi ? styles.optSelected : ""}`}
                        onClick={() => setAnswer(activeQ.id, oi)}>
                        <span className={styles.optLetter}>{String.fromCharCode(65 + oi)}</span>
                        <span>{opt}</span>
                        {answers[activeQ.id] === oi && <span className={styles.optDot}>●</span>}
                      </button>
                    ))}
                  </div>
                )}

                {/* TEXT (Writing) */}
                {activeQ.type === "text" && (
                  <div className={styles.textSection}>
                    <textarea
                      className={`textarea ${styles.writingTextarea}`}
                      placeholder="Write your answer in English here..."
                      value={(answers[activeQ.id] as string) || ""}
                      onChange={e => setAnswer(activeQ.id, e.target.value)}
                      rows={10}
                    />
                    <div className={styles.wordCountBar}>
                      <span style={{
                        color: (() => {
                          const wc = ((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length;
                          return wc < (activeQ.minWords || 80) ? "#f87171" : "#34d399";
                        })(),
                        fontWeight: 700
                      }}>
                        {((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length}
                      </span>
                      <span style={{ color: "#475569" }}> / mínimo {activeQ.minWords} palabras</span>
                    </div>
                  </div>
                )}

                {/* VOICE (Speaking) */}
                {activeQ.type === "voice" && (
                  <div className={styles.voiceSection}>
                    <div className={styles.voiceTimer}>
                      <span className={styles.voiceTimerLabel}>Tiempo sugerido:</span>
                      <span className={styles.voiceTimerVal}>{activeQ.timeSeconds} segundos</span>
                    </div>

                    {speechSupported ? (
                      <div className={styles.voiceControls}>
                        <button
                          className={`btn ${isRecording ? styles.btnRecording : "btn-primary"} btn-lg ${styles.micBtn}`}
                          onClick={isRecording ? stopRecording : startRecording}
                        >
                          {isRecording ? (
                            <><span className={styles.recDot} />Detener grabación</>
                          ) : (
                            <><span></span> Hablar en inglés</>
                          )}
                        </button>

                        {isRecording && (
                          <div className={styles.recordingIndicator}>
                            <div className={styles.recWave}>
                              {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.recBar} style={{ animationDelay: `${i * 0.1}s` }} />
                              ))}
                            </div>
                            <span>Grabando... habla en inglés</span>
                          </div>
                        )}

                        {(answers[activeQ.id] as string || "").trim() && (
                          <div className={styles.transcriptResult}>
                            <p className={styles.transcriptLabel}> Lo que dijiste:</p>
                            <p className={styles.transcriptText}>{answers[activeQ.id] as string}</p>
                            <div className={styles.transcriptStats}>
                              <span>{((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length} palabras detectadas</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={styles.voiceFallback}>
                        <p className={styles.voiceFallbackTitle}>️ Micrófono no disponible</p>
                        <p className={styles.voiceFallbackSub}>Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge para activar esta función.</p>
                        <p className={styles.voiceFallbackAlt}>Como alternativa, escribe lo que dirías:</p>
                        <textarea
                          className={`textarea`}
                          placeholder="Write what you would say in English..."
                          value={(answers[activeQ.id] as string) || ""}
                          onChange={e => setAnswer(activeQ.id, e.target.value)}
                          rows={6}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className={styles.examNav}>
                  <button className="btn btn-ghost btn-sm" onClick={() => qIdx > 0 && setQIdx(q => q - 1)} disabled={qIdx === 0 || activeMod === "listening" || activeMod === "reading"}>
                    ← Anterior
                  </button>
                  <button className="btn btn-primary" onClick={handleNextQuestion}>
                    {qIdx < moduleConfig[activeMod].totalQ - 1 ? "Siguiente →" : (activeModIdx === selectedModules.length - 1 ? "Terminar Examen" : "Siguiente Módulo")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && (
          <div className={styles.resultsPage}>
            <div className={styles.resBadge}></div>
            <h1 className={styles.resTitle}>Examen Completado</h1>
            <p className={styles.resSub}>Resultados de tus módulos seleccionados</p>

            {(() => {
              const results = calcResults();
              const choiceTotal = Object.values(results).reduce((a, r) => a + r.total, 0);
              const choiceCorrect = Object.values(results).reduce((a, r) => a + r.correct, 0);
              const pct = choiceTotal > 0 ? Math.round((choiceCorrect / choiceTotal) * 100) : 0;
              const level = pct >= 75 ? "B2" : pct >= 55 ? "B1" : "A2";
              const levelColor = level === "B2" ? "#60a5fa" : level === "B1" ? "#34d399" : "#94a3b8";

              return (
                <>
                  <div className={styles.resScoreBox} style={{ borderColor: levelColor + "40", boxShadow: `0 0 60px ${levelColor}20` }}>
                    <div className={styles.resLevelBig} style={{ color: levelColor }}>{level}</div>
                    <div className={styles.resScoreNum}>{pct}%</div>
                    <div className={styles.resScoreSub}>{choiceCorrect}/{choiceTotal} preguntas objectivas correctas</div>
                  </div>

                  <div className={styles.resModules}>
                    {selectedModules.map(mid => {
                      const r = results[mid] || { correct: 0, total: 0 };
                      const mc = moduleConfig[mid as ModuleId];
                      const mpct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                      const hasVoice = sessionData ? sessionData[mid as ModuleId].some(q => q.type === "voice") : false;
                      const hasText = sessionData ? sessionData[mid as ModuleId].some(q => q.type === "text") : false;
                      return (
                        <div key={mid} className={`${styles.resModule} ${styles[`resMod_${mc.color}`]}`}>
                          <div className={styles.resModIcon}>{mc.icon}</div>
                          <div className={styles.resModInfo}>
                            <p className={styles.resModName}>{mc.label}</p>
                            {r.total > 0 && <p className={styles.resModScore} style={{ color: "#34d399" }}>{r.correct}/{r.total} correctas ({mpct}%)</p>}
                            {hasText && <p className={styles.resModPending} style={{ color: "#fbbf24" }}>️ Writing: requiere revisión por examinador</p>}
                            {hasVoice && <p className={styles.resModPending} style={{ color: "#a78bfa" }}> Speaking: requiere evaluación oral oficial</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.resNote}>
                    ️ Este resultado es <strong>formativo</strong>. El Speaking y Writing del examen oficial son evaluados por examinadores humanos certificados. El score oficial del OTE va de 51 a 170 puntos.
                  </div>
                </>
              );
            })()}

            <div className={styles.resActions}>
              <button className="btn btn-primary btn-lg" onClick={() => { setPhase("setup"); setSelectedModules(["listening","reading","writing","speaking"]); }}>
                 Repetir simulador
              </button>
              <Link href="/dashboard" className="btn btn-secondary btn-lg">Ir al dashboard</Link>
              <Link href="/placement" className="btn btn-outline">Repetir diagnóstico de nivel</Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
