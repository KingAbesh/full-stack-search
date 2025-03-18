import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../api/client";
import styled from "styled-components";
import { BackButton } from "../components/BackButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Article = styled.article`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: city,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["city", id],
    queryFn: () => searchApi.getCity(id!),
  });

  if (isLoading) {
    return (
      <Container>
        <output aria-label="Loading">Loading...</output>
      </Container>
    );
  }

  if (error) {
    return (
      <ErrorMessage role="alert">
        {error instanceof Error ? error.message : "An error occurred"}
      </ErrorMessage>
    );
  }

  if (!city) return null;

  return (
    <>
      <BackButton />
      <Article>
        <Title>{city.name}</Title>
        <Section>
          <SectionTitle>About {city.name}</SectionTitle>
          <p>
            Welcome to {city.name}, a beautiful destination waiting to be
            explored.
          </p>
        </Section>
      </Article>
    </>
  );
};
