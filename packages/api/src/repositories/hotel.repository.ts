import { ObjectId } from "mongodb";
import { Hotel } from "../entities/hotel.entity";
import { HotelModel } from "../datastores/monogdb/models";

export interface HotelRepo {
  findById(id: string): Promise<Hotel | null>;
}

export const hotelRepo: HotelRepo = {
  findById: async (id: string): Promise<Hotel | null> => {
    const hotel = await HotelModel.findById(new ObjectId(id));
    return hotel ? hotel.toObject() : null;
  },
};
