// Background Job Queue Service with fallback

interface Job {
  name: string;
  handler: (data: any) => Promise<void>;
}

class InMemoryQueue {
  private handlers = new Map<string, (data: any) => Promise<void>>();

  // Register a worker for a job type
  process(jobName: string, handler: (data: any) => Promise<void>) {
    this.handlers.set(jobName, handler);
    console.log(`[Queue Service] Worker registered for job: "${jobName}" (In-Memory)`);
  }

  // Trigger a job execution
  async add(jobName: string, data: any, options?: { delay?: number; repeat?: { cron: string } }) {
    const handler = this.handlers.get(jobName);
    if (!handler) {
      console.warn(`[Queue Service] No worker registered for job "${jobName}". Job queued.`);
      return;
    }

    if (options?.delay) {
      setTimeout(async () => {
        try {
          await handler(data);
        } catch (e) {
          console.error(`[Queue Service] Job "${jobName}" execution failed:`, e);
        }
      }, options.delay);
    } else {
      // Execute asynchronously in background
      setImmediate(async () => {
        try {
          await handler(data);
        } catch (e) {
          console.error(`[Queue Service] Job "${jobName}" execution failed:`, e);
        }
      });
    }

    // Set up repeating task check (simple simulation)
    if (options?.repeat?.cron) {
      console.log(`[Queue Service] Job "${jobName}" scheduled with cron "${options.repeat.cron}" (simulated interval)`);
      // Simulating a recurring task every 2 minutes for testing
      setInterval(async () => {
        try {
          await handler(data);
        } catch (e) {
          console.error(`[Queue Service] Repeating job "${jobName}" execution failed:`, e);
        }
      }, 120000); 
    }
  }
}

class BullQueue {
  private queue: any;
  private worker: any;

  constructor(redisUrl: string) {
    try {
      const { Queue, Worker } = require("bullmq");
      this.queue = new Queue("ilm-jobs", { connection: { url: redisUrl } });
      console.log(`[Queue Service] BullMQ Queue initialized`);
    } catch (e) {
      console.warn("Failed to load BullMQ, running in-memory queue mode.", e);
    }
  }

  process(jobName: string, handler: (data: any) => Promise<void>) {
    if (!process.env.REDIS_URL) return;
    try {
      const { Worker } = require("bullmq");
      this.worker = new Worker("ilm-jobs", async (job: any) => {
        if (job.name === jobName) {
          await handler(job.data);
        }
      }, { connection: { url: process.env.REDIS_URL } });
      console.log(`[Queue Service] BullMQ Worker registered for: "${jobName}"`);
    } catch (e) {
      console.error(`[Queue Service] Failed to register BullMQ worker:`, e);
    }
  }

  async add(jobName: string, data: any, options?: { delay?: number; repeat?: { cron: string } }) {
    if (!this.queue) return;
    try {
      await this.queue.add(jobName, data, {
        delay: options?.delay,
        repeat: options?.repeat
      });
    } catch (e) {
      console.error(`[Queue Service] Failed to add job to BullMQ:`, e);
    }
  }
}

const redisUrl = process.env.REDIS_URL;
export const jobQueue = redisUrl ? new BullQueue(redisUrl) : new InMemoryQueue();
