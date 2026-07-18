"use client";

import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Network, 
  X, 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  HardDrive, 
  ShieldCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PRODUCT_XRAYS, 
  CONCEPT_NODES, 
  getStructuredContent, 
  ProductXRay,
  StructuredSummary
} from "../../utils/dailyContent";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductXRay | null>(null);
  const [activeSystemNode, setActiveSystemNode] = useState<string | null>(null);
  
  // Learned status from local storage knowledge graph
  const [learnedNodes, setLearnedNodes] = useState<string[]>([]);

  // Deep Exploration modal states
  const [explorationNodeId, setExplorationNodeId] = useState<string | null>(null);
  const [explorationLabel, setExplorationLabel] = useState<string>("");
  const [explorationContent, setExplorationContent] = useState<StructuredSummary | null>(null);
  const [explorationSourceUrl, setExplorationSourceUrl] = useState<string>("");

  useEffect(() => {
    // Load learned concepts list
    const learned = JSON.parse(localStorage.getItem("ilm_learned_concepts") || "[]");
    setLearnedNodes(learned);
    
    // Default to first product on load
    if (PRODUCT_XRAYS.length > 0) {
      setSelectedProduct(PRODUCT_XRAYS[0]);
    }
  }, []);

  const handleOpenExploration = (nodeId: string, label: string) => {
    const nodeData = CONCEPT_NODES[nodeId];
    const sourceUrl = nodeData ? nodeData.sourceUrl : "https://en.wikipedia.org/wiki/" + encodeURIComponent(label);
    const content = getStructuredContent(nodeId, label);
    
    setExplorationNodeId(nodeId);
    setExplorationLabel(label);
    setExplorationContent(content);
    setExplorationSourceUrl(sourceUrl);

    // Save to learned nodes on exploration
    const updated = [...learnedNodes];
    if (!updated.includes(nodeId)) {
      updated.push(nodeId);
      setLearnedNodes(updated);
      localStorage.setItem("ilm_learned_concepts", JSON.stringify(updated));
    }
  };

  // Filter products by query
  const filteredProducts = PRODUCT_XRAYS.filter(product => {
    const matchesProduct = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSystems = product.systems.some(sys => 
      sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesProduct || matchesSystems;
  });

  return (
    <div className="min-h-screen pt-6 pb-20 max-w-4xl mx-auto px-4 space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-4.5 w-4.5 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Engineering X-Ray Browser</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-foreground mt-1">Product System X-Rays</h2>
          <p className="text-[11px] text-muted-foreground">Select a system to inspect its internal physical architecture and first-principle mechanics.</p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card/65 backdrop-blur-md rounded-xl border border-border/20 text-xs focus:outline-none focus:border-primary/50 text-foreground font-semibold"
          />
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Product Selector List */}
        <div className="space-y-3.5">
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block font-bold">Select Machine Architecture</span>
          
          <div className="space-y-3">
            {filteredProducts.map((product) => {
              const isSelected = selectedProduct?.id === product.id;
              
              return (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveSystemNode(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected 
                      ? "soft-glass-outset border-primary bg-primary/5" 
                      : "bg-card border-border/20 hover:border-primary/40 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-serif text-foreground">{product.name}</span>
                    {isSelected && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 font-semibold">
                    {product.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active System Architecture Diagram */}
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="soft-glass-outset rounded-3xl p-6 border-border/20 space-y-6"
              >
                <div>
                  <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider">Active X-Ray System</span>
                  <h3 className="text-xl font-bold font-serif text-foreground mt-0.5">{selectedProduct.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">{selectedProduct.description}</p>
                </div>

                {/* Connected Architecture Tree (Visual Flow List) */}
                <div className="space-y-3 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[1px] before:bg-border/30">
                  {selectedProduct.systems.map((sys, idx) => {
                    const isLearned = learnedNodes.includes(sys.detailNodeId);
                    const isActive = activeSystemNode === sys.detailNodeId;

                    return (
                      <div key={sys.name} className="relative pl-12">
                        {/* Connecting point */}
                        <div 
                          className={`absolute left-[19px] top-4.5 h-2 w-2 rounded-full border-2 border-background z-10 transition-all ${
                            isLearned 
                              ? "bg-emerald-500 ring-2 ring-emerald-500/20" 
                              : "bg-muted/40"
                          }`} 
                        />
                        
                        <div 
                          onClick={() => setActiveSystemNode(isActive ? null : sys.detailNodeId)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isActive 
                              ? "bg-secondary/40 border-primary shadow-sm" 
                              : "bg-card border-border/15 hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-serif text-foreground">{sys.name}</span>
                            <div className="flex items-center gap-2">
                              {isLearned && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
                              <span className="text-[9px] font-mono text-muted-foreground uppercase">Part 0{idx + 1}</span>
                            </div>
                          </div>

                          <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed font-semibold">
                            {sys.description}
                          </p>

                          {/* Expanded Detail Panel inline */}
                          {isActive && (
                            <div className="mt-4 pt-3 border-t border-border/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <span className="text-[9px] font-mono text-primary font-bold">Unlocks structured reference encyclopedia</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenExploration(sys.detailNodeId, sys.name);
                                }}
                                className="flex items-center justify-center gap-1 bg-primary text-white font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider hover:opacity-90 transition-all"
                              >
                                Explore Deeper <ArrowUpRight className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="h-64 flex items-center justify-center border border-border/15 rounded-3xl text-xs text-muted-foreground font-mono">
                Select a machine architecture to see details.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

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
