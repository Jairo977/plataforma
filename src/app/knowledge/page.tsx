import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Mic, PenTool, Headphones, BookOpen, Settings, Book, AlertTriangle, ClipboardList, Target, BarChart3, HelpCircle, MessageSquare, Clock, Lightbulb, Link as LinkIcon, Handshake, FileText, Bot, FlaskConical, FolderArchive } from "lucide-react";
import { examFacts, moduleBlueprint, passPlan, priorityMistakes, scoreBands } from "@/lib/ote-guide";
import styles from "./knowledge.module.css";

const kbBases = [
  { id: "KB01", label: "Speaking",       icon: <Mic size={18} />, color: "speaking", entries: 1, desc: "Estrategias, tipos de tareas, criterios y respuestas modelo para Speaking." },
  { id: "KB02", label: "Writing",        icon: <PenTool size={18} />, color: "writing",  entries: 1, desc: "Templates de email, ensayo, artículo y reseña con rubrics B1/B2." },
  { id: "KB03", label: "Listening",      icon: <Headphones size={18} />, color: "listening", entries: 1, desc: "Tipos de tareas, estrategias de escucha activa y emparejar opiniones." },
  { id: "KB04", label: "Reading",        icon: <BookOpen size={18} />, color: "reading",  entries: 1, desc: "Emparejamiento, gap fill, opción múltiple y estrategias de comprensión." },
  { id: "KB05", label: "Grammar",        icon: <Settings size={18} />, color: "gold",     entries: 0, desc: "Condicionales, voz pasiva, reported speech, modales y más." },
  { id: "KB06", label: "Vocabulary",     icon: <Book size={18} />, color: "gold",     entries: 0, desc: "Phrasal verbs, collocations, sinónimos por tema (tech, environment, health)." },
  { id: "KB07", label: "Common Mistakes",icon: <AlertTriangle size={18} />, color: "gold",     entries: 0, desc: "Errores frecuentes de B1/B2: gestión del tiempo, repetición, registro." },
  { id: "KB08", label: "Templates",      icon: <ClipboardList size={18} />, color: "gold",     entries: 0, desc: "Estructuras modelo para email formal/informal, ensayo, monólogo." },
  { id: "KB09", label: "Exam Strategies",icon: <Target size={18} />, color: "gold",     entries: 1, desc: "Estrategias por módulo: técnica de descarte, vocabulario vertical, etc." },
  { id: "KB10", label: "Scoring System", icon: <BarChart3 size={18} />, color: "gold",     entries: 1, desc: "Escala CEFR A2-C1 (51-170 pts), rubrics, dimensiones de evaluación." },
  { id: "KB11", label: "Question Types", icon: <HelpCircle size={18} />, color: "gold",     entries: 1, desc: "Todos los tipos de preguntas del OTE por módulo y formato." },
  { id: "KB12", label: "Real Experiences",icon:<MessageSquare size={18} />, color: "gold",     entries: 0, desc: "Experiencias de candidatos reales: qué funcionó, qué no." },
  { id: "KB13", label: "Time Management",icon: <Clock size={18} />, color: "gold",     entries: 0, desc: "Distribución óptima del tiempo por módulo y por pregunta." },
  { id: "KB14", label: "Expressions",    icon: <Lightbulb size={18} />, color: "gold",     entries: 0, desc: "Expresiones útiles para Speaking: reaccionar, ganar tiempo, concluir." },
  { id: "KB15", label: "Phrasal Verbs",  icon: <LinkIcon size={18} />, color: "gold",     entries: 0, desc: "Phrasal verbs temáticos por nivel para Writing y Speaking." },
  { id: "KB16", label: "Connectors",     icon: <LinkIcon size={18} />, color: "gold",     entries: 0, desc: "Conectores de contraste, adición, causa y consecuencia para B1/B2." },
  { id: "KB17", label: "Collocations",   icon: <Handshake size={18} />, color: "gold",     entries: 0, desc: "Collocaciones frecuentes por tema (make a decision, take action, etc.)." },
  { id: "KB18", label: "Sample Answers", icon: <FileText size={18} />, color: "gold",     entries: 0, desc: "Respuestas modelo annotadas con B1/B2 para Writing y Speaking." },
  { id: "KB19", label: "AI Corrections", icon: <Bot size={18} />, color: "gold",     entries: 0, desc: "Historial de correcciones IA con feedback detallado por criterio." },
  { id: "KB20", label: "Mock Exams",     icon: <FlaskConical size={18} />, color: "gold",     entries: 0, desc: "Exámenes completos de práctica con todas las partes del OTE." },
];

const strategies = [
  { skill: "Speaking",  icon: <Mic size={18} />, color: "speaking", tips: ["Usa frases de reacción para ganar tiempo", "Vocabulario 'vertical': profundiza en un tema", "Estructura: respuesta → razón → ejemplo", "Conecta ideas con 'what's more', 'having said that'"] },
  { skill: "Writing",   icon: <PenTool size={18} />, color: "writing",  tips: ["Adapta el registro (formal/informal)", "Responde TODOS los puntos del enunciado", "Planifica 2 min antes de escribir", "Reserva 3 min para revisar"] },
  { skill: "Listening", icon: <Headphones size={18} />, color: "listening", tips: ["1ª escucha: idea general", "2ª escucha: confirmar detalles", "Identifica sinónimos y paráfrasis", "Anticipa respuestas leyendo preguntas antes"] },
  { skill: "Reading",   icon: <BookOpen size={18} />, color: "reading",  tips: ["Lee las preguntas PRIMERO", "Técnica de descarte para opción múltiple", "Atiende a conectores: 'but', 'however', 'these'", "No pases más de 2 min por pregunta difícil"] },
];

export default function KnowledgePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">

          <div className={styles.header}>
            <div className="flex gap-2" style={{ alignItems: "center" }}>
              <span className="badge badge-gold"><FolderArchive size={14} style={{ marginRight: "4px" }} /> Knowledge Base</span>
            </div>
            <h1 className={styles.heading}>
              Guia de aprobacion{" "}
              <span className="text-gradient-gold">Oxford Test of English</span>
            </h1>
            <p className="text-muted">
              Aqui debe vivir lo importante: formato real del examen, criterios, errores que bajan nota
              y plan de practica para llegar a B1/B2 con evidencia trazable.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Lo que hay que saber antes de practicar</h2>
            <div className={styles.factGrid}>
              {examFacts.map(fact => (
                <div key={fact.title} className={styles.factCard}>
                  <h3>{fact.title}</h3>
                  <p>{fact.body}</p>
                  <span>Fuente: {fact.sourceIds.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Blueprint por modulo</h2>
            <div className={styles.blueprintGrid}>
              {moduleBlueprint.map(module => (
                <article key={module.module} className={styles.blueprintCard}>
                  <div className={styles.blueprintTop}>
                    <h3>{module.module}</h3>
                    <span>{module.time}</span>
                  </div>
                  <p className={styles.scoreFocus}>Criterios/foco: {module.scoreFocus}</p>
                  <div className={styles.blueprintColumns}>
                    <div>
                      <h4>Partes reales</h4>
                      <ul>
                        {module.parts.map(part => <li key={part}>{part}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4>Como entrenarlo</h4>
                      <ul>
                        {module.train.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                  <p className={styles.sourceLine}>Fuente: {module.sourceIds.join(", ")}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Plan para aprobar</h2>
            <div className={styles.planGrid}>
              {passPlan.map(step => (
                <div key={step.phase} className={styles.planStep}>
                  <h3>{step.phase}</h3>
                  <p><strong>Resultado:</strong> {step.output}</p>
                  <p><strong>Practica:</strong> {step.practice}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Errores que mas cuestan puntos</h2>
            <ul className={styles.mistakeList}>
              {priorityMistakes.map(mistake => <li key={mistake}>{mistake}</li>)}
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Estrategias por Habilidad</h2>
            <div className={styles.strategiesGrid}>
              {strategies.map(s => (
                <div key={s.skill} className={`${styles.stratCard} ${styles[`strat_${s.color}`]}`}>
                  <div className={styles.stratHeader}>
                    <span className={styles.stratIcon}>{s.icon}</span>
                    <span className={`badge badge-${s.color}`}>{s.skill}</span>
                  </div>
                  <ul className={styles.stratList}>
                    {s.tips.map(t => (
                      <li key={t} className={styles.stratTip}>
                        <span className={styles.stratDot} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Score Scale */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Puntuacion CEFR del OTE normal</h2>
            <div className={styles.scaleCard}>
              {scoreBands.map(s => (
                <div key={s.level} className={styles.scaleRow}>
                  <div className={styles.scaleBadge}>
                    {s.level}
                  </div>
                  <div className={styles.scaleRange}>{s.range} pts</div>
                  <p className={styles.scaleDesc}>{s.goal}</p>
                </div>
              ))}
              <div className={styles.scaleNote}>
                El OTE Advanced es otro producto y apunta a B2-C1. Esta plataforma sigue enfocada
                en Oxford Test of English normal B1/B2.
              </div>
            </div>
          </div>

          {/* KB Grid */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Las 20 Bases de Conocimiento</h2>
            <div className={styles.kbGrid}>
              {kbBases.map(kb => (
                <div key={kb.id} className={`${styles.kbCard} ${kb.entries > 0 ? styles.kbActive : styles.kbEmpty}`}>
                  <div className={styles.kbTop}>
                    <span className={styles.kbIcon}>{kb.icon}</span>
                    <div>
                      <p className={styles.kbId}>{kb.id}</p>
                      <p className={styles.kbLabel}>{kb.label}</p>
                    </div>
                    <span className={`${styles.kbStatus} ${kb.entries > 0 ? styles.kbStatusActive : ""}`}>
                      {kb.entries > 0 ? `${kb.entries} entrada${kb.entries > 1 ? "s" : ""}` : "Próximo"}
                    </span>
                  </div>
                  <p className={styles.kbDesc}>{kb.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
