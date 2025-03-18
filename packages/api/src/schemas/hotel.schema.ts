import Joi from "joi";

export const getHotelByIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "Hotel ID is required",
      "any.required": "Hotel ID is required",
      "string.pattern.base": "Invalid hotel ID format",
    }),
});
