import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "@/styles/theme";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: Theme }) => theme.borderRadius.md};
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.lg};

  &:hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.surface};
    transform: translateX(-4px);
    box-shadow: ${({ theme }: { theme: Theme }) => theme.shadows.sm};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} aria-label="Go back">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Search
    </Button>
  );
};
