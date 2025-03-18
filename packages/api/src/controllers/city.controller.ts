import { Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseUtils } from "../utils/response";
import { findCityById } from "../services/city.service";
import { cityRepo } from "../repositories/city.repository";

export const getCityById = asyncHandler(async (req, res: Response) => {
  const city = await findCityById(cityRepo, req.params.id);

  ResponseUtils.success({
    response: res,
    request: req,
    message: "City fetched successfully",
    data: city,
  });
});
