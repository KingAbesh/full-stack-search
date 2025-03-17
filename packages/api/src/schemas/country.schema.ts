import Joi from "joi";

export const getCountryByIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "Country ID is required",
      "any.required": "Country ID is required",
      "string.pattern.base": "Invalid country ID format",
    }),
});
