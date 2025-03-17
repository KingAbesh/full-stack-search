import { Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseUtils } from "../utils/response";
import { findHotelById } from "../services/hotel.service";
import { hotelRepo } from "../repositories/hotel.repository";

export const getHotelById = asyncHandler(async (req, res: Response) => {
  const hotel = await findHotelById(hotelRepo, req.params.id);

  ResponseUtils.success({
    response: res,
    request: req,
    message: "Hotel fetched successfully",
    data: hotel,
  });
});
