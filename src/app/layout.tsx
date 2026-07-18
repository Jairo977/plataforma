import type { Metadata } from "next";
import { LevelProvider } from "@/lib/level-context";
import FloatingTranslator from "@/components/FloatingTranslator";
import "./globals.css";

export const metadata: Metadata = {
  title: "OTE Master — Descubre tu nivel de inglés para el Oxford Test",
  description: "Plataforma inteligente de preparación para el Oxford Test of English. La IA detecta tu nivel real (B1 o B2) y adapta cada práctica a ti. Speaking, Writing, Listening y Reading.",
  keywords: ["Oxford Test of English", "OTE", "B1", "B2", "test de nivel inglés", "CEFR", "simulador adaptativo"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LevelProvider>
          {children}
          <FloatingTranslator />
        </LevelProvider>
      </body>
    </html>
  );
}
