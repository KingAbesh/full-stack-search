import { Link } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontSize["4xl"]};
  font-weight: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: Theme }) => theme.colors.text};
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.md};
`;

const Message = styled.p`
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }: { theme: Theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }: { theme: Theme }) => theme.spacing.xl};
`;

const HomeLink = styled(Link)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }: { theme: Theme }) =>
    theme.typography.fontWeight.medium};
  transition: color
    ${({ theme }: { theme: Theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.colors.hover.primary};
  }
`;

export const NotFound = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <Message>
        The page you're looking for doesn't exist or has been moved.
      </Message>
      <HomeLink to="/">Return to Home</HomeLink>
    </Container>
  );
};
