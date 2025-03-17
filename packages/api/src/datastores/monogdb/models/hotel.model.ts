import { Schema, model } from "mongoose";
import { Hotel } from "../../../entities/hotel.entity";

const hotelSchema = new Schema<Hotel>(
  {
    chain_name: { type: String, default: "Independent" },
    hotel_name: { type: String, required: true },
    addressline1: { type: String, required: true },
    addressline2: { type: String, default: "" },
    zipcode: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, default: "" },
    country: { type: String, required: true },
    countryisocode: { type: String, required: true, length: 2 },
    star_rating: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  },
);

hotelSchema.index(
  {
    hotel_name: "text",
    country: "text",
  },
  {
    weights: {
      hotel_name: 10,
      country: 8,
    },
    name: "search_index",
  },
);

export const HotelModel = model<Hotel>("Hotel", hotelSchema);
