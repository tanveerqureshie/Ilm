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
    <div className="flex-1 min-h-screen flex flex-col justify-center items-center bg-background text-foreground transition-all duration-300 relative overflow-hidden py-12">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", 
             backgroundSize: "36px 36px" 
           }} 
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 z-10">
        
        {/* Left Side: Welcome and Login Form */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md mx-auto lg:mx-0 w-full gap-8">
          
          {/* Brand Logo */}
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
              className="text-5xl lg:text-6xl font-serif tracking-tight"
            >
              Ilm
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm lg:text-base text-muted-foreground font-sans tracking-wide max-w-xs lg:max-w-none"
            >
              Everything you need to know today in just 5 minutes.
            </motion.p>
          </div>

          {/* Dynamic Name Input Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full flex flex-col items-center lg:items-start gap-4"
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
              <div className="space-y-5 w-full max-w-xs">
                <p className="text-sm lg:text-base text-foreground font-sans">
                  Welcome back, <span className="font-serif font-bold text-primary">{username}</span>
                </p>
                
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <Link
                    href="/dashboard"
                    className="group flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:scale-105 active:scale-98 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider w-full lg:w-auto"
                  >
                    Begin Session
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    onClick={handleClearName}
                    className="text-[10px] text-muted-foreground hover:underline mt-2 self-center lg:self-start"
                  >
                    Not you? Change name
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Mobile/Tablet Inline illustration showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="lg:hidden w-full max-w-sm mt-4 border-t border-border/10 pt-6"
          >
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 text-center mb-3">Featured Daily Visualizers</p>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory justify-start px-2">
              {[
                { name: "Twin-Scroll Engine", path: "/illustrations/engine.png" },
                { name: "Aerospace Thruster", path: "/illustrations/thruster.png" },
                { name: "Silicon Transistor", path: "/illustrations/transistor.png" }
              ].map((item) => (
                <div key={item.name} className="flex-none w-[110px] aspect-square rounded-2xl overflow-hidden bg-card/25 border border-border/10 snap-center relative">
                  <img src={item.path} alt={item.name} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex flex-col justify-end p-2.5">
                    <span className="text-[7px] font-mono text-primary font-bold">SYSTEMS</span>
                    <h4 className="text-[9px] font-serif text-white font-semibold line-clamp-1">{item.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Side: Engineering Art Showcase (Desktop) */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-[540px] overflow-hidden rounded-3xl bg-black/10 border border-border/10">
          
          {/* Technical blueprint background grids */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ 
                 backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", 
                 backgroundSize: "20px 20px" 
               }} 
          />
          
          <div 
            className="grid grid-cols-2 gap-4 p-8 w-[108%] absolute"
            style={{
              transform: "perspective(1200px) rotateY(-20deg) rotateX(15deg) scale(0.95)",
              transformStyle: "preserve-3d"
            }}
          >
            {[
              { name: "Twin-Scroll Engine", path: "/illustrations/engine.png" },
              { name: "Aerospace Thruster", path: "/illustrations/thruster.png" },
              { name: "Silicon Transistor", path: "/illustrations/transistor.png" },
              { name: "GPS Satcom", path: "/illustrations/gps.png" }
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group aspect-square rounded-2xl overflow-hidden bg-card/10 border border-border/15 hover:border-primary/45 hover:scale-[1.03] transition-all duration-500 shadow-2xl"
                style={{ transform: "translateZ(20px)" }}
              >
                <img 
                  src={item.path} 
                  alt={item.name} 
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-primary font-bold">Systems Visuals</span>
                  <h4 className="text-[11px] font-bold font-serif text-white/90 mt-0.5">{item.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
