import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSearchStore } from "../searchStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { createElement } from "react";
import { searchApi } from "@/api/client";

// Mock the search API
vi.mock("@/api/client", () => ({
  searchApi: {
    search: vi.fn(),
  },
}));

const mockSearchResponse = {
  query: "test",
  hotels: [
    {
      _id: "1",
      hotel_name: "Test Hotel",
      addressline1: "123 Test St",
      addressline2: "",
      city: "Test City",
      state: "Test State",
      zipcode: "12345",
      country: "Test Country",
      chain_name: "Test Chain",
      star_rating: 4,
    },
  ],
  cities: [{ _id: "1", name: "Test City" }],
  countries: [{ _id: "1", country: "Test Country", countryisocode: "TC" }],
};

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function createWrapper() {
  const queryClient = createQueryClient();
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("searchStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSearchStore(""), {
      wrapper: createWrapper(),
    });
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch data when query is provided", async () => {
    vi.mocked(searchApi.search).mockResolvedValue(mockSearchResponse);

    const { result } = renderHook(() => useSearchStore("test"), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockSearchResponse);
    });
  });

  it("should handle error state", async () => {
    const error = new Error("Search failed");
    vi.mocked(searchApi.search).mockRejectedValue(error);

    const { result } = renderHook(() => useSearchStore("error"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe("Search failed");
    });
  });

  it("should return empty results when query is empty", () => {
    const { result } = renderHook(() => useSearchStore(""), {
      wrapper: createWrapper(),
    });
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(searchApi.search).not.toHaveBeenCalled();
  });
});
