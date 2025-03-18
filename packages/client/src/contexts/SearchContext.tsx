import { createContext, useContext, useState, ReactNode } from "react";
import { useSearch } from "@/hooks/useSearch";
import { SearchParams } from "@/types";

export interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  searchResults: ReturnType<typeof useSearch>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({ query: "" });
  const searchResults = useSearch(searchParams);

  const handleSetSearchParams = (params: SearchParams) => {
    // If query is empty, clear the search results
    if (!params.query.trim()) {
      setSearchParams({ query: "" });
    } else {
      setSearchParams(params);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams: handleSetSearchParams,
        searchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
