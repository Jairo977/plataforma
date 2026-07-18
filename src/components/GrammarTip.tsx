"use client";
import { useState } from "react";
import { BookOpen, ChevronDown, Code2, Quote } from "lucide-react";

export interface GrammarTipData {
  concept: string;       // "Present Simple — Hábitos y rutinas"
  formula: string;       // "Subject + V(base) / V(+s/es) + Complement\nI work / She works"
  example: string;       // "I _work_ as a programmer in Riobamba."
  /** parts of the example to highlight — exact substrings */
  highlights?: string[];
}

interface Props {
  data: GrammarTipData;
  /** Show open by default */
  defaultOpen?: boolean;
}

function highlightText(text: string, highlights: string[] = []): React.ReactNode {
  if (!highlights.length) return <span className="gt-example-text">{text}</span>;
  const parts = text.split(new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g"));
  return (
    <span className="gt-example-text">
      {parts.map((p, i) =>
        highlights.includes(p) ? <strong key={i}>{p}</strong> : p
      )}
    </span>
  );
}

export default function GrammarTip({ data, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="grammar-tip">
      <button
        className={`grammar-tip-header ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
      >
        <BookOpen size={14} />
        <span>Gramática: {data.concept}</span>
        <ChevronDown size={13} className="gt-chevron" />
      </button>

      {open && (
        <div className="grammar-tip-body">
          <p className="gt-concept">{data.concept}</p>

          <div className="gt-formula">
            <span className="gt-formula-label">
              <Code2 size={11} style={{ display: "inline", marginRight: "4px" }} />
              Fórmula
            </span>
            <span className="gt-formula-text">{data.formula}</span>
          </div>

          <div className="gt-example">
            <span className="gt-example-label">
              <Quote size={11} style={{ display: "inline", marginRight: "4px" }} />
              Ejemplo
            </span>
            {highlightText(data.example, data.highlights)}
          </div>
        </div>
      )}
    </div>
  );
}
