import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { searchApi } from "@/api/client";
import { SearchParams, SearchResponse } from "@/types";

export const useSearch = (initialParams?: SearchParams) => {
  // Ensure we have a valid initial query
  const params = initialParams || { query: "" };

  // Debounce the search query to prevent too many API calls
  const debouncedParams = useDebounce(params, 300);

  // Use React Query to handle the search state and caching
  return useQuery<SearchResponse, Error>({
    queryKey: ["search", debouncedParams.query],
    queryFn: async () => {
      // Don't make API call if query is empty
      if (!debouncedParams.query.trim()) {
        return {
          query: "",
          hotels: [],
          cities: [],
          countries: [],
        };
      }

      const results = await searchApi.search(debouncedParams);
      return results;
    },
    // Only enable the query when we have a non-empty search term
    enabled: Boolean(debouncedParams.query.trim()),
    // Keep the data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Retry failed requests up to 3 times
    retry: 3,
    // Reset data when query is empty
    placeholderData: (previousData) => {
      if (!debouncedParams.query.trim()) {
        return {
          query: "",
          hotels: [],
          cities: [],
          countries: [],
        };
      }
      return previousData;
    },
  });
};
