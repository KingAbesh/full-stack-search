import { useQuery } from "@tanstack/react-query";
import { Hotel, City, Country } from "../types";
import { searchApi } from "@/api/client";

interface SearchResponse {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}

export const useSearchStore = (query: string) => {
  return useQuery<SearchResponse, Error>({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query.trim()) {
        return {
          hotels: [],
          cities: [],
          countries: [],
        };
      }
      return searchApi.search({ query });
    },
    enabled: query.length > 0,
  });
};
