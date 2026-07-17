"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, X, Send, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function AiChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "model", text: "Hello! I am your Gemini-powered Ilm assistant. Ask me anything about today's concepts, goals, or coding challenges!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Append user message
    const updatedMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1) // exclude first greeting
        })
      });

      if (!response.ok) {
        throw new Error("Chat api failed");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "model" as const, text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model" as const, text: "I'm having trouble connecting to Gemini. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/[0.1] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border border-border"
          aria-label="Open AI Assistant"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </button>
      </div>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-22 right-6 z-50 w-[90%] sm:w-96 h-[480px] bg-card border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-secondary/60 border-b border-border/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-foreground">Gemini Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-muted-foreground uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin">
              {messages.map((m, idx) => {
                const isModel = m.role === "model";
                return (
                  <div
                    key={idx}
                    className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed font-semibold shadow-sm ${
                        isModel
                          ? "bg-secondary text-foreground border border-border/40 rounded-tl-none"
                          : "bg-primary text-primary-foreground rounded-tr-none"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground border border-border/40 rounded-2xl rounded-tl-none p-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-border/80 bg-secondary/20 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask Gemini anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
