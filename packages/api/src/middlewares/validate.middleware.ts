import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationError } from "../errors/base.error";

type ValidationSource = "body" | "query" | "params";

export const validateRequest = (
  schema: Joi.ObjectSchema,
  source: ValidationSource = "body"
) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source], {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      throw new ValidationError(errorMessages.join(", "), error.details);
    }

    next();
  };
};
