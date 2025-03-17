import { Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseUtils } from "../utils/response";
import { search } from "../services/search.service";

export const searchEntities = asyncHandler(async (req, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    throw new Error("Search query is required");
  }

  const results = await search(query);

  ResponseUtils.success({
    response: res,
    request: req,
    message: "Search completed successfully",
    data: results,
  });
});
