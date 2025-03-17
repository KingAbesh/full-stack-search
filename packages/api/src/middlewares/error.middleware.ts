import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import logger from "../utils/logger";
import { AppError, DatabaseError } from "../errors/base.error";
import DomainError from "../errors/base.error";
import { HttpStatusCode } from "../enums/httpStatusCode";

interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, any>[];
}

/**
 * Global error handling middleware for the application.
 * Processes different types of errors and returns a consistent error response format.
 *
 * Handles:
 * - AppError and its subclasses
 * - DomainError
 * - Unhandled errors
 *
 * @param err - The error object
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Express next function (unused)
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log error details
  logger.error({
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    path: req.path,
    method: req.method,
  });

  // Handle AppError and its subclasses
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      message: err.message,
      code: err.code,
    };

    if (err.errors) {
      response.errors = err.errors;
    }

    return res.status(err.statusCode).json(response);
  }

  // Handle DomainError
  if (err instanceof DomainError) {
    return res.status(err.statusCode).json({
      message: err.message,
      params: err.params,
    });
  }

  // Handle MongoDB errors by converting to DatabaseError
  if (err instanceof MongoError) {
    const dbError = new DatabaseError();
    return res.status(dbError.statusCode).json({
      message: dbError.message,
      code: dbError.code,
    });
  }

  // Handle all other unhandled errors
  return res.status(HttpStatusCode.InternalServerError).json({
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
