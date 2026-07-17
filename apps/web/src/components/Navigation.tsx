"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Code2, Compass } from "lucide-react";
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
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/news", label: "Scroll Ilm", icon: Newspaper },
    { href: "/coding", label: "Coding Hub", icon: Code2 },
    { href: "/hub", label: "Knowledge Hub", icon: Compass }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <nav className="flex items-center justify-around py-2.5 px-3 bg-card/85 border border-border backdrop-blur-md rounded-full shadow-lg shadow-black/[0.04] dark:shadow-white/[0.02]">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors focus:outline-none ${
                isActive 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-tab"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                />
              )}
              <Icon className="h-4.5 w-4.5" />
              <span className="text-[9px] tracking-tight">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
