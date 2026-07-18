"use client";
import { useState, useEffect, useRef } from 'react';
import { cleanText } from '@/utils/normalize';

interface Props {
  expectedText: string;
}

export default function SpeakingEvaluator({ expectedText }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US'; 
      rec.continuous = true; 
      rec.interimResults = false; 
      
      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript((prev) => prev + currentTranscript);
        
        const words = cleanText(currentTranscript);
        setSpokenWords((prev) => [...prev, ...words]);
      };

      rec.onerror = (err: any) => {
        console.error("Error en Speech Recognition:", err.error);
        if (err.error === 'not-allowed') {
          alert("Por favor, permite el acceso al micrófono en tu navegador.");
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Tu navegador no soporta esta función. Te recomendamos usar Google Chrome o Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setSpokenWords([]);
      recognitionRef.current.start();
    }
  };

  const renderEvaluatedText = () => {
    // Keep original format for display
    const expectedWordsArray = expectedText.split(/\s+/).filter(Boolean);
    const cleanExpectedArray = cleanText(expectedText);
    
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "1rem", backgroundColor: "#0a0e17", borderRadius: "0.5rem", border: "1px solid #1e293b", lineHeight: "1.75" }}>
        {expectedWordsArray.map((originalWord, index) => {
          const cleanWord = cleanExpectedArray[index];
          const isCorrect = spokenWords.includes(cleanWord);
          
          let color = "#94a3b8"; // neutral (slate-400)
          let fontWeight = "500";
          let textDecoration = "none";
          let opacity = 1;
          
          if (transcript !== '') {
             if (isCorrect) {
                 color = "#4ade80"; // green-400
                 fontWeight = "600";
             } else {
                 color = "#ef4444"; // red-500
                 textDecoration = "line-through";
                 opacity = 0.8;
             }
          }
          
          return (
            <span
              key={index}
              style={{ fontSize: "1.125rem", transition: "color 0.2s", color, fontWeight, textDecoration, opacity }}
            >
              {originalWord}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", maxWidth: "42rem", margin: "0 auto", padding: "1.5rem", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "1rem", color: "#f1f5f9", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "0.875rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "#60a5fa", marginBottom: "0.25rem" }}>
          Pronunciation & Fluency Test
        </h3>
        <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
          Presiona el botón e intenta leer el texto modelo con la mejor pronunciación posible.
        </p>
      </div>

      {renderEvaluatedText()}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", marginTop: "1.5rem" }}>
        <button
          onClick={toggleRecording}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", borderRadius: "0.75rem", fontWeight: "500", transition: "all 0.2s", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", border: "none", cursor: "pointer",
            backgroundColor: isListening ? "#dc2626" : "#2563eb",
            color: "white"
          }}
        >
          {isListening ? (
            <>
              <span style={{ height: "0.5rem", width: "0.5rem", borderRadius: "9999px", backgroundColor: "white", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
              Detener Evaluación
            </>
          ) : (
            'Empezar a Hablar'
          )}
        </button>

        {transcript && (
          <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#64748b", maxWidth: "60%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Escuchado: "{transcript}"
          </span>
        )}
      </div>
    </div>
  );
}
