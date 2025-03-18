import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the start time of the request
  const startTime = Date.now();

  // Log when the request starts
  const requestLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip,
    userAgent: req.get("user-agent"),
    body: req.method !== "GET" ? req.body : undefined,
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
    params: Object.keys(req.params).length > 0 ? req.params : undefined,
  };

  logger.info("Incoming request", requestLog);

  // Log when the request completes
  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    const log = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl || req.url
    } - ${res.statusCode} - ${responseTime}ms - ${req.ip} - ${
      req.get("user-agent") || "no-user-agent"
    }`;

    if (res.statusCode >= 400) {
      logger.error(log);
    } else {
      logger.info(log);
    }
  });

  next();
};
