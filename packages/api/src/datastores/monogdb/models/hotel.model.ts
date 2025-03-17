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
  }
);

// Compound text index for search performance
hotelSchema.index(
  {
    hotel_name: "text",
    chain_name: "text",
    city: "text",
    country: "text",
  },
  {
    weights: {
      hotel_name: 10,
      chain_name: 8,
      city: 5,
      country: 3,
    },
    name: "search_index",
  }
);

// Regular indexes for common queries
hotelSchema.index({ city: 1 });
hotelSchema.index({ country: 1 });
hotelSchema.index({ countryisocode: 1 });
hotelSchema.index({ star_rating: 1 });

export const HotelModel = model<Hotel>("Hotel", hotelSchema);
