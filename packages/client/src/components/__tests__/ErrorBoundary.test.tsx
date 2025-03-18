import { describe, it, expect, vi, beforeEach } from "vitest";
import { ErrorBoundary } from "../ErrorBoundary";
import { renderWithProviders } from "@/test/test-utils";

const ThrowError = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render children when there is no error", () => {
    const { container } = renderWithProviders(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(container).toHaveTextContent("Test content");
  });

  it("should render fallback UI when there is an error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { container } = renderWithProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(container).toHaveTextContent("Something went wrong");
    expect(container).toHaveTextContent(
      "We apologize for the inconvenience. Please try refreshing the page."
    );

    consoleSpy.mockRestore();
  });

  it("should render custom fallback when provided", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const CustomFallback = () => <div>Custom error message</div>;

    const { container } = renderWithProviders(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(container).toHaveTextContent("Custom error message");
    consoleSpy.mockRestore();
  });

  it("should call onError callback when error occurs", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();

    renderWithProviders(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0][0].message).toBe("Test error");
    expect(onError.mock.calls[0][1]).toHaveProperty("componentStack");

    consoleSpy.mockRestore();
  });

  it("should show error details in development mode", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const { container } = renderWithProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(container).toHaveTextContent("Test error");
    expect(container).toHaveTextContent("Error: Test error");

    process.env.NODE_ENV = originalEnv;
    consoleSpy.mockRestore();
  });
});
