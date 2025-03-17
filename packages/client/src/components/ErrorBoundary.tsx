import { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";
import { Theme } from "../styles/theme";

const ErrorContainer = styled.div`
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.lg};
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.error};
  border-radius: ${({ theme }: { theme: Theme }) => theme.borderRadius.md};
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.errorLight};
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.md};
`;

const ErrorDetails = styled.pre`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};
  border-radius: ${({ theme }: { theme: Theme }) => theme.borderRadius.sm};
  overflow-x: auto;
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
`;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We apologize for the inconvenience. Please try refreshing the page.
          </ErrorMessage>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <ErrorDetails>
              {this.state.error.toString()}
              <br />
              {this.state.error.stack}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
