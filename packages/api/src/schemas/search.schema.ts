import Joi from "joi";

export const searchSchema = Joi.object({
  query: Joi.string().required().min(2).messages({
    "string.empty": "Search query is required",
    "string.min": "Search query must be at least 2 characters long",
    "any.required": "Search query is required",
  }),
});
