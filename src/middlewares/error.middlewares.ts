import {
  Request,
  Response,
  NextFunction,
} from "express";
import {
  APIError,
  errorHandler,
} from "~/utils/error";

const { isTrustedError, handleError } =
  errorHandler;

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isTrustedError(err)) {
    handleError(err);
    next();
  }

  if (err instanceof APIError) {
    res.status(err.httpCode).json({
      name: err.name,
      message: err.message,
      cause: err.cause,
    });
  }
  next();
};

export default errorMiddleware;
