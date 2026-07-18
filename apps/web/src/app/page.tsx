"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const [username, setUsername] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem("ilm_username");
    if (savedName) {
      setUsername(savedName);
      setIsSaved(true);
    }
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    localStorage.setItem("ilm_username", inputName.trim());
    setUsername(inputName.trim());
    setIsSaved(true);
  };

  const handleClearName = () => {
    localStorage.removeItem("ilm_username");
    setUsername("");
    setIsSaved(false);
    setInputName("");
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-center items-center px-6 bg-background text-foreground transition-all duration-300 relative overflow-hidden">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-12 z-10">
        
        {/* Simple Minimal Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-14 h-14 rounded-full flex items-center justify-center soft-glass-outset border border-border/20"
        >
          <span className="font-serif text-3xl font-medium text-primary">إ</span>
        </motion.div>

        {/* Hero Title & Mission Tagline */}
        <div className="flex flex-col gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-serif tracking-tight"
          >
            Ilm
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-muted-foreground font-sans tracking-wide max-w-xs mx-auto"
          >
            Everything you need to know today in just 5 minutes.
          </motion.p>
        </div>

        {/* Dynamic Name Input Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full flex flex-col items-center gap-4"
        >
          {!isSaved ? (
            <form onSubmit={handleSaveName} className="w-full max-w-xs space-y-4">
              <input
                type="text"
                placeholder="Enter your name..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl soft-glass-inset text-xs font-sans text-foreground text-center focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 border border-border/20"
              />
              <button
                type="submit"
                disabled={!inputName.trim()}
                className="w-full bg-primary disabled:opacity-45 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:scale-[1.02] active:scale-98 transition-all"
              >
                Continue
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-foreground font-sans">
                Welcome back, <span className="font-serif font-bold text-primary">{username}</span>
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <Link
                  href="/dashboard"
                  className="group flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:scale-105 active:scale-98 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider"
                >
                  Begin Session
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={handleClearName}
                  className="text-[10px] text-muted-foreground hover:underline mt-2"
                >
                  Not you? Change name
                </button>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
