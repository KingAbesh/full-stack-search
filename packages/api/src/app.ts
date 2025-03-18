import express from "express";
import "dotenv-flow/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { HttpStatusCode } from "./enums/httpStatusCode";
import logger from "./utils/logger";
import { ResponseUtils } from "./utils/response";
import { MongoDBConnection } from "./datastores/monogdb/connection";
import { errorHandler } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/request-logger.middleware";
import { seedDatabase } from "./datastores/monogdb/seeds";
import routes from "./routes";

const app: express.Express = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours in seconds
};

// Initialize MongoDB connection
const mongodb = MongoDBConnection.getInstance();
mongodb
  .connect()
  .then(async () => {
    logger.info("MongoDB connected successfully");
    // Seed the database
    await seedDatabase();
    logger.info("Database seeding completed");
  })
  .catch((error: Error) => {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Add request logging middleware:w
app.use(requestLogger);

// Health check endpoint
app.get("/ping", (req, res) => {
  const mongodb = MongoDBConnection.getInstance();

  logger.info("MongoDB connection status:", mongodb.isConnectedToDatabase());

  ResponseUtils.success({
    response: res,
    request: req,
    message: "pong",
    data: {
      app: "accommodation-api",
      version: "1.0.0",
    },
  });
});

// API routes
app.use("/api", routes);

// 404 handler
app.use("*", (_: express.Request, res: express.Response) => {
  res.status(HttpStatusCode.NotFound).json({ message: "Not found" });
});

// Add error handler middleware
app.use(errorHandler);

process.on("SIGINT", async () => {
  const mongodb = MongoDBConnection.getInstance();
  await mongodb.disconnect();
  logger.info("SIGINT signal received.");
  process.exit(0);
});

export default app;
