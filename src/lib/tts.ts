// ─────────────────────────────────────────────────────────────────────────────
// TTS UTILITY — Text-to-Speech via Web Speech API
// Uses the browser's built-in speech synthesis (free, no API key needed)
// Prioritises en-GB voices, falls back to en-US, then any English voice
// ─────────────────────────────────────────────────────────────────────────────

export interface TTSOptions {
  rate?: number;   // 0.5 – 2.0 (default 0.9 — slightly slower for learners)
  pitch?: number;  // 0 – 2 (default 1)
  lang?: string;   // default "en-GB"
}

let currentUtterance: SpeechSynthesisUtterance | null = null;

/** Returns the best available English voice */
function getEnglishVoice(preferredLang = "en-GB"): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((v) => v.lang === preferredLang);
  if (preferred) return preferred;
  const enUS = voices.find((v) => v.lang === "en-US");
  if (enUS) return enUS;
  return voices.find((v) => v.lang.startsWith("en")) || null;
}

/** Stop any currently playing speech */
export function stopSpeech() {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

/** Returns true if speech is currently playing */
export function isSpeaking(): boolean {
  if (typeof window === "undefined") return false;
  return window.speechSynthesis.speaking;
}

/**
 * Speaks the given text.
 * @returns a cleanup function that cancels the speech.
 */
export function speak(
  text: string,
  options: TTSOptions = {},
  onEnd?: () => void,
  onStart?: () => void
): () => void {
  if (typeof window === "undefined" || !window.speechSynthesis) return () => {};

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang ?? "en-GB";
  utterance.rate = options.rate ?? 0.88;
  utterance.pitch = options.pitch ?? 1;

  // Try to assign a natural English voice
  const assignVoice = () => {
    const voice = getEnglishVoice(utterance.lang);
    if (voice) utterance.voice = voice;
  };

  // Voices might not be loaded yet — wait if needed
  if (window.speechSynthesis.getVoices().length > 0) {
    assignVoice();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", assignVoice, { once: true });
  }

  utterance.onstart = () => onStart?.();
  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };
  utterance.onerror = () => {
    currentUtterance = null;
    onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);

  return () => stopSpeech();
}

/**
 * Speaks text TWICE (mimicking OTE's double-play format).
 * Pauses 2 seconds between the two plays.
 */
export function speakTwice(
  text: string,
  options: TTSOptions = {},
  onFirstEnd?: () => void,
  onSecondEnd?: () => void,
  onStart?: () => void,
  onSecondStart?: () => void
): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout>;

  const cancel = speak(
    text,
    options,
    () => {
      onFirstEnd?.();
      if (!cancelled) {
        timer = setTimeout(() => {
          if (!cancelled) {
            speak(text, options, onSecondEnd, onSecondStart);
          }
        }, 2000);
      }
    },
    onStart
  );

  return () => {
    cancelled = true;
    clearTimeout(timer);
    cancel();
  };
}
