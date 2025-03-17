import Joi from "joi";

export const getCityByIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "City ID is required",
      "any.required": "City ID is required",
      "string.pattern.base": "Invalid city ID format",
    }),
});
