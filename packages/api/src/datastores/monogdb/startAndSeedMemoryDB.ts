import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { cities } from "./seeds/cities";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";
import logger from "../../utils/logger";

export async function initializeMemoryDB(): Promise<string> {
  const mongod = await MongoMemoryServer.create({
    instance: { port: 3002 },
  });

  const uri = mongod.getUri();
  process.env.DATABASE_URL = uri;
  logger.info("MongoMemoryServer started on", uri);

  return uri;
}

export async function seedDatabase(uri: string): Promise<void> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // Only seed if collections are empty
    const [citiesCount, countriesCount, hotelsCount] = await Promise.all([
      db.collection("cities").countDocuments(),
      db.collection("countries").countDocuments(),
      db.collection("hotels").countDocuments(),
    ]);

    if (citiesCount === 0) {
      await db.collection("cities").insertMany(cities);
      logger.info("Cities collection seeded");
    }

    if (countriesCount === 0) {
      await db.collection("countries").insertMany(countries);
      logger.info("Countries collection seeded");
    }

    if (hotelsCount === 0) {
      await db.collection("hotels").insertMany(hotels);
      logger.info("Hotels collection seeded");
    }
  } catch (error) {
    logger.error("Error seeding database:", error);
    throw error;
  } finally {
    await client.close();
  }
}

initializeMemoryDB()
  .then(seedDatabase)
  .catch((error) => {
    logger.error("Failed to initialize and seed database:", error);
    process.exit(1);
  });

process.on("SIGTERM", () => {
  logger.info("Received SIGTERM signal");
  process.exit(0);
});
