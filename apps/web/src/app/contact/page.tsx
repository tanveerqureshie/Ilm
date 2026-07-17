"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    // Simulate form submission
    setIsSubmitted(true);
    setEmail("");
    setMessage("");

    // Reset success banner after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

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

      {/* Main Content */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col gap-6 justify-center">
        
        {/* Title */}
        <section className="flex flex-col gap-1.5 text-center sm:text-left border-b border-border pb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1 justify-center sm:justify-start">
            <Sparkles className="h-3 w-3" /> Connect With Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
            Have feature suggestions, feedback, or custom inquiries? Send us a message.
          </p>
        </section>

        {/* Contact Form Card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Write your feedback or thoughts..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Send Message
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="submit-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 flex flex-col items-center text-center gap-4"
              >
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="text-base font-bold">Feedback Submitted!</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Thank you for reaching out. We will review your message shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
