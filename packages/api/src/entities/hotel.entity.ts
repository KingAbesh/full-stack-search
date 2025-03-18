import { ObjectId } from "mongodb";

export interface Hotel {
  _id?: ObjectId;
  chain_name: string;
  hotel_name: string;
  addressline1: string;
  addressline2?: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  countryisocode: string;
  star_rating: number;
}
