export interface Hotel {
  _id: string;
  hotel_name: string;
  chain_name?: string;
  addressline1: string;
  addressline2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  star_rating?: number;
}

export interface City {
  _id: string;
  name: string;
}

export interface Country {
  _id: string;
  country: string;
  countryisocode?: string;
}

export interface SearchResponse {
  query: string;
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}

export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
  signal?: AbortSignal;
}
