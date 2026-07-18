"use client";

import React, { useState } from "react";
import { Compass, Search, ArrowRight, Bookmark, BookmarkCheck, ArrowDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArchiveItem {
  id: string;
  title: string;
  category: "Concept" | "Vocabulary" | "Daily Fact";
  description: string;
  meta?: string;
  extendedExplanation?: string;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  const items: ArchiveItem[] = [
    {
      id: "arc-1",
      title: "Basic Structure Doctrine",
      category: "Concept",
      description: "Indian constitutional tenet safeguarding democracy from legislative overreach.",
      meta: "Kesavananda Bharati (1973)",
      extendedExplanation: "Established by a landmark 13-judge bench, this doctrine prevents the parliament from amending key elements of the Constitution such as democracy, secularism, federalism, and judicial review."
    },
    {
      id: "arc-2",
      title: "Spaced Repetition System",
      category: "Concept",
      description: "Memory consolidation pattern using exponential schedule intervals based on recall grades.",
      meta: "SM-2 Algorithmic Memory",
      extendedExplanation: "Utilizes exponential feedback loops to schedule reviews right before memory decay occurs, reducing study time while dramatically increasing retention."
    },
    {
      id: "arc-3",
      title: "Vector Embeddings",
      category: "Concept",
      description: "Dense real-number values mapped in multi-dimensional vector space representing lexical semantic relationships.",
      meta: "Vector Similarity Metrics",
      extendedExplanation: "Converts words or sentences into coordinates in high-dimensional vector spaces. Geometric distance (like cosine distance) represents semantic meaning similarity."
    },
    {
      id: "arc-4",
      title: "Ephemeral",
      category: "Vocabulary",
      description: "Lasting for a very short time; transient; fleeting.",
      meta: "Adjective • Pronounced /ɪˈfemərəl/",
      extendedExplanation: "Derived from Greek 'ephemeros' (lasting only a day). Commonly used in computer engineering to describe temporary storage registers or virtual server instances."
    },
    {
      id: "arc-5",
      title: "Resilient",
      category: "Vocabulary",
      description: "Able to withstand or recover quickly from difficult conditions; tough.",
      meta: "Adjective • Pronounced /rɪˈzɪliənt/",
      extendedExplanation: "Implies the capacity of a system or organism to return to its original form or state after being bent, compressed, or stressed."
    },
    {
      id: "arc-6",
      title: "Pragmatic",
      category: "Vocabulary",
      description: "Dealing with situations practically and realistically rather than theoretically.",
      meta: "Adjective • Pronounced /præɡˈmætɪk/",
      extendedExplanation: "Focuses on practical consequences and real-world results rather than adherence to strict ideology or hypothetical rules."
    },
    {
      id: "arc-7",
      title: "First Computer Bug",
      category: "Daily Fact",
      description: "Grace Hopper logged a literal moth trapped in the Harvard Mark II computer relay in 1947.",
      meta: "Historical Trivia",
      extendedExplanation: "The moth was taped to the group's log book next to the note: 'First actual case of bug being found.' This popularized the terms 'bug' and 'debugging'."
    },
    {
      id: "arc-8",
      title: "Ancient Honey",
      category: "Daily Fact",
      description: "Archaeologists found 3,000-year-old honey pots in Egyptian tombs that are still edible because honey contains virtually no moisture.",
      meta: "Science Trivia",
      extendedExplanation: "Its low moisture content and high acidity creates an inhospitable environment for bacteria or yeast, allowing it to remain preserved indefinitely."
    }
  ];

  const toggleBookmark = (id: string) => {
    if (bookmarkedItems.includes(id)) {
      setBookmarkedItems(bookmarkedItems.filter(item => item !== id));
    } else {
      setBookmarkedItems([...bookmarkedItems, id]);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeFilter === "all" || item.category === activeFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen pt-6 pb-20 max-w-2xl mx-auto px-4 flex flex-col h-[calc(100vh-80px)]">
      
      {/* Top search and filter bar */}
      <div className="shrink-0 space-y-3.5 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-4.5 w-4.5 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Knowledge Catalog</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">{filteredItems.length} items</span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card/65 backdrop-blur-md rounded-xl border border-border/20 text-xs focus:outline-none focus:border-primary/50 text-foreground"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {["all", "Concept", "Vocabulary", "Daily Fact"].map(filterVal => (
            <button
              key={filterVal}
              onClick={() => setActiveFilter(filterVal)}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-medium whitespace-nowrap transition-all ${
                activeFilter === filterVal 
                  ? "bg-primary text-white border-primary" 
                  : "bg-card/45 border-border/20 text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              {filterVal === "all" ? "All" : filterVal + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Reels-style Deck - fills remaining space */}
      <div className="flex-1 min-h-0 relative">
        {filteredItems.length === 0 ? (
          <div className="h-full flex items-center justify-center soft-glass-outset rounded-3xl p-12 text-center text-xs text-muted-foreground font-mono border-border/20">
            No matching records found.
          </div>
        ) : (
          <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none space-y-4 rounded-3xl">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="h-full w-full snap-start snap-always shrink-0 flex items-center justify-center p-1"
              >
                <div className="w-full h-full soft-glass-outset rounded-3xl p-6 md:p-8 flex flex-col justify-between relative border-border/30">
                  
                  {/* Card category banner */}
                  <div className="flex items-center justify-between border-b border-border/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.category === "Concept" 
                          ? "bg-primary/10 text-primary" 
                          : item.category === "Vocabulary"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="p-1 rounded hover:bg-secondary/40 text-muted-foreground transition-colors"
                    >
                      {bookmarkedItems.includes(item.id) ? (
                        <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                      ) : (
                        <Bookmark className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>

                  {/* Main content centered */}
                  <div className="my-auto py-4 space-y-4">
                    {item.meta && (
                      <span className="text-[10px] font-mono text-muted-foreground tracking-wide block uppercase">
                        {item.meta}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    {item.extendedExplanation && (
                      <div className="bg-secondary/20 rounded-xl p-3.5 border border-border/10">
                        <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">Deep-Dive Context</span>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {item.extendedExplanation}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Swipe indicator at card bottom */}
                  <div className="border-t border-border/10 pt-4 flex items-center justify-between text-muted-foreground text-[10px] font-mono">
                    <span className="flex items-center gap-1">
                      Card {idx + 1} of {filteredItems.length}
                    </span>
                    {idx < filteredItems.length - 1 && (
                      <span className="flex items-center gap-1.5 animate-bounce">
                        Swipe/Scroll Down <ArrowDown className="h-3 w-3 text-primary" />
                      </span>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
