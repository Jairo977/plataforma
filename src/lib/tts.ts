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

/** 
 * Returns the best available English voice, prioritizing natural/premium ones.
 */
export function getEnglishVoice(preferredLang = "en-GB"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Filter only English voices
  const enVoices = voices.filter(v => v.lang.startsWith("en"));
  if (enVoices.length === 0) return null;

  // Rank voices to find the most "natural" one
  const rankVoice = (voice: SpeechSynthesisVoice) => {
    let score = 0;
    const name = voice.name.toLowerCase();
    
    // Priority 1: Cloud/Premium/Natural voices
    if (name.includes("google")) score += 50;
    if (name.includes("premium")) score += 40;
    if (name.includes("natural")) score += 40;
    if (name.includes("online")) score += 30;

    // Priority 2: Match exact preferred language
    if (voice.lang === preferredLang) score += 20;

    // Priority 3: Penalty for robotic legacy voices
    if (name.includes("zira") || name.includes("david") || name.includes("mark")) score -= 20;

    return score;
  };

  // Sort by highest score
  const sortedVoices = enVoices.sort((a, b) => rankVoice(b) - rankVoice(a));
  
  return sortedVoices[0] || null;
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
