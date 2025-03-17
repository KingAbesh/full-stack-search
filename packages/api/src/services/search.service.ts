import { Hotel } from "../entities/hotel.entity";
import { City } from "../entities/city.entity";
import { Country } from "../entities/country.entity";
import {
  HotelModel,
  CityModel,
  CountryModel,
} from "../datastores/monogdb/models";
import { PipelineStage } from "mongoose";
import logger from "../utils/logger";

export interface SearchResult {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}

const createSearchStages = (searchPattern: RegExp): PipelineStage[] => [
  {
    $match: {
      $or: [
        { hotel_name: { $regex: searchPattern } },
        { city: { $regex: searchPattern } },
        { country: { $regex: searchPattern } },
      ],
    },
  },
  {
    $lookup: {
      from: "cities",
      localField: "city",
      foreignField: "name",
      as: "city_info",
    },
  },
  {
    $lookup: {
      from: "countries",
      localField: "country",
      foreignField: "country",
      as: "country_info",
    },
  },
  {
    $addFields: {
      city_info: { $arrayElemAt: ["$city_info", 0] },
      country_info: { $arrayElemAt: ["$country_info", 0] },
      score: {
        $add: [
          {
            $cond: [
              { $regexMatch: { input: "$hotel_name", regex: searchPattern } },
              3,
              0,
            ],
          },
          {
            $cond: [
              { $regexMatch: { input: "$city", regex: searchPattern } },
              2,
              0,
            ],
          },
          {
            $cond: [
              { $regexMatch: { input: "$country", regex: searchPattern } },
              1,
              0,
            ],
          },
        ],
      },
    },
  },
  { $sort: { score: -1 } },
  { $limit: 10 },
];

const createCitySearchStages = (searchPattern: RegExp): PipelineStage[] => [
  {
    $match: {
      name: { $regex: searchPattern },
    },
  },
  {
    $addFields: {
      score: {
        $cond: [
          { $regexMatch: { input: "$name", regex: searchPattern } },
          3,
          0,
        ],
      },
    },
  },
  { $sort: { score: -1 } },
  { $limit: 10 },
];

const createCountrySearchStages = (searchPattern: RegExp): PipelineStage[] => [
  {
    $match: {
      $or: [
        { country: { $regex: searchPattern } },
        { countryisocode: { $regex: searchPattern } },
      ],
    },
  },
  {
    $addFields: {
      score: {
        $add: [
          {
            $cond: [
              { $regexMatch: { input: "$country", regex: searchPattern } },
              3,
              0,
            ],
          },
          {
            $cond: [
              {
                $regexMatch: { input: "$countryisocode", regex: searchPattern },
              },
              1,
              0,
            ],
          },
        ],
      },
    },
  },
  { $sort: { score: -1 } },
  { $limit: 10 },
];

export const search = async (query: string): Promise<SearchResult> => {
  const searchPattern = new RegExp(query, "i");
  logger.info(`Searching with pattern: ${searchPattern}`);

  const [hotels, cities, countries] = await Promise.all([
    HotelModel.aggregate(createSearchStages(searchPattern)),
    CityModel.aggregate(createCitySearchStages(searchPattern)),
    CountryModel.aggregate(createCountrySearchStages(searchPattern)),
  ]);

  logger.info("Search results:", {
    hotelCount: hotels.length,
    cityCount: cities.length,
    countryCount: countries.length,
  });

  return { hotels, cities, countries };
};
