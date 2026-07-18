"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./FloatingTranslator.module.css";

export default function FloatingTranslator() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsTranslating(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage, from: "es", to: "en" }),
      });
      const data = await res.json();
      if (data.translation) {
        setMessages((prev) => [...prev, { role: "bot", text: data.translation }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "Error: No se pudo traducir." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Error de conexión." }]);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className={styles.container}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <span>🇪🇸 ➔ 🇬🇧 Traductor Rápido</span>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className={styles.messages}>
            {messages.length === 0 && (
              <p className={styles.placeholder}>Escribe algo en español y te diré cómo decirlo en inglés de forma natural.</p>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${msg.role === "user" ? styles.msgUser : styles.msgBot}`}>
                {msg.text}
              </div>
            ))}
            {isTranslating && (
              <div className={`${styles.message} ${styles.msgBot} ${styles.typing}`}>...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleTranslate} className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: soy de ecuador..."
              disabled={isTranslating}
            />
            <button type="submit" disabled={isTranslating || !input.trim()}>
              ↵
            </button>
          </form>
        </div>
      ) : (
        <button className={styles.fab} onClick={() => setIsOpen(true)}>
          💬 <span>Traductor</span>
        </button>
      )}
    </div>
  );
}
