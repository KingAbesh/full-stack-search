import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchApi } from "../client";
import { API_CONFIG } from "@/config/api";
import type { SearchResponse, Hotel, City, Country } from "@/types";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("searchApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("search", () => {
    const mockSearchResponse: SearchResponse = {
      query: "test",
      hotels: [
        {
          _id: "1",
          hotel_name: "Test Hotel",
          addressline1: "123 Test St",
          city: "Test City",
          state: "TS",
          zipcode: "12345",
          country: "Test Country",
        },
      ],
      cities: [
        {
          _id: "2",
          name: "Test City",
        },
      ],
      countries: [
        {
          _id: "3",
          country: "Test Country",
          countryisocode: "TC",
        },
      ],
    };

    it("should handle successful search response", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: mockSearchResponse }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await searchApi.search({ query: "test" });

      expect(result).toEqual(mockSearchResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}/search?query=test`,
        expect.any(Object)
      );
    });

    it("should handle search error response", async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: () => Promise.resolve({ error: "500 Internal Server Error" }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(searchApi.search({ query: "test" })).rejects.toThrow(
        "500 Internal Server Error"
      );
    });

    it("should handle network error", async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: "Network Error",
        json: () => Promise.resolve({ error: "Network Error" }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);
      await expect(searchApi.search({ query: "test" })).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("getHotel", () => {
    const mockHotel: Hotel = {
      _id: "1",
      hotel_name: "Test Hotel",
      addressline1: "123 Test St",
      city: "Test City",
      state: "TS",
      zipcode: "12345",
      country: "Test Country",
    };

    it("should handle successful hotel retrieval", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: mockHotel }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await searchApi.getHotel("1");

      expect(result).toEqual(mockHotel);
      expect(mockFetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}/hotels/1`,
        expect.any(Object)
      );
    });

    it("should handle hotel not found", async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: "Hotel not found",
        json: () => Promise.resolve({ error: "Hotel not found" }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(searchApi.getHotel("1")).rejects.toThrow("Hotel not found");
    });
  });

  describe("getCity", () => {
    const mockCity: City = {
      _id: "1",
      name: "Test City",
    };

    it("should handle successful city retrieval", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: mockCity }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await searchApi.getCity("1");

      expect(result).toEqual(mockCity);
      expect(mockFetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}/cities/1`,
        expect.any(Object)
      );
    });

    it("should handle city not found", async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: "City not found",
        json: () => Promise.resolve({ error: "City not found" }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(searchApi.getCity("1")).rejects.toThrow("City not found");
    });
  });

  describe("getCountry", () => {
    const mockCountry: Country = {
      _id: "1",
      country: "Test Country",
      countryisocode: "TC",
    };

    it("should handle successful country retrieval", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: mockCountry }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await searchApi.getCountry("1");

      expect(result).toEqual(mockCountry);
      expect(mockFetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}/countries/1`,
        expect.any(Object)
      );
    });

    it("should handle country not found", async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: "Country not found",
        json: () => Promise.resolve({ error: "Country not found" }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(searchApi.getCountry("1")).rejects.toThrow(
        "Country not found"
      );
    });
  });
});
