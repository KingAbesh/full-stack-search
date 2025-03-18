import { ObjectId } from "mongodb";
import { Country } from "../entities/country.entity";
import { CountryModel } from "../datastores/monogdb/models";

export interface CountryRepo {
  findById(id: string): Promise<Country | null>;
}

export const countryRepo: CountryRepo = {
  findById: async (id: string): Promise<Country | null> => {
    const country = await CountryModel.findById(new ObjectId(id));
    return country ? country.toObject() : null;
  },
};
