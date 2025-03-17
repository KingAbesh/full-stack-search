import { HttpStatusCode } from "../enums/httpStatusCode";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = HttpStatusCode.InternalServerError,
    public code?: string,
    public errors?: Record<string, any>[]
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors: Record<string, any>[]) {
    super(message, HttpStatusCode.BadRequest, "VALIDATION_ERROR", errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.NotFound, "NOT_FOUND");
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Unable to process request") {
    super(
      message,
      HttpStatusCode.InternalServerError,
      "UNABLE_TO_PROCESS_REQUEST"
    );
  }
}

export class DuplicateError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.Conflict, "DUPLICATE_ERROR");
  }
}

export default class DomainError extends Error {
  constructor(
    message: string,
    public statusCode: number = HttpStatusCode.BadRequest,
    public params?: Record<string, any>
  ) {
    super(message);
    this.name = "DomainError";
  }
}
