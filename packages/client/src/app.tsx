import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./styles/theme";
import type { Theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { SearchProvider } from "./contexts/SearchContext";
import { SearchResults } from "./components/SearchResults";
import { HotelDetails } from "./pages/HotelDetails";
import { CityDetails } from "./pages/CityDetails";
import { CountryDetails } from "./pages/CountryDetails";
import { NotFound } from "./pages/NotFound";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.surface};
`;

const Header = styled.header`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.shadows.sm};
`;

const HeaderContent = styled.div`
  max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 0;
`;

const Main = styled.main`
  max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SearchProvider>
          <Router>
            <AppContainer>
              <Header>
                <HeaderContent>
                  <HeaderTitle>Accommodation Search</HeaderTitle>
                </HeaderContent>
              </Header>
              <Main>
                <Routes>
                  <Route path="/" element={<SearchResults />} />
                  <Route path="/hotels/:id" element={<HotelDetails />} />
                  <Route path="/cities/:id" element={<CityDetails />} />
                  <Route path="/countries/:id" element={<CountryDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Main>
            </AppContainer>
          </Router>
        </SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
