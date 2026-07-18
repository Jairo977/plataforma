import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Mic, PenTool, Headphones, BookOpen, Clock, Target, Bookmark, Sparkles, Compass, Brain } from "lucide-react";
import styles from "./dashboard.module.css";

const modules = [
  {
    id: "speaking",
    icon: <Mic size={20} />,
    label: "Speaking",
    color: "speaking",
    time: "15 min",
    parts: 4,
    progress: 35,
    href: "/practice/speaking",
    lastPractice: "Hace 2 días",
    tip: "Usa frases de reacción para ganar tiempo de pensamiento.",
  },
  {
    id: "writing",
    icon: <PenTool size={20} />,
    label: "Writing",
    color: "writing",
    time: "45 min",
    parts: 2,
    progress: 60,
    href: "/practice/writing",
    lastPractice: "Ayer",
    tip: "Adapta el estilo formal/informal según el destinatario.",
  },
  {
    id: "listening",
    icon: <Headphones size={20} />,
    label: "Listening",
    color: "listening",
    time: "30 min",
    parts: 4,
    progress: 20,
    href: "/practice/listening",
    lastPractice: "Hace 5 días",
    tip: "Primera escucha: idea global. Segunda: confirmar detalles.",
  },
  {
    id: "reading",
    icon: <BookOpen size={20} />,
    label: "Reading",
    color: "reading",
    time: "35 min",
    parts: 4,
    progress: 45,
    href: "/practice/reading",
    lastPractice: "Hace 3 días",
    tip: "Lee las preguntas primero para focalizar la atención.",
  },
  {
    id: "use-of-english",
    icon: <Brain size={20} />,
    label: "Use of English",
    color: "uoe",
    time: "30 min",
    parts: 6,
    progress: 10,
    href: "/practice/use-of-english",
    lastPractice: "Sin iniciar",
    tip: "Presta atención a los phrasal verbs y preposiciones clave.",
  },
];

const recentSessions = [
  { skill: "Writing", type: "Email B1", result: "developing", date: "Hoy 09:42", icon: <PenTool size={16} />, color: "writing" },
  { skill: "Speaking", type: "Monólogo comparativo B2", result: "exam_ready", date: "Ayer 16:15", icon: <Mic size={16} />, color: "speaking" },
  { skill: "Writing", type: "Opinion Essay B2", result: "needs_work", date: "Hace 2 días", icon: <PenTool size={16} />, color: "writing" },
];

const resultColors: Record<string, string> = {
  exam_ready:  "#34d399",
  developing:  "#fbbf24",
  needs_work:  "#f87171",
};

const resultLabels: Record<string, string> = {
  exam_ready:  "Exam Ready ✓",
  developing:  "Developing →",
  needs_work:  "Needs Work !",
};

const tips = [
  { icon: <Bookmark size={18} style={{ color: "var(--gold-400)" }} />, text: "Practica Speaking con vocabulario 'vertical': profundiza en un tema en vez de enumerar muchos." },
  { icon: <Clock size={18} style={{ color: "var(--gold-400)" }} />, text: "En Reading, no pases más de 2 minutos en una pregunta difícil." },
  { icon: <PenTool size={18} style={{ color: "var(--gold-400)" }} />, text: "En Writing, reserva los últimos 3 minutos para revisar puntuación y ortografía." },
  { icon: <Target size={18} style={{ color: "var(--gold-400)" }} />, text: "Identifica sinónimos y paráfrasis en Listening: el audio no repite las palabras exactas." },
];

export default function DashboardPage() {
  const overallProgress = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">

          {/* ── HEADER ── */}
          <div className={styles.header}>
            <div>
              <div className="flex gap-2" style={{ alignItems: "center", marginBottom: "0.5rem" }}>
                <span className="badge badge-gold">Dashboard</span>
              </div>
              <h1 className={styles.heading}>
                Tu preparación para el{" "}
                <span className="text-gradient-gold">Oxford Test</span>
              </h1>
              <p className="text-muted" style={{ marginTop: "0.5rem" }}>
                Niveles B1 & B2 · 4 módulos · Sistema CEFR
              </p>
            </div>
            <Link href="/simulator" className="btn btn-primary hide-mobile">
              Iniciar Simulador
            </Link>
          </div>

          {/* ── OVERALL PROGRESS ── */}
          <div className={styles.overallCard}>
            <div className={styles.overallLeft}>
              <p className={styles.overallLabel}>Progreso General</p>
              <div className={styles.overallScore}>
                <span className={styles.overallNum}>{overallProgress}%</span>
                <span className={styles.overallSub}>nivel de preparación</span>
              </div>
              <div className="progress-bar" style={{ marginTop: "1rem" }}>
                <div className="progress-fill" style={{ width: `${overallProgress}%` }} />
              </div>
            </div>
            <div className={styles.overallStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>12</span>
                <span className={styles.statLabel}>Sesiones totales</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>3</span>
                <span className={styles.statLabel}>Racha actual (días)</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>4h 20m</span>
                <span className={styles.statLabel}>Tiempo practicado</span>
              </div>
            </div>
          </div>

          {/* ── MODULE CARDS ── */}
          <div className={styles.sectionTitle}>
            <h2>Módulos de Práctica</h2>
            <p className="text-muted text-sm">Selecciona una habilidad para practicar</p>
          </div>

          <div className={styles.modulesGrid}>
            {modules.map((mod, i) => (
              <Link key={mod.id} href={mod.href} className={`${styles.moduleCard} ${styles[`module_${mod.color}`]}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.moduleTop}>
                  <div className={`skill-icon skill-icon-${mod.color}`}>
                    {mod.icon}
                  </div>
                  <div className={styles.moduleInfo}>
                    <span className={`badge badge-${mod.color}`}>{mod.label}</span>
                    <p className={styles.moduleMeta}>⏱ {mod.time} · {mod.parts} partes</p>
                  </div>
                </div>

                <div className={styles.moduleProgress}>
                  <div className={styles.moduleProgressLabel}>
                    <span className={styles.progressText}>Progreso</span>
                    <span className={styles.progressNum}>{mod.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${mod.progress}%` }} />
                  </div>
                </div>

                <p className={styles.moduleTip}>💡 {mod.tip}</p>

                <div className={styles.moduleFooter}>
                  <span className={styles.lastPractice}>🕐 {mod.lastPractice}</span>
                  <span className={styles.moduleArrow}>Practicar →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* ── BOTTOM ROW: Sessions + Tips ── */}
          <div className={styles.bottomRow}>

            {/* Recent Sessions */}
            <div className={styles.sessionsCard}>
              <h3 className={styles.cardTitle}>Últimas Sesiones</h3>
              <div className={styles.sessionsList}>
                {recentSessions.map((s, i) => (
                  <div key={i} className={styles.sessionItem}>
                    <div className={`skill-icon skill-icon-${s.color}`} style={{ width: 40, height: 40, borderRadius: 10, fontSize: "1.1rem" }}>
                      {s.icon}
                    </div>
                    <div className={styles.sessionInfo}>
                      <p className={styles.sessionType}>{s.type}</p>
                      <p className={styles.sessionDate}>{s.date}</p>
                    </div>
                    <span
                      className={styles.sessionResult}
                      style={{ color: resultColors[s.result] }}
                    >
                      {resultLabels[s.result]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Tips */}
            <div className={styles.tipsCard}>
              <h3 className={styles.cardTitle}>Estrategias del Día</h3>
              <div className={styles.tipsList}>
                {tips.map((t, i) => (
                  <div key={i} className={styles.tipItem}>
                    <span className={styles.tipIcon}>{t.icon}</span>
                    <p className={styles.tipText}>{t.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/knowledge" className="btn btn-secondary btn-sm" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}>
                Ver base de conocimiento →
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
