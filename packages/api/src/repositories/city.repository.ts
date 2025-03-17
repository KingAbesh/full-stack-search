import { ObjectId } from "mongodb";
import { City } from "../entities/city.entity";
import { CityModel } from "../datastores/monogdb/models";

export interface CityRepo {
  findById(id: string): Promise<City | null>;
}

export const cityRepo: CityRepo = {
  findById: async (id: string): Promise<City | null> => {
    const city = await CityModel.findById(new ObjectId(id));
    return city ? city.toObject() : null;
  },
};
