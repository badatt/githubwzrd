import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ValidationError } from 'express-validation';
import APIError from '../errors/APIError';
import { IExtendableError } from '../errors/ExtendableError';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const defaultHandler = (err: any, req: Request, res: Response, next: NextFunction = undefined) => {
  console.log('converter --------', err);
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status);
  res.json(response);
};

export const handler = defaultHandler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (err: any, req: Request, res: Response, next: NextFunction = undefined) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      stack: err.error,
      status: err.statusCode,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
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
