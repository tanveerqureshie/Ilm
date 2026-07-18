"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    // 1. Load and apply Accent Colors
    const colors: Record<string, { primary: string; border: string; secondary: string }> = {
      orange: {
        primary: "#ff6b35",
        border: "rgba(255, 107, 53, 0.15)",
        secondary: "rgba(255, 107, 53, 0.05)"
      },
      emerald: {
        primary: "#10b981",
        border: "rgba(16, 185, 129, 0.15)",
        secondary: "rgba(16, 185, 129, 0.05)"
      },
      indigo: {
        primary: "#6366f1",
        border: "rgba(99, 102, 241, 0.15)",
        secondary: "rgba(99, 102, 241, 0.05)"
      },
      amber: {
        primary: "#f59e0b",
        border: "rgba(245, 158, 11, 0.15)",
        secondary: "rgba(245, 158, 11, 0.05)"
      }
    };

    const savedColor = localStorage.getItem("ilm_accent_color") || "orange";
    const selected = colors[savedColor];
    if (selected) {
      document.documentElement.style.setProperty("--primary", selected.primary);
      document.documentElement.style.setProperty("--border", selected.border);
      document.documentElement.style.setProperty("--secondary", selected.secondary);
    }

    // 2. Load and apply Light/Dark Mode
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
