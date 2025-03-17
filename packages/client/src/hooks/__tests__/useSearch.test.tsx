import { describe, it, expect, vi, type Mock } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSearch } from "../useSearch";
import { useQuery } from "@tanstack/react-query";

// Mock react-query
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

const mockSearchResults = {
  query: "test",
  countries: [
    {
      countryid: "1",
      countryname: "Test Country 1",
      countryisocode: "TC1",
    },
    {
      countryid: "2",
      countryname: "Test Country 2",
      countryisocode: "TC2",
    },
  ],
  cities: [
    {
      cityid: "1",
      cityname: "Test City 1",
      country: "Test Country 1",
      countryisocode: "TC1",
    },
    {
      cityid: "2",
      cityname: "Test City 2",
      country: "Test Country 2",
      countryisocode: "TC2",
    },
  ],
  hotels: [
    {
      hotelid: "1",
      hotelname: "Test Hotel 1",
      addressline1: "123 Test St",
      addressline2: "Suite 100",
      city: "Test City 1",
      country: "Test Country 1",
      star_rating: "5",
    },
    {
      hotelid: "2",
      hotelname: "Test Hotel 2",
      addressline1: "456 Test Ave",
      city: "Test City 2",
      country: "Test Country 2",
      star_rating: "4",
    },
  ],
};

describe("useSearch", () => {
  it("initializes with empty results when no params provided", () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: {
        query: "",
        hotels: [],
        cities: [],
        countries: [],
      },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearch());
    expect(result.current.data).toEqual({
      query: "",
      hotels: [],
      cities: [],
      countries: [],
    });
  });

  it("handles loading state", () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useSearch());
    expect(result.current.isLoading).toBe(true);
  });

  it("handles error state", () => {
    const error = new Error("Failed to fetch search results");
    (useQuery as unknown as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error,
    });

    const { result } = renderHook(() => useSearch());
    expect(result.current.error).toBe(error);
  });

  it("handles successful search results", () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearch({ query: "test" }));
    expect(result.current.data).toEqual(mockSearchResults);
  });

  it("handles empty search results", () => {
    const emptyResults = {
      query: "test",
      countries: [],
      cities: [],
      hotels: [],
    };

    (useQuery as unknown as Mock).mockReturnValue({
      data: emptyResults,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearch({ query: "test" }));
    expect(result.current.data).toEqual(emptyResults);
  });
});
