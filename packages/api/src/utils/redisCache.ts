import Redis, { RedisOptions } from "ioredis";
import logger from "./logger";

export const redisConfig: RedisOptions = {
  host: process.env.REDIS_HOST ?? "127.0.0.1",
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD,
  ...(process.env.NODE_ENV === "local"
    ? {}
    : { tls: { rejectUnauthorized: false } }),
};

let redis: Redis | null = null;

const connectRedis = () => {
  if (redis) return redis;

  redis = new Redis(redisConfig);

  logger.info("Connected to Redis");
};

export const RedisService = {
  connectRedis,
};
