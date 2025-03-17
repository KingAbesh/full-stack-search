import { Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseUtils } from "../utils/response";
import { search } from "../services/search.service";
import { ValidationError } from "../errors/base.error";

export const searchEntities = asyncHandler(async (req, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    throw new ValidationError("Search query is required", [{ query }]);
  }

  const results = await search(query);

  ResponseUtils.success({
    response: res,
    request: req,
    message: "Search completed successfully",
    data: results,
  });
});
