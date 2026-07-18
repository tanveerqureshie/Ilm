"use client";

import React, { useState, useEffect } from "react";
import { User, Sun, Moon, Palette, Check, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ColorPreset {
  name: string;
  primary: string;
  border: string;
  secondary: string;
}

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("Tanveer Qureshie");
  const [inputName, setInputName] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<string>("orange");
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);

  const colors: Record<string, ColorPreset> = {
    orange: {
      name: "Vibrant Orange",
      primary: "#ff6b35",
      border: "rgba(255, 107, 53, 0.15)",
      secondary: "rgba(255, 107, 53, 0.05)"
    },
    emerald: {
      name: "Deep Emerald",
      primary: "#10b981",
      border: "rgba(16, 185, 129, 0.15)",
      secondary: "rgba(16, 185, 129, 0.05)"
    },
    indigo: {
      name: "Royal Indigo",
      primary: "#6366f1",
      border: "rgba(99, 102, 241, 0.15)",
      secondary: "rgba(99, 102, 241, 0.05)"
    },
    amber: {
      name: "Warm Amber",
      primary: "#f59e0b",
      border: "rgba(245, 158, 11, 0.15)",
      secondary: "rgba(245, 158, 11, 0.05)"
    }
  };

  useEffect(() => {
    // Load current values
    const savedName = localStorage.getItem("ilm_username");
    if (savedName) {
      setUsername(savedName);
      setInputName(savedName);
    } else {
      setInputName("Tanveer Qureshie");
    }

    const savedColor = localStorage.getItem("ilm_accent_color") || "orange";
    setActiveColor(savedColor);

    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  // Set CSS variables on the document root
  const applyThemeAccent = (colorKey: string) => {
    const selected = colors[colorKey];
    if (!selected) return;
    document.documentElement.style.setProperty("--primary", selected.primary);
    document.documentElement.style.setProperty("--border", selected.border);
    document.documentElement.style.setProperty("--secondary", selected.secondary);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save Name
    const finalName = inputName.trim() || "Tanveer Qureshie";
    localStorage.setItem("ilm_username", finalName);
    setUsername(finalName);

    // Save Accent Color
    localStorage.setItem("ilm_accent_color", activeColor);
    applyThemeAccent(activeColor);

    // Save Theme Mode
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Trigger Success Toast
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      window.location.reload(); // Refresh to broadcast changes
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-32 pt-12 px-6 max-w-2xl mx-auto">
      
      {/* Settings Header */}
      <section className="mb-8 border-b border-border/20 pb-6">
        <h2 className="text-3xl font-serif font-bold text-foreground">Settings</h2>
        <p className="text-xs text-muted-foreground mt-1">Configure your personal profile details, active workspace theme, and color schemes.</p>
      </section>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Username Card - Neumorphic Outset */}
        <div className="soft-glass-outset rounded-3xl p-6 border-border/25 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <User className="h-4.5 w-4.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Personal Profile</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground block">Your Name</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-4 py-3 rounded-xl bg-secondary/20 border border-border/20 text-xs focus:outline-none focus:border-primary/50 transition-all font-sans text-foreground"
            />
          </div>
        </div>

        {/* Theme Settings - Neumorphic Outset */}
        <div className="soft-glass-outset rounded-3xl p-6 border-border/25 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            {isDarkMode ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Workspace Appearance</span>
          </div>

          <div className="flex items-center justify-between border-t border-border/10 pt-4">
            <div>
              <span className="text-xs font-semibold text-foreground block">Dark Mode</span>
              <span className="text-[10px] text-muted-foreground block">Switch between light and dark backgrounds</span>
            </div>

            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                isDarkMode ? "bg-primary" : "bg-secondary/80 border border-border/30"
              }`}
            >
              <div 
                className={`h-4.5 w-4.5 rounded-full absolute top-[50%] -translate-y-1/2 transition-all ${
                  isDarkMode 
                    ? "right-1 bg-white" 
                    : "left-1 bg-muted"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Color Accent Selection */}
        <div className="soft-glass-outset rounded-3xl p-6 border-border/25 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Palette className="h-4.5 w-4.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Theme Colors Accent</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border/10 pt-4">
            {Object.entries(colors).map(([key, item]) => {
              const isSelected = activeColor === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setActiveColor(key)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2.5 ${
                    isSelected 
                      ? "soft-glass-inset border-primary" 
                      : "bg-secondary/20 border-border/10 hover:bg-secondary/40"
                  }`}
                >
                  <div 
                    className="h-6 w-6 rounded-full shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: item.primary }}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-[10px] font-semibold text-foreground">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all"
          >
            <Save className="h-4 w-4" /> Save Settings
          </button>
        </div>

      </form>

      {/* Success Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-sans font-bold text-xs px-5 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="h-4.5 w-4.5" /> Settings Saved Successfully!
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
