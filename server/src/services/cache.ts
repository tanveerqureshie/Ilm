// Cache service with Redis fallback to in-memory cache

interface ICache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
}

class InMemoryCache implements ICache {
  private store = new Map<string, { value: string; expiresAt: number | null }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    
    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.store.set(key, { value, expiresAt });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

class RedisCache implements ICache {
  private client: any;

  constructor(redisUrl: string) {
    try {
      // Lazy load ioredis if it exists to avoid crash if dependency is missing
      const Redis = require("ioredis");
      this.client = new Redis(redisUrl);
      this.client.on("error", (err: any) => {
        console.warn("Redis client connection error:", err.message);
      });
    } catch (e) {
      console.warn("Failed to load ioredis, running in-memory cache mode.", e);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    try {
      return await this.client.get(key);
    } catch (e) {
      console.error("Redis get failed:", e);
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client) return;
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, "EX", ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (e) {
      console.error("Redis set failed:", e);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.del(key);
    } catch (e) {
      console.error("Redis del failed:", e);
    }
  }
}

// Instantiate cache depending on env
const redisUrl = process.env.REDIS_URL;
export const cache: ICache = redisUrl ? new RedisCache(redisUrl) : new InMemoryCache();

console.log(`[Cache Service] Initialized using ${redisUrl ? "Redis" : "In-Memory Fallback"}`);
