import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import APIError from '../errors/APIError';

export function requestHandler(asyncFunction: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFunction(req, res, next);
    } catch (e: any) {
      return next(new APIError({ message: e.message, status: INTERNAL_SERVER_ERROR }));
    }
  };
}
