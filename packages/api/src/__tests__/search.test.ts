import { testApp } from "../test/test-utils";
import { MongoDBConnection } from "../datastores/monogdb/connection";
import { HotelModel } from "../datastores/monogdb/models/hotel.model";
import { CityModel } from "../datastores/monogdb/models/city.model";
import { CountryModel } from "../datastores/monogdb/models/country.model";

describe("Search API", () => {
  beforeEach(async () => {
    // Clear all collections
    await HotelModel.deleteMany({});
    await CityModel.deleteMany({});
    await CountryModel.deleteMany({});
  });

  it("should return 400 when no query is provided", async () => {
    const response = await testApp.get("/api/search?query=");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      code: "VALIDATION_ERROR",
      message: "Search query is required",
      errors: expect.arrayContaining([
        expect.objectContaining({
          message: "Search query is required",
          path: ["query"],
          type: "string.empty",
        }),
      ]),
    });
  });

  it("should search across all collections", async () => {
    // Create test data
    const country = await CountryModel.create({
      country: "United States",
      countryisocode: "US",
    });

    const city = await CityModel.create({
      name: "New York",
    });

    const hotel = await HotelModel.create({
      hotel_name: "Grand Hotel",
      city: "New York",
      country: "United States",
      countryisocode: "US",
      chain_name: "Luxury Hotels",
      star_rating: 4.5,
      addressline1: "123 Main St",
    });

    const response = await testApp.get("/api/search?query=united states");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Search completed successfully");
    expect(response.body.data).toEqual({
      hotels: expect.arrayContaining([
        expect.objectContaining({
          hotel_name: hotel.hotel_name,
          city: hotel.city,
        }),
      ]),
      cities: [],
      countries: expect.arrayContaining([
        expect.objectContaining({
          country: country.country,
          countryisocode: country.countryisocode,
        }),
      ]),
    });
  });

  it("should handle invalid query parameters", async () => {
    const response = await testApp.get("/api/search?query=test&page=invalid");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Search completed successfully",
      data: {
        hotels: [],
        cities: [],
        countries: [],
      },
    });
  });

  it("should handle database errors gracefully", async () => {
    // Disconnect from database to simulate error
    const mongodb = MongoDBConnection.getInstance();
    await mongodb.disconnect();

    const response = await testApp.get("/api/search?query=test");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: "UNABLE_TO_PROCESS_REQUEST",
      message: "Unable to process request",
    });

    // Reconnect for other tests
    await mongodb.connect();
  });
});
