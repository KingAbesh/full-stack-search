import { Schema, model } from "mongoose";
import { City } from "../../../entities/city.entity";

const citySchema = new Schema<City>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Text index for search performance
citySchema.index({ name: "text" }, { name: "name_text_index" });

// Regular index for exact matches
citySchema.index({ name: 1 });

export const CityModel = model<City>("City", citySchema);
