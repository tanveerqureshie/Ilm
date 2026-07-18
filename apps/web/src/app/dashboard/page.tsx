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
  Calendar,
  Network,
  Compass,
  ArrowUpRight,
  RotateCcw,
  Brain,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getDailyEngineeringJourney, 
  getDailyVocab, 
  CONCEPT_NODES, 
  getStructuredContent,
  EngineeringJourney,
  DailyVocab,
  ConceptNode,
  StructuredSummary
} from "../../utils/dailyContent";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<boolean[]>(new Array(11).fill(false)); 
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  
  // Profile settings
  const [username, setUsername] = useState<string>("Tanveer Qureshie");
  const [userBranch, setUserBranch] = useState<string>("General Engineering");

  // Daily journey and vocab
  const [journey, setJourney] = useState<EngineeringJourney | null>(null);
  const [vocab, setVocab] = useState<DailyVocab | null>(null);

  // Interaction states
  const [reflectionInput, setReflectionInput] = useState<string>("");
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<string | null>(null);
  const [challengeStatus, setChallengeStatus] = useState<"pending" | "correct" | "incorrect">("pending");
  
  const [selectedMemoryOption, setSelectedMemoryOption] = useState<string | null>(null);
  const [memoryStatus, setMemoryStatus] = useState<"pending" | "correct" | "incorrect">("pending");

  // Bookmarking
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);

  // Curiosity Engine states
  const [activeCuriosityNode, setActiveCuriosityNode] = useState<string | null>(null);
  
  // Deep Exploration modal states
  const [explorationNodeId, setExplorationNodeId] = useState<string | null>(null);
  const [explorationLabel, setExplorationLabel] = useState<string>("");
  const [explorationContent, setExplorationContent] = useState<StructuredSummary | null>(null);
  const [explorationSourceUrl, setExplorationSourceUrl] = useState<string>("");

  useEffect(() => {
    // Load daily items
    const todayJourney = getDailyEngineeringJourney();
    setJourney(todayJourney);
    setVocab(getDailyVocab());

    // Sync theme settings
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Load custom profile settings
    const savedName = localStorage.getItem("ilm_username");
    if (savedName) setUsername(savedName);
    
    const savedBranch = localStorage.getItem("ilm_branch");
    if (savedBranch) setUserBranch(savedBranch);

    const savedBookmarks = JSON.parse(localStorage.getItem("ilm_v2_bookmarks") || "[]");
    setBookmarkedList(savedBookmarks);

    // Session completion check
    const sessionDone = localStorage.getItem("ilm_v2_session_complete_today") === "true";
    setIsSessionComplete(sessionDone);

    if (sessionDone) {
      setSessionProgress(new Array(11).fill(true));
      setCompletedSteps(11);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  const speakVocab = (word: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.85; 
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

  const handleChallengeAnswer = (option: string) => {
    if (challengeStatus === "correct" || !journey) return;
    setSelectedChallengeOption(option);
    if (option === journey.challenge.answer) {
      setChallengeStatus("correct");
      markStepComplete(8); 
    } else {
      setChallengeStatus("incorrect");
    }
  };

  const handleMemoryAnswer = (option: string) => {
    if (memoryStatus === "correct" || !journey) return;
    setSelectedMemoryOption(option);
    if (option === journey.memoryReview.answer) {
      setMemoryStatus("correct");
      markStepComplete(9); 
    } else {
      setMemoryStatus("incorrect");
    }
  };

  const handleCompleteSession = () => {
    if (!reflectionInput.trim() || !vocab || !journey) return;

    // Track learned concepts in local storage Knowledge Graph
    const learnedList = JSON.parse(localStorage.getItem("ilm_learned_concepts") || "[]");
    journey.curiosityTree.forEach(nodeId => {
      if (!learnedList.includes(nodeId)) {
        learnedList.push(nodeId);
      }
    });
    localStorage.setItem("ilm_learned_concepts", JSON.stringify(learnedList));

    // Save reflection record
    const savedReflections = JSON.parse(localStorage.getItem("ilm_reflections") || "[]");
    savedReflections.push({
      date: new Date().toLocaleDateString(),
      reflection: reflectionInput.trim(),
      theme: journey.theme
    });
    localStorage.setItem("ilm_reflections", JSON.stringify(savedReflections));

    setIsSessionComplete(true);
    localStorage.setItem("ilm_v2_session_complete_today", "true");
    markStepComplete(10);
  };

  const handleOpenExploration = (nodeId: string, label: string) => {
    const nodeData = CONCEPT_NODES[nodeId];
    const sourceUrl = nodeData ? nodeData.sourceUrl : "https://en.wikipedia.org/wiki/" + encodeURIComponent(label);
    const content = getStructuredContent(nodeId, label);
    
    setExplorationNodeId(nodeId);
    setExplorationLabel(label);
    setExplorationContent(content);
    setExplorationSourceUrl(sourceUrl);
  };

  const resetSessionDev = () => {
    localStorage.setItem("ilm_v2_session_complete_today", "false");
    setIsSessionComplete(false);
    setSessionProgress(new Array(11).fill(false));
    setCompletedSteps(0);
    setSelectedChallengeOption(null);
    setChallengeStatus("pending");
    setSelectedMemoryOption(null);
    setMemoryStatus("pending");
    setReflectionInput("");
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (!journey || !vocab) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground font-mono text-xs">
        Assembling Engineering Intelligence Mix...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header Panel */}
      <header className="lg:hidden sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/40 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">
            إ
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight font-serif">Ilm</h1>
            <p className="text-[9px] text-primary italic font-serif tracking-tight mt-0.5">Be a Smarter Engineer Than Yesterday.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-primary font-serif">{username}</span>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border/40 bg-card hover:bg-secondary/40 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-4xl mx-auto px-6 pt-10 space-y-8">
        
        {/* Workspace Overview card - Strong Neumorphic Glass Outset */}
        <section className="soft-glass-outset rounded-3xl p-6 border-border/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-2xl -z-10" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2.5 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Workspace Overview</span>
              <h2 className="text-2xl font-bold tracking-tight font-serif mt-1">Hello, {username}</h2>
              <p className="text-xs text-muted-foreground font-semibold">
                Personalized for: <span className="text-foreground">{userBranch}</span>
              </p>
              
              <div className="flex items-center gap-2 text-xs border-t border-border/20 pt-3 mt-3 w-fit">
                <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Today's Focus:</span>
                <strong className="text-foreground text-[11px] font-sans">{formattedDate}</strong>
              </div>
            </div>

            <div className="flex-1 space-y-4 max-w-sm w-full md:border-l md:border-border/20 md:pl-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Engineering Mix Progress</span>
                  <span className="text-foreground font-mono">{completedSteps} / 11 Complete</span>
                </div>
                <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSteps / 11) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {completedSteps < 11 ? (
                <button 
                  onClick={() => {
                    const element = document.getElementById("journey-step-1");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-4 rounded-xl text-xs font-bold shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-98 transition-all uppercase tracking-wider"
                >
                  Analyze Daily System <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1.5">
                    <Award className="h-4.5 w-4.5" /> Day Unlocked!
                  </span>
                  <button 
                    onClick={resetSessionDev}
                    className="p-2 border border-border/30 rounded-xl hover:bg-secondary/40 text-muted-foreground hover:text-foreground text-[10px] font-mono flex items-center gap-1 transition-all"
                    title="Reset session for demonstration purposes"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Vertical Connected Story Thread */}
        <div className="space-y-2 w-full">
            
            <div className="text-center py-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">24hr Single Flow</span>
              <h3 className="text-3xl font-bold font-serif mt-1">Daily Intelligence Journey</h3>
              <p className="text-[11px] text-muted-foreground mt-1 max-w-md mx-auto">Analyze the deep physical and technical systems governing everyday technology.</p>
              <div className="flex justify-center mt-3">
                <div className="h-8 w-[2px] bg-gradient-to-b from-primary/60 to-transparent" />
              </div>
            </div>

            {/* Step 1: Today's Theme */}
            <div id="journey-step-1" className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[0] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{journey.category}</span>
                  <span className="text-[9px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">Theme of the Day</span>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-bold font-serif leading-snug">{journey.theme}</h4>
                
                <div className="flex items-center justify-between border-t border-border/10 pt-4">
                  <button 
                    onClick={() => markStepComplete(0)}
                    disabled={sessionProgress[0]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[0] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[0] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Initiate Investigation"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40 animate-bounce" />
              </div>
            </div>

            {/* Step 2: Real World Problem */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[1] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-3.5"
              >
                <div className="flex items-center gap-2 text-primary">
                  <HelpCircle className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">The Real-World Friction</span>
                </div>
                
                <p className="text-sm font-serif font-bold text-foreground leading-relaxed">
                  &ldquo;{journey.realWorldProblem}&rdquo;
                </p>

                <div className="flex justify-end border-t border-border/10 pt-3">
                  <button 
                    onClick={() => markStepComplete(1)}
                    disabled={sessionProgress[1]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[1] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[1] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Acknowledge Problem"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 3: Engineering Principle */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[2] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-3.5"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Brain className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">First Principle Concept</span>
                </div>
                
                <p className="text-xs font-semibold text-muted-foreground leading-relaxed">
                  {journey.engineeringPrinciple}
                </p>

                <div className="flex justify-end border-t border-border/10 pt-3">
                  <button 
                    onClick={() => markStepComplete(2)}
                    disabled={sessionProgress[2]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[2] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[2] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Understand Principle"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 4: Daily Vocabulary (Preserved Feature) */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[3] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4.5 w-4.5 text-primary cursor-pointer hover:scale-110 transition-transform" onClick={() => speakVocab(vocab.word)} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Daily Vocabulary</span>
                  </div>
                  <button 
                    onClick={() => speakVocab(vocab.word)} 
                    className="text-[9px] font-mono text-muted-foreground hover:text-primary flex items-center gap-1 border border-border/20 px-2 py-0.5 rounded"
                  >
                    Speak {vocab.pronunciation}
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-bold font-serif text-foreground">{vocab.word}</span>
                  <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider block italic">{vocab.partOfSpeech}</span>
                </div>

                <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                  <strong>Definition:</strong> {vocab.definition}
                </p>

                <div className="bg-secondary/30 rounded-xl p-3 border border-border/10 grid grid-cols-2 gap-2 text-[11px] font-semibold text-muted-foreground">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-primary block">Hindi Translation</span>
                    {vocab.hindiTranslation}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-primary block">Urdu Translation</span>
                    {vocab.urduTranslation}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-semibold italic">
                  &ldquo;{vocab.example}&rdquo;
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {vocab.synonyms.map(syn => (
                    <span key={syn} className="text-[9px] font-mono border border-border/10 bg-secondary/20 px-2 py-0.5 rounded-full text-muted-foreground font-semibold">
                      {syn}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between border-t border-border/10 pt-3 mt-2">
                  <button 
                    onClick={() => markStepComplete(3)}
                    disabled={sessionProgress[3]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[3] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[3] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Log Daily Word"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 5: Core Concepts & Curiosity Engine */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[4] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {journey.coreConcepts.map((concept, idx) => (
                    <motion.div 
                      key={concept.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="soft-glass-outset rounded-2xl p-5 border-border/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider">Concept 0{idx + 1}</span>
                          <button 
                            onClick={() => handleOpenExploration(concept.detailNodeId, concept.title)}
                            className="p-1 rounded hover:bg-secondary/40 text-primary border border-primary/20 transition-all text-[8px] font-mono font-bold uppercase px-2 py-0.5 flex items-center gap-1"
                          >
                            Explore Deeper <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold font-serif mb-2">{concept.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{concept.description}</p>
                      </div>
                      <div className="border-t border-border/10 pt-3">
                        <button 
                          onClick={() => {
                            setActiveCuriosityNode(concept.detailNodeId);
                            const cursorEl = document.getElementById("curiosity-anchor");
                            cursorEl?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-[9px] font-mono text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          <Network className="h-3.5 w-3.5 text-primary" /> View Curiosity Network
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Curiosity Engine Block */}
                <div id="curiosity-anchor" className="soft-glass-outset rounded-3xl p-5 border-primary/20 bg-secondary/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Network className="h-4.5 w-4.5 text-primary animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-foreground">Curiosity Path Map</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground">Connected Ideas Path</span>
                  </div>

                  <p className="text-[10px] text-muted-foreground">
                    Every system expands into physical connections. Select any node to explore its scientific mechanism and architecture tree.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 py-2 border-t border-border/10">
                    {journey.curiosityTree.map((nodeId, idx) => {
                      const nodeData = CONCEPT_NODES[nodeId];
                      const isSelected = activeCuriosityNode === nodeId;
                      if (!nodeData) return null;

                      return (
                        <React.Fragment key={nodeId}>
                          <button
                            onClick={() => setActiveCuriosityNode(nodeId)}
                            className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold transition-all ${
                              isSelected 
                                ? "bg-primary text-white border-primary shadow-sm" 
                                : "bg-card border-border/20 text-muted-foreground hover:bg-secondary/40"
                            }`}
                          >
                            {nodeData.label}
                          </button>
                          {idx < journey.curiosityTree.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Active Curiosity Node Detail Box */}
                  <AnimatePresence mode="wait">
                    {activeCuriosityNode && CONCEPT_NODES[activeCuriosityNode] && (
                      <motion.div
                        key={activeCuriosityNode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-card/50 rounded-2xl p-4 border border-border/10 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider">Mechanics Analysis</span>
                          <button 
                            onClick={() => handleOpenExploration(activeCuriosityNode, CONCEPT_NODES[activeCuriosityNode].label)}
                            className="text-[9px] font-mono font-bold text-primary flex items-center gap-1 border border-primary/25 px-2 py-0.5 rounded hover:bg-primary hover:text-white transition-colors"
                          >
                            Explore Deeper (Structured Wiki) <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </div>
                        <h5 className="text-xs font-bold text-foreground font-serif">{CONCEPT_NODES[activeCuriosityNode].label}</h5>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {CONCEPT_NODES[activeCuriosityNode].description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-end pr-2">
                  {!sessionProgress[4] ? (
                    <button 
                      onClick={() => markStepComplete(4)}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:translate-x-0.5 transition-transform"
                    >
                      Verify Concept Map <ArrowRight className="h-4 w-4" />
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

            {/* Step 6: Working Mechanism */}
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
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Compass className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Detailed Working Mechanism</span>
                </div>

                <div className="space-y-3 font-semibold text-muted-foreground text-xs leading-relaxed">
                  {journey.workingMechanism.split("\n").map((step, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-primary font-mono select-none">0{idx + 1}.</span>
                      <p>{step.replace(/^\d+\.\s*/, "")}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end border-t border-border/10 pt-3">
                  <button 
                    onClick={() => markStepComplete(5)}
                    disabled={sessionProgress[5]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[5] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[5] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Verify Flow Loop"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 7: Industry Applications */}
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
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Compass className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Commercial Implementations</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {journey.industryApplications.map((app) => (
                    <div key={app.company} className="bg-secondary/20 border border-border/10 rounded-2xl p-4 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-primary uppercase">{app.company}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{app.application}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end border-t border-border/10 pt-3">
                  <button 
                    onClick={() => markStepComplete(6)}
                    disabled={sessionProgress[6]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[6] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[6] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Verify Applications"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 8: Latest Innovation */}
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
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Latest Verified Innovation</span>
                  </div>
                  <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">New Science</span>
                </div>

                <h4 className="text-md font-bold font-serif text-foreground">{journey.latestInnovation.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{journey.latestInnovation.explanation}</p>

                <div className="bg-secondary/35 rounded-2xl p-4 space-y-2.5 border border-border/10 text-xs">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-primary font-bold block">Relevant Principles</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {journey.latestInnovation.concepts.map(c => (
                        <span key={c} className="text-[9px] font-mono bg-card px-2 py-0.5 rounded text-muted-foreground font-semibold border border-border/10">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-primary font-bold block">Industrial Velocity Impact</span>
                    <p className="text-muted-foreground font-semibold text-[11px] mt-0.5">{journey.latestInnovation.impact}</p>
                  </div>
                </div>

                <div className="flex justify-end border-t border-border/10 pt-3">
                  <button 
                    onClick={() => markStepComplete(7)}
                    disabled={sessionProgress[7]}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      sessionProgress[7] ? "text-emerald-500" : "text-primary hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {sessionProgress[7] ? <CheckCircle2 className="h-4.5 w-4.5" /> : "Log Innovation Details"}
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 9: Mini Engineering Challenge */}
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
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Award className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Mini Engineering Challenge</span>
                </div>

                <p className="text-xs font-serif font-bold text-foreground leading-relaxed">{journey.challenge.question}</p>

                <div className="space-y-2 pt-2">
                  {journey.challenge.options.map(opt => {
                    const isSelected = selectedChallengeOption === opt;
                    const isCorrectOption = opt === journey.challenge.answer;
                    
                    let btnStyle = "bg-card border-border/20 text-muted-foreground hover:bg-secondary/40";
                    if (isSelected) {
                      if (challengeStatus === "correct") {
                        btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                      } else if (challengeStatus === "incorrect") {
                        btnStyle = "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400";
                      }
                    } else if (challengeStatus === "correct" && isCorrectOption) {
                      btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleChallengeAnswer(opt)}
                        disabled={challengeStatus === "correct"}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {challengeStatus !== "pending" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold ${
                        challengeStatus === "correct" 
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                          : "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      <strong className="block mb-1 font-serif text-sm">
                        {challengeStatus === "correct" ? "Excellent analysis!" : "Incorrect deduction."}
                      </strong>
                      {journey.challenge.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 10: Memory Coach Review */}
            <div className="relative pl-8 md:pl-12 pb-14">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  sessionProgress[9] ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4.5 w-4.5 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">AI Memory Coach (Spaced Repetition)</span>
                  </div>
                  <span className="text-[8px] font-mono bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">Recall Grade</span>
                </div>

                <p className="text-xs font-serif font-bold text-foreground leading-relaxed">
                  <strong>Recall challenge:</strong> {journey.memoryReview.question}
                </p>

                <div className="space-y-2 pt-2">
                  {journey.memoryReview.options.map(opt => {
                    const isSelected = selectedMemoryOption === opt;
                    const isCorrectOption = opt === journey.memoryReview.answer;
                    
                    let btnStyle = "bg-card border-border/20 text-muted-foreground hover:bg-secondary/40";
                    if (isSelected) {
                      if (memoryStatus === "correct") {
                        btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                      } else if (memoryStatus === "incorrect") {
                        btnStyle = "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400";
                      }
                    } else if (memoryStatus === "correct" && isCorrectOption) {
                      btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleMemoryAnswer(opt)}
                        disabled={memoryStatus === "correct"}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {memoryStatus !== "pending" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold ${
                        memoryStatus === "correct" 
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                          : "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      <strong className="block mb-1 font-serif text-sm">
                        {memoryStatus === "correct" ? "Excellent recall!" : "Let's review the mechanics."}
                      </strong>
                      {journey.memoryReview.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="absolute left-0 bottom-0 -translate-x-[50%] translate-y-[50%] flex flex-col items-center z-10">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 11: Reflection & Submit */}
            <div className="relative pl-8 md:pl-12 pb-6">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40">
                <div className={`absolute -left-[5px] top-4 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center transition-colors ${
                  isSessionComplete ? "bg-primary border-primary" : "bg-muted/40"
                }`} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-4"
              >
                <div className="flex items-center gap-2 text-primary border-b border-border/10 pb-3">
                  <Award className="h-4.5 w-4.5 animate-bounce" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Lock Daily Progress</span>
                </div>

                {!isSessionComplete ? (
                  <div className="space-y-4">
                    <label className="text-xs text-muted-foreground font-semibold leading-relaxed block">
                      Synthesize today's engineering key takeaway in your own words to unlock your daily memory graph updates:
                    </label>
                    <textarea
                      value={reflectionInput}
                      onChange={(e) => setReflectionInput(e.target.value)}
                      placeholder="Type brief synthesis notes..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl bg-secondary/10 border border-border/20 text-xs font-semibold focus:outline-none focus:border-primary/50 text-foreground transition-all"
                    />
                    <button
                      onClick={handleCompleteSession}
                      disabled={!reflectionInput.trim()}
                      className="w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-primary/10 hover:shadow-primary/20 disabled:opacity-40 disabled:hover:scale-100 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      Lock Daily Reflection & Update Brain Graph
                    </button>
                  </div>
                ) : (
                  <div className="py-4 text-center space-y-3.5">
                    <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 items-center justify-center border border-emerald-500/20">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h5 className="text-md font-bold font-serif text-foreground">Session Completed Successfully!</h5>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed font-semibold">
                      Your Daily Reflection has been cataloged and your custom Knowledge Graph nodes are now unlocked. Return tomorrow for a completely fresh engineering journey!
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

        </div>

      </main>

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
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">Engineering Reference Catalog</span>
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

    </div>
  );
}
