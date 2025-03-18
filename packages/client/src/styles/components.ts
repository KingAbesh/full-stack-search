import styled from "styled-components";
import { Theme } from "./theme";

// Layout Components
export const PageContainer = styled.div<{ theme: Theme }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Section = styled.section<{ theme: Theme }>`
  margin-bottom: 2rem;
`;

export const FlexContainer = styled.div<{
  theme: Theme;
  gap?: string;
  align?: string;
  justify?: string;
}>`
  display: flex;
  gap: ${(props) => props.gap || "1rem"};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "flex-start"};
`;

// Card Components
export const Card = styled.div<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div<{ theme: Theme }>`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

// Form Components
export const Input = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const Button = styled.button<{
  theme: Theme;
  variant?: "primary" | "secondary";
}>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.background
      : props.theme.colors.primary};
  color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.text
      : props.theme.colors.background};
  border: ${(props) =>
    props.variant === "secondary"
      ? `1px solid ${props.theme.colors.border}`
      : "none"};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Badge Components
export const Badge = styled.span<{
  theme: Theme;
  variant?: "success" | "warning" | "error";
}>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.variant) {
      case "success":
        return props.theme.colors.success;
      case "warning":
        return props.theme.colors.warning;
      case "error":
        return props.theme.colors.error;
      default:
        return props.theme.colors.primary;
    }
  }};
  color: ${(props) => props.theme.colors.background};
`;

// Animation Components
export const FadeIn = styled.div<{ theme: Theme }>`
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

export const SlideIn = styled.div<{ theme: Theme }>`
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// List Components
export const List = styled.ul<{ theme: Theme }>`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li<{ theme: Theme }>`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

// Table Components
export const Table = styled.table<{ theme: Theme }>`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th<{ theme: Theme }>`
  text-align: left;
  padding: 1rem;
  background: ${(props) => props.theme.colors.background};
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  font-weight: 600;
`;

export const TableCell = styled.td<{ theme: Theme }>`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

// Modal Components
export const ModalOverlay = styled.div<{ theme: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const Container = styled.div<{ theme: Theme }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Grid = styled.div<{
  theme: Theme;
  columns?: number;
}>`
  display: grid;
  grid-template-columns: repeat(
    ${({ columns = 1 }) => columns},
    minmax(0, 1fr)
  );
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(
      ${({ columns = 2 }) => columns},
      minmax(0, 1fr)
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(
      ${({ columns = 3 }) => columns},
      minmax(0, 1fr)
    );
  }
`;

export const Heading = styled.h2<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

export const Text = styled.p<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const LoadingSpinner = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: 0.5rem;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;
