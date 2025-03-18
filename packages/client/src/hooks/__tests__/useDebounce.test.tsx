import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));

    expect(result.current).toBe("test");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "test" },
      }
    );

    act(() => {
      rerender({ value: "new test" });
    });

    expect(result.current).toBe("test");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("new test");
  });

  it("cancels previous timeout when value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "test" },
      }
    );

    act(() => {
      rerender({ value: "new test" });
    });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    act(() => {
      rerender({ value: "final test" });
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("final test");
  });

  it("handles empty string value", () => {
    const { result } = renderHook(() => useDebounce("", 500));

    expect(result.current).toBe("");
  });

  it("handles null value", () => {
    const { result } = renderHook(() => useDebounce(null, 500));

    expect(result.current).toBeNull();
  });

  it("handles undefined value", () => {
    const { result } = renderHook(() => useDebounce(undefined, 500));

    expect(result.current).toBeUndefined();
  });
});
