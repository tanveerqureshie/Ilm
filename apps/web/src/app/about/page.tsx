"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex-1 min-h-screen flex flex-col bg-background text-foreground transition-all duration-300 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background/90">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <span className="font-serif text-lg font-extrabold tracking-tight">Ilm.</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col gap-8 justify-center">
        
        {/* Title */}
        <section className="flex flex-col gap-2 text-center sm:text-left border-b border-border pb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1 justify-center sm:justify-start">
            <Sparkles className="h-3 w-3" /> Core Ideology
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            About the Platform
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1 font-medium">
            Ilm (علم) translates to &ldquo;Knowledge&rdquo;. We believe learning shouldn't be an chore, but a daily ritual.
          </p>
        </section>

        {/* Vision Pillars */}
        <section className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> 5 Minutes a Day
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-semibold">
              The modern attention span is short, but curiosity is infinite. Ilm delivers bite-sized insights (daily words, global news summaries, logic quizzes) to keep your intellectual gear wheels spinning.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
              <Compass className="h-4 w-4" /> Distraction-Free Space
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-semibold">
              No clickbait ads, no endless algorithms, and no notification overload. Just clean editorial layouts and interactive knowledge games wrapped in our Creamy White and Obsidian Black aesthetic.
            </p>
          </div>
        </section>

        {/* Footer info inside Card */}
        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-xs font-bold flex items-center justify-center gap-1 text-muted-foreground">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for lifelong learners.
          </p>
        </div>

      </main>
    </div>
  );
}
