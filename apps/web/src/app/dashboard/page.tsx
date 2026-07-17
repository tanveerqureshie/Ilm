"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sun, 
  Moon, 
  Volume2, 
  Bookmark, 
  BookmarkCheck,
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  FileText,
  Sparkles,
  Droplet,
  Footprints,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VOCAB_DATABASE = [
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfemərəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time; transient.",
    hindiTranslation: "अल्पकालिक (Alpakalik)",
    example: "The beauty of autumn colors is ephemeral, lasting only a few weeks.",
    synonyms: ["transitory", "fleeting", "short-lived"]
  },
  {
    word: "Eloquence",
    pronunciation: "/ˈeləkwəns/",
    partOfSpeech: "noun",
    definition: "Fluent or persuasive speaking or writing.",
    hindiTranslation: "वाग्मिता (Vagmita)",
    example: "The senator spoke with such eloquence that many in the audience were moved to tears.",
    synonyms: ["fluency", "expressiveness", "rhetoric"]
  },
  {
    word: "Pragmatic",
    pronunciation: "/præɡˈmætɪk/",
    partOfSpeech: "adjective",
    definition: "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
    hindiTranslation: "व्यावहारिक (Vyavaharik)",
    example: "She took a pragmatic approach to managing the project budget.",
    synonyms: ["practical", "realistic", "sensible"]
  },
  {
    word: "Cognitive",
    pronunciation: "/ˈkɒɡnɪtɪv/",
    partOfSpeech: "adjective",
    definition: "Relating to the mental action or process of acquiring knowledge and understanding through thought, experience, and the senses.",
    hindiTranslation: "संज्ञानात्मक (Sangyanatmak)",
    example: "Cognitive development is rapid during the first few years of a child's life.",
    synonyms: ["mental", "intellectual", "rational"]
  },
  {
    word: "Superfluous",
    pronunciation: "/suːˈpɜːfluəs/",
    partOfSpeech: "adjective",
    definition: "Unnecessary, especially through being more than enough.",
    hindiTranslation: "अनावश्यक (Anavashyak)",
    example: "Avoid using superfluous words in your academic essays.",
    synonyms: ["redundant", "excessive", "surplus"]
  },
  {
    word: "Ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere.",
    hindiTranslation: "सर्वव्यापी (Sarvavyapi)",
    example: "Mobile phones have become ubiquitous in modern society.",
    synonyms: ["omnipresent", "pervasive", "universal"]
  },
  {
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    partOfSpeech: "adjective",
    definition: "Able to withstand or recover quickly from difficult conditions.",
    hindiTranslation: "लचीला (Lacheela)",
    example: "The local economy proved resilient despite the global recession.",
    synonyms: ["durable", "tough", "hardy"]
  }
];

const MOTIVATIONAL_QUOTES = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Small daily improvements over time lead to stunning results.",
  "Consistency is the hallmark of progress. Start small, stay focused.",
  "Your mind is a muscle. Give it something rich to digest every day.",
  "Focus on the process, not just the outcome. Level up bit by bit."
];

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Daily goals states
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0.0);
  const [readBook, setReadBook] = useState(false);

  // XP, Levels & Streak
  const [xp, setXp] = useState(350);
  const [level, setLevel] = useState(1);
  const [streakDays, setStreakDays] = useState(3);

  // Scratchpad
  const [notepad, setNotepad] = useState("");

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Task list by Calendar Day
  const today = new Date();
  const [activeDay, setActiveDay] = useState<number>(today.getDate());
  const [taskInput, setTaskInput] = useState("");
  const [tasksByDay, setTasksByDay] = useState<Record<number, Task[]>>({});

  // Weather States
  const [weatherLocation, setWeatherLocation] = useState("Bengaluru");
  const [weatherTemp, setWeatherTemp] = useState(28);
  const [weatherCondition, setWeatherCondition] = useState("Partly Cloudy");
  const [isEditingWeather, setIsEditingWeather] = useState(false);
  const [weatherInput, setWeatherInput] = useState("");

  // Learning Track Preference
  const [userPreference, setUserPreference] = useState("technology");

  // Get index of the day to rotationally serve content
  const getDayOfYear = () => {
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayIndex = getDayOfYear();
  const vocab = VOCAB_DATABASE[dayIndex % VOCAB_DATABASE.length];
  const quote = MOTIVATIONAL_QUOTES[dayIndex % MOTIVATIONAL_QUOTES.length];

  // Calendar structure
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i);
    return {
      dayName: d.toLocaleDateString("en-US", { weekday: "narrow" }),
      dayNumber: d.getDate(),
      isToday: d.getDate() === today.getDate()
    };
  });

  // Fetch weather for a given city dynamically
  const fetchWeatherForCity = async (city: string) => {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error("City lookup failed");
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) throw new Error("City not found");
      
      const { latitude, longitude, name: officialName } = geoData.results[0];
      
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      if (!weatherRes.ok) throw new Error("Weather request failed");
      const weatherData = await weatherRes.json();
      
      const temp = Math.round(weatherData.current_weather.temperature);
      const code = weatherData.current_weather.weathercode;
      
      let cond = "Clear";
      if (code >= 1 && code <= 3) cond = "Partly Cloudy";
      else if (code >= 45 && code <= 48) cond = "Foggy";
      else if (code >= 51 && code <= 67) cond = "Rainy";
      else if (code >= 71 && code <= 77) cond = "Snowy";
      else if (code >= 80 && code <= 82) cond = "Rain Showers";
      else if (code >= 95 && code <= 99) cond = "Thunderstorm";
      
      setWeatherLocation(officialName);
      setWeatherTemp(temp);
      setWeatherCondition(cond);
      
      localStorage.setItem("ilm_v2_weather_location", officialName);
      localStorage.setItem("ilm_v2_weather_temp", temp.toString());
      localStorage.setItem("ilm_v2_weather_condition", cond);
    } catch (err) {
      console.error("Failed to fetch live weather, using fallback:", err);
      setWeatherLocation(city);
      setWeatherTemp(24);
      setWeatherCondition("Cloudy");
    }
  };

  // Load preferences
  useEffect(() => {
    // Theme
    const isDark = document.documentElement.classList.contains("dark") || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Local Storage Hydration
    setSteps(parseInt(localStorage.getItem("ilm_v2_steps") || "400"));
    setWater(parseFloat(localStorage.getItem("ilm_v2_water") || "1.5"));
    setReadBook(localStorage.getItem("ilm_v2_read") === "true");
    setXp(parseInt(localStorage.getItem("ilm_v2_xp") || "350"));
    setLevel(parseInt(localStorage.getItem("ilm_v2_level") || "1"));
    setStreakDays(parseInt(localStorage.getItem("ilm_v2_streak") || "3"));
    setNotepad(localStorage.getItem("ilm_v2_notepad") || "");
    
    // Bookmarks
    const savedBookmarks = JSON.parse(localStorage.getItem("ilm_v2_bookmarks") || "[]");
    setBookmarks(savedBookmarks);

    // Weather Hydration
    const savedLoc = localStorage.getItem("ilm_v2_weather_location") || "Bengaluru";
    const savedTemp = localStorage.getItem("ilm_v2_weather_temp");
    const savedCond = localStorage.getItem("ilm_v2_weather_condition");
    if (savedLoc) setWeatherLocation(savedLoc);
    if (savedTemp) setWeatherTemp(parseInt(savedTemp));
    if (savedCond) setWeatherCondition(savedCond);

    // Fetch updated live weather
    fetchWeatherForCity(savedLoc);

    // Learning Track Preference
    const savedPref = localStorage.getItem("ilm_v2_user_preference") || "technology";
    setUserPreference(savedPref);

    // Tasks map
    const savedTasks = JSON.parse(localStorage.getItem("ilm_v2_tasks") || "{}");
    const todayNum = today.getDate();
    if (!savedTasks[todayNum]) {
      savedTasks[todayNum] = [
        { id: "t-init-1", text: "Read 10 pages of my book", completed: false },
        { id: "t-init-2", text: "Complete daily speed maths", completed: false }
      ];
    }
    setTasksByDay(savedTasks);
  }, []);

  // Theme switch
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const saveTasks = (updated: Record<number, Task[]>) => {
    setTasksByDay(updated);
    localStorage.setItem("ilm_v2_tasks", JSON.stringify(updated));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: "task-" + Date.now(),
      text: taskInput.trim(),
      completed: false
    };

    const currentDayTasks = tasksByDay[activeDay] || [];
    const updated = {
      ...tasksByDay,
      [activeDay]: [...currentDayTasks, newTask]
    };
    saveTasks(updated);
    setTaskInput("");
    gainXp(40);
  };

  const handleAdjustSteps = (amount: number) => {
    setSteps(prev => {
      const nextVal = Math.max(0, prev + amount);
      localStorage.setItem("ilm_v2_steps", nextVal.toString());
      if (nextVal >= 1000 && prev < 1000) {
        gainXp(100);
      }
      return nextVal;
    });
  };

  const handleAdjustWater = (amount: number) => {
    setWater(prev => {
      const nextVal = Math.max(0, Math.round((prev + amount) * 10) / 10);
      localStorage.setItem("ilm_v2_water", nextVal.toString());
      if (nextVal >= 5.0 && prev < 5.0) {
        gainXp(100);
      }
      return nextVal;
    });
  };

  const handleToggleRead = () => {
    setReadBook(prev => {
      const nextVal = !prev;
      localStorage.setItem("ilm_v2_read", nextVal.toString());
      if (nextVal) gainXp(100);
      return nextVal;
    });
  };

  const handleNotepadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotepad(e.target.value);
    localStorage.setItem("ilm_v2_notepad", e.target.value);
  };

  const toggleBookmarkWord = (word: string) => {
    let updated: string[];
    if (bookmarks.includes(word)) {
      updated = bookmarks.filter(w => w !== word);
    } else {
      updated = [...bookmarks, word];
      gainXp(30);
    }
    setBookmarks(updated);
    localStorage.setItem("ilm_v2_bookmarks", JSON.stringify(updated));
  };

  const handleToggleTask = (taskId: string) => {
    const currentDayTasks = tasksByDay[activeDay] || [];
    const updatedTasks = currentDayTasks.map(t => {
      if (t.id === taskId) {
        const completed = !t.completed;
        if (completed) gainXp(75);
        return { ...t, completed };
      }
      return t;
    });

    const updated = {
      ...tasksByDay,
      [activeDay]: updatedTasks
    };
    saveTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const currentDayTasks = tasksByDay[activeDay] || [];
    const updated = {
      ...tasksByDay,
      [activeDay]: currentDayTasks.filter(t => t.id !== taskId)
    };
    saveTasks(updated);
  };

  const speakWord = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const gainXp = (amount: number) => {
    setXp(prev => {
      let val = prev + amount;
      let newLevel = level;
      if (val >= 1000) {
        val -= 1000;
        newLevel += 1;
        setLevel(newLevel);
        localStorage.setItem("ilm_v2_level", newLevel.toString());
      }
      localStorage.setItem("ilm_v2_xp", val.toString());
      return val;
    });
  };

  const handleSelectPreference = (pref: string) => {
    setUserPreference(pref);
    localStorage.setItem("ilm_v2_user_preference", pref);
    gainXp(30); // Micro reward for updating target
  };

  const isBookmarked = bookmarks.includes(vocab.word);
  const activeDayTasks = tasksByDay[activeDay] || [];
  const completedGoalsCount = (steps >= 1000 ? 1 : 0) + (water >= 5.0 ? 1 : 0) + (readBook ? 1 : 0);

  return (
    <div className="flex-1 min-h-screen flex flex-col pb-36 bg-background text-foreground transition-all duration-300 font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-extrabold tracking-tight">Ilm.</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>

            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Animated Greeting Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1.5 border-b border-border/60 pb-6"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
              Good evening, Tanveer
            </h1>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              LVL {level} · {xp}/1000 XP
            </span>
          </div>
          <p className="text-xs font-medium text-muted-foreground max-w-lg italic">
            &ldquo;{quote}&rdquo;
          </p>
        </motion.section>

        {/* Dashboard Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* COLUMN 1 & 2: Main checklist & calendars */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Calendar & Day-Specific Tasks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
                <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Interactive Task Calendar
                </h2>
                <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-secondary">
                  Active Day: {activeDay}
                </span>
              </div>

              {/* Weekly calendar strips */}
              <div className="grid grid-cols-7 gap-1 text-center mb-6">
                {calendarDays.map((day, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveDay(day.dayNumber)}
                    className={`flex flex-col gap-1 items-center py-2 rounded-lg border transition-all ${
                      activeDay === day.dayNumber
                        ? "bg-primary border-primary text-primary-foreground shadow"
                        : "border-transparent hover:bg-secondary text-foreground"
                    }`}
                  >
                    <span className={`text-[9px] font-bold uppercase ${activeDay === day.dayNumber ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {day.dayName}
                    </span>
                    <span className="text-xs font-extrabold">
                      {day.dayNumber}
                    </span>
                    {day.isToday && activeDay !== day.dayNumber && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />
                    )}
                  </button>
                ))}
              </div>

              {/* Day-Specific Tasks checklist */}
              <div className="flex flex-col gap-4">
                <form onSubmit={handleAddTask} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Add task for day {activeDay}...`}
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className="flex-1 px-3.5 py-1.5 rounded-lg border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </form>

                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                  <AnimatePresence>
                    {activeDayTasks.length > 0 ? (
                      activeDayTasks.map((t) => (
                        <motion.div
                          key={t.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center justify-between p-2.5 rounded border border-border/60 hover:bg-secondary/20 transition-all"
                        >
                          <button
                            onClick={() => handleToggleTask(t.id)}
                            className="flex items-center gap-2.5 text-left text-xs font-semibold flex-1 cursor-pointer select-none text-foreground"
                          >
                            {t.completed ? (
                              <CheckSquare className="h-4.5 w-4.5 text-primary shrink-0" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-muted shrink-0" />
                            )}
                            <span className={t.completed ? "line-through text-muted-foreground" : "text-foreground"}>
                              {t.text}
                            </span>
                          </button>

                          <button
                            onClick={() => handleDeleteTask(t.id)}
                            className="p-1 rounded text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </motion.div>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground py-4 text-center">
                        No tasks registered for day {activeDay}. Add some above!
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Health targets */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
                <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1">
                  Essential Health Targets
                </h2>
                <span className="text-xs font-mono font-bold text-muted-foreground">{completedGoalsCount}/3 Done</span>
              </div>

              <div className="flex flex-col gap-6">
                {/* Steps tracker */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Footprints className="h-4 w-4" /> Steps Goal (1,000 steps)
                    </span>
                    <span className="text-xs font-bold font-mono">{steps} / 1000</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(steps / 1000) * 100}%` }} />
                  </div>
                  <div className="flex justify-end gap-1.5 mt-0.5">
                    <button onClick={() => handleAdjustSteps(-100)} className="px-2 py-0.5 border border-border text-[10px] font-bold rounded hover:bg-secondary">-100</button>
                    <button onClick={() => handleAdjustSteps(100)} className="px-2 py-0.5 border border-border text-[10px] font-bold rounded hover:bg-secondary">+100</button>
                  </div>
                </div>

                {/* Hydration tracker */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Droplet className="h-4 w-4 text-blue-500" /> Daily Hydration (5L)
                    </span>
                    <span className="text-xs font-bold font-mono">{water}L / 5L</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 10 }, (_, i) => {
                      const limit = (i + 1) * 0.5;
                      const isFilled = water >= limit;
                      return (
                        <div key={i} className={`flex-1 h-4 rounded border transition-all ${isFilled ? "bg-primary border-primary" : "bg-transparent border-border"}`} />
                      );
                    })}
                  </div>
                  <div className="flex justify-end gap-1.5 mt-0.5">
                    <button onClick={() => handleAdjustWater(-0.5)} className="px-2 py-0.5 border border-border text-[10px] font-bold rounded hover:bg-secondary">-0.5L</button>
                    <button onClick={() => handleAdjustWater(0.5)} className="px-2 py-0.5 border border-border text-[10px] font-bold rounded hover:bg-secondary">+0.5L</button>
                  </div>
                </div>

                {/* Reading checklist */}
                <div 
                  onClick={handleToggleRead}
                  className="flex items-center justify-between p-3 border border-border hover:bg-secondary/40 rounded-lg cursor-pointer transition-all"
                >
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> Reading Habit (20 mins book)
                  </span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${readBook ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
                    {readBook && <span className="text-[9px] font-bold">✓</span>}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Track Preference Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Learning Track Preference
              </h2>
              <p className="text-[11px] font-semibold text-muted-foreground mb-4">
                Choose your focus to customize the news deck and knowledge hub concepts.
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { id: "upsc", label: "Civil Services (UPSC)" },
                  { id: "engineering", label: "Engineering & Dev" },
                  { id: "medical", label: "Medical & Science" },
                  { id: "technology", label: "Future Technology" }
                ].map((track) => (
                  <button
                    key={track.id}
                    onClick={() => handleSelectPreference(track.id)}
                    className={`py-2 px-3 rounded-lg border text-left text-xs font-bold transition-all ${
                      userPreference === track.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-muted-foreground border-border/80 hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>

              {/* Show user based suggestion text */}
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/60 text-xs font-semibold text-foreground">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  💡 Track Suggestion
                </span>
                {userPreference === "upsc" && (
                  <p>Check the News Tab for civil services reforms, and the Hub for constitutional amendments.</p>
                )}
                {userPreference === "engineering" && (
                  <p>Study spaced repetition coding concepts and system engineering guidelines in the Hub.</p>
                )}
                {userPreference === "medical" && (
                  <p>Read about CRISPR genome engineering trials and synaptic sleep research on the News deck.</p>
                )}
                {userPreference === "technology" && (
                  <p>Dive into quantum superposition physics and advanced neural networks inside your Hub today.</p>
                )}
              </div>
            </motion.div>

          </div>

          {/* COLUMN 3: Vocab with audio & bookmarks/scratchpad */}
          <div className="flex flex-col gap-6">
            
            {/* Daily Vocab with audio speech */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Daily Vocabulary
                </span>
                
                <button
                  onClick={() => toggleBookmarkWord(vocab.word)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Bookmark word"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
                  ) : (
                    <Bookmark className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-2xl font-bold font-serif tracking-tight">{vocab.word}</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">{vocab.pronunciation}</span>
                </div>
                <button
                  onClick={() => speakWord(vocab.word)}
                  className="p-1.5 rounded-full border border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  title="Pronounce word"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[10px] font-semibold text-muted-foreground italic mb-3">
                {vocab.partOfSpeech} · {vocab.hindiTranslation}
              </p>
              <p className="text-xs leading-relaxed mb-4 text-foreground/90 font-medium">
                {vocab.definition}
              </p>

              <div className="pt-3 border-t border-border/60">
                <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                  &ldquo;{vocab.example}&rdquo;
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {vocab.synonyms.map((s, idx) => (
                    <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded bg-secondary border border-border/40">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Scratchpad */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 mb-3">
                <FileText className="h-3.5 w-3.5" /> Daily Scratchpad
              </h2>
              <textarea
                placeholder="Jot down notes or things you learned today..."
                value={notepad}
                onChange={handleNotepadChange}
                rows={4}
                className="w-full p-2.5 text-xs rounded border border-border/70 bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-medium"
              />
            </motion.div>

            {/* Bookmarks Manager */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 mb-3">
                <BookmarkCheck className="h-3.5 w-3.5" /> Bookmarked Words ({bookmarks.length})
              </h2>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {bookmarks.length > 0 ? (
                  bookmarks.map((b) => (
                    <button
                      key={b}
                      onClick={() => speakWord(b)}
                      className="text-[9px] font-extrabold px-2.5 py-1 rounded bg-secondary hover:bg-primary hover:text-primary-foreground border border-border/60 flex items-center gap-1"
                    >
                      <Volume2 className="h-2.5 w-2.5" /> {b}
                    </button>
                  ))
                ) : (
                  <span className="text-[10px] text-muted-foreground italic py-1">Saved vocabulary words appear here.</span>
                )}
              </div>
            </motion.div>

            {/* Weather Block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-4 shadow-sm text-xs font-medium"
            >
              {isEditingWeather ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (weatherInput.trim()) {
                      fetchWeatherForCity(weatherInput.trim());
                    }
                    setIsEditingWeather(false);
                  }}
                  className="flex gap-2 w-full items-center"
                >
                  <input
                    type="text"
                    placeholder="Enter city name..."
                    value={weatherInput}
                    onChange={(e) => setWeatherInput(e.target.value)}
                    className="flex-1 bg-background border border-border rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button type="submit" className="px-3 py-1 bg-primary text-primary-foreground font-bold rounded text-[10px] uppercase">
                    Save
                  </button>
                  <button type="button" onClick={() => setIsEditingWeather(false)} className="text-[10px] font-bold text-muted-foreground uppercase">
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-muted-foreground uppercase block text-[9px] font-bold">Local Weather</span>
                    <span className="text-foreground font-bold mt-1 block">{weatherTemp}°C · {weatherCondition}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setWeatherInput(weatherLocation);
                      setIsEditingWeather(true);
                    }}
                    className="text-right hover:text-primary transition-colors"
                  >
                    <span className="text-muted-foreground text-[10px] font-bold block">{weatherLocation}</span>
                    <span className="text-[8px] text-primary font-bold uppercase tracking-wider underline">Change Location</span>
                  </button>
                </div>
              )}
            </motion.div>

          </div>

        </div>
      </main>

    </div>
  );
}
