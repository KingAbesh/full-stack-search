import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import logger from "../../utils/logger";

export class MongoDBConnection {
  private static instance: MongoDBConnection;
  private isConnected: boolean = false;
  private memoryServer: MongoMemoryServer | null = null;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (this.isConnected) {
        logger.info("MongoDB is already connected");
        return;
      }

      const mongoUri = process.env.MONGODB_URI;
      let uri: string;

      if (!mongoUri) {
        this.memoryServer = await MongoMemoryServer.create({
          instance: {
            port: undefined,
          },
        });
        uri = this.memoryServer.getUri();
        logger.info("Using in-memory MongoDB server at", uri);
      } else {
        uri = mongoUri;
      }

      // Configure mongoose
      mongoose.set("strictQuery", true);

      // Connect with retry logic
      await this.connectWithRetry(uri);

      // Setup connection event handlers
      this.setupEventHandlers();

      this.isConnected = true;
      logger.info("Successfully connected to MongoDB");
    } catch (error) {
      logger.error("MongoDB connection error:", error);
      throw error;
    }
  }

  private async connectWithRetry(uri: string, retries = 5): Promise<void> {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    } catch (error) {
      if (retries === 0) {
        logger.error("Failed to connect to MongoDB after multiple retries");
        throw error;
      }

      logger.warn(
        `Retrying MongoDB connection... (${retries} attempts remaining)`
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return this.connectWithRetry(uri, retries - 1);
    }
  }

  private setupEventHandlers(): void {
    mongoose.connection.on("connected", () => {
      logger.info("MongoDB connection established");
    });

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB connection disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB connection reestablished");
    });

    process.on("SIGINT", async () => {
      try {
        await this.disconnect();
        logger.info("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (error) {
        logger.error("Error during MongoDB disconnection:", error);
        process.exit(1);
      }
    });
  }

  public async disconnect(): Promise<void> {
    try {
      if (!this.isConnected) {
        logger.info("MongoDB is already disconnected");
        return;
      }

      await mongoose.disconnect();
      if (this.memoryServer) {
        await this.memoryServer.stop();
        logger.info("In-memory MongoDB server stopped");
      }
      this.isConnected = false;
      logger.info("Successfully disconnected from MongoDB");
    } catch (error) {
      logger.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  public getUri(): string | undefined {
    return this.memoryServer?.getUri() ?? process.env.MONGODB_URI;
  }
}
