"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type SkillLevel = "unknown" | "A2" | "B1" | "B2" | "C1";

export interface SkillProfile {
  speaking:  SkillLevel;
  writing:   SkillLevel;
  listening: SkillLevel;
  reading:   SkillLevel;
  overall:   SkillLevel;
  score:     number; // 0-100 normalized
  diagnosed: boolean;
}

const defaultProfile: SkillProfile = {
  speaking:  "unknown",
  writing:   "unknown",
  listening: "unknown",
  reading:   "unknown",
  overall:   "unknown",
  score:     0,
  diagnosed: false,
};

interface LevelContextType {
  profile: SkillProfile;
  setProfile: (p: SkillProfile) => void;
  resetProfile: () => void;
  getLevelForSkill: (skill: keyof Omit<SkillProfile, "overall" | "score" | "diagnosed">) => SkillLevel;
  language: "ES" | "EN";
  setLanguage: (lang: "ES" | "EN") => void;
}

const LevelContext = createContext<LevelContextType>({
  profile: defaultProfile,
  setProfile: () => {},
  resetProfile: () => {},
  getLevelForSkill: () => "unknown",
  language: "ES",
  setLanguage: () => {},
});

const STORAGE_KEY = "ote_skill_profile";

export function LevelProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<SkillProfile>(defaultProfile);
  const [language, setLanguageState] = useState<"ES" | "EN">("ES");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfileState(JSON.parse(saved));
      const savedLang = localStorage.getItem("ote_language") as "ES" | "EN";
      if (savedLang) setLanguageState(savedLang);
    } catch {}
  }, []);

  const setProfile = (p: SkillProfile) => {
    setProfileState(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  };

  const resetProfile = () => {
    setProfileState(defaultProfile);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const setLanguage = (lang: "ES" | "EN") => {
    setLanguageState(lang);
    try { localStorage.setItem("ote_language", lang); } catch {}
  };

  const getLevelForSkill = (skill: keyof Omit<SkillProfile, "overall" | "score" | "diagnosed">) => {
    return profile[skill] || profile.overall || "B1";
  };

  return (
    <LevelContext.Provider value={{ profile, setProfile, resetProfile, getLevelForSkill, language, setLanguage }}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  return useContext(LevelContext);
}

// Score to CEFR level mapping
export function scoreToLevel(pct: number): SkillLevel {
  if (pct < 40) return "A2";
  if (pct < 60) return "B1";
  if (pct < 80) return "B2";
  return "C1";
}

export const LEVEL_CONFIG: Record<SkillLevel, { label: string; color: string; glow: string; desc: string; range: string }> = {
  unknown: { label: "?",  color: "#64748b", glow: "rgba(100,116,139,0.2)", desc: "Nivel no detectado aún", range: "—" },
  A2:      { label: "A2", color: "#94a3b8", glow: "rgba(148,163,184,0.2)", desc: "Basic user", range: "51–80 pts" },
  B1:      { label: "B1", color: "#34d399", glow: "rgba(52,211,153,0.25)", desc: "Independent user", range: "81–110 pts" },
  B2:      { label: "B2", color: "#60a5fa", glow: "rgba(96,165,250,0.25)", desc: "Upper independent", range: "111–140 pts" },
  C1:      { label: "C1", color: "#a78bfa", glow: "rgba(167,139,250,0.25)", desc: "Proficient user", range: "141–170 pts" },
};
