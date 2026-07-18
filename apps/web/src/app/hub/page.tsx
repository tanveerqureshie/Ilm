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

// Advanced Math Puzzle definitions
interface MathPuzzle {
  category: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const TRIGONOMETRY_BANK: MathPuzzle[] = [
  { category: "Trigonometry", question: "Evaluate: sin(30°)", options: ["0", "1/2", "√3/2", "1"], answer: "1/2", explanation: "On the unit circle, sin(30°) is the vertical coordinate of the terminal point, which is exactly 1/2." },
  { category: "Trigonometry", question: "Evaluate: cos(60°)", options: ["1/2", "√2/2", "√3/2", "0"], answer: "1/2", explanation: "Due to complementary angle relationships, cos(60°) is equivalent to sin(30°), which evaluates to 1/2." },
  { category: "Trigonometry", question: "Evaluate: tan(45°)", options: ["0", "1/√3", "1", "√3"], answer: "1", explanation: "Since sin(45°) = cos(45°) = √2/2, their ratio tan(45°) is exactly 1." },
  { category: "Trigonometry", question: "Simplify the identity: sin²(θ) + cos²(θ)", options: ["0", "1", "sin(2θ)", "sec²(θ)"], answer: "1", explanation: "This is the fundamental Pythagorean trigonometric identity derived directly from the unit circle equation x² + y² = 1." },
  { category: "Trigonometry", question: "Evaluate: sec(60°)", options: ["1", "2", "√2", "2/√3"], answer: "2", explanation: "sec(θ) is the reciprocal of cos(θ). Since cos(60°) = 1/2, sec(60°) = 2." },
  { category: "Trigonometry", question: "Evaluate: tan(60°)", options: ["1/√3", "1", "√3", "Undefined"], answer: "√3", explanation: "tan(60°) = sin(60°) / cos(60°) = (√3/2) / (1/2) = √3." }
];

const CALCULUS_BANK: MathPuzzle[] = [
  { category: "Calculus", question: "Find the derivative: d/dx (x²)", options: ["x", "2x", "2", "x² / 2"], answer: "2x", explanation: "By the Power Rule d/dx (xⁿ) = n·xⁿ⁻¹, the derivative of x² is 2x." },
  { category: "Calculus", question: "Find the derivative: d/dx (sin x)", options: ["cos x", "-cos x", "sin x", "-sin x"], answer: "cos x", explanation: "The rate of change of the sine function is exactly the cosine function: d/dx (sin x) = cos x." },
  { category: "Calculus", question: "Evaluate the integral: ∫ 2x dx", options: ["x² + C", "2x² + C", "x + C", "2 + C"], answer: "x² + C", explanation: "By reversing the power rule, the antiderivative of 2x is x² plus the constant of integration C." },
  { category: "Calculus", question: "Find the derivative: d/dx (e^x)", options: ["e^x", "xe^(x-1)", "ln(x)", "e^(x-1)"], answer: "e^x", explanation: "The exponential function base e is its own derivative. Thus, d/dx (e^x) = e^x." },
  { category: "Calculus", question: "Evaluate: d/dx (3x³)", options: ["3x²", "9x²", "9x", "6x"], answer: "9x²", explanation: "By applying the Power Rule, d/dx (3x³) = 3 · 3x² = 9x²." }
];

const LOGARITHM_BANK: MathPuzzle[] = [
  { category: "Logarithms", question: "Solve for x: log₂ (16) = x", options: ["2", "4", "8", "16"], answer: "4", answerIndex: 1, explanation: "Logarithm base 2 of 16 asks: 'To what power must 2 be raised to get 16?'. Since 2⁴ = 16, the answer is 4." } as any,
  { category: "Logarithms", question: "Solve for x: log₁₀ (1000) = x", options: ["2", "3", "4", "10"], answer: "3", explanation: "Since 10³ = 1000, the logarithm base 10 of 1000 is exactly 3." },
  { category: "Exponents", question: "Evaluate: 3⁴", options: ["12", "27", "64", "81"], answer: "81", explanation: "3⁴ is equal to 3 × 3 × 3 × 3, which computes to 81." }
];

export default function HubPage() {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz" | "math">("learn");
  const [dayIdx, setDayIdx] = useState(0);
  const [userPreference, setUserPreference] = useState<string>("technology");

  // Math Puzzle states
  const [mathPuzzle, setMathPuzzle] = useState<MathPuzzle | null>(null);
  const [selectedMathOption, setSelectedMathOption] = useState<string | null>(null);
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

  // Dynamic Advanced Math Puzzle generator
  const generateMathPuzzle = () => {
    setSelectedMathOption(null);
    setMathFeedback(null);

    // Pick a random category: Trigo, Calculus, Logs, Arithmetic
    const choice = Math.floor(Math.random() * 4);
    if (choice === 0) {
      // Trigonometry
      const p = TRIGONOMETRY_BANK[Math.floor(Math.random() * TRIGONOMETRY_BANK.length)];
      setMathPuzzle(p);
    } else if (choice === 1) {
      // Calculus
      const p = CALCULUS_BANK[Math.floor(Math.random() * CALCULUS_BANK.length)];
      setMathPuzzle(p);
    } else if (choice === 2) {
      // Logarithm / Exponent
      const p = LOGARITHM_BANK[Math.floor(Math.random() * LOGARITHM_BANK.length)];
      setMathPuzzle(p);
    } else {
      // Programmatic Mental Arithmetic
      const operators = ["+", "-", "×"];
      const op = operators[Math.floor(Math.random() * operators.length)];
      let n1 = 0, n2 = 0, correct = 0;
      
      if (op === "+") {
        n1 = Math.floor(Math.random() * 60) + 15;
        n2 = Math.floor(Math.random() * 60) + 15;
        correct = n1 + n2;
      } else if (op === "-") {
        n1 = Math.floor(Math.random() * 80) + 30;
        n2 = Math.floor(Math.random() * 29) + 5;
        correct = n1 - n2;
      } else {
        n1 = Math.floor(Math.random() * 11) + 3;
        n2 = Math.floor(Math.random() * 11) + 3;
        correct = n1 * n2;
      }

      // Generate distractors
      const distractors = new Set<string>();
      distractors.add(correct.toString());
      while (distractors.size < 4) {
        const offset = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
        const dist = correct + offset;
        if (dist > 0) distractors.add(dist.toString());
      }
      const optionsArray = Array.from(distractors).sort(() => Math.random() - 0.5);

      setMathPuzzle({
        category: "Mental Arithmetic",
        question: `Evaluate: ${n1} ${op} ${n2}`,
        options: optionsArray,
        answer: correct.toString(),
        explanation: `Simply calculate the values: ${n1} ${op} ${n2} equals exactly ${correct}.`
      });
    }
  };

  // Generate the first math question when switching to math tab
  useEffect(() => {
    if (activeTab === "math" && !mathPuzzle) {
      generateMathPuzzle();
    }
  }, [activeTab]);

  const handleSelectMathOption = (option: string) => {
    if (selectedMathOption !== null || !mathPuzzle) return;
    setSelectedMathOption(option);
    
    if (option === mathPuzzle.answer) {
      setMathFeedback("correct");
      setMathSolved(prev => prev + 1);
      
      // Grant XP
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
      }, 1500);
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
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-2xl font-black tracking-tight text-primary">Ilm.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Selector */}
      <div className="sticky top-16 z-30 w-full border-b border-border bg-background/80 py-1 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-6 h-12 flex items-center justify-around">
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

      {/* Main Content */}
      <main className="flex-1 max-w-xl w-full mx-auto px-6 py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Concept & Fact & Joke */}
          {activeTab === "learn" && concept && (
            <motion.div
              key="learn-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col gap-6"
            >
              {/* Daily Concept Card */}
              <div className="glass-panel rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-border/30">
                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25 uppercase tracking-wider">
                    {concept.category}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground">Track: {userPreference}</span>
                </div>
                <h2 className="text-xl font-serif font-black tracking-tight mb-3 leading-snug">
                  {concept.title}
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium mb-4">
                  {concept.body}
                </p>
                <div className="p-3 bg-secondary/50 rounded-xl border border-border/40 text-[11px] font-semibold leading-relaxed text-foreground">
                  <span className="font-extrabold block text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">Key Takeaway</span>
                  {concept.takeaway}
                </div>
              </div>

              {/* Fact and Joke Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fact && (
                  <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[8px] font-black text-primary uppercase tracking-widest block mb-2">Scientific Fact</span>
                      <p className="text-xs leading-relaxed text-foreground font-semibold">
                        &ldquo;{fact.content}&rdquo;
                      </p>
                    </div>
                    <span className="text-[8px] text-muted-foreground font-semibold block mt-3">Source: {fact.source}</span>
                  </div>
                )}

                {joke && (
                  <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest block mb-2">Daily Chuckle</span>
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

          {/* TAB 2: Mental Math (Calculus, Trig, Log, Arithmetic) */}
          {activeTab === "math" && mathPuzzle && (
            <motion.div
              key="math-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/30 mb-5">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/25">
                    {mathPuzzle.category}
                  </span>
                  <span className="text-xs font-bold font-mono text-muted-foreground">Solved: {mathSolved}</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-6 my-6">
                  {/* Large Math question */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-center text-foreground leading-relaxed select-none">
                    {mathPuzzle.question}
                  </h3>

                  {/* Multiple Choice Option Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-2">
                    {mathPuzzle.options.map((opt) => {
                      const isCorrect = opt === mathPuzzle.answer;
                      const isSelected = selectedMathOption === opt;
                      const hasSelected = selectedMathOption !== null;

                      let buttonStyles = "border-border hover:bg-secondary/40";
                      if (hasSelected) {
                        if (isCorrect) {
                          buttonStyles = "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400";
                        } else if (isSelected) {
                          buttonStyles = "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400";
                        } else {
                          buttonStyles = "opacity-40 border-border";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectMathOption(opt)}
                          disabled={hasSelected}
                          className={`w-full text-center py-4 font-mono font-bold text-sm sm:text-base rounded-xl border transition-all flex items-center justify-center gap-2 ${buttonStyles}`}
                        >
                          <span>{opt}</span>
                          {hasSelected && isCorrect && <Check className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />}
                          {hasSelected && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback summary */}
                  <div className="h-8 flex items-center justify-center text-center">
                    {mathFeedback === "correct" && (
                      <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-xs font-bold text-green-600 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Correct! +50 XP and Loading next...
                      </motion.span>
                    )}
                    {mathFeedback === "incorrect" && (
                      <motion.span initial={{ x: -10 }} animate={{ x: [0, -10, 10, -10, 0] }} className="text-xs font-bold text-red-600 flex items-center gap-1">
                        <X className="h-4 w-4" /> Incorrect. Try a different option!
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>

              {/* Explanations shown after answering */}
              <AnimatePresence>
                {selectedMathOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 bg-secondary/40 border border-border/40 rounded-xl text-[10px] leading-relaxed mb-4"
                  >
                    <span className="font-extrabold block text-muted-foreground uppercase text-[9px] mb-0.5">Explanation</span>
                    {mathPuzzle.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center pt-3 border-t border-border/30 mt-4">
                <button
                  onClick={generateMathPuzzle}
                  className="text-[10px] font-extrabold text-muted-foreground hover:text-primary flex items-center gap-1 uppercase tracking-wider"
                >
                  <RefreshCw className="h-3 w-3" /> Skip to New Formula
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Quiz questions */}
          {activeTab === "quiz" && quizQuestions && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between min-h-[380px]"
            >
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-border/30 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 text-primary">
                      <BrainCircuit className="h-4 w-4" /> {userPreference.toUpperCase()} Daily Quiz
                    </span>
                    <span className="text-xs font-bold font-mono text-muted-foreground">
                      {currentQuizIndex + 1} / {quizQuestions.length}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 justify-center my-2">
                    <h3 className="text-sm sm:text-base font-serif font-black text-foreground leading-snug">
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
                            buttonStyles = "opacity-40 border-border";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            disabled={hasSelectedAny}
                            className={`w-full text-left p-3.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-between ${buttonStyles}`}
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
                          className="p-3 bg-secondary/40 border border-border/40 rounded-xl text-[10px] leading-relaxed mt-2"
                        >
                          <span className="font-extrabold block text-muted-foreground uppercase text-[9px] mb-0.5">Explanation</span>
                          {quizQuestions[currentQuizIndex].explanation}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-border/30 pt-4 mt-6 flex justify-end">
                    <button
                      onClick={handleNextQuiz}
                      disabled={selectedOption === null}
                      className="px-5 py-2.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase tracking-wider"
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
                    <h3 className="text-xl font-serif font-black text-foreground">Quiz Completed!</h3>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">
                      You scored {quizScore} out of {quizQuestions.length} correctly.
                    </p>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 font-bold text-[10px] uppercase tracking-wider bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-95 transition-all"
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
