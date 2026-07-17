"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowUp, ArrowDown, Bookmark, Newspaper, BookmarkCheck, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_NEWS_DATABASE = [
  {
    id: "art-1",
    title: "Samay Raina Announces Auditions for India's Got Latent Season 2",
    summary: "Following the massive viral success of the first season, comedian Samay Raina has officially opened online auditions for 'India's Got Latent' Season 2. The show, which highlights hidden, awkward, or unique talents, has become one of the most-watched comedy series on Indian YouTube.",
    fullStory: "Audition portals received over 50,000 entries within the first 12 hours of the announcement. Guest judges for the upcoming season are rumored to include major Indian stand-up comedians and prominent streaming personalities.",
    source: "YouTube Trends",
    readTime: "2 min read",
    tag: "YouTube"
  },
  {
    id: "art-upsc-1",
    title: "Parliamentary Standing Committee Recommends Direct Recruitment Reforms",
    summary: "A new parliamentary draft report proposes structuring UPSC exams into a single multi-tier portal to reduce selection cycle times from 15 months to 6 months.",
    fullStory: "The committee suggested standardizing evaluation metrics and implementing computer-based preliminary screenings. Proponents argue this will lower operational overhead and relieve candidate fatigue.",
    source: "PIB Delhi",
    readTime: "3 min read",
    tag: "UPSC"
  },
  {
    id: "art-2",
    title: "OpenAI Rolls Out Advanced Reasoning Models Internationally",
    summary: "The newly deployed reasoning engines focus on multi-step logic compilation and verification. By utilizing structured inference chains, the model handles complex math, coding, and logical debugging tasks with a 40% reduction in hallucinatory outputs.",
    fullStory: "The deployment targets enterprise users and developers first, extending API access across 150 countries. Early testing indicates substantial performance jumps in competitive programming benchmarks.",
    source: "TechCrunch",
    readTime: "2 min read",
    tag: "AI"
  },
  {
    id: "art-med-1",
    title: "CRISPR-Based Therapeutic Trials Yield Successful Blindness Reversal",
    summary: "Clinical trials for a CRISPR gene-editing injection targeting inherited retinal degeneration have successfully restored partial vision in 12 adult patients.",
    fullStory: "The procedure edits DNA base-pairs inside photoreceptor cells directly. Scientists confirm that zero long-term off-target mutations were detected during the 18-month follow-up period.",
    source: "The Lancet Medicine",
    readTime: "4 min read",
    tag: "Medical"
  },
  {
    id: "art-3",
    title: "India Launches Nationwide Digital Libraries Infrastructure Project",
    summary: "The Ministry of Education announced a central knowledge portal linking academic institutions to open-access research repositories. The initiative is aimed at bridging the rural-urban education quality gap using local language audio translations.",
    fullStory: "Backed by a $450M initial funding grant, the project integrates real-time Indian Sign Language conversions and AI voiceovers in 22 regional languages. Over 50,000 schools will receive smart projection terminals.",
    source: "Economic Times",
    readTime: "3 min read",
    tag: "India"
  },
  {
    id: "art-eng-1",
    title: "Rust Language Officially Promoted to Tier-1 Status in Linux Kernel Development",
    summary: "The Linux kernel maintainers have finalized initial APIs enabling driver authors to write robust memory-safe device drivers in Rust for mainstream distributions.",
    fullStory: "This development reduces common pointer bugs and memory leaks. Major tech organizations have pledged developer resources to accelerate compiler integrations for legacy hardware architectures.",
    source: "Linux Foundation",
    readTime: "4 min read",
    tag: "Coding"
  },
  {
    id: "art-4",
    title: "Quantum Computation Decryption Threshold Achieved by Lab",
    summary: "Physicists have successfully kept 1,200 qubits stable for over 15 seconds at near room temperatures. This breakthrough reduces error propagation by a factor of 100, bringing commercial-grade cryptographic decryption capabilities closer to reality.",
    fullStory: "The research implements topological error correction codes. While not yet capable of cracking RSA-2048 encryption, experts caution that cybersecurity frameworks must start transitioning to post-quantum algorithms.",
    source: "Nature Science",
    readTime: "4 min read",
    tag: "Tech"
  },
  {
    id: "art-upsc-2",
    title: "Ministry of Finance Approves Comprehensive Fiscal Devolution Framework",
    summary: "Under the new devolution rules, states will receive a 42% share in central taxes, with additional grants earmarked for local municipal development and green transition projects.",
    fullStory: "This reform seeks to empower local panchayats and tier-3 governance centers. Audit frameworks will be enhanced to track budget execution in real-time.",
    source: "Financial Express",
    readTime: "3 min read",
    tag: "UPSC"
  },
  {
    id: "art-5",
    title: "CarryMinati's Satirical Parody Video Claims #1 Trending Spot in India",
    summary: "Ajey Nagar (CarryMinati) returned to the trending charts with a high-budget satirical parody of modern reality shows and influencer marketing agencies, accumulating over 25 million views within 24 hours.",
    fullStory: "The video lampoons viral meme trends and the commercialization of internet micro-celebrities, drawing praise for its high production values and sharp commentary. Several prominent creator cameos are featured.",
    source: "Social Blade",
    readTime: "2 min read",
    tag: "YouTube"
  },
  {
    id: "art-med-2",
    title: "Neuroscience Study Maps Synaptic Reorganization During Deep Sleep Cycles",
    summary: "Using high-resolution functional MRI imaging, researchers have visualised the brain cleansing cellular waste and strengthening newly formed memories during slow-wave sleep.",
    fullStory: "The study underlines the critical role of sleep in cognitive retention and neurological health. Missing a single night's sleep was shown to double temporary amyloid-beta accumulation.",
    source: "Nature Neuroscience",
    readTime: "3 min read",
    tag: "Medical"
  },
  {
    id: "art-6",
    title: "Global Tech Accord Establishes Sovereign AI Frameworks",
    summary: "Envoys from 30 nations signed the Geneva Tech Accord, outlining limits on AI deployment in critical public infrastructures. The agreement mandates human-in-the-loop checks for automated welfare distributions and judicial sentencing.",
    fullStory: "The treaty establishes an international arbitration board to monitor compliance and investigate suspected leaks or unauthorized cross-border training data ingestion. Major AI research facilities will undergo bi-annual safety audits.",
    source: "Reuters",
    readTime: "3 min read",
    tag: "Global"
  },
  {
    id: "art-7",
    title: "Rajasthan Solar Grid Reaches 15 Gigawatts Peak Generating Limit",
    summary: "India's desert solar grids set a record in June, supplying over 18% of the western corridor's afternoon electricity needs. Energy storage batteries are being deployed to mitigate evening drop-offs.",
    fullStory: "The state energy corporation is integrating 4,000 MWh of lithium-iron-phosphate battery arrays. The expansion plan targets 25 GW capacity by late 2028, aligning with India's carbon neutrality goals.",
    source: "Economic Times",
    readTime: "3 min read",
    tag: "India"
  },
  {
    id: "art-8",
    title: "Tanmay Bhat's Tech & AI Reaction Videos Spark Creator Discourse",
    summary: "Renowned creator Tanmay Bhat's series of reaction logs on advanced AI tools, dev environments, and productivity frameworks has sparked a new wave of coding curiosity among Indian college students.",
    fullStory: "Integrating humor with coding walkthroughs, the series has made software engineering and machine learning concepts accessible to non-technical audiences, recording high user retention rates.",
    source: "TubularInsights",
    readTime: "3 min read",
    tag: "YouTube"
  },
  {
    id: "art-9",
    title: "WebAssembly Edge Runtimes Automate Complex Vector Computations",
    summary: "New updates to standard browser engines permit browser tabs to execute local neural net compilation. Webapps can now parse audio or edit images with zero remote server data transits.",
    fullStory: "Utilizing WebGPU bindings and SIMD instructions inside WebAssembly, the runtime handles image classification tasks locally with sub-10ms response loops, improving offline web applications.",
    source: "InfoWorld",
    readTime: "2 min read",
    tag: "Tech"
  },
  {
    id: "art-10",
    title: "Digital Rupee Extends Transactions Support to Offline Local Wallets",
    summary: "The Reserve Bank of India has expanded central bank digital currency (eRupee) trials, enabling peer-to-peer transfers via bluetooth without active cellular networks or internet links.",
    fullStory: "The mechanism uses secure hardware cryptographic enclaves on mobile devices to prevent double-spending attacks. Transactions sync instantly once either device establishes network handshakes.",
    source: "Bloomberg Quint",
    readTime: "3 min read",
    tag: "India"
  }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedNews, setSavedNews] = useState<string[]>([]);
  const [showAiSummary, setShowAiSummary] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userPreference, setUserPreference] = useState<string>("technology");

  const categories = ["For You", "All", "Tech", "AI", "UPSC", "Medical", "India", "YouTube", "Saved"];

  useEffect(() => {
    // Theme setup
    const isDark = document.documentElement.classList.contains("dark") || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);

    // Bookmarks and preferences hydration
    const saved = JSON.parse(localStorage.getItem("ilm_v2_saved_news") || "[]");
    setSavedNews(saved);

    const pref = localStorage.getItem("ilm_v2_user_preference") || "technology";
    setUserPreference(pref);
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

  const handleToggleBookmark = (id: string) => {
    let updated: string[];
    if (savedNews.includes(id)) {
      updated = savedNews.filter((x) => x !== id);
    } else {
      updated = [...savedNews, id];
    }
    setSavedNews(updated);
    localStorage.setItem("ilm_v2_saved_news", JSON.stringify(updated));
  };

  const handleToggleAi = (id: string) => {
    setShowAiSummary((prev) => (prev === id ? null : id));
  };

  // Filter based on active category and user learning track preferences
  const filteredArticles = ALL_NEWS_DATABASE.filter((art) => {
    if (selectedCategory === "Saved") {
      return savedNews.includes(art.id);
    }
    if (selectedCategory === "For You") {
      if (userPreference === "upsc") {
        return art.tag === "UPSC" || art.tag === "India" || art.tag === "Global";
      } else if (userPreference === "engineering") {
        return art.tag === "Coding" || art.tag === "AI" || art.tag === "Tech";
      } else if (userPreference === "medical") {
        return art.tag === "Medical" || art.tag === "Science";
      } else { // technology
        return art.tag === "Tech" || art.tag === "AI" || art.tag === "YouTube";
      }
    }
    if (selectedCategory === "All") return true;
    return art.tag.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleNext = () => {
    if (currentIndex < filteredArticles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAiSummary(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAiSummary(null);
    }
  };

  // Reset index when category switches
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setShowAiSummary(null);
  };

  const currentArticle = filteredArticles[currentIndex];

  return (
    <div className="flex-1 min-h-screen flex flex-col pb-36 bg-background text-foreground transition-all duration-300 font-sans">
      
      {/* Standardized Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-serif text-2xl font-extrabold tracking-tight">Ilm.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Filter Categories Selector */}
      <div className="w-full border-b border-border bg-card/65 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-none sticky top-16 z-30">
        <div className="max-w-xl mx-auto px-4 flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat === "For You" ? `✨ For You (${userPreference})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main deck article */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentArticle ? (
            <motion.div
              key={currentArticle.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-4 relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary/10 text-foreground border border-border">
                  {currentArticle.tag}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">{currentArticle.readTime}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-muted-foreground block mb-1">Source: {currentArticle.source}</span>
                <h2 className="text-xl font-serif font-extrabold tracking-tight leading-snug mb-3 text-foreground">
                  {currentArticle.title}
                </h2>
                <p className="text-xs leading-relaxed font-semibold text-foreground/90">
                  {currentArticle.summary}
                </p>

                <AnimatePresence>
                  {showAiSummary === currentArticle.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-lg bg-secondary/60 border border-border/80 text-xs leading-relaxed text-foreground mt-3"
                    >
                      <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
                        <Sparkles className="h-3 w-3" /> AI Expanded Context & Takeaways
                      </span>
                      <p className="italic text-muted-foreground mb-2">
                        &ldquo;{currentArticle.fullStory}&rdquo;
                      </p>
                      <div className="h-px bg-border/45 my-2" />
                      <p className="font-semibold text-foreground">
                        Key Takeaway: Critical insights and global movements matching your preferences.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-border/40 pt-4 mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleToggleAi(currentArticle.id)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
                    showAiSummary === currentArticle.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{showAiSummary === currentArticle.id ? "Hide AI Summary" : "AI In-Depth"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleToggleBookmark(currentArticle.id)}
                    className="p-2 rounded-full border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
                    aria-label="Bookmark article"
                  >
                    {savedNews.includes(currentArticle.id) ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No news available for the selected category.
            </div>
          )}
        </AnimatePresence>

        {filteredArticles.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-foreground"
              aria-label="Previous Article"
            >
              <ArrowUp className="h-4.5 w-4.5" />
            </button>
            <span className="text-xs font-bold font-mono self-center px-2">
              {currentIndex + 1} / {filteredArticles.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredArticles.length - 1}
              className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-foreground"
              aria-label="Next Article"
            >
              <ArrowDown className="h-4.5 w-4.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
