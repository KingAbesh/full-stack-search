import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useSearchContext } from "@/contexts/SearchContext";
import { Hotel, City, Country } from "@/types";
import { Link } from "react-router-dom";
import { Theme } from "@/styles/theme";
import SearchInput from "./SearchInput";

const ResultsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.lg};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.xl};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontSize["2xl"]};
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.md};
  font-weight: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontWeight.bold};
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }: { theme: Theme }) => theme.spacing.md};
`;

const ResultCard = styled(Link)`
  background: ${({ theme }: { theme: Theme }) => theme.colors.background};
  border-radius: ${({ theme }: { theme: Theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.shadows.sm};
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};
  transition: all ${({ theme }: { theme: Theme }) => theme.transitions.default};
  text-decoration: none;
  color: inherit;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: Theme }) => theme.spacing.sm};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }: { theme: Theme }) => theme.shadows.md};
    border-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  }
`;

const ResultTitle = styled.h3`
  margin: 0;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }: { theme: Theme }) => theme.spacing.sm};
  width: 100%;
`;

const ResultLocation = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: Theme }) => theme.colors.textLight};
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }: { theme: Theme }) => theme.spacing.sm};
`;

const CountryFlag = styled.span`
  font-size: 1.5em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
`;

const Message = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: Theme }) => theme.colors.textLight};
  margin-top: ${({ theme }: { theme: Theme }) => theme.spacing.xl};
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.lg};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.xl};

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }: { theme: Theme }) => theme.colors.border};
    border-top-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled(Message)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};
  background: ${({ theme }: { theme: Theme }) => theme.colors.errorLight};
  border-radius: ${({ theme }: { theme: Theme }) => theme.borderRadius.md};
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.xl} auto;
  max-width: 600px;
`;

const NoResultsMessage = styled(Message)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.textLight};
  font-style: italic;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};
  background: ${({ theme }: { theme: Theme }) => theme.colors.background};
  border-radius: ${({ theme }: { theme: Theme }) => theme.borderRadius.md};
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.md} 0;
`;

const WelcomeMessage = styled(Message)`
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.xl};
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.xl} auto;
  max-width: 600px;
  text-align: center;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
`;

interface SearchResultsData {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
  hasResults: boolean;
  hasSearched: boolean;
}

export const SearchResults = () => {
  const { searchResults } = useSearchContext();
  const { data, isLoading, error } = searchResults;
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Update search query when data changes
  useEffect(() => {
    if (data?.query !== undefined) {
      setSearchQuery(data.query);
    }
  }, [data?.query]);

  // Memoize results to prevent unnecessary re-renders
  const results = useMemo<SearchResultsData | null>(() => {
    if (!data || !searchQuery.trim()) return null;

    const computedResults = {
      hotels: data.hotels || [],
      cities: data.cities || [],
      countries: data.countries || [],
      hasResults:
        (data.hotels?.length || 0) > 0 ||
        (data.cities?.length || 0) > 0 ||
        (data.countries?.length || 0) > 0,
      hasSearched: Boolean(searchQuery.trim()),
    };

    return computedResults;
  }, [data, searchQuery]);

  const renderResults = () => {
    if (isLoading) {
      return (
        <>
          <LoadingSpinner />
          <Message>Searching for "{searchQuery}"...</Message>
        </>
      );
    }

    if (error) {
      return (
        <ErrorMessage role="alert">
          Error searching for "{searchQuery}":{" "}
          {error instanceof Error ? error.message : "An error occurred"}
        </ErrorMessage>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <WelcomeMessage>
          Welcome! Start typing above to search for hotels, cities, or
          countries.
        </WelcomeMessage>
      );
    }

    if (!results?.hasResults) {
      return (
        <Message>
          No results found for "{searchQuery}". Try a different search term.
        </Message>
      );
    }

    return (
      <>
        <Section>
          <SectionTitle>Hotels</SectionTitle>
          {results.hotels.length > 0 ? (
            <ResultsGrid>
              {results.hotels.map((hotel: Hotel) => (
                <ResultCard
                  key={hotel._id}
                  to={`/hotels/${hotel._id}`}
                  style={{ animationDelay: `${Math.random() * 0.2}s` }}
                >
                  <ResultTitle>{hotel.hotel_name}</ResultTitle>
                  <ResultLocation>
                    {hotel.city}, {hotel.country}
                    {hotel.chain_name && ` • ${hotel.chain_name}`}
                  </ResultLocation>
                  {hotel.star_rating && (
                    <ResultLocation>
                      Rating: {hotel.star_rating} stars
                    </ResultLocation>
                  )}
                </ResultCard>
              ))}
            </ResultsGrid>
          ) : (
            <NoResultsMessage>No hotels matched your search</NoResultsMessage>
          )}
        </Section>

        <Section>
          <SectionTitle>Cities</SectionTitle>
          {results.cities.length > 0 ? (
            <ResultsGrid>
              {results.cities.map((city: City) => (
                <ResultCard
                  key={city._id}
                  to={`/cities/${city._id}`}
                  style={{ animationDelay: `${Math.random() * 0.2}s` }}
                >
                  <ResultTitle>
                    <span>🏙️</span> {city.name}
                  </ResultTitle>
                </ResultCard>
              ))}
            </ResultsGrid>
          ) : (
            <NoResultsMessage>No cities matched your search</NoResultsMessage>
          )}
        </Section>

        <Section>
          <SectionTitle>Countries</SectionTitle>
          {results.countries.length > 0 ? (
            <ResultsGrid>
              {results.countries.map((country: Country) => (
                <ResultCard
                  key={country._id}
                  to={`/countries/${country._id}`}
                  style={{ animationDelay: `${Math.random() * 0.2}s` }}
                >
                  <ResultTitle>
                    <CountryFlag>
                      {country.countryisocode
                        ? String.fromCodePoint(
                            ...Array.from(country.countryisocode).map(
                              (c) => (c as string).charCodeAt(0) + 127397,
                            ),
                          )
                        : "🌍"}
                    </CountryFlag>
                    <span>{country.country}</span>
                  </ResultTitle>
                </ResultCard>
              ))}
            </ResultsGrid>
          ) : (
            <NoResultsMessage>
              No countries matched your search
            </NoResultsMessage>
          )}
        </Section>
      </>
    );
  };

  return (
    <>
      <SearchInput />
      <ResultsContainer>{renderResults()}</ResultsContainer>
    </>
  );
};
