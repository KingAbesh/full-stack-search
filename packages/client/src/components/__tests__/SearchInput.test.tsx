import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import SearchInput from "../SearchInput";
import { useSearchContext } from "@/contexts/SearchContext";
import { renderWithProviders } from "@/test/test-utils";
import type { Mock } from "vitest";

// Mock the search context
vi.mock("@/contexts/SearchContext");

const mockUseSearchContext = useSearchContext as Mock;

describe("SearchInput", () => {
  beforeEach(() => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "" },
      setSearchParams: vi.fn(),
      searchResults: {
        isLoading: false,
        error: null,
      },
    });
  });

  it("renders search input with placeholder", () => {
    renderWithProviders(<SearchInput />);

    const input = screen.getByLabelText("Search accommodations");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute(
      "placeholder",
      "Start typing to search for hotels, cities, or countries..."
    );
  });

  it("handles user input", () => {
    const setSearchParams = vi.fn();
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "" },
      setSearchParams,
      searchResults: {
        isLoading: false,
        error: null,
      },
    });

    renderWithProviders(<SearchInput />);

    const input = screen.getByLabelText("Search accommodations");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(setSearchParams).toHaveBeenCalledWith({ query: "test query" });
  });

  it("disables input while loading", () => {
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "" },
      setSearchParams: vi.fn(),
      searchResults: {
        isLoading: true,
        error: null,
      },
    });

    renderWithProviders(<SearchInput />);

    const input = screen.getByLabelText("Search accommodations");
    expect(input).toBeDisabled();
  });

  it("shows error message when search fails", () => {
    const errorMessage = "Test error message";
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "test" },
      setSearchParams: vi.fn(),
      searchResults: {
        isLoading: false,
        error: new Error(errorMessage),
      },
    });

    renderWithProviders(<SearchInput />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("clears search on Escape key", () => {
    const setSearchParams = vi.fn();
    mockUseSearchContext.mockReturnValue({
      searchParams: { query: "test" },
      setSearchParams,
      searchResults: {
        isLoading: false,
        error: null,
      },
    });

    renderWithProviders(<SearchInput />);

    const input = screen.getByLabelText("Search accommodations");
    fireEvent.keyDown(input, { key: "Escape" });

    expect(setSearchParams).toHaveBeenCalledWith({ query: "" });
  });
});
