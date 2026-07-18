"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Network, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  // Automatic day-shift detection & reload
  useEffect(() => {
    const loadedDate = new Date().getDate();
    const interval = setInterval(() => {
      const currentDate = new Date().getDate();
      if (currentDate !== loadedDate) {
        window.location.reload();
      }
    }, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Hide navigation on the Welcome landing page
  if (pathname === "/") return null;

  const links = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/graph", label: "Graph", icon: Network },
    { href: "/profile", label: "Profile", icon: User }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg">
      <nav className="flex items-center justify-around py-2 px-3 bg-card/85 border border-border backdrop-blur-md rounded-full shadow-lg shadow-black/[0.04] dark:shadow-white/[0.02]">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex flex-col items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none ${
                isActive 
                  ? "text-primary-foreground font-semibold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-tab"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm shadow-primary/20"
                />
              )}
              <Icon className="h-4.5 w-4.5" />
              <span className="text-[10px] tracking-tight">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
