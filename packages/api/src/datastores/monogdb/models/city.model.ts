import { Schema, model } from "mongoose";
import { City } from "../../../entities/city.entity";

const citySchema = new Schema<City>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

citySchema.index({ name: "text" }, { name: "name_text_index" });

export const CityModel = model<City>("City", citySchema);
