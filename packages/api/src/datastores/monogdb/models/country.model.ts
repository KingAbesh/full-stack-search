import { Schema, model } from "mongoose";
import { Country } from "../../../entities/country.entity";

const countrySchema = new Schema<Country>(
  {
    country: { type: String, required: true },
    countryisocode: { type: String, required: true, length: 2 },
  },
  {
    timestamps: true,
  }
);

// Text index for search performance
countrySchema.index(
  {
    country: "text",
    countryisocode: "text",
  },
  {
    weights: {
      country: 10,
      countryisocode: 5,
    },
    name: "search_index",
  }
);

// Regular indexes for common queries
countrySchema.index({ countryisocode: 1 }, { unique: true });
countrySchema.index({ country: 1 }, { unique: true });

export const CountryModel = model<Country>("Country", countrySchema);
