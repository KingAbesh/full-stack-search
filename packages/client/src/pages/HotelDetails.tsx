import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../api/client";
import styled from "styled-components";
import { BackButton } from "../components/BackButton";

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Article = styled.article`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Address = styled.address`
  font-style: normal;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => searchApi.getHotel(id!),
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

  if (!hotel) return null;

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating);
  };

  return (
    <>
      <BackButton />
      <Container>
        <Article>
          <Title>{hotel.hotel_name}</Title>
          {hotel.chain_name && <Subtitle>{hotel.chain_name}</Subtitle>}
          <Section>
            <SectionTitle>Location</SectionTitle>
            <Address>
              {hotel.addressline1}
              {hotel.addressline2 && <br />}
              {hotel.addressline2}
              <br />
              {hotel.city}, {hotel.state} {hotel.zipcode}
              <br />
              {hotel.country}
            </Address>
          </Section>
          {hotel.star_rating && (
            <Section>
              <SectionTitle>Rating</SectionTitle>
              <Rating>{renderStars(hotel.star_rating)}</Rating>
            </Section>
          )}
        </Article>
      </Container>
    </>
  );
};
