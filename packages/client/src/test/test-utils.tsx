import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/styles/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

export const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>,
  );
};

export * from "@testing-library/react";
