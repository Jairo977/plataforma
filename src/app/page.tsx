import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Timer, Lightbulb } from "lucide-react";
import styles from "./page.module.css";

const modules = [
  {
    id: "speaking", mark: "S", label: "Speaking", color: "speaking",
    time: "~15 min", parts: 4,
    desc: "Entrevista breve, 2 mensajes de voz, charla 1 min y preguntas de seguimiento.",
    href: "/practice/speaking",
    realTip: "Usa conectores orales: 'well', 'actually', 'for instance'. Llena el tiempo con ejemplos concretos.",
    partsList: ["Parte 1: Entrevista (8 preguntas, 10-20s c/u)", "Parte 2: 2 mensajes de voz (40s c/u)", "Parte 3: Charla basada en fotos (1 min)", "Parte 4: 6 preguntas de seguimiento (30s c/u)"],
  },
  {
    id: "writing", mark: "W", label: "Writing", color: "writing",
    time: "45 min", parts: 2,
    desc: "Email de 80-130 palabras y ensayo/artículo/reseña de 100-160 palabras.",
    href: "/practice/writing",
    realTip: "Cubre los 3 prompts del email. En el ensayo, usa vocabulario vertical: profundiza un tema con detalles específicos.",
    partsList: ["Parte 1: Email (80-130 palabras, 20 min)", "Parte 2: Ensayo/Artículo/Reseña (100-160 palabras, 25 min)"],
  },
  {
    id: "listening", mark: "L", label: "Listening", color: "listening",
    time: "~30 min", parts: 4,
    desc: "5 diálogos cortos, monólogo largo, diálogo de opiniones, y 5 audios breves más.",
    href: "/practice/listening",
    realTip: "Primera escucha: idea global. Segunda: confirma detalles. La respuesta parafrasea el audio — no repite las palabras exactas.",
    partsList: ["Parte 1: 5 diálogos cortos (opción múltiple)", "Parte 2: Monólogo largo (completar notas)", "Parte 3: Diálogo — ¿quién dijo qué?", "Parte 4: 5 audios cortos (opción múltiple)"],
  },
  {
    id: "reading", mark: "R", label: "Reading", color: "reading",
    time: "35 min", parts: 4,
    desc: "6 textos cortos, matching de perfiles, insertar frases y texto largo.",
    href: "/practice/reading",
    realTip: "Lee la pregunta ANTES del texto. En matching, busca requisitos obligatorios. Usa referencias textuales (this, however, therefore) para gap-fill.",
    partsList: ["Parte 1: 6 textos cortos (1 pregunta c/u)", "Parte 2: Matching de perfiles y textos", "Parte 3: Insertar 6 frases en un texto largo", "Parte 4: Texto largo con 4 preguntas"],
  },
];

const scoreBands = [
  { range: "0–50", level: "Below A2", color: "#B05050" },
  { range: "51–80", level: "A2", color: "#C87D50" },
  { range: "81–110", level: "B1", color: "#D4A830" },
  { range: "111–140", level: "B2", color: "#3BAF8E" },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBackdrop} />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className="badge badge-gold">Oxford Test of English · B1/B2</span>
              <h1 className="display-xl">
                OxfordPrep —
                <span>practica como en el examen real.</span>
              </h1>
              <p className={styles.heroSub}>
                Plataforma con preguntas reales del OTE, evaluación IA por criterio, 
                ejemplos modelo en cada tarea y estrategias de examen visibles.
              </p>
              <div className={styles.heroActions}>
                <Link href="/placement" className="btn btn-primary btn-lg">Diagnosticar mi nivel</Link>
                <Link href="/dashboard" className="btn btn-secondary btn-lg">Entrar al dashboard</Link>
              </div>
            </div>

            {/* Exam quick-facts panel */}
            <div className={styles.examPanel}>
              <p className={styles.panelEyebrow}>El examen OTE</p>
              <h2 style={{ fontSize: "1.15rem", marginBottom: "1rem" }}>Estructura real del examen</h2>
              <div className={styles.panelRows}>
                {modules.map((mod) => (
                  <Link key={mod.id} href={mod.href} className={styles.panelRow}>
                    <span className={`${styles.moduleMark} ${styles[`mark_${mod.color}`]}`}>{mod.mark}</span>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{mod.label}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.76rem", marginLeft: "0.5rem" }}>· {mod.parts} partes</span>
                    </div>
                    <small>{mod.time}</small>
                  </Link>
                ))}
              </div>
              <div className={styles.panelScores}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.6rem" }}>Bandas de puntuación OTE</p>
                {scoreBands.map(b => (
                  <div key={b.level} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.78rem", marginBottom: "0.35rem" }}>
                    <span style={{ width: "48px", color: b.color, fontWeight: 700 }}>{b.range}</span>
                    <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: "rgba(148,163,184,0.12)", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: b.color, width: `${(parseInt(b.range.split("–")[1]) / 140) * 100}%` }} />
                    </div>
                    <span style={{ color: b.color, fontWeight: 600 }}>{b.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats band ── */}
        <div className={styles.statsBand}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statItem}><strong>100+</strong><span>Preguntas reales OTE</span></div>
              <div className={styles.statItem}><strong>4</strong><span>Módulos completos</span></div>
              <div className={styles.statItem}><strong>B1/B2</strong><span>Niveles objetivo CEFR</span></div>
              <Link href="/simulator" className={styles.statCta}>Abrir simulador completo →</Link>
            </div>
          </div>
        </div>

        {/* ── Module cards with real content ── */}
        <section className="section">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className="display-lg">Qué se pregunta en cada módulo</h2>
              <p style={{ marginTop: "0.6rem", color: "var(--text-secondary)" }}>
                Información real del OTE — formato exacto de cada parte, tiempo y estrategia clave.
              </p>
            </div>
            <div className={styles.modulesGrid}>
              {modules.map((mod) => (
                <Link key={mod.id} href={mod.href} className={`${styles.moduleCard} ${styles[`card_${mod.color}`]}`}>
                  <div className={styles.moduleTop}>
                    <span className={`${styles.moduleMark} ${styles[`mark_${mod.color}`]}`}>{mod.mark}</span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <span className={`badge badge-${mod.color}`}>{mod.label}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}><Timer size={12} style={{ display: "inline", marginBottom: "2px", marginRight: "3px" }} /> {mod.time}</span>
                      </div>
                      <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{mod.desc}</p>
                    </div>
                  </div>

                  <div className={styles.modulePartsGrid}>
                    {mod.partsList.map((part, i) => (
                      <div key={i} className={styles.modulePart}>
                        <span className={styles.modulePartNum}>{i + 1}</span>
                        <span>{part}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.moduleTip}>
                    <span style={{ color: "var(--gold-400)" }}><Lightbulb size={15} /></span>
                    <p>{mod.realTip}</p>
                  </div>

                  <div className={styles.moduleArrow}>Practicar {mod.label} →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ruta de estudio ── */}
        <section className={styles.workflowSection}>
          <div className="container">
            <div className={styles.workflowGrid}>
              <div>
                <span className="badge badge-gold">Ruta recomendada</span>
                <h2 className="display-lg" style={{ marginTop: "0.75rem" }}>Del nivel actual al B2, paso a paso.</h2>
              </div>
              <ol className={styles.workflowList}>
                {[
                  { step: "Diagnóstico", desc: "Identifica en qué partes de cada módulo tienes más brechas." },
                  { step: "Práctica modular", desc: "1 ejercicio diario por módulo: listening → reading → writing → speaking." },
                  { step: "Banco de frases", desc: "Aprende los conectores y frases de cada módulo — no memorices textos." },
                  { step: "Simulacro completo", desc: "Practica sin pausa, sin volver atrás — igual que el examen real." },
                ].map((item, i) => (
                  <li key={i}>
                    <span>{i + 1}</span>
                    <div>
                      <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>{item.step}</strong>
                      <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className={styles.finalCta}>
          <div className="container">
            <div className={styles.finalInner}>
              <div>
                <h2>Empieza por tu nivel actual.</h2>
                <p style={{ marginTop: "0.4rem", color: "var(--text-secondary)" }}>
                  El diagnóstico tarda unos minutos y te dice en qué módulo enfocar la práctica.
                </p>
              </div>
              <Link href="/placement" className="btn btn-primary btn-lg">Hacer diagnóstico gratuito</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
