import { Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseUtils } from "../utils/response";
import { findCountryById } from "../services/country.service";
import { countryRepo } from "../repositories/country.repository";

export const getCountryById = asyncHandler(async (req, res: Response) => {
  const country = await findCountryById(countryRepo, req.params.id);

  ResponseUtils.success({
    response: res,
    request: req,
    message: "Country fetched successfully",
    data: country,
  });
});
