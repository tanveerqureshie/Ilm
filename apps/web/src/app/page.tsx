"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Compass, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-center items-center px-4 bg-background text-foreground transition-all duration-300">
      <div className="max-w-xl w-full text-center flex flex-col items-center gap-8 py-16">
        
        {/* Animated Icon Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/10"
        >
          <span className="font-serif text-3xl font-bold tracking-tight">إ</span>
        </motion.div>

        {/* Dynamic Titles */}
        <div className="flex flex-col gap-3">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground"
          >
            Daily Knowledge Operating System
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif text-foreground"
          >
            Become 1% Smarter <br />
            <span className="italic font-normal font-serif text-muted-foreground">Every Single Day.</span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-md"
        >
          Replace noise and distraction with a curated 5-minute morning routine. 
          Learn one new word, track your daily health goals, review inshorts-style news, and test your knowledge.
        </motion.p>

        {/* Feature Grid Mockup (Editorial) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full grid grid-cols-3 gap-4 border-t border-b border-border/80 py-6 my-2 text-left"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" /> 1. Absorb
            </span>
            <span className="text-[11px] text-muted-foreground">New daily vocabulary & core concepts.</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" /> 2. Form
            </span>
            <span className="text-[11px] text-muted-foreground">Healthy daily habits & goal streaks.</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1">
              <Compass className="h-3.5 w-3.5" /> 3. Test
            </span>
            <span className="text-[11px] text-muted-foreground">Mental math challenges & daily quizzes.</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col gap-3 items-center w-full"
        >
          <Link
            href="/dashboard"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto sm:px-8 py-3.5 text-sm font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-98 transition-all shadow-md"
          >
            Enter Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-yellow-600 dark:text-yellow-400" /> Start your 5-day learning streak today
          </span>
        </motion.div>

      </div>
    </div>
  );
}
