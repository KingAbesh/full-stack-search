import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongoDBConnection } from "../datastores/monogdb/connection";

let mongoServer: MongoMemoryServer;

// Mock logger to prevent console noise during tests
jest.mock("../utils/logger", () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock Redis
jest.mock("ioredis", () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    quit: jest.fn(),
    on: jest.fn(),
  }));
});

beforeAll(async () => {
  // Start MongoDB Memory Server with random port
  mongoServer = await MongoMemoryServer.create({
    instance: {
      port: undefined, // Let the server choose a random port
    },
  });
  const mongoUri = mongoServer.getUri();

  // Set the MongoDB URI for our connection singleton
  process.env.DATABASE_URL = mongoUri;

  // Connect to the in-memory database
  const mongodb = MongoDBConnection.getInstance();
  await mongodb.connect();
});

afterAll(async () => {
  // Disconnect and cleanup
  const mongodb = MongoDBConnection.getInstance();
  await mongodb.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear all collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
