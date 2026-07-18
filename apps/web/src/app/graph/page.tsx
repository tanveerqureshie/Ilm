"use client";

import React, { useState } from "react";
import { Network, Sparkles, HelpCircle, BookOpen, ArrowRight, Search, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  label: string;
  category: string;
  description: string;
  connections: string[];
  status: "learned" | "unlocked" | "locked";
  x: number;
  y: number;
}

export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const nodes: Node[] = [
    {
      id: "neuroplasticity",
      label: "Neuroplasticity & Learning",
      category: "Physiology",
      description: "The brain's ability to reorganize itself by forming new neural pathways throughout life. Regular mental workouts and sleep optimize this process.",
      connections: ["active-listening", "digital-hygiene"],
      status: "learned",
      x: 260,
      y: 200
    },
    {
      id: "stoicism",
      label: "Stoic Resilience",
      category: "Life Philosophy",
      description: "An ancient mindset focusing on control: differentiating between what is up to us and what is not, creating high emotional equilibrium in stress.",
      connections: ["active-listening", "parenting"],
      status: "learned",
      x: 100,
      y: 100
    },
    {
      id: "active-listening",
      label: "Active Listening",
      category: "Social Habits",
      description: "The conscious process of fully hearing, understanding, and responding to others. Key to deep bonding and trust in relationships.",
      connections: ["neuroplasticity", "stoicism", "parenting"],
      status: "learned",
      x: 420,
      y: 90
    },
    {
      id: "parenting",
      label: "Secure Attachment Bonding",
      category: "Parenting & Relations",
      description: "A psychological model of bonding where children feel safe to explore because their parents are consistently responsive to their emotional needs.",
      connections: ["stoicism", "active-listening", "social-cohesion"],
      status: "learned",
      x: 80,
      y: 310
    },
    {
      id: "digital-hygiene",
      label: "Digital Hygiene",
      category: "Mobile Habits",
      description: "Practices like gray-scaling screen modes, setting screen-free zones, and scheduling digital fasts to protect attention span and dopamine receptors.",
      connections: ["neuroplasticity", "social-cohesion"],
      status: "learned",
      x: 430,
      y: 310
    },
    {
      id: "social-cohesion",
      label: "Social Cohesion",
      category: "Social Habits",
      description: "The strength of relationships and the sense of solidarity among community members, which acts as a major indicator of longevity and health.",
      connections: ["parenting", "digital-hygiene"],
      status: "unlocked",
      x: 260,
      y: 340
    }
  ];

  // Helper to draw connecting lines
  const renderLines = () => {
    const rendered: React.ReactNode[] = [];
    const pairedKeys = new Set<string>();

    nodes.forEach(node => {
      node.connections.forEach(connId => {
        const target = nodes.find(n => n.id === connId);
        if (target) {
          const pairKey = [node.id, target.id].sort().join("-");
          if (!pairedKeys.has(pairKey)) {
            pairedKeys.add(pairKey);
            rendered.push(
              <line
                key={pairKey}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={node.status === "learned" && target.status === "learned" ? "#ff6b35" : "#78716c"}
                strokeWidth={1.5}
                strokeDasharray={node.status === "learned" && target.status === "learned" ? "0" : "5,5"}
                opacity={0.35}
              />
            );
          }
        }
      });
    });

    return rendered;
  };

  const filteredNodes = nodes.filter(n => {
    const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === "all" || n.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen pb-32 pt-10 max-w-4xl mx-auto px-6">
      
      {/* Header Info */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Network className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Personal Brain Mapping</span>
        </div>
        <h2 className="text-3xl font-bold font-serif">Knowledge Graph</h2>
        <p className="text-xs text-muted-foreground mt-1">Every learned concept from your Daily Sessions forms a node in your growing neural network.</p>
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card/60 backdrop-blur-md rounded-xl border border-border/20 text-xs focus:outline-none focus:border-primary/50 text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "Physiology", "Life Philosophy", "Social Habits", "Parenting & Relations", "Mobile Habits"].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 py-2.5 rounded-xl border text-[11px] font-medium transition-all ${
                activeCategory === cat 
                  ? "bg-primary text-white border-primary" 
                  : "bg-card/45 border-border/20 text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Visualizer Canvas */}
      <div className="relative glass-panel rounded-3xl p-4 overflow-hidden mb-8 min-h-[420px] flex items-center justify-center bg-card/40 border-border/20">
        <svg 
          viewBox="0 0 550 420" 
          className="w-full max-w-lg aspect-[550/420]"
        >
          {/* Render Connections */}
          {renderLines()}

          {/* Render Nodes */}
          {nodes.map(node => {
            const isMatch = filteredNodes.some(fn => fn.id === node.id);
            const isSelected = selectedNode?.id === node.id;
            const isLearned = node.status === "learned";

            return (
              <g 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Outer pulsing glow on search match or select */}
                {(isSelected || (isMatch && searchQuery !== "")) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 18 : 14}
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth={2}
                    opacity={0.5}
                    className="animate-ping"
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}

                {/* Inner Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 12 : 9}
                  fill={isLearned ? "#ff6b35" : "#1f1f2e"}
                  stroke={isLearned ? "#ffffff" : "#78716c"}
                  strokeWidth={2}
                  className="transition-all duration-300 group-hover:scale-125"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />

                {/* Text Label */}
                <text
                  x={node.x}
                  y={node.y - 16}
                  textAnchor="middle"
                  fill="currentColor"
                  className={`text-[10px] font-mono tracking-tight transition-colors ${
                    isSelected ? "font-bold text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Backdrop instructions */}
        {!selectedNode && (
          <div className="absolute inset-0 bg-transparent flex items-end justify-center pointer-events-none pb-6">
            <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
              <Network className="h-3.5 w-3.5" /> Click any node to expand connection details.
            </span>
          </div>
        )}
      </div>

      {/* Expanded Node Details (Glass Card Drawer) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="glass-panel rounded-2xl p-6 border-border/30 relative overflow-hidden"
          >
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-xs font-mono text-muted-foreground hover:text-foreground"
            >
              [close]
            </button>

            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
              {selectedNode.category}
            </span>
            <h3 className="text-xl font-bold font-serif mb-2">{selectedNode.label}</h3>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {selectedNode.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-border/10 pt-4 gap-3">
              <div className="flex gap-2">
                <span className="text-[9px] font-mono text-muted-foreground">Connected to:</span>
                <div className="flex gap-1.5">
                  {selectedNode.connections.map(connId => {
                    const matched = nodes.find(n => n.id === connId);
                    return matched ? (
                      <span 
                        key={connId} 
                        onClick={() => setSelectedNode(matched)}
                        className="text-[9px] font-mono bg-secondary/80 border border-border/20 px-2 py-0.5 rounded text-primary cursor-pointer hover:bg-secondary transition-colors"
                      >
                        {matched.label.split(" (")[0]}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-muted-foreground">Status:</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedNode.status === "learned" 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-amber-500/10 text-amber-500"
                }`}>
                  {selectedNode.status === "learned" ? "Learned (100% Recall)" : "Unlocked"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
