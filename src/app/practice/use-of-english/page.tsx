"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./uoe.module.css";
import {
  uoePart1,
  uoePart2,
  uoePart3,
  uoePart4,
  uoePart5,
  uoePart6,
  uoeListeningParty,
  uoeListeningMatch,
  uoeListeningTrueFalse
} from "@/lib/use-of-english-data";
import { Timer, CheckCircle, RefreshCw, Volume2, HelpCircle } from "lucide-react";

type Part = "part1" | "part2" | "part3" | "part4" | "part5" | "part6" | "listening_party" | "listening_match" | "listening_tf";

export default function UseOfEnglishPage() {
  const [activePart, setActivePart] = useState<Part>("part1");

  // User answers
  const [answersPart1, setAnswersPart1] = useState<Record<string, number>>({});
  const [answersPart2, setAnswersPart2] = useState<Record<string, number>>({});
  const [answersPart3, setAnswersPart3] = useState<Record<number, string>>({});
  const [answersPart4, setAnswersPart4] = useState<Record<string, number>>({});
  const [answersPart5, setAnswersPart5] = useState<Record<string, number>>({});
  const [answersPart6, setAnswersPart6] = useState<Record<string, number>>({});
  
  // Listening answers
  const [answersParty, setAnswersParty] = useState<Record<number, boolean>>({});
  const [answersMatch, setAnswersMatch] = useState<Record<string, string>>({});
  const [answersTf, setAnswersTf] = useState<Record<number, boolean>>({});

  // Checked state for showing feedback
  const [checkedParts, setCheckedParts] = useState<Record<Part, boolean>>({
    part1: false,
    part2: false,
    part3: false,
    part4: false,
    part5: false,
    part6: false,
    listening_party: false,
    listening_match: false,
    listening_tf: false
  });

  const speakText = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleCheck = (part: Part) => {
    setCheckedParts(prev => ({ ...prev, [part]: true }));
  };

  const handleReset = (part: Part) => {
    setCheckedParts(prev => ({ ...prev, [part]: false }));
    if (part === "part1") setAnswersPart1({});
    if (part === "part2") setAnswersPart2({});
    if (part === "part3") setAnswersPart3({});
    if (part === "part4") setAnswersPart4({});
    if (part === "part5") setAnswersPart5({});
    if (part === "part6") setAnswersPart6({});
    if (part === "listening_party") setAnswersParty({});
    if (part === "listening_match") setAnswersMatch({});
    if (part === "listening_tf") setAnswersTf({});
  };

  const renderPrompt = (prompt: string, selectedText?: string) => {
    if (!selectedText || !/_{3,}/.test(prompt)) return prompt;
    const parts = prompt.split(/_{3,}/);
    return (
      <>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span style={{ color: 'var(--uoe-color, #a78bfa)', fontWeight: 'bold', textDecoration: 'underline', padding: '0 4px' }}>
                {selectedText}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  // Calculation of scores
  const getScore = (part: Part): { score: number; max: number } => {
    let score = 0;
    let max = 0;

    if (part === "part1") {
      max = uoePart1.length;
      uoePart1.forEach(q => {
        if (answersPart1[q.id] === q.correct) score++;
      });
    } else if (part === "part2") {
      max = uoePart2.length;
      uoePart2.forEach(q => {
        if (answersPart2[q.id] === q.correct) score++;
      });
    } else if (part === "part3") {
      uoePart3.forEach(group => {
        group.gaps.forEach(gap => {
          max++;
          const ans = (answersPart3[gap.number] || "").trim().toLowerCase();
          if (gap.correctAnswers.map(c => c.toLowerCase()).includes(ans)) {
            score++;
          }
        });
      });
    } else if (part === "part4") {
      max = uoePart4.length;
      uoePart4.forEach(q => {
        if (answersPart4[q.id] === q.correct) score++;
      });
    } else if (part === "part5") {
      max = uoePart5.length;
      uoePart5.forEach(q => {
        if (answersPart5[q.id] === q.correct) score++;
      });
    } else if (part === "part6") {
      max = uoePart6.length;
      uoePart6.forEach(q => {
        if (answersPart6[q.id] === q.correct) score++;
      });
    } else if (part === "listening_party") {
      // 6 options, check if user matched the correct states
      max = uoeListeningParty.options.length;
      uoeListeningParty.options.forEach((opt, idx) => {
        const isSelected = !!answersParty[idx];
        if (isSelected === opt.correct) score++;
      });
    } else if (part === "listening_match") {
      max = uoeListeningMatch.conversations.length;
      uoeListeningMatch.conversations.forEach(c => {
        if (answersMatch[c.label] === c.correctTopic) score++;
      });
    } else if (part === "listening_tf") {
      max = uoeListeningTrueFalse.questions.length;
      uoeListeningTrueFalse.questions.forEach((q, idx) => {
        if (answersTf[idx] === q.correct) score++;
      });
    }

    return { score, max };
  };

  const currentScore = getScore(activePart);
  const isChecked = checkedParts[activePart];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />

        <header className={styles.header}>
          <span className="badge badge-gold">Gramática, Vocabulario y Listening</span>
          <h1 className={styles.heading}>Placement & Use of English</h1>
          <p className={styles.sub}>
            Practica con el examen de diagnóstico completo del Oxford ELLT y OTE. 
            Repasa tus fallos, analiza las explicaciones y domina los phrasal verbs y collocations.
          </p>
        </header>

        <div className={styles.layout}>
          {/* Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <button
              className={`${styles.partBtn} ${activePart === "part1" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("part1")}
            >
              <span>1</span> Conversation Complete
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "part2" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("part2")}
            >
              <span>2</span> Meaning & Intent
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "part3" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("part3")}
            >
              <span>3</span> One-Word Gap Fill
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "part4" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("part4")}
            >
              <span>4</span> Phrasal Verbs
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "part5" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("part5")}
            >
              <span>5</span> Collocations
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "part6" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("part6")}
            >
              <span>6</span> Mixed Questions
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "listening_party" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("listening_party")}
            >
              <span>🎧</span> Party Invitation
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "listening_match" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("listening_match")}
            >
              <span>🎧</span> Match Conversations
            </button>
            <button
              className={`${styles.partBtn} ${activePart === "listening_tf" ? styles.partBtnActive : ""}`}
              onClick={() => setActivePart("listening_tf")}
            >
              <span>🎧</span> True or False Message
            </button>
          </aside>

          {/* Main Practice Content Card */}
          <div className={styles.contentCard}>
            
            {/* Score Banner when checked */}
            {isChecked && (
              <div className={styles.scoreBanner}>
                <div>
                  <h3 className={styles.scoreBannerTitle}>Resultados de la sección</h3>
                  <p className={styles.scoreBannerSub}>Revisa las explicaciones de cada respuesta incorrecta.</p>
                </div>
                <div className={styles.scoreNum}>
                  {currentScore.score} / {currentScore.max}
                </div>
              </div>
            )}

            {/* PART 1 */}
            {activePart === "part1" && (
              <div>
                <h2 className={styles.partTitle}>Part 1: Complete the Conversation</h2>
                <p className={styles.partDesc}>Choose the most suitable word or phrase to complete the dialogue naturally.</p>
                
                {uoePart1.map((q, idx) => (
                  <div key={q.id} className={styles.qGroup}>
                    <div className={styles.qHeader}>
                      <span className={styles.qNumber}>Pregunta {idx + 1} de {uoePart1.length}</span>
                    </div>
                    <div className={styles.qPrompt}>{renderPrompt(q.prompt, answersPart1[q.id] !== undefined ? q.options?.[answersPart1[q.id]] : undefined)}</div>
                    <div className={styles.optionsGrid}>
                      {q.options?.map((opt, oi) => {
                        const isSelected = answersPart1[q.id] === oi;
                        const isCorrect = oi === q.correct;
                        return (
                          <button
                            key={oi}
                            className={`${styles.optBtn} 
                              ${isSelected ? styles.optSelected : ""} 
                              ${isChecked && isCorrect ? styles.optCorrect : ""}
                              ${isChecked && isSelected && !isCorrect ? styles.optWrong : ""}
                            `}
                            onClick={() => !isChecked && setAnswersPart1(prev => ({ ...prev, [q.id]: oi }))}
                            disabled={isChecked}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isChecked && (
                      <div className={styles.feedbackBox}>
                        <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Explicación gramática</h4>
                        <p className={styles.feedbackText}>
                          <strong style={{color: '#34d399'}}>Respuesta correcta: {q.options ? q.options[q.correct!] : ''}</strong>
                          <br/><br/>
                          {q.explanation}
                        </p>
                        <p className={styles.strategyText}>💡 {q.strategy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* PART 2 */}
            {activePart === "part2" && (
              <div>
                <h2 className={styles.partTitle}>Part 2: What does the speaker mean?</h2>
                <p className={styles.partDesc}>Identify the true meaning behind the speaker's functional statement.</p>

                {uoePart2.map((q, idx) => (
                  <div key={q.id} className={styles.qGroup}>
                    <div className={styles.qHeader}>
                      <span className={styles.qNumber}>Pregunta {idx + 1} de {uoePart2.length}</span>
                    </div>
                    <div className={styles.qPrompt}>{renderPrompt(q.prompt, answersPart2[q.id] !== undefined ? q.options?.[answersPart2[q.id]] : undefined)}</div>
                    <div className={styles.optionsGrid}>
                      {q.options?.map((opt, oi) => {
                        const isSelected = answersPart2[q.id] === oi;
                        const isCorrect = oi === q.correct;
                        return (
                          <button
                            key={oi}
                            className={`${styles.optBtn} 
                              ${isSelected ? styles.optSelected : ""} 
                              ${isChecked && isCorrect ? styles.optCorrect : ""}
                              ${isChecked && isSelected && !isCorrect ? styles.optWrong : ""}
                            `}
                            onClick={() => !isChecked && setAnswersPart2(prev => ({ ...prev, [q.id]: oi }))}
                            disabled={isChecked}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isChecked && (
                      <div className={styles.feedbackBox}>
                        <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Significado Funcional</h4>
                        <p className={styles.feedbackText}>
                          <strong style={{color: '#34d399'}}>Respuesta correcta: {q.options ? q.options[q.correct!] : ''}</strong>
                          <br/><br/>
                          {q.explanation}
                        </p>
                        <p className={styles.strategyText}>💡 {q.strategy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* PART 3 */}
            {activePart === "part3" && (
              <div>
                <h2 className={styles.partTitle}>Part 3: One-word Gap Fill</h2>
                <p className={styles.partDesc}>Write exactly ONE word in each space to complete the paragraphs logically.</p>

                {uoePart3.map((group, gIdx) => {
                  // Function to render text with inputs inline
                  const renderTextWithInputs = () => {
                    let elements: React.ReactNode[] = [];
                    let remainingText = group.text;

                    group.gaps.forEach(gap => {
                      const placeholder = `${gap.number}.[`;
                      const startIdx = remainingText.indexOf(placeholder);
                      if (startIdx !== -1) {
                        // Text before the input
                        elements.push(<span key={`text-${gap.number}`}>{remainingText.substring(0, startIdx)}</span>);
                        
                        // Render input field
                        const val = answersPart3[gap.number] || "";
                        const isCorrect = gap.correctAnswers.map(c => c.toLowerCase()).includes(val.trim().toLowerCase());
                        elements.push(
                          <input
                            key={`input-${gap.number}`}
                            type="text"
                            className={`${styles.gapInput} 
                              ${isChecked && isCorrect ? styles.gapCorrect : ""}
                              ${isChecked && !isCorrect ? styles.gapWrong : ""}
                            `}
                            value={val}
                            placeholder={`${gap.number}`}
                            onChange={e => !isChecked && setAnswersPart3(prev => ({ ...prev, [gap.number]: e.target.value }))}
                            disabled={isChecked}
                          />
                        );

                        // Cut remaining text after closing bracket
                        const endBracketIdx = remainingText.indexOf(']', startIdx);
                        remainingText = remainingText.substring(endBracketIdx + 1);
                      }
                    });

                    elements.push(<span key="text-end">{remainingText}</span>);
                    return elements;
                  };

                  return (
                    <div key={gIdx} className={styles.qGroup}>
                      <h3 className={styles.qNumber}>Texto {gIdx + 1}</h3>
                      <div className={styles.gapParagraph}>
                        {renderTextWithInputs()}
                      </div>

                      {isChecked && (
                        <div className={styles.gapFeedbackList}>
                          {group.gaps.map(gap => {
                            const val = (answersPart3[gap.number] || "").trim();
                            const isCorrect = gap.correctAnswers.map(c => c.toLowerCase()).includes(val.toLowerCase());
                            return (
                              <div key={gap.number} className={styles.feedbackBox} style={{ borderLeft: `4px solid ${isCorrect ? '#34d399' : '#f87171'}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                  <span className={styles.gapLabel}>{gap.number}</span>
                                  <strong style={{ color: isCorrect ? '#34d399' : '#f87171' }}>
                                    {isCorrect ? "Correcto" : `Incorrecto (Tu respuesta: "${val || 'vacío'}")`}
                                  </strong>
                                </div>
                                <p className={styles.feedbackText}>
                                  <strong>Respuestas aceptadas:</strong> {gap.correctAnswers.join(", ")}
                                </p>
                                <p className={styles.feedbackText}>{gap.explanation}</p>
                                <p className={styles.strategyText}>💡 {gap.strategy}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* PART 4 */}
            {activePart === "part4" && (
              <div>
                <h2 className={styles.partTitle}>Part 4: Phrasal Verbs</h2>
                <p className={styles.partDesc}>Select the phrasal verb that fits grammatically and contextually.</p>

                {uoePart4.map((q, idx) => (
                  <div key={q.id} className={styles.qGroup}>
                    <div className={styles.qHeader}>
                      <span className={styles.qNumber}>Pregunta {idx + 1} de {uoePart4.length}</span>
                    </div>
                    <div className={styles.qPrompt}>{renderPrompt(q.prompt, answersPart4[q.id] !== undefined ? q.options?.[answersPart4[q.id]] : undefined)}</div>
                    <div className={styles.optionsGrid}>
                      {q.options?.map((opt, oi) => {
                        const isSelected = answersPart4[q.id] === oi;
                        const isCorrect = oi === q.correct;
                        return (
                          <button
                            key={oi}
                            className={`${styles.optBtn} 
                              ${isSelected ? styles.optSelected : ""} 
                              ${isChecked && isCorrect ? styles.optCorrect : ""}
                              ${isChecked && isSelected && !isCorrect ? styles.optWrong : ""}
                            `}
                            onClick={() => !isChecked && setAnswersPart4(prev => ({ ...prev, [q.id]: oi }))}
                            disabled={isChecked}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isChecked && (
                      <div className={styles.feedbackBox}>
                        <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Uso de Phrasal Verbs</h4>
                        <p className={styles.feedbackText}>
                          <strong style={{color: '#34d399'}}>Respuesta correcta: {q.options ? q.options[q.correct!] : ''}</strong>
                          <br/><br/>
                          {q.explanation}
                        </p>
                        <p className={styles.strategyText}>💡 {q.strategy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* PART 5 */}
            {activePart === "part5" && (
              <div>
                <h2 className={styles.partTitle}>Part 5: Collocations</h2>
                <p className={styles.partDesc}>Choose the correct verb/adjective partner that forms a natural English collocation.</p>

                {uoePart5.map((q, idx) => (
                  <div key={q.id} className={styles.qGroup}>
                    <div className={styles.qHeader}>
                      <span className={styles.qNumber}>Pregunta {idx + 1} de {uoePart5.length}</span>
                    </div>
                    <div className={styles.qPrompt}>{renderPrompt(q.prompt, answersPart5[q.id] !== undefined ? q.options?.[answersPart5[q.id]] : undefined)}</div>
                    <div className={styles.optionsGrid}>
                      {q.options?.map((opt, oi) => {
                        const isSelected = answersPart5[q.id] === oi;
                        const isCorrect = oi === q.correct;
                        return (
                          <button
                            key={oi}
                            className={`${styles.optBtn} 
                              ${isSelected ? styles.optSelected : ""} 
                              ${isChecked && isCorrect ? styles.optCorrect : ""}
                              ${isChecked && isSelected && !isCorrect ? styles.optWrong : ""}
                            `}
                            onClick={() => !isChecked && setAnswersPart5(prev => ({ ...prev, [q.id]: oi }))}
                            disabled={isChecked}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isChecked && (
                      <div className={styles.feedbackBox}>
                        <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Collocations (Combinaciones Léxicas)</h4>
                        <p className={styles.feedbackText}>
                          <strong style={{color: '#34d399'}}>Respuesta correcta: {q.options ? q.options[q.correct!] : ''}</strong>
                          <br/><br/>
                          {q.explanation}
                        </p>
                        <p className={styles.strategyText}>💡 {q.strategy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* PART 6 */}
            {activePart === "part6" && (
              <div>
                <h2 className={styles.partTitle}>Part 6: Oxford-style Mixed Questions</h2>
                <p className={styles.partDesc}>Practice typical mixed grammar, prepositions and idioms from the OTE format.</p>

                {uoePart6.map((q, idx) => (
                  <div key={q.id} className={styles.qGroup}>
                    <div className={styles.qHeader}>
                      <span className={styles.qNumber}>Pregunta {idx + 1} de {uoePart6.length}</span>
                    </div>
                    <div className={styles.qPrompt}>{renderPrompt(q.prompt, answersPart6[q.id] !== undefined ? q.options?.[answersPart6[q.id]] : undefined)}</div>
                    <div className={styles.optionsGrid}>
                      {q.options?.map((opt, oi) => {
                        const isSelected = answersPart6[q.id] === oi;
                        const isCorrect = oi === q.correct;
                        return (
                          <button
                            key={oi}
                            className={`${styles.optBtn} 
                              ${isSelected ? styles.optSelected : ""} 
                              ${isChecked && isCorrect ? styles.optCorrect : ""}
                              ${isChecked && isSelected && !isCorrect ? styles.optWrong : ""}
                            `}
                            onClick={() => !isChecked && setAnswersPart6(prev => ({ ...prev, [q.id]: oi }))}
                            disabled={isChecked}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isChecked && (
                      <div className={styles.feedbackBox}>
                        <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Explicación General</h4>
                        <p className={styles.feedbackText}>
                          <strong style={{color: '#34d399'}}>Respuesta correcta: {q.options ? q.options[q.correct!] : ''}</strong>
                          <br/><br/>
                          {q.explanation}
                        </p>
                        <p className={styles.strategyText}>💡 {q.strategy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* LISTENING PARTY */}
            {activePart === "listening_party" && (
              <div>
                <h2 className={styles.partTitle}>Listening: An Invitation to a Party</h2>
                <p className={styles.partDesc}>Listen to the voicemail and select the FOUR statements that are correct based on the message.</p>

                <div className={styles.audioBox}>
                  <p className={styles.audioScript}>{uoeListeningParty.audioScript}</p>
                  <div className={styles.audioActions}>
                    <button className="btn btn-primary btn-sm" onClick={() => speakText(uoeListeningParty.audioScript)}>
                      <Volume2 size={14} /> Escuchar Audio
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => typeof window !== "undefined" && window.speechSynthesis.cancel()}>
                      Detener
                    </button>
                  </div>
                </div>

                <div className={styles.qPrompt}>{uoeListeningParty.prompt}</div>
                <div className={styles.multiSelectGrid}>
                  {uoeListeningParty.options.map((opt, idx) => {
                    const isSelected = !!answersParty[idx];
                    const isCorrect = opt.correct;
                    return (
                      <div
                        key={idx}
                        className={`${styles.multiSelectRow} 
                          ${isSelected ? styles.optSelected : ""}
                          ${isChecked && isCorrect ? styles.optCorrect : ""}
                          ${isChecked && isSelected && !isCorrect ? styles.optWrong : ""}
                        `}
                        onClick={() => {
                          if (!isChecked) {
                            setAnswersParty(prev => ({ ...prev, [idx]: !prev[idx] }));
                          }
                        }}
                      >
                        <div className={`${styles.checkbox} 
                          ${isSelected ? styles.checkboxChecked : ""}
                          ${isChecked && isCorrect ? styles.checkboxCorrect : ""}
                          ${isChecked && isSelected && !isCorrect ? styles.checkboxWrong : ""}
                        `} />
                        <span style={{ fontSize: "0.95rem" }}>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

                {isChecked && (
                  <div className={styles.feedbackBox} style={{ marginTop: "2rem" }}>
                    <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Análisis de Respuestas</h4>
                    <p className={styles.feedbackText}>{uoeListeningParty.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* LISTENING MATCH */}
            {activePart === "listening_match" && (
              <div>
                <h2 className={styles.partTitle}>Listening: Match Conversations</h2>
                <p className={styles.partDesc}>Listen to the four dialogue clips and match each conversation with its correct topic.</p>

                <table className={styles.matchTable}>
                  <thead>
                    <tr>
                      <th>Conversación</th>
                      <th>Tema / Tópico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uoeListeningMatch.conversations.map(c => {
                      const currentVal = answersMatch[c.label] || "";
                      const isCorrect = currentVal === c.correctTopic;
                      return (
                        <tr key={c.label}>
                          <td style={{ fontWeight: 700 }}>{c.label}</td>
                          <td>
                            <select
                              className={`${styles.matchSelect} 
                                ${isChecked && isCorrect ? styles.matchSelectCorrect : ""}
                                ${isChecked && !isCorrect ? styles.matchSelectWrong : ""}
                              `}
                              value={currentVal}
                              onChange={e => !isChecked && setAnswersMatch(prev => ({ ...prev, [c.label]: e.target.value }))}
                              disabled={isChecked}
                            >
                              <option value="">-- Selecciona el tema --</option>
                              {uoeListeningMatch.topics.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {isChecked && (
                  <div className={styles.feedbackBox} style={{ marginTop: "2rem" }}>
                    <h4 className={styles.feedbackTitle}><HelpCircle size={14} /> Análisis de Temas</h4>
                    <p className={styles.feedbackText}>{uoeListeningMatch.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* LISTENING TRUE FALSE */}
            {activePart === "listening_tf" && (
              <div>
                <h2 className={styles.partTitle}>Listening: Leaving a Message</h2>
                <p className={styles.partDesc}>Listen to Peter Griffin's voicemail message for Maria and choose if each statement is TRUE or FALSE.</p>

                <div className={styles.audioBox}>
                  <p className={styles.audioScript}>{uoeListeningTrueFalse.audioScript}</p>
                  <div className={styles.audioActions}>
                    <button className="btn btn-primary btn-sm" onClick={() => speakText(uoeListeningTrueFalse.audioScript)}>
                      <Volume2 size={14} /> Escuchar Audio
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => typeof window !== "undefined" && window.speechSynthesis.cancel()}>
                      Detener
                    </button>
                  </div>
                </div>

                <div>
                  {uoeListeningTrueFalse.questions.map((q, idx) => {
                    const userVal = answersTf[idx];
                    const isCorrect = userVal === q.correct;
                    
                    return (
                      <div key={idx} className={styles.tfRow}>
                        <div className={styles.tfHeader}>
                          <span className={styles.tfQuestionText}>{q.text}</span>
                          <div className={styles.tfButtons}>
                            <button
                              className={`${styles.tfBtn} 
                                ${userVal === true ? styles.tfBtnSelectedTrue : ""}
                                ${isChecked && q.correct === true ? styles.tfBtnCorrect : ""}
                                ${isChecked && userVal === true && q.correct !== true ? styles.tfBtnWrong : ""}
                              `}
                              onClick={() => !isChecked && setAnswersTf(prev => ({ ...prev, [idx]: true }))}
                              disabled={isChecked}
                            >
                              TRUE
                            </button>
                            <button
                              className={`${styles.tfBtn} 
                                ${userVal === false ? styles.tfBtnSelectedFalse : ""}
                                ${isChecked && q.correct === false ? styles.tfBtnCorrect : ""}
                                ${isChecked && userVal === false && q.correct !== false ? styles.tfBtnWrong : ""}
                              `}
                              onClick={() => !isChecked && setAnswersTf(prev => ({ ...prev, [idx]: false }))}
                              disabled={isChecked}
                            >
                              FALSE
                            </button>
                          </div>
                        </div>
                        {isChecked && (
                          <div className={styles.tfFeedback}>
                            <strong>{q.correct ? "TRUE" : "FALSE"}:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer Buttons for cards */}
            <div className={styles.footerActions}>
              {isChecked ? (
                <button className="btn btn-secondary" onClick={() => handleReset(activePart)}>
                  <RefreshCw size={14} style={{ marginRight: "0.25rem" }} /> Volver a Intentar
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => handleCheck(activePart)}>
                  <CheckCircle size={14} style={{ marginRight: "0.25rem" }} /> Comprobar Respuestas
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
