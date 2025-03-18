import { testApp } from "../test/test-utils";
import { HotelModel } from "../datastores/monogdb/models/hotel.model";
import { CityModel } from "../datastores/monogdb/models/city.model";
import { CountryModel } from "../datastores/monogdb/models/country.model";

describe("Entity Routes", () => {
  beforeEach(async () => {
    // Clear all collections
    await HotelModel.deleteMany({});
    await CityModel.deleteMany({});
    await CountryModel.deleteMany({});
  });

  describe("GET /api/hotels/:id", () => {
    it("should return hotel by id", async () => {
      const hotel = await HotelModel.create({
        hotel_name: "Grand Hotel",
        city: "New York",
        country: "United States",
        countryisocode: "US",
        chain_name: "Luxury Hotels",
        star_rating: 4.5,
        addressline1: "123 Main St",
      });

      const response = await testApp.get(`/api/hotels/${hotel._id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          hotel_name: hotel.hotel_name,
          city: hotel.city,
          country: hotel.country,
        })
      );
    });

    it("should return 404 when hotel not found", async () => {
      const response = await testApp.get(
        "/api/hotels/507f1f77bcf86cd799439011"
      );

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        code: "NOT_FOUND",
        message: "Hotel with id 507f1f77bcf86cd799439011 not found",
      });
    });

    it("should return 400 for invalid id format", async () => {
      const response = await testApp.get("/api/hotels/invalid-id");

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: "VALIDATION_ERROR",
        message: "Invalid hotel ID format",
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: ["id"],
            type: "string.pattern.base",
          }),
        ]),
      });
    });
  });

  describe("GET /api/cities/:id", () => {
    it("should return city by id", async () => {
      const city = await CityModel.create({
        name: "New York",
      });

      const response = await testApp.get(`/api/cities/${city._id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          name: city.name,
        })
      );
    });

    it("should return 404 when city not found", async () => {
      const response = await testApp.get(
        "/api/cities/507f1f77bcf86cd799439011"
      );

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        code: "NOT_FOUND",
        message: "City with id 507f1f77bcf86cd799439011 not found",
      });
    });

    it("should return 400 for invalid id format", async () => {
      const response = await testApp.get("/api/cities/invalid-id");

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: "VALIDATION_ERROR",
        message: "Invalid city ID format",
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: ["id"],
            type: "string.pattern.base",
          }),
        ]),
      });
    });
  });

  describe("GET /api/countries/:id", () => {
    it("should return country by id", async () => {
      const country = await CountryModel.create({
        country: "United States",
        countryisocode: "US",
      });

      const response = await testApp.get(`/api/countries/${country._id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          country: country.country,
          countryisocode: country.countryisocode,
        })
      );
    });

    it("should return 404 when country not found", async () => {
      const response = await testApp.get(
        "/api/countries/507f1f77bcf86cd799439011"
      );

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        code: "NOT_FOUND",
        message: "Country with id 507f1f77bcf86cd799439011 not found",
      });
    });

    it("should return 400 for invalid id format", async () => {
      const response = await testApp.get("/api/countries/invalid-id");

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: "VALIDATION_ERROR",
        message: "Invalid country ID format",
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: ["id"],
            type: "string.pattern.base",
          }),
        ]),
      });
    });
  });
});
