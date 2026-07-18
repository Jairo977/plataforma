"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GrammarTip from "@/components/GrammarTip";
import {
  Eye, Edit3, ChevronDown, ChevronUp, PenTool, AlertTriangle, CheckSquare,
  Compass, Sparkles, BookOpen, Bot, BarChart3, CheckCircle2, Link as LinkIcon,
  BookMarked, Target, Clock, ListChecks
} from "lucide-react";
import styles from "./writing.module.css";
import { generatePracticeSession, BankQuestion } from "@/lib/question-bank";

const COMMON_MISTAKES = [
  "No responder todos los prompts: si el enunciado pide 3 cosas, las 3 deben aparecer claramente.",
  "Responder a medias: algunas notas piden más de una cosa, por ejemplo decir cuál prefieres y por qué.",
  "Copiar frases del enunciado: parafrasea con tus propias palabras siempre que puedas.",
  "Usar el registro equivocado: informal para amigos; neutral/formal para personas que no conoces bien.",
];

function getWritingGuide(ex: BankQuestion, min: number, max: number) {
  if (ex.part === 1) {
    return {
      label: "Part 1: Email",
      time: "20 min",
      words: `${min}-${max} palabras`,
      strategy:
        "Lee el email de entrada, identifica los tres prompts y responde cada uno con detalle. Ajusta el nivel de formalidad al destinatario y usa lenguaje funcional: sugerir, pedir información, quejarte, invitar o dar razones.",
      checklist: [
        "Respondí los tres prompts del email.",
        "Cada prompt tiene suficiente detalle, no solo una frase corta.",
        "El saludo y la despedida coinciden con el destinatario.",
        "Usé mis propias palabras en vez de copiar el enunciado.",
      ],
    };
  }

  const isReview = ex.textType === "review" || /reseñ|review/i.test(ex.partLabel + ex.prompt);
  const isArticle = ex.textType === "article" || /art[ií]culo|article/i.test(ex.partLabel + ex.prompt);

  if (isReview || isArticle) {
    return {
      label: isReview ? "Part 2: Review" : "Part 2: Article",
      time: "25 min",
      words: `${min}-${max} palabras`,
      strategy:
        "Responde las dos o tres preguntas del anuncio y organiza el texto para el lector de una revista. Usa lenguaje descriptivo, opiniones claras, vocabulario variado y una recomendación o cierre memorable.",
      checklist: [
        "Incluí todas las preguntas/prompts del anuncio.",
        "El primer párrafo engancha al lector y presenta el tema.",
        "Usé adjetivos variados en vez de repetir palabras básicas como good.",
        "Cerré con una recomendación, opinión final o invitación al lector.",
      ],
    };
  }

  return {
    label: "Part 2: Essay",
    time: "25 min",
    words: `${min}-${max} palabras`,
    strategy:
      "Dedica un par de minutos a planificar. Decide si tu ensayo será a favor, en contra o equilibrado; luego usa topic sentences, detalles de apoyo, linking words y una conclusión que deje clara tu postura.",
    checklist: [
      "Respondí exactamente la pregunta del título.",
      "Cada párrafo tiene una idea principal clara.",
      "Añadí detalles o ejemplos para desarrollar mis argumentos.",
      "La conclusión resume mi postura sin introducir ideas nuevas.",
    ],
  };
}

function ModelCard({ example, translation }: { example: string; translation?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.modelCard}>
      <button className={styles.modelCardToggle} onClick={() => setOpen(!open)}>
        <Eye size={15} />
        <span>Ver respuesta modelo — inglés primero</span>
        {open ? <ChevronUp size={14} style={{ marginLeft: "auto", color: "var(--text-muted)" }} /> : <ChevronDown size={14} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />}
      </button>
      {open && (
        <div className={styles.modelCardBody}>
          <p className={styles.modelLabel}>Respuesta modelo en inglés</p>
          <p className={styles.modelText}>{example}</p>
          {translation && (
            <>
              <p className={styles.modelLabel}>Apoyo en español</p>
              <p className={styles.translationText}>{translation}</p>
            </>
          )}
          <div className={styles.adaptNote}>
            <Edit3 size={15} />
            Adapta los ejemplos personales a tu experiencia real: tu trabajo, ciudad, hobbies, etc.
          </div>
        </div>
      )}
    </div>
  );
}

function ChecklistItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <label className={styles.checklistItem}>
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      <span style={{ textDecoration: checked ? "line-through" : "none", color: checked ? "var(--text-muted)" : "var(--text-secondary)" }}>
        {label}
      </span>
    </label>
  );
}

export default function WritingPage() {
  const [exercises, setExercises] = useState<BankQuestion[]>([]);
  const [exIdx, setExIdx] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setExercises(generatePracticeSession("writing")); }, []);

  if (exercises.length === 0) return <div className="p-8 text-center text-white">Cargando ejercicios...</div>;

  const ex = exercises[exIdx];
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = text.trim() === "" ? 0 : words.length;
  const min = ex.minWords || 80;
  const max = min === 80 ? 130 : 160;
  const wordStatus = wordCount < min ? "under" : wordCount > max ? "over" : "good";
  const guide = getWritingGuide(ex, min, max);

  const handleSubmit = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: "writing", text, prompt: ex.prompt, minWords: min })
      });
      const data = await res.json();
      if (data.success) { setEvaluation(data); setIsSubmitted(true); }
      else alert("Error evaluando: " + data.error);
    } catch { alert("Error de red al evaluar."); }
    finally { setIsEvaluating(false); }
  };

  const handleReset = () => { setText(""); setIsSubmitted(false); setEvaluation(null); };
  const handleNext = () => { setExIdx((exIdx + 1) % exercises.length); handleReset(); };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container container-lg">
          <div className={styles.layoutGrid}>

            {/* ── LEFT COLUMN ── */}
            <div className={styles.leftCol}>
              {/* ── Header ── */}
          <div className={styles.header}>
            <div className="flex gap-2" style={{ alignItems: "center" }}>
              <span className="badge badge-writing"><PenTool size={13} /> Writing</span>
              <span className="text-muted text-sm">· Oxford Test of English B1/B2</span>
            </div>
            <h1 className={styles.heading}>Módulo Writing</h1>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Escribe tu respuesta y recibe feedback por los 4 criterios OTE: Task Fulfilment, Organización, Gramática y Vocabulario.
            </p>
          </div>

          {/* ── Exercise selector ── */}
          <div className={styles.exSelector}>
            {exercises.map((e, i) => (
              <button
                key={e.id}
                className={`${styles.exBtn} ${exIdx === i ? styles.exActive : ""}`}
                onClick={() => { setExIdx(i); handleReset(); }}
              >
                <Edit3 size={15} style={{ color: "var(--writing-color)" }} />
                <div style={{ textAlign: "left" }}>
                  <p className={styles.exPart}>{e.partLabel}</p>
                  <p className={styles.exType}>{e.topic}</p>
                </div>
                <span className={`badge badge-${e.difficulty.toLowerCase()}`}>{e.difficulty}</span>
              </button>
            ))}
            </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className={styles.rightCol}>
              {/* ── Exercise card ── */}
          <div className={styles.exerciseCard}>
            <div className={styles.strategyBox}>
              <span><Target size={15} /></span>
              <p><strong>Estrategia OTE {guide.label}:</strong> {guide.strategy}</p>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaPill}>
                <Clock size={15} />
                <span>{guide.time}</span>
              </div>
              <div className={styles.metaPill}>
                <BookOpen size={15} />
                <span>{guide.words}</span>
              </div>
              <div className={styles.metaPill}>
                <ListChecks size={15} />
                <span>{ex.part === 1 ? "3 prompts obligatorios" : "2-3 prompts o un título"}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: ex.structureGuide ? "2fr 1fr" : "1fr", gap: "1.5rem" }}>

              {/* LEFT — Prompt + Editor */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {ex.context && <div className={styles.contextBox}>{ex.context}</div>}
                <div className={styles.promptBox} style={{ whiteSpace: "pre-wrap" }}>
                  {ex.prompt}
                </div>

                {/* Model example — visible before writing */}
                {ex.modelExample && <ModelCard example={ex.modelExample} translation={ex.modelTranslation} />}

                {/* Common mistakes hint */}
                <div className={styles.mistakesBox}>
                  <div className={styles.mistakesTitle}><AlertTriangle size={15} /> Errores comunes OTE</div>
                  <ul className={styles.mistakesList}>
                    {COMMON_MISTAKES.map((m, i) => <li key={i}>• {m}</li>)}
                  </ul>
                </div>

                {/* Pre-submit checklist */}
                {!isSubmitted && (
                  <div className={styles.checklist}>
                    <div className={styles.checklistTitle}><CheckSquare size={15} /> Lista de verificación</div>
                    <div className={styles.checklistItems}>
                      <ChecklistItem label={`¿Tienes entre ${min} y ${max} palabras?`} />
                      {guide.checklist.map((item) => <ChecklistItem key={item} label={item} />)}
                    </div>
                  </div>
                )}

                {/* Editor */}
                <div className={styles.editorArea}>
                  <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    placeholder="Escribe tu respuesta aquí en inglés..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSubmitted}
                  />
                  <div className={styles.editorFooter}>
                    <span className={`${styles.wordCount} ${styles[`wc_${wordStatus}`]}`}>
                      {wordCount} palabras · Objetivo: {min}–{max}
                    </span>
                    {!isSubmitted ? (
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={wordCount === 0 || isEvaluating}
                      >
                        {isEvaluating ? "⏳ Evaluando..." : "Enviar para corrección →"}
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button className="btn btn-secondary" onClick={() => setIsSubmitted(false)}>Editar</button>
                        <button className="btn btn-primary" onClick={handleNext}>Siguiente →</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT — Sidebar */}
              {ex.structureGuide && (
                <div className={styles.sidebar}>
                  <div className={styles.sidebarTitle}><Compass size={14} /> Estructura</div>
                  <div className={styles.structureGuide}>{ex.structureGuide}</div>

                  {ex.usefulPhrases && ex.usefulPhrases.length > 0 && (
                    <>
                      <div className={styles.sidebarTitle} style={{ marginTop: "0.25rem" }}><Sparkles size={14} /> Frases útiles</div>
                      <div className={styles.phrasesWrap}>
                        {ex.usefulPhrases.map((phrase, idx) => (
                          <span
                            key={idx}
                            className={styles.phraseChip}
                            onClick={() => !isSubmitted && setText(text + (text.endsWith(" ") || text === "" ? "" : " ") + phrase + " ")}
                          >
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                    {ex.grammarTips && ex.grammarTips.length > 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <div className={styles.sidebarTitle} style={{ marginTop: "0.25rem", color: "var(--gold-400)" }}><BookOpen size={14} /> Tips gramaticales</div>
                        <ul className={styles.grammarTipsList} style={{ marginBottom: "0.8rem" }}>
                          {ex.grammarTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                        </ul>
                        <GrammarTip data={{
                          concept: "Present Simple (Verb To Be) — Para descripciones",
                          formula: "Sujeto + am/is/are + Adjetivo / Sustantivo",
                          example: "The new platform _is_ very useful for my exam.",
                          highlights: ["_is_"]
                        }} />
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* ── Evaluating indicator ── */}
            {isEvaluating && (
              <div className={styles.feedbackBox} style={{ textAlign: "center" }}>
                <p className="animate-pulse-gold" style={{ fontSize: "0.95rem" }}>
                  <Bot size={16} style={{ display: "inline", marginBottom: "2px" }} /> La IA está evaluando tu respuesta…
                </p>
                <p className="text-muted text-sm" style={{ marginTop: "0.4rem" }}>
                  Analizando Task Fulfilment, Organización, Gramática y Vocabulario
                </p>
              </div>
            )}

            {/* ── AI Feedback ── */}
            {isSubmitted && evaluation && (
              <div className={styles.feedbackBox}>
                <div className={styles.feedbackHeader}>
                  <h3><BarChart3 size={18} style={{ display: "inline", marginRight: "6px" }} /> Evaluación IA {evaluation.mock ? "(Modo Demo)" : ""}</h3>
                  <span className={`badge badge-${evaluation.feedback.overall.toLowerCase()}`}>
                    Nivel estimado: {evaluation.feedback.overall}
                  </span>
                </div>
                <p className={styles.feedbackComment}>{evaluation.feedback.generalComment}</p>
                <div className={styles.criteriaGrid}>
                  <div className={styles.criteriaItem}>
                    <h4><CheckCircle2 size={14} style={{ display: "inline", marginRight: "4px" }} /> Task Fulfilment ({evaluation.feedback.taskFulfillment?.score}/5)</h4>
                    <p>{evaluation.feedback.taskFulfillment?.comment}</p>
                  </div>
                  <div className={styles.criteriaItem}>
                    <h4><LinkIcon size={14} style={{ display: "inline", marginRight: "4px" }} /> Organización ({evaluation.feedback.organization?.score}/5)</h4>
                    <p>{evaluation.feedback.organization?.comment}</p>
                  </div>
                  <div className={styles.criteriaItem}>
                    <h4><Edit3 size={14} style={{ display: "inline", marginRight: "4px" }} /> Gramática ({evaluation.feedback.grammar?.score}/5)</h4>
                    <p>{evaluation.feedback.grammar?.comment}</p>
                  </div>
                  <div className={styles.criteriaItem}>
                    <h4><BookMarked size={14} style={{ display: "inline", marginRight: "4px" }} /> Vocabulario ({evaluation.feedback.lexis?.score}/5)</h4>
                    <p>{evaluation.feedback.lexis?.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </main>
</>
  );
}
