import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { SearchResults } from "../SearchResults";
import { useSearchContext } from "@/contexts/SearchContext";
import type { SearchContextType } from "@/contexts/SearchContext";

// Mock the SearchInput component
vi.mock("../SearchInput", () => ({
  default: () => <div data-testid="mock-search-input">Search Input</div>,
}));

// Mock the useSearchContext hook
vi.mock("@/contexts/SearchContext", () => ({
  useSearchContext: vi.fn(),
}));

const mockUseSearchContext = useSearchContext as unknown as ReturnType<
  typeof vi.fn<[], SearchContextType>
>;

const mockHotel = {
  _id: "1",
  hotel_name: "Grand Hotel",
  city: "New York",
  country: "United States",
  chain_name: "Luxury Hotels",
  star_rating: 4.5,
};

const mockCity = {
  _id: "2",
  name: "New York",
  country: "United States",
};

const mockCountry = {
  _id: "3",
  country: "United States",
  countryisocode: "US",
};

describe("SearchResults", () => {
  it("should render search input", () => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "" },
      setSearchParams: vi.fn(),
      searchResults: {
        data: undefined,
        isLoading: false,
        error: null,
      },
    } as unknown as SearchContextType);

    renderWithProviders(<SearchResults />);
    expect(screen.getByTestId("mock-search-input")).toBeInTheDocument();
  });

  it("should show welcome message when no search query", () => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "" },
      setSearchParams: vi.fn(),
      searchResults: {
        data: undefined,
        isLoading: false,
        error: null,
      },
    } as unknown as SearchContextType);

    renderWithProviders(<SearchResults />);
    expect(
      screen.getByText(
        "Welcome! Start typing above to search for hotels, cities, or countries."
      )
    ).toBeInTheDocument();
  });

  it("should show loading state", () => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "test" },
      setSearchParams: vi.fn(),
      searchResults: {
        data: {
          query: "test",
          hotels: [],
          cities: [],
          countries: [],
        },
        isLoading: true,
        error: null,
      },
    } as unknown as SearchContextType);

    renderWithProviders(<SearchResults />);
    expect(screen.getByText('Searching for "test"...')).toBeInTheDocument();
  });

  it("should show error state", () => {
    const error = new Error("Search failed");
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "test" },
      setSearchParams: vi.fn(),
      searchResults: {
        data: {
          query: "test",
          hotels: [],
          cities: [],
          countries: [],
        },
        isLoading: false,
        error,
      },
    } as unknown as SearchContextType);

    renderWithProviders(<SearchResults />);
    expect(
      screen.getByText('Error searching for "test": Search failed')
    ).toBeInTheDocument();
  });

  it("should show no results message", () => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "nonexistent" },
      setSearchParams: vi.fn(),
      searchResults: {
        data: {
          query: "nonexistent",
          hotels: [],
          cities: [],
          countries: [],
        },
        isLoading: false,
        error: null,
      },
    } as unknown as SearchContextType);

    renderWithProviders(<SearchResults />);
    expect(
      screen.getByText(
        'No results found for "nonexistent". Try a different search term.'
      )
    ).toBeInTheDocument();
  });

  it("should render search results", () => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "test" },
      setSearchParams: vi.fn(),
      searchResults: {
        data: {
          query: "test",
          hotels: [mockHotel],
          cities: [mockCity],
          countries: [mockCountry],
        },
        isLoading: false,
        error: null,
      },
    } as unknown as SearchContextType);

    renderWithProviders(<SearchResults />);

    // Check for section titles
    expect(screen.getByText("Hotels")).toBeInTheDocument();
    expect(screen.getByText("Cities")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();

    // Check for hotel details
    expect(screen.getByText("Grand Hotel")).toBeInTheDocument();
    expect(
      screen.getByText("New York, United States • Luxury Hotels")
    ).toBeInTheDocument();
    expect(screen.getByText("Rating: 4.5 stars")).toBeInTheDocument();

    // Check for city details
    expect(screen.getByText("New York")).toBeInTheDocument();

    // Check for country details
    expect(screen.getByText("United States")).toBeInTheDocument();
  });
});
