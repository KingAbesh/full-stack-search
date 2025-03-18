import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { BackButton } from "../BackButton";
import { useNavigate } from "react-router-dom";
import { renderWithProviders } from "@/test/test-utils";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("BackButton", () => {
  it("renders back button with correct text", () => {
    const navigate = vi.fn();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      navigate
    );

    renderWithProviders(<BackButton />);

    const button = screen.getByRole("button", { name: /go back/i });
    expect(button).toBeInTheDocument();
  });

  it("navigates back when clicked", () => {
    const navigate = vi.fn();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      navigate
    );

    renderWithProviders(<BackButton />);

    const button = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it("has correct styling", () => {
    const navigate = vi.fn();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      navigate
    );

    renderWithProviders(<BackButton />);

    const button = screen.getByRole("button", { name: /go back/i });

    expect(button).toHaveStyle({
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
    });
  });
});
