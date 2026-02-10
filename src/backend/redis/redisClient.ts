import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL // ✅ Use full connection string
});

redis.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

redis.on("connect", () => {
  console.log("🔄 Connecting to Redis...");
});

redis.on("ready", () => {
  console.log("✅ Redis connection ready");
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export { redis };

