"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, BrainCircuit, Check, X, Trophy, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TRACKS_DATABASE: Record<string, {
  concepts: Array<{ title: string; category: string; body: string; takeaway: string }>;
  jokes: Array<{ setup: string; punchline: string }>;
  facts: Array<{ content: string; source: string }>;
  quizzes: Array<Array<{ id: string; question: string; options: string[]; answer: number; explanation: string }>>;
}> = {
  upsc: {
    concepts: [
      {
        title: "Basic Structure Doctrine",
        category: "Constitutional Law",
        body: "Established in the landmark Kesavananda Bharati case (1973), the Supreme Court of India ruled that while Parliament has wide powers to amend the Constitution under Article 368, it cannot alter or destroy its 'basic structure' (such as secularism, democracy, federalism, and judicial review).",
        takeaway: "Keeps the checks and balances of Indian democracy intact against absolute legislative authority."
      },
      {
        title: "Sovereign Debt & Fiscal Policy",
        category: "Indian Economy",
        body: "Sovereign debt represents the amount of money a national government owes to creditors. In India, the Fiscal Responsibility and Budget Management (FRBM) Act targets limiting general government debt to 60% of GDP to maintain macroeconomic stability and prevent inflation.",
        takeaway: "Prudent debt-to-GDP levels preserve sovereign credit ratings and reduce interest obligations."
      }
    ],
    jokes: [
      {
        setup: "Why did the bureaucrat carry a ladder to the secretariat?",
        punchline: "To reach the top-level files that were pending approval!"
      },
      {
        setup: "How many committee members does it take to change a lightbulb?",
        punchline: "Seven. One to draft the proposal, three to audit it, and three to table it for next year."
      }
    ],
    facts: [
      {
        content: "The Union Public Service Commission (UPSC) is a constitutional body established under Article 315 of the Constitution of India.",
        source: "M. Laxmikanth (Polity)"
      },
      {
        content: "India is the world's largest democracy, with over 950 million registered voters eligible to vote in national general elections.",
        source: "Election Commission of India"
      }
    ],
    quizzes: [
      [
        {
          id: "q-u-1",
          question: "Which Article of the Indian Constitution outlines the establishment of the UPSC?",
          options: ["Article 280", "Article 312", "Article 315", "Article 324"],
          answer: 2,
          explanation: "Article 315 mandates the creation of a Public Service Commission for the Union and State levels."
        },
        {
          id: "q-u-2",
          question: "In which landmark case was the Basic Structure Doctrine established?",
          options: ["Golaknath Case", "Kesavananda Bharati Case", "Minerva Mills Case", "Maneka Gandhi Case"],
          answer: 1,
          explanation: "The Supreme Court of India introduced the doctrine during the Kesavananda Bharati v. State of Kerala ruling in 1973."
        }
      ]
    ]
  },
  engineering: {
    concepts: [
      {
        title: "Spaced Repetition System",
        category: "Cognitive Science",
        body: "A learning technique where information is reviewed at increasing intervals. It exploits the psychological 'spacing effect' — the fact that our brains remember things more effectively when reviews are spaced out rather than crammed.",
        takeaway: "Reviewing a word right before you are about to forget it locks it in long-term memory."
      },
      {
        title: "Consensus Algorithms",
        category: "Distributed Systems",
        body: "In a decentralized computer network, nodes must agree on a single source of truth without relying on a central authority. Consensus algorithms like Proof of Work (PoW) and Proof of Stake (PoS) use mathematical proofs to validate transactions honestly.",
        takeaway: "Consensus protocols prevent double-spending and malicious edits in distributed ledgers."
      }
    ],
    jokes: [
      {
        setup: "Why do programmers wear glasses?",
        punchline: "Because they can't C#!"
      },
      {
        setup: "How many programmers does it take to change a light bulb?",
        punchline: "None, that's a hardware problem!"
      }
    ],
    facts: [
      {
        content: "The term 'computer bug' originated when Grace Hopper found a literal moth trapped in a relay of the Harvard Mark II computer in 1947.",
        source: "Smithsonian Institution"
      },
      {
        content: "The first mechanical computer, the Analytical Engine, was designed by Charles Babbage in 1837 but was never fully built during his lifetime.",
        source: "Computer History Museum"
      }
    ],
    quizzes: [
      [
        {
          id: "q-e-1",
          question: "Which algorithm ensures consensus inside decentralized distributed ledger nodes?",
          options: ["SSH handshake", "HTTP caching", "Proof of Work / Proof of Stake", "TCP socket exchange"],
          answer: 2,
          explanation: "Proof of Work and Proof of Stake are major consensus algorithms used to securely agree on ledger transactions."
        },
        {
          id: "q-e-2",
          question: "Who discovered the first recorded computer bug in 1947?",
          options: ["Alan Turing", "Ada Lovelace", "Grace Hopper", "Steve Wozniak"],
          answer: 2,
          explanation: "Grace Hopper traced a computer error to a literal moth stuck in a physical relay switch."
        }
      ]
    ]
  },
  medical: {
    concepts: [
      {
        title: "CRISPR-Cas9 Gene Editing",
        category: "Genetics & Biotechnology",
        body: "CRISPR-Cas9 is a technology derived from bacterial immune systems that allows scientists to edit DNA sequences with extreme precision. Cas9 acts as a pair of molecular scissors, guided by an RNA sequence to cut DNA at a specific spot.",
        takeaway: "Enables gene disabling or replacement, showing promise for curing inherited diseases."
      },
      {
        title: "Neuroplasticity",
        category: "Neuroscience",
        body: "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This allows neurons to adjust their activities in response to new situations, learning, or injury recovery.",
        takeaway: "The physical structures of our brains dynamically remodel based on habits and practice."
      }
    ],
    jokes: [
      {
        setup: "Why did the blood cell fall in love?",
        punchline: "Because it was all in vein!"
      },
      {
        setup: "What did the doctor say to the patient with a bad posture?",
        punchline: "I stand corrected!"
      }
    ],
    facts: [
      {
        content: "The human brain has approximately 86 billion neurons, forming trillions of synaptic connections that transmit electrical signals.",
        source: "Nature Neuroscience"
      },
      {
        content: "Corneas are the only tissues in the human body that do not contain blood vessels; they receive oxygen directly from the air.",
        source: "Mayo Clinic Health"
      }
    ],
    quizzes: [
      [
        {
          id: "q-m-1",
          question: "Which molecular component acts as the guided cutting mechanism in CRISPR?",
          options: ["Ribosome RNA", "Cas9 protein endonuclease", "Histone octamer", "Mitochondrial DNA"],
          answer: 1,
          explanation: "Cas9 is the endonuclease protein that binds to guide RNA and cuts double-stranded DNA sequences."
        },
        {
          id: "q-m-2",
          question: "How do corneal tissues in the human eye obtain oxygen without blood vessels?",
          options: ["Directly from the surrounding air", "Through lacrimal fluid absorption", "Using spinal fluid circulation", "From internal retina pressure"],
          answer: 0,
          explanation: "The cornea is completely avascular and receives oxygen directly dissolved from the outside air."
        }
      ]
    ]
  },
  technology: {
    concepts: [
      {
        title: "Quantum Superposition",
        category: "Quantum Computing",
        body: "Unlike classical bits which must be strictly a 0 or a 1, a quantum bit (qubit) can exist in a superposition of both states at the same time. Only when measured does the state collapse.",
        takeaway: "Superposition allows quantum systems to calculate millions of possibilities at once."
      },
      {
        title: "Neural Network Embeddings",
        category: "Artificial Intelligence",
        body: "Embeddings represent high-dimensional, unstructured data (like words, images, or audio) as dense vectors in a continuous mathematical space. This allows algorithms to compare semantic similarities.",
        takeaway: "Vector coordinates capture meaning: words like 'king' and 'queen' map close to each other."
      }
    ],
    jokes: [
      {
        setup: "There are 10 types of people in the world...",
        punchline: "Those who understand binary, and those who don't."
      },
      {
        setup: "Why did the smartphone need glasses?",
        punchline: "Because it lost its contacts!"
      }
    ],
    facts: [
      {
        content: "More than 50% of the world's oxygen is produced by phytoplankton — microscopic marine plants drifting in the ocean currents.",
        source: "NOAA Science"
      },
      {
        content: "The first email was sent in 1971 by Ray Tomlinson, who also chose the '@' symbol to separate the user name from the computer name.",
        source: "IEEE Spectrum"
      }
    ],
    quizzes: [
      [
        {
          id: "q-t-1",
          question: "What state properties allow quantum computers to store 0 and 1 simultaneously?",
          options: ["Topological error enclaves", "Quantum superposition", "Athermal resistance", "Static memory registers"],
          answer: 1,
          explanation: "Superposition lets qubits hold continuous combinations of probabilities before measurement collapses them."
        },
        {
          id: "q-t-2",
          question: "Who sent the first network email and introduced the '@' separator symbol in 1971?",
          options: ["Tim Berners-Lee", "Vint Cerf", "Ray Tomlinson", "Marc Andreessen"],
          answer: 2,
          explanation: "Ray Tomlinson developed the initial ARPANET email program, selecting '@' as the user-to-host delimiter."
        }
      ]
    ]
  }
};

export default function HubPage() {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz" | "math">("learn");
  const [dayIdx, setDayIdx] = useState(0);
  const [userPreference, setUserPreference] = useState<string>("technology");

  // Math Puzzle states
  const [mathNum1, setMathNum1] = useState(14);
  const [mathNum2, setMathNum2] = useState(7);
  const [mathOperator, setMathOperator] = useState("*");
  const [mathInput, setMathInput] = useState("");
  const [mathFeedback, setMathFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [mathSolved, setMathSolved] = useState(0);

  // Quiz states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Generate date index
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setDayIdx(dayOfYear);

    // Load track preferences
    const pref = localStorage.getItem("ilm_v2_user_preference") || "technology";
    setUserPreference(pref);
  }, []);

  const currentTrackData = TRACKS_DATABASE[userPreference] || TRACKS_DATABASE.technology;

  const concept = currentTrackData.concepts[dayIdx % currentTrackData.concepts.length];
  const joke = currentTrackData.jokes[dayIdx % currentTrackData.jokes.length];
  const fact = currentTrackData.facts[dayIdx % currentTrackData.facts.length];
  const quizQuestions = currentTrackData.quizzes[dayIdx % currentTrackData.quizzes.length];

  // Load new Math puzzle
  const generateMathPuzzle = () => {
    const operators = ["+", "-", "*"];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let n1 = 0, n2 = 0;
    
    if (op === "+") {
      n1 = Math.floor(Math.random() * 80) + 20;
      n2 = Math.floor(Math.random() * 80) + 20;
    } else if (op === "-") {
      n1 = Math.floor(Math.random() * 100) + 50;
      n2 = Math.floor(Math.random() * 49) + 1;
    } else {
      n1 = Math.floor(Math.random() * 12) + 3;
      n2 = Math.floor(Math.random() * 12) + 3;
    }
    
    setMathNum1(n1);
    setMathNum2(n2);
    setMathOperator(op);
    setMathInput("");
    setMathFeedback(null);
  };

  const checkMathAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    let correctAnswer = 0;
    if (mathOperator === "+") correctAnswer = mathNum1 + mathNum2;
    else if (mathOperator === "-") correctAnswer = mathNum1 - mathNum2;
    else if (mathOperator === "*") correctAnswer = mathNum1 * mathNum2;

    if (parseInt(mathInput) === correctAnswer) {
      setMathFeedback("correct");
      setMathSolved(prev => prev + 1);
      
      // Save math XP
      const currentXp = parseInt(localStorage.getItem("ilm_v2_xp") || "350");
      const currentLvl = parseInt(localStorage.getItem("ilm_v2_level") || "1");
      let nextXp = currentXp + 50; // 50 XP per math puzzle
      let nextLvl = currentLvl;
      if (nextXp >= 1000) {
        nextXp -= 1000;
        nextLvl += 1;
        localStorage.setItem("ilm_v2_level", nextLvl.toString());
      }
      localStorage.setItem("ilm_v2_xp", nextXp.toString());

      setTimeout(() => {
        generateMathPuzzle();
      }, 1200);
    } else {
      setMathFeedback("incorrect");
    }
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const correct = idx === quizQuestions[currentQuizIndex].answer;
    if (correct) {
      setQuizScore(prev => prev + 1);
      
      // Grant XP
      const currentXp = parseInt(localStorage.getItem("ilm_v2_xp") || "350");
      const currentLvl = parseInt(localStorage.getItem("ilm_v2_level") || "1");
      let nextXp = currentXp + 80; // 80 XP per correct answer
      let nextLvl = currentLvl;
      if (nextXp >= 1000) {
        nextXp -= 1000;
        nextLvl += 1;
        localStorage.setItem("ilm_v2_level", nextLvl.toString());
      }
      localStorage.setItem("ilm_v2_xp", nextXp.toString());
    }
    setShowExplanation(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col pb-36 bg-background text-foreground transition-all duration-300 font-sans">
      
      {/* Standardized Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-serif text-2xl font-extrabold tracking-tight">Ilm.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Headings */}
      <div className="sticky top-16 z-30 w-full border-b border-border bg-background/90 py-1">
        <div className="max-w-xl mx-auto px-4 h-12 flex items-center justify-around">
          {[
            { id: "learn", label: `Today's ${userPreference === "upsc" ? "Polity" : "Concept"}` },
            { id: "math", label: "Mental Math" },
            { id: "quiz", label: "Daily Quiz" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold py-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content wrapper */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Learn new concept / Facts / Jokes */}
          {activeTab === "learn" && concept && (
            <motion.div
              key="learn-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-6"
            >
              {/* Card: Daily Concept */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-foreground border border-border uppercase tracking-wider">
                    {concept.category}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">Tailored suggestion ({userPreference})</span>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight font-serif mb-3 leading-snug">
                  {concept.title}
                </h2>
                <p className="text-sm leading-relaxed text-foreground/90 font-sans font-medium mb-4">
                  {concept.body}
                </p>
                <div className="p-3 bg-secondary/60 rounded-lg border border-border/50 text-xs">
                  <span className="font-bold block text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Key Takeaway</span>
                  <p className="font-semibold text-foreground">{concept.takeaway}</p>
                </div>
              </div>

              {/* Grid: Fact & Joke */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fact card */}
                {fact && (
                  <div className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Scientific Fact</span>
                      <p className="text-xs leading-relaxed text-foreground font-semibold">
                        &ldquo;{fact.content}&rdquo;
                      </p>
                    </div>
                    <span className="text-[9px] text-muted-foreground block mt-3">Source: {fact.source}</span>
                  </div>
                )}

                {/* Joke card */}
                {joke && (
                  <div className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Daily Chuckle</span>
                      <p className="text-xs font-semibold text-foreground leading-relaxed">
                        {joke.setup}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-primary italic leading-relaxed mt-3">
                      {joke.punchline}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Mental Math Game */}
          {activeTab === "math" && (
            <motion.div
              key="math-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between min-h-[360px]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-6">
                <span className="text-xs font-bold text-muted-foreground uppercase">Speed Maths</span>
                <span className="text-xs font-bold font-mono">Solved: {mathSolved}</span>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-6 my-auto">
                <div className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold font-mono tracking-wider">
                  <span>{mathNum1}</span>
                  <span className="text-primary">{mathOperator === "*" ? "×" : mathOperator}</span>
                  <span>{mathNum2}</span>
                  <span>=</span>
                  <span className="text-muted-foreground">?</span>
                </div>

                <form onSubmit={checkMathAnswer} className="w-full max-w-xs flex gap-2">
                  <input
                    type="number"
                    placeholder="Enter answer"
                    value={mathInput}
                    onChange={(e) => setMathInput(e.target.value)}
                    disabled={mathFeedback === "correct"}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background font-mono text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-bold text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all flex items-center justify-center shrink-0"
                  >
                    Check
                  </button>
                </form>

                {/* Animated status indicators */}
                <div className="h-6">
                  {mathFeedback === "correct" && (
                    <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-xs font-bold text-green-600 flex items-center gap-1">
                      <Check className="h-4 w-4" /> Correct! Next equation loading...
                    </motion.span>
                  )}
                  {mathFeedback === "incorrect" && (
                    <motion.span initial={{ x: -10 }} animate={{ x: [0, -10, 10, -10, 0] }} className="text-xs font-bold text-red-600 flex items-center gap-1">
                      <X className="h-4 w-4" /> Incorrect. Try again!
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-border/40 mt-6">
                <button
                  onClick={generateMathPuzzle}
                  className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Skip / New Equation
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Interactive Daily Quiz */}
          {activeTab === "quiz" && quizQuestions && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between min-h-[380px]"
            >
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                      <BrainCircuit className="h-4 w-4 text-primary" /> {userPreference.toUpperCase()} Learning Quiz
                    </span>
                    <span className="text-xs font-bold font-mono">
                      Question {currentQuizIndex + 1} / {quizQuestions.length}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 justify-center my-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {quizQuestions[currentQuizIndex].question}
                    </h3>

                    <div className="flex flex-col gap-2.5">
                      {quizQuestions[currentQuizIndex].options.map((opt, idx) => {
                        const isCorrect = idx === quizQuestions[currentQuizIndex].answer;
                        const isSelected = selectedOption === idx;
                        const hasSelectedAny = selectedOption !== null;

                        let buttonStyles = "border-border hover:bg-secondary/40";
                        if (hasSelectedAny) {
                          if (isCorrect) {
                            buttonStyles = "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400";
                          } else if (isSelected) {
                            buttonStyles = "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400";
                          } else {
                            buttonStyles = "opacity-50 border-border";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            disabled={hasSelectedAny}
                            className={`w-full text-left p-3.5 text-xs sm:text-sm font-semibold rounded-lg border transition-all flex items-center justify-between ${buttonStyles}`}
                          >
                            <span>{opt}</span>
                            {hasSelectedAny && isCorrect && <Check className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />}
                            {hasSelectedAny && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-3 bg-secondary/40 rounded border border-border/50 text-[11px] leading-relaxed mt-2"
                        >
                          <span className="font-bold block text-muted-foreground uppercase text-[9px] mb-1">Explanation</span>
                          {quizQuestions[currentQuizIndex].explanation}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-border/40 pt-4 mt-6 flex justify-end">
                    <button
                      onClick={handleNextQuiz}
                      disabled={selectedOption === null}
                      className="px-5 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      {currentQuizIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center gap-6 py-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif">Quiz Completed!</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You scored {quizScore} out of {quizQuestions.length} correctly.
                    </p>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 font-bold text-xs bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-95 transition-all"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
}
