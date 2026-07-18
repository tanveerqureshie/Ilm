"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Sun, 
  Moon, 
  Palette, 
  Check, 
  Save, 
  Bookmark, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  Trash2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONCEPT_NODES, getStructuredContent, StructuredSummary } from "../../utils/dailyContent";

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

  // Personalized Branch
  const [branch, setBranch] = useState<string>("Computer Science");

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Detailed Modal states
  const [explorationNodeId, setExplorationNodeId] = useState<string | null>(null);
  const [explorationLabel, setExplorationLabel] = useState<string>("");
  const [explorationContent, setExplorationContent] = useState<StructuredSummary | null>(null);
  const [explorationSourceUrl, setExplorationSourceUrl] = useState<string>("");

  const branches = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Aerospace Engineering",
    "Chemical & Biotech",
    "Civil Engineering",
    "General Engineering"
  ];

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

    const savedBranch = localStorage.getItem("ilm_branch") || "Computer Science";
    setBranch(savedBranch);

    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    // Load bookmarks
    const savedBookmarks = JSON.parse(localStorage.getItem("ilm_v2_bookmarks") || "[]");
    setBookmarks(savedBookmarks);
  }, []);

  const applyThemeAccent = (colorKey: string) => {
    const selected = colors[colorKey];
    if (!selected) return;
    document.documentElement.style.setProperty("--primary", selected.primary);
    document.documentElement.style.setProperty("--border", selected.border);
    document.documentElement.style.setProperty("--secondary", selected.secondary);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save Profile Information
    const finalName = inputName.trim() || "Tanveer Qureshie";
    localStorage.setItem("ilm_username", finalName);
    setUsername(finalName);

    localStorage.setItem("ilm_branch", branch);

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
      window.location.reload(); 
    }, 1200);
  };

  const deleteBookmark = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = bookmarks.filter(b => b !== title);
    setBookmarks(updated);
    localStorage.setItem("ilm_v2_bookmarks", JSON.stringify(updated));
  };

  // Find corresponding concept node key by matching the title string
  const handleOpenBookmarkContent = (title: string) => {
    // Attempt match in CONCEPT_NODES
    const foundEntry = Object.entries(CONCEPT_NODES).find(
      ([_, node]) => node.label.toLowerCase() === title.toLowerCase()
    );

    if (foundEntry) {
      const [nodeId, nodeVal] = foundEntry;
      const content = getStructuredContent(nodeId, nodeVal.label);
      setExplorationNodeId(nodeId);
      setExplorationLabel(nodeVal.label);
      setExplorationContent(content);
      setExplorationSourceUrl(nodeVal.sourceUrl);
    } else {
      // Direct mock container if exact node is missing
      setExplorationNodeId("custom-bookmark");
      setExplorationLabel(title);
      setExplorationContent({
        overview: "A bookmarked daily engineering step or concept from your learning history flow.",
        history: "Archived reference. Explored dynamically as part of the daily intellectual stream.",
        workingPrinciple: "See the home dashboard timeline reference details for dynamic context.",
        architecture: "Part of the modular systems architecture roadmap.",
        advantages: "Provides conceptual first-principles recall.",
        disadvantages: "Requires revision via the spaced repetition memory coach.",
        applications: "Cross-disciplinary systems designs.",
        realWorldExamples: "Production code frameworks, sensor instrumentation hardware.",
        engineeringImportance: "Establishes structured intuition instead of superficial knowledge.",
        latestResearch: "Ongoing updates are added daily in the explore feed.",
        relatedTopics: "Daily journeys, curiosity nodes, product X-Rays"
      });
      setExplorationSourceUrl("https://en.wikipedia.org/wiki/" + encodeURIComponent(title));
    }
  };

  return (
    <div className="min-h-screen pb-32 pt-12 px-6 max-w-2xl mx-auto space-y-8">
      
      {/* Settings Header */}
      <section className="mb-4 border-b border-border/20 pb-6">
        <h2 className="text-3xl font-serif font-bold text-foreground">Settings</h2>
        <p className="text-xs text-muted-foreground mt-1">Configure your personal profile details, engineering specialty, and active workspace theme.</p>
      </section>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Username & Engineering Specialty Card - Neumorphic Outset */}
        <div className="soft-glass-outset rounded-3xl p-6 border-border/25 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <User className="h-4.5 w-4.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Personal Profile & Specialty</span>
          </div>

          <div className="space-y-4 border-t border-border/10 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground block">Your Name</label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-3 rounded-xl bg-secondary/20 border border-border/20 text-xs focus:outline-none focus:border-primary/50 transition-all font-sans text-foreground font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground block">Engineering Specialty</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/20 border border-border/20 text-xs focus:outline-none focus:border-primary/50 transition-all font-sans text-foreground font-semibold bg-card"
              >
                {branches.map(b => (
                  <option key={b} value={b} className="bg-background text-foreground">{b}</option>
                ))}
              </select>
            </div>
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

      {/* Bookmarks Section */}
      <section className="soft-glass-outset rounded-3xl p-6 border-border/25 space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Bookmark className="h-4.5 w-4.5" />
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Saved Reference Library ({bookmarks.length})</span>
        </div>

        <div className="border-t border-border/10 pt-4">
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookmarks.map((bookmarkTitle) => (
                <div 
                  key={bookmarkTitle}
                  onClick={() => handleOpenBookmarkContent(bookmarkTitle)}
                  className="bg-card border border-border/15 p-4 rounded-2xl flex items-center justify-between gap-3 cursor-pointer hover:border-primary/45 hover:bg-secondary/20 transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground line-clamp-1">{bookmarkTitle}</span>
                    <span className="text-[9px] text-muted-foreground font-mono flex items-center gap-1 mt-0.5">
                      Review Reference <ArrowUpRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                  <button
                    onClick={(e) => deleteBookmark(bookmarkTitle, e)}
                    className="p-2 rounded-xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-muted-foreground font-mono">
              Your bookmarks library is empty. Click bookmark icons on daily timeline steps to save notes.
            </div>
          )}
        </div>
      </section>

      {/* Deep Exploration Structured Wiki Modal */}
      <AnimatePresence>
        {explorationNodeId && explorationContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 flex flex-col justify-between border-primary/25 relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setExplorationNodeId(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title Header */}
              <div className="border-b border-border/10 pb-4 pr-10">
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">Saved Reference Encyclopedia</span>
                <h3 className="text-2xl font-bold font-serif text-foreground mt-1">{explorationLabel}</h3>
              </div>

              {/* Structured Sections */}
              <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-6 text-xs text-muted-foreground leading-relaxed font-semibold scrollbar-thin">
                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">Overview</h4>
                  <p className="text-foreground">{explorationContent.overview}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">History & Origins</h4>
                  <p>{explorationContent.history}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">Working Principle</h4>
                  <p>{explorationContent.workingPrinciple}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">System Architecture</h4>
                  <p className="text-foreground">{explorationContent.architecture}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-secondary/20 p-3.5 rounded-2xl border border-border/10">
                    <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-wider block mb-1">Advantages</span>
                    <p className="text-[11px] leading-relaxed">{explorationContent.advantages}</p>
                  </div>
                  <div className="bg-secondary/20 p-3.5 rounded-2xl border border-border/10">
                    <span className="text-[9px] font-mono text-rose-500 font-bold uppercase tracking-wider block mb-1">Disadvantages & Bottlenecks</span>
                    <p className="text-[11px] leading-relaxed">{explorationContent.disadvantages}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">Industry Applications</h4>
                  <p>{explorationContent.applications}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">Real-World Examples</h4>
                  <p className="text-foreground">{explorationContent.realWorldExamples}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">First-Principle Engineering Importance</h4>
                  <p className="text-foreground">{explorationContent.engineeringImportance}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">Latest Research & Development</h4>
                  <p>{explorationContent.latestResearch}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1.5">Related Topics</h4>
                  <p className="font-mono text-[10px]">{explorationContent.relatedTopics}</p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="border-t border-border/10 pt-4 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => setExplorationNodeId(null)}
                  className="px-5 py-2.5 rounded-xl border border-border/30 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close Catalog
                </button>
                <a
                  href={explorationSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-primary text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-sm hover:opacity-90 transition-all"
                >
                  Open Original Source <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
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
