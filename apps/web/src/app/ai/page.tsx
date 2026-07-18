"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Send, Brain, Clock, MessageSquare, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface ConnectionLink {
  id: string;
  source: string;
  target: string;
  description: string;
  date: string;
}

export default function AiCoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const connectionLinks: ConnectionLink[] = [
    {
      id: "conn-1",
      source: "Vector Embeddings",
      target: "LLM Reasoning Models",
      description: "Generative reasoning models leverage vector embeddings to find semantic contexts during multi-step reasoning.",
      date: "Today"
    },
    {
      id: "conn-2",
      source: "Ephemeral (Vocab)",
      target: "Spaced Repetition (SM-2)",
      description: "Spaced Repetition counteracts the ephemeral nature of memory by reinforcing recall before concepts fade.",
      date: "Yesterday"
    },
    {
      id: "conn-3",
      source: "Basic Structure Doctrine",
      target: "Democratic Tenets",
      description: "Your constitutional track notes reference Kesavananda Bharati as the baseline for democratic checks and balances.",
      date: "2 days ago"
    }
  ];

  useEffect(() => {
    setMessages([
      {
        id: "msg-init",
        sender: "ai",
        text: "Greetings, Tanveer. I am Ilm AI, your client-side Personal Intelligence Coach. I operate locally on your device without external APIs. I have analyzed your active Knowledge Graph—ask me to explain Vector Embeddings, the Basic Structure Doctrine, or the SM-2 spaced repetition model.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  const handleLocalAiResponse = (userQuery: string) => {
    const query = userQuery.toLowerCase();
    
    // Custom responses matching the learning thread
    if (query.includes("embedding") || query.includes("vector")) {
      return "Vector Embeddings map words or concepts into dense coordinates in multi-dimensional space. In this space, geometric closeness represents semantic similarity (e.g., 'King' - 'Man' + 'Woman' ≈ 'Queen'). This lets retrieval algorithms perform semantic searches rather than exact keyword matches.";
    }
    if (query.includes("spaced") || query.includes("repetition") || query.includes("sm-2")) {
      return "The SM-2 spaced repetition algorithm adjusts review intervals dynamically. A successful recall increases the review gap (e.g. from 1 day to 4 days, then 10, then 24), shifting the node from your ephemeral short-term storage into permanent long-term memory structures.";
    }
    if (query.includes("ephemeral")) {
      return "The word 'Ephemeral' comes from the Greek 'ephemeros', meaning 'lasting only for a day'. In cognitive psychology, sensory memory is ephemeral. Without active recall or coding, neural connections representing this word degrade rapidly.";
    }
    if (query.includes("basic structure") || query.includes("doctrine") || query.includes("constitution") || query.includes("kesavananda")) {
      return "The Basic Structure Doctrine is a landmark rule in Indian Constitutional Law established in 1973. It holds that the Parliament can amend the Constitution, but cannot alter or destroy its core identity (like democracy, secularism, and federalism). It remains a crucial check against legislative overreach.";
    }
    if (query.includes("quiz") || query.includes("test") || query.includes("question")) {
      return "Let's test your memory! Here is a question:\n\nWhich legal case established the Basic Structure Doctrine in India?\n\nA) Kesavananda Bharati case (1973)\nB) Golaknath case (1967)\nC) Minerva Mills case (1980)\n\nReply with the letter of your choice!";
    }
    if (query.trim().toUpperCase() === "A") {
      return "Correct! The Kesavananda Bharati case established the doctrine in a landmark 13-judge bench ruling.";
    }
    if (query.trim().toUpperCase() === "B" || query.trim().toUpperCase() === "C") {
      return "Incorrect. The correct answer was A (Kesavananda Bharati, 1973).";
    }
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hello! I am ready to deep-dive into your active learning graph. Ask me about Vector Embeddings, the SM-2 algorithm, or the Basic Structure Doctrine!";
    }
    
    // Generic high-quality response fallback
    return "I see you are interested in expanding your knowledge path. While I operate locally on heuristics, I can help you structure reflection summaries, explain core programming paradigms, or map conceptual links in your active learning deck. Try asking me: 'Explain Vector Embeddings'.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: inputVal.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const aiReplyText = handleLocalAiResponse(userMsg.text);
      setMessages(prev => [...prev, {
        id: "msg-ai-" + Date.now(),
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen pb-32 pt-10 max-w-5xl mx-auto px-6">
      
      {/* Header Info */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Personal AI Coach</span>
        </div>
        <h2 className="text-3xl font-bold font-serif">Ilm AI Companion</h2>
        <p className="text-xs text-muted-foreground mt-1">A clean, minimal, API-free local chatbot that maps semantic connections across your daily learning logs.</p>
      </section>

      {/* Grid Layout (Collapses on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Connection sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="soft-glass-outset rounded-2xl p-5 border-border/30">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-4.5 w-4.5 text-primary" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">Active AI Connections</h3>
            </div>
            
            <p className="text-[11px] text-muted-foreground mb-4">
              These conceptual links connect today's session with items you learned recently:
            </p>

            <div className="space-y-3">
              {connectionLinks.map(conn => (
                <div 
                  key={conn.id}
                  className="bg-secondary/40 border border-border/10 p-3 rounded-xl hover:border-primary/20 hover:scale-[1.01] transition-all cursor-pointer"
                  onClick={() => setInputVal(`Explain the connection between ${conn.source} and ${conn.target}`)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-primary font-bold">{conn.date}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">Trace Link</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-foreground mb-1">
                    {conn.source} <span className="text-muted-foreground text-[10px] font-normal">→</span> {conn.target}
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {conn.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-glass-outset rounded-2xl p-4 border-border/20 text-center flex items-center justify-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground">Local Heuristics Mode (100% Free)</span>
          </div>
        </div>

        {/* Minimal Chat Console */}
        <div className="lg:col-span-8 flex flex-col h-[500px] soft-glass-outset rounded-3xl border-border/30 overflow-hidden">
          
          {/* Header */}
          <div className="bg-card/45 border-b border-border/20 py-3.5 px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-primary" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">Tutoring Terminal</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map(msg => {
                const isAi = msg.sender === "ai";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isAi ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isAi 
                        ? "bg-secondary/40 text-foreground border border-border/10" 
                        : "bg-primary text-white shadow-sm shadow-primary/10"
                    }`}>
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                      <span className={`block text-[9px] mt-1.5 text-right ${isAi ? "text-muted-foreground" : "text-white/60"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/40 text-muted-foreground border border-border/10 rounded-2xl py-3 px-4 text-xs font-mono flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Send Input */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-card/60 border-t border-border/20 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask me to explain any daily concept..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-secondary/35 rounded-xl border border-border/20 text-xs focus:outline-none focus:border-primary/50 text-foreground"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-primary disabled:opacity-40 text-white transition-all hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
