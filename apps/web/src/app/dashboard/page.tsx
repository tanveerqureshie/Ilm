"use client";

import React, { useState, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Sparkles,
  Award,
  BookOpen,
  ArrowDown,
  Volume2,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyNews, getDailyConcepts, getDailyVocab, getDailyChallenge, DailyNews, DailyConcepts, DailyVocab, DailyChallenge } from "../../utils/dailyContent";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]); // 9 items
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  
  // Custom personalization states
  const [username, setUsername] = useState<string>("Tanveer Qureshie");
  const [reflectionInput, setReflectionInput] = useState<string>("");
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
  
  // Quiz states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<"pending" | "correct" | "incorrect">("pending");

  // Bookmarking states
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);

  // Seeded daily content
  const [dailyNews, setDailyNews] = useState<DailyNews | null>(null);
  const [dailyConcepts, setDailyConcepts] = useState<DailyConcepts | null>(null);
  const [dailyVocab, setDailyVocab] = useState<DailyVocab | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);

  useEffect(() => {
    // Read daily content
    setDailyNews(getDailyNews());
    setDailyConcepts(getDailyConcepts());
    setDailyVocab(getDailyVocab());
    setDailyChallenge(getDailyChallenge());

    // Theme config
    const isDark = document.documentElement.classList.contains("dark") || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Load custom settings
    const savedName = localStorage.getItem("ilm_username");
    if (savedName) setUsername(savedName);

    const savedBookmarks = JSON.parse(localStorage.getItem("ilm_v2_bookmarks") || "[]");
    setBookmarkedList(savedBookmarks);

    const sessionDone = localStorage.getItem("ilm_v2_session_complete_today") === "true";
    setIsSessionComplete(sessionDone);

    if (sessionDone) {
      setSessionProgress([true, true, true, true, true, true, true, true, true]);
      setCompletedSteps(9);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const speakVocab = (word: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel ongoing speech to prevent queuing overlay
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.85; // Slightly slower for clear pronunciation study
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleBookmark = (title: string) => {
    let updated;
    if (bookmarkedList.includes(title)) {
      updated = bookmarkedList.filter(item => item !== title);
    } else {
      updated = [...bookmarkedList, title];
    }
    setBookmarkedList(updated);
    localStorage.setItem("ilm_v2_bookmarks", JSON.stringify(updated));
  };

  const markStepComplete = (idx: number) => {
    if (sessionProgress[idx]) return;
    const updated = [...sessionProgress];
    updated[idx] = true;
    setSessionProgress(updated);
    const count = updated.filter(Boolean).length;
    setCompletedSteps(count);
  };

  const handleOptionSelect = (option: string) => {
    if (quizStatus === "correct" || !dailyChallenge) return;
    setSelectedOption(option);
    if (option === dailyChallenge.answer) {
      setQuizStatus("correct");
      markStepComplete(8); // Solve challenge is last learning item before reflection
    } else {
      setQuizStatus("incorrect");
    }
  };

  const handleCompleteSession = () => {
    if (!reflectionInput.trim() || !dailyVocab) return;

    // Save reflection
    const savedReflections = JSON.parse(localStorage.getItem("ilm_v2_reflections") || "[]");
    savedReflections.push({
      date: new Date().toLocaleDateString(),
      reflection: reflectionInput.trim(),
      vocabWord: dailyVocab.word
    });
    localStorage.setItem("ilm_v2_reflections", JSON.stringify(savedReflections));
    setIsSessionComplete(true);
    localStorage.setItem("ilm_v2_session_complete_today", "true");
  };

  const resetSessionDev = () => {
    localStorage.setItem("ilm_v2_session_complete_today", "false");
    setIsSessionComplete(false);
    setSessionProgress([false, false, false, false, false, false, false, false, false]);
    setCompletedSteps(0);
    setSelectedOption(null);
    setQuizStatus("pending");
    setReflectionInput("");
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (!dailyNews || !dailyConcepts || !dailyVocab || !dailyChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground font-mono text-xs">
        Synthesizing Daily Intelligence Feed...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header Panel */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/40 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">
            إ
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight font-serif">Ilm</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Daily Intelligence OS</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground block uppercase font-mono tracking-wider">Welcome</span>
            <span className="text-xs font-bold text-primary font-serif">{username}</span>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border hover:bg-secondary/40 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-6xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR (Progress Overview) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            {/* Session Info card - Strong Neumorphic Glass Outset */}
            <section className="soft-glass-outset rounded-3xl p-6 border-border/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-2xl -z-10" />
              
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Workspace Overview</span>
              <h2 className="text-2xl font-bold tracking-tight font-serif mt-1 mb-4">Hello, {username}</h2>
              
              <div className="flex flex-col gap-3 border-t border-border/20 pt-4 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Today's Date:</span>
                  <strong className="text-foreground text-[11px] font-sans">{formattedDate}</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Study Focus:</span>
                  <strong className="text-foreground">UPSC, Medical, Finance & Tech</strong>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Intelligence Mix Progress</span>
                  <span className="text-foreground font-mono">{completedSteps} / 9 Complete</span>
                </div>
                <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSteps / 9) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {completedSteps < 9 && (
                <button 
                  onClick={() => {
                    const element = document.getElementById("world-update-card");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-98 transition-all"
                >
                  Start Reading Thread <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </section>

          </div>

          {/* RIGHT SIDE (Vertical Connected Story Thread) */}
          <div className="lg:col-span-8 space-y-2 max-w-3xl w-full">
            
            <div className="text-center py-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Seeded Feed</span>
              <h3 className="text-2xl font-bold font-serif mt-1">Today's Intelligence Thread</h3>
              <div className="flex justify-center mt-3">
                <div className="h-8 w-[2px] bg-gradient-to-b from-primary/60 to-transparent" />
              </div>
            </div>

            {/* Step 1: World News */}
            <div id="world-update-card" className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[0] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailyNews.worldNews.map((newsItem) => (
                    <motion.div 
                      key={newsItem.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="soft-glass-outset rounded-2xl p-5 border-border/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{newsItem.tag}</span>
                          <button 
                            onClick={() => toggleBookmark(newsItem.title)}
                            className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                          >
                            {bookmarkedList.includes(newsItem.title) ? (
                              <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                            ) : (
                              <Bookmark className="h-4.5 w-4.5" />
                            )}
                          </button>
                        </div>
                        <h4 className="text-md font-bold font-serif mb-2 leading-snug">{newsItem.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{newsItem.summary}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-border/10 pt-3 mt-auto">
                        <span className="text-[9px] text-muted-foreground font-medium">Source: {newsItem.source}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pr-2">
                  {!sessionProgress[0] ? (
                    <button 
                      onClick={() => markStepComplete(0)}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark Category as Read <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                      <CheckCircle2 className="h-4.5 w-4.5" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40 animate-bounce" />
              </div>
            </div>

            {/* Step 2: India Tech News */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[1] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailyNews.indiaTechNews.map((newsItem) => (
                    <motion.div 
                      key={newsItem.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="soft-glass-outset rounded-2xl p-5 border-border/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{newsItem.tag}</span>
                          <button 
                            onClick={() => toggleBookmark(newsItem.title)}
                            className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                          >
                            {bookmarkedList.includes(newsItem.title) ? (
                              <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                            ) : (
                              <Bookmark className="h-4.5 w-4.5" />
                            )}
                          </button>
                        </div>
                        <h4 className="text-md font-bold font-serif mb-2 leading-snug">{newsItem.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{newsItem.summary}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-border/10 pt-3 mt-auto">
                        <span className="text-[9px] text-muted-foreground font-medium">Source: {newsItem.source}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pr-2">
                  {!sessionProgress[1] ? (
                    <button 
                      onClick={() => markStepComplete(1)}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark Category as Read <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                      <CheckCircle2 className="h-4.5 w-4.5" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 3: J&K Updates */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[2] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailyNews.jkNews.map((newsItem) => (
                    <motion.div 
                      key={newsItem.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="soft-glass-outset rounded-2xl p-5 border-border/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{newsItem.tag}</span>
                          <button 
                            onClick={() => toggleBookmark(newsItem.title)}
                            className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                          >
                            {bookmarkedList.includes(newsItem.title) ? (
                              <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                            ) : (
                              <Bookmark className="h-4.5 w-4.5" />
                            )}
                          </button>
                        </div>
                        <h4 className="text-md font-bold font-serif mb-2 leading-snug">{newsItem.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{newsItem.summary}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-border/10 pt-3 mt-auto">
                        <span className="text-[9px] text-muted-foreground font-medium">Source: {newsItem.source}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pr-2">
                  {!sessionProgress[2] ? (
                    <button 
                      onClick={() => markStepComplete(2)}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark Category as Read <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                      <CheckCircle2 className="h-4.5 w-4.5" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 4: Indian Youtuber Community News */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[3] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailyNews.youtuberNews.map((newsItem) => (
                    <motion.div 
                      key={newsItem.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="soft-glass-outset rounded-2xl p-5 border-border/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{newsItem.tag}</span>
                          <button 
                            onClick={() => toggleBookmark(newsItem.title)}
                            className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                          >
                            {bookmarkedList.includes(newsItem.title) ? (
                              <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                            ) : (
                              <Bookmark className="h-4.5 w-4.5" />
                            )}
                          </button>
                        </div>
                        <h4 className="text-md font-bold font-serif mb-2 leading-snug">{newsItem.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{newsItem.summary}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-border/10 pt-3 mt-auto">
                        <span className="text-[9px] text-muted-foreground font-medium">Source: {newsItem.source}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pr-2">
                  {!sessionProgress[3] ? (
                    <button 
                      onClick={() => markStepComplete(3)}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark Category as Read <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                      <CheckCircle2 className="h-4.5 w-4.5" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 5: UPSC Polity Concept */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[4] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-2xl p-6 border-border/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{dailyConcepts.upsc.tag}</span>
                  <button 
                    onClick={() => toggleBookmark(dailyConcepts.upsc.title)}
                    className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                  >
                    {bookmarkedList.includes(dailyConcepts.upsc.title) ? (
                      <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                    ) : (
                      <Bookmark className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
                <h4 className="text-lg font-bold font-serif mb-2">{dailyConcepts.upsc.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{dailyConcepts.upsc.summary}</p>
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/20 text-xs text-muted-foreground">
                  <strong>Significance:</strong> {dailyConcepts.upsc.significance}
                </div>
                <div className="flex items-center justify-end border-t border-border/10 pt-3 mt-4">
                  {!sessionProgress[4] ? (
                    <button 
                      onClick={() => markStepComplete(4)}
                      className="flex items-center gap-1 text-[10px] font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark as Read <ArrowRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 6: Medical Concept */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[5] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-2xl p-6 border-border/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{dailyConcepts.medical.tag}</span>
                  <button 
                    onClick={() => toggleBookmark(dailyConcepts.medical.title)}
                    className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                  >
                    {bookmarkedList.includes(dailyConcepts.medical.title) ? (
                      <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                    ) : (
                      <Bookmark className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
                <h4 className="text-lg font-bold font-serif mb-2">{dailyConcepts.medical.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{dailyConcepts.medical.summary}</p>
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/20 text-xs text-muted-foreground">
                  <strong>Clinical Significance:</strong> {dailyConcepts.medical.significance}
                </div>
                <div className="flex items-center justify-end border-t border-border/10 pt-3 mt-4">
                  {!sessionProgress[5] ? (
                    <button 
                      onClick={() => markStepComplete(5)}
                      className="flex items-center gap-1 text-[10px] font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark as Read <ArrowRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 7: Finance Concept */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[6] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-2xl p-6 border-border/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{dailyConcepts.finance.tag}</span>
                  <button 
                    onClick={() => toggleBookmark(dailyConcepts.finance.title)}
                    className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                  >
                    {bookmarkedList.includes(dailyConcepts.finance.title) ? (
                      <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                    ) : (
                      <Bookmark className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
                <h4 className="text-lg font-bold font-serif mb-2">{dailyConcepts.finance.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{dailyConcepts.finance.summary}</p>
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/20 text-xs text-muted-foreground">
                  <strong>Macroeconomic Importance:</strong> {dailyConcepts.finance.significance}
                </div>
                <div className="flex items-center justify-end border-t border-border/10 pt-3 mt-4">
                  {!sessionProgress[6] ? (
                    <button 
                      onClick={() => markStepComplete(6)}
                      className="flex items-center gap-1 text-[10px] font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark as Read <ArrowRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 8: Daily Vocabulary (Pronunciation Voice Speech) */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[7] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-2xl p-6 border-border/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Daily Vocabulary</span>
                  <button 
                    onClick={() => toggleBookmark(dailyVocab.word)}
                    className="p-1.5 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                  >
                    {bookmarkedList.includes(dailyVocab.word) ? (
                      <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                    ) : (
                      <Bookmark className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-3xl font-bold font-serif text-primary flex items-baseline gap-2">
                      {dailyVocab.word}
                      <span className="text-xs font-sans font-normal text-muted-foreground italic">({dailyVocab.partOfSpeech})</span>
                    </h4>
                    
                    {/* Speak Button */}
                    <button
                      onClick={() => speakVocab(dailyVocab.word)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/25 bg-primary/5 hover:bg-primary/10 text-primary font-mono text-[10px] font-bold transition-all hover:scale-105 active:scale-95"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Speak
                    </button>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-xl p-3 border border-border/10 space-y-1.5 mt-2.5">
                    <p className="text-xs font-semibold text-foreground/90 font-mono">Pronunciation: <span className="text-primary font-normal">{dailyVocab.pronunciation}</span></p>
                    <div className="h-[1px] bg-border/10" />
                    <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                      <div>
                        <span className="text-[10px] text-muted-foreground font-mono block uppercase">Hindi Meaning</span>
                        <span className="font-medium text-foreground">{dailyVocab.hindiTranslation}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground font-mono block uppercase">Urdu Meaning</span>
                        <span className="font-medium text-foreground" dir="rtl">{dailyVocab.urduTranslation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-medium leading-relaxed mb-3 mt-4">{dailyVocab.definition}</p>
                
                <div className="border-l-2 border-primary/30 pl-3 py-1 mb-4 italic text-xs text-muted-foreground">
                  "{dailyVocab.example}"
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dailyVocab.synonyms.map((syn: string) => (
                    <span key={syn} className="text-[10px] bg-secondary px-2.5 py-0.5 rounded-full text-muted-foreground border border-border/20">
                      {syn}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end border-t border-border/10 pt-3">
                  {!sessionProgress[7] ? (
                    <button 
                      onClick={() => {
                        markStepComplete(7);
                        speakVocab(dailyVocab.word);
                      }}
                      className="flex items-center gap-1 text-[10px] font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Mark as Read & Speak <ArrowRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 9: Brain Challenge */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[8] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-2xl p-6 border-border/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="h-4.5 w-4.5 text-primary" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Daily Brain Challenge</span>
                </div>
                
                <h4 className="text-base font-bold font-mono mb-4 text-foreground/90">{dailyChallenge.question}</h4>

                <div className="grid grid-cols-1 gap-2.5 mb-4">
                  {dailyChallenge.options.map((option: string) => {
                    const isSelected = selectedOption === option;
                    let optionStyle = "border-border/30 bg-secondary/15 text-foreground hover:bg-secondary/40";
                    if (isSelected) {
                      if (quizStatus === "correct") {
                        optionStyle = "soft-glass-inset border-emerald-500 text-emerald-600 dark:text-emerald-400";
                      } else if (quizStatus === "incorrect") {
                        optionStyle = "soft-glass-inset border-rose-500 text-rose-600 dark:text-rose-400";
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`text-left p-3.5 rounded-xl border text-xs font-mono transition-all ${optionStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {quizStatus === "correct" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-600 dark:text-emerald-400 font-sans"
                  >
                    <strong>Correct Answer!</strong>
                    <p className="mt-1">{dailyChallenge.explanation}</p>
                  </motion.div>
                )}

                {quizStatus === "incorrect" && (
                  <p className="text-xs text-rose-500 font-medium">Incorrect choice. Try again!</p>
                )}

                <div className="flex items-center justify-end border-t border-border/10 pt-3 mt-4">
                  {sessionProgress[8] ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-mono">Solve to complete this node</span>
                  )}
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 10: Reflection */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-border/40 to-transparent">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  isSessionComplete ? "bg-primary border-primary animate-pulse" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="soft-glass-outset rounded-2xl p-6 border-border/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Daily Reflection</span>
                </div>
                
                <h4 className="text-base font-bold font-serif mb-2">What's one idea you will remember from today?</h4>
                <p className="text-xs text-muted-foreground mb-4">Summarizing helps transfer knowledge from temporary memory into long-term recall.</p>

                {!isSessionComplete ? (
                  <div>
                    <textarea
                      value={reflectionInput}
                      onChange={(e) => setReflectionInput(e.target.value)}
                      placeholder="Today, I learned how..."
                      className="w-full h-24 p-3 bg-secondary/30 rounded-xl border border-border/20 text-xs focus:outline-none focus:border-primary/50 text-foreground resize-none"
                    />
                    <button
                      disabled={!reflectionInput.trim()}
                      onClick={handleCompleteSession}
                      className="mt-3 w-full bg-primary disabled:opacity-40 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all"
                    >
                      Complete Today's Intelligence Session
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-600 dark:text-emerald-400">
                      <span className="font-bold">Daily Session Logged!</span>
                      <p className="mt-1">" {reflectionInput || "Your daily reflection is saved."} "</p>
                    </div>

                    <button 
                      onClick={resetSessionDev}
                      className="text-[9px] text-muted-foreground underline hover:text-foreground font-mono"
                    >
                      [Dev Action: Reset daily session state]
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
