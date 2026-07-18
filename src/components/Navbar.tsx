"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useLevel } from "@/lib/level-context";
import {
  Mic2, PenLine, Headphones, BookOpen, LayoutDashboard,
  Brain, Gamepad2, FlaskConical, Moon, Sun, Globe
} from "lucide-react";

const navLinks = [
  { href: "/dashboard",          label: "Dashboard",  Icon: LayoutDashboard },
  { href: "/practice/speaking",  label: "Speaking",   Icon: Mic2 },
  { href: "/practice/writing",   label: "Writing",    Icon: PenLine },
  { href: "/practice/listening", label: "Listening",  Icon: Headphones },
  { href: "/practice/reading",   label: "Reading",    Icon: BookOpen },
  { href: "/simulator",          label: "Simulador",  Icon: FlaskConical },
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLevel();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("ote-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("ote-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>OTE</span>
          <span className={styles.logoText}>
            Oxford<span className={styles.logoBold}>Prep</span>
          </span>
        </Link>

        {/* Nav Links */}
        <ul className={styles.links}>
          {navLinks.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href || pathname?.startsWith(href + "/") ? styles.active : ""}`}
              >
                <Icon size={13} strokeWidth={2} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className={styles.cta}>
          <button
            onClick={() => setLanguage(language === "ES" ? "EN" : "ES")}
            className={`${styles.iconBtn}`}
            title="Toggle Language"
          >
            <Globe size={15} strokeWidth={2} />
            <span>{language}</span>
          </button>
          <button onClick={toggleTheme} className={styles.iconBtn} title="Toggle Theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link href="/simulator" className="btn btn-primary btn-sm">
            <FlaskConical size={13} />
            <span className={styles.ctaLabel}>
              {language === "ES" ? "Examen completo" : "Full Mock Test"}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
