"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Network, User, Calendar, LogOut, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>("Tanveer Qureshie");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem("ilm_username");
    if (savedName) setUsername(savedName);

    // Initial theme check
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");

    // Sync theme shifts
    const handleThemeSync = () => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDarkNow);
    };

    window.addEventListener("theme-change", handleThemeSync);
    return () => window.removeEventListener("theme-change", handleThemeSync);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  // Hide sidebar on the Welcome landing page
  if (pathname === "/") return null;

  const links = [
    { href: "/dashboard", label: "Home Feed", icon: Home },
    { href: "/explore", label: "Explore Stories", icon: Compass },
    { href: "/graph", label: "Knowledge Graph", icon: Network },
    { href: "/profile", label: "Profile & Settings", icon: User }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] h-screen bg-card/40 border-r border-border/30 backdrop-blur-xl p-6 select-none z-30 sticky top-0">
      
      {/* Brand Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary/20">
          إ
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight font-serif text-foreground">Ilm</h1>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">Intelligence OS</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-2.5">
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 px-3 block mb-4">Workspace Menu</span>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-medium transition-all group ${
                isActive 
                  ? "text-primary-foreground font-semibold" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/35"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-sidebar-tab"
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="absolute inset-0 bg-primary rounded-2xl -z-10 shadow-sm shadow-primary/15"
                />
              )}
              <Icon className={`h-4.5 w-4.5 transition-transform ${isActive ? "text-white" : "group-hover:scale-105 text-muted-foreground/80 group-hover:text-primary"}`} />
              <span className="tracking-wide text-[11px]">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Box */}
      <div className="border-t border-border/20 pt-6 mt-auto">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-xl bg-secondary border border-border/20 flex items-center justify-center text-primary font-bold text-sm uppercase font-serif">
            {username.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <span className="text-[10px] text-muted-foreground block uppercase font-mono tracking-wider">Session Profile</span>
            <span className="text-xs font-bold text-foreground font-serif block truncate">{username}</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-secondary/40 border border-transparent transition-all"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            href="/"
            className="p-2 rounded-xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 transition-all"
            title="Log Out / Reset Name"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>

    </aside>
  );
}
