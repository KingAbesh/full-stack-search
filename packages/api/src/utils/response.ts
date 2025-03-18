import { Response, Request } from "express";
import { HttpStatusCode } from "../enums/httpStatusCode";

interface IResponse<T> {
  response: Response;
  request?: Request;
  message?: string;
  data?: T;
  statusCode?: number;
}

interface IResponseUtils {
  success: <T>(
    response: Omit<IResponse<T>, "statusCode">
  ) => Response<unknown, Record<string, unknown>>;
  failure: <T>(
    response: Omit<IResponse<T>, "statusCode">
  ) => Response<unknown, Record<string, unknown>>;
  json: <T>(
    response: IResponse<T>
  ) => Response<unknown, Record<string, unknown>>;
}

export const ResponseUtils: IResponseUtils = {
  success<T>({ response, data, message }: Partial<IResponse<T>>) {
    return response!.status(HttpStatusCode.OK).json({
      message: message ?? "Success",
      data,
    });
  },
  failure<T>({ response, data, message }: Partial<IResponse<T>>) {
    return response!.status(HttpStatusCode.BadRequest).json({
      message: message ?? "Failed",
      data,
    });
  },
  json<T>({ response, data, message, statusCode }: IResponse<T>) {
    return response!.status(statusCode ?? HttpStatusCode.OK).json({
      message,
      data,
    });
  },
};
