import { HotelModel, CityModel, CountryModel } from "../models";
import { hotels } from "./hotels";
import { cities } from "./cities";
import { countries } from "./countries";
import logger from "../../../utils/logger";

export const seedDatabase = async () => {
  try {
    // Check if data already exists
    const [hotelCount, cityCount, countryCount] = await Promise.all([
      HotelModel.countDocuments(),
      CityModel.countDocuments(),
      CountryModel.countDocuments(),
    ]);

    if (hotelCount === 0) {
      await HotelModel.insertMany(hotels);
      logger.info(`Seeded ${hotels.length} hotels`);
    }

    if (cityCount === 0) {
      await CityModel.insertMany(cities);
      logger.info(`Seeded ${cities.length} cities`);
    }

    if (countryCount === 0) {
      await CountryModel.insertMany(countries);
      logger.info(`Seeded ${countries.length} countries`);
    }

    logger.info("Database seeding completed");
  } catch (error) {
    logger.error("Error seeding database:", error);
    throw error;
  }
};
