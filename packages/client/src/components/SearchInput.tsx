import styled from "styled-components";
import { useSearchContext } from "@/contexts/SearchContext";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 4rem auto 2rem;
  padding: 0 1rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.25rem 1rem;
  padding-left: 3rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const StatusMessage = styled.p<{ isError?: boolean }>`
  text-align: center;
  color: ${(props) => (props.isError ? "#dc3545" : "#666")};
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const SearchInput = () => {
  const { searchParams, setSearchParams, searchResults } = useSearchContext();
  const { isLoading, error } = searchResults;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ query: value });
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchIcon>
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </SearchIcon>
        <Input
          type="text"
          placeholder="Start typing to search for hotels, cities, or countries..."
          value={searchParams.query}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSearchParams({ query: "" });
            }
          }}
          disabled={isLoading}
          aria-label="Search accommodations"
        />
      </SearchWrapper>
      {isLoading && <StatusMessage>Searching...</StatusMessage>}
      {error && (
        <StatusMessage isError>
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "Failed to search. Please try again."}
        </StatusMessage>
      )}
    </SearchContainer>
  );
};

export default SearchInput;
