import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import APIError from '../errors/APIError';
import RequestValidationError from '../errors/RequestValidationError';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const defaultHandler = (err: APIError, req: Request, res: Response, next: NextFunction = undefined) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    stack: err.stack,
    errors: err.errors,
  };

  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const validator = (err: RequestValidationError, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;

  if (err instanceof RequestValidationError) {
    convertedError = new APIError({
      message: err.message,
      stack: err.stack,
      status: err.status,
      errors: err.errors,
    });
  }
  return defaultHandler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return defaultHandler(err, req, res);
};
