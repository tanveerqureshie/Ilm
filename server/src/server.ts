import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { prisma } from "./services/db.js";
import { cache } from "./services/cache.js";
import { jobQueue } from "./services/queue.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database Seeding Logic (on startup if empty)
async function seedDatabaseIfEmpty() {
  try {
    const wordCount = await prisma.dailyWord.count();
    if (wordCount === 0) {
      console.log("[Server Init] Seeding default vocabulary...");
      await prisma.dailyWord.createMany({
        data: [
          {
            word: "Ephemeral",
            pronunciation: "/ɪˈfemərəl/",
            partOfSpeech: "adjective",
            definition: "Lasting for a very short time; transient.",
            hindiTranslation: "अल्पकालिक (Alpakalik)",
            example: "The beauty of autumn colors is ephemeral, lasting only a few weeks.",
            synonyms: "transitory, fleeting, short-lived",
            origin: "From Greek ephēmeros, meaning 'lasting only a day'.",
            difficulty: "medium"
          },
          {
            word: "Resilient",
            pronunciation: "/rɪˈzɪliənt/",
            partOfSpeech: "adjective",
            definition: "Able to withstand or recover quickly from difficult conditions.",
            hindiTranslation: "लचीला (Lacheela)",
            example: "The community was resilient in the face of disaster.",
            synonyms: "strong, tough, flexible",
            origin: "From Latin resilire, meaning 'to rebound or recoil'.",
            difficulty: "easy"
          }
        ]
      });
    }

    const factCount = await prisma.dailyFact.count();
    if (factCount === 0) {
      console.log("[Server Init] Seeding default facts...");
      await prisma.dailyFact.createMany({
        data: [
          {
            content: "The term 'computer bug' originated when Grace Hopper found a literal moth trapped in a relay of the Harvard Mark II computer in 1947.",
            category: "Technology",
            source: "Smithsonian Institution"
          },
          {
            content: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
            category: "History",
            source: "National Geographic"
          }
        ]
      });
    }

    const newsCount = await prisma.newsArticle.count();
    if (newsCount === 0) {
      console.log("[Server Init] Seeding default news articles...");
      await prisma.newsArticle.createMany({
        data: [
          {
            title: "OpenAI Announces Advanced Voice for Web Platforms",
            summary: "The feature allows natural-language conversations directly through browser interfaces with sub-100ms latency, enabling real-time translations and interactive learning aids.",
            source: "TechCrunch",
            readTime: "2 min read",
            tag: "AI"
          },
          {
            title: "India Sets New Renewable Energy Record in Q2",
            summary: "Solar and wind installations reached an all-time high, contributing to over 43% of the national energy grid capacity as of July 2026.",
            source: "Economic Times",
            readTime: "3 min read",
            tag: "India"
          }
        ]
      });
    }
  } catch (e) {
    console.error("[Server Init] Database seeding check failed:", e);
  }
}

// Register Ingestion Queue Worker
jobQueue.process("news-ingestion", async (data: any) => {
  console.log("[Worker] Running scheduled news ingestion task...", data);
  // Perform mock ingestion logic
  await cache.set("last-ingestion-timestamp", new Date().toISOString());
});

// Seed DB and Schedule Cron
seedDatabaseIfEmpty().then(() => {
  // Add repeating news ingestion job (simulated runs every 2 mins)
  jobQueue.add("news-ingestion", { type: "auto-refresh" }, { repeat: { cron: "*/2 * * * *" } });
});

// API Routes
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      database: "connected",
      cache: process.env.REDIS_URL ? "redis" : "in-memory-fallback",
      queue: process.env.REDIS_URL ? "bullmq" : "in-memory-fallback"
    }
  });
});

app.get("/api/dashboard", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Fetch Daily Word (pick random or first one)
    const words = await prisma.dailyWord.findMany();
    const dailyWord = words[0] || null;

    // 2. Fetch Daily Fact
    const facts = await prisma.dailyFact.findMany();
    const dailyFact = facts[0] || null;

    // 3. Fetch News Articles
    const newsArticles = await prisma.newsArticle.findMany({ take: 3 });

    // 4. Mock Weather
    const weather = {
      temp: 28,
      condition: "Partly Cloudy",
      location: "Bengaluru",
      aqi: 42,
      sunset: "6:48 PM"
    };

    res.json({
      dailyWord,
      dailyFact,
      newsArticles,
      weather
    });
  } catch (e) {
    next(e);
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("[Express Error Handler]", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Express Server] Server running on http://localhost:${PORT}`);
});
