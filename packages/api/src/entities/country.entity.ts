import { ObjectId } from "mongodb";

export interface Country {
  _id?: ObjectId;
  country: string;
  countryisocode: string;
}
