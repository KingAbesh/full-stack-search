import { z } from "zod";

export const hotelSchema = z.object({
  _id: z.string(),
  hotel_name: z.string(),
  chain_name: z.string().optional(),
  addressline1: z.string(),
  addressline2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  country: z.string(),
  star_rating: z.number().optional(),
});

export const citySchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export const countrySchema = z.object({
  _id: z.string(),
  country: z.string(),
  countryisocode: z.string(),
});

export const searchResponseSchema = z.object({
  hotels: z.array(hotelSchema),
  cities: z.array(citySchema),
  countries: z.array(countrySchema),
});

export type Hotel = z.infer<typeof hotelSchema>;
export type City = z.infer<typeof citySchema>;
export type Country = z.infer<typeof countrySchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;

export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
}

export interface SearchResult {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}
