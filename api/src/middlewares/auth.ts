import { UNAUTHORIZED } from 'http-status';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import APIError from '../errors/APIError';
import CurrentUser from '../models/CurrentUser';

const handleJWT =
  (req: Request, res: Response, next: NextFunction) => async (err: any, user: CurrentUser, info: any) => {
    const error = err || info;
    const apiError = new APIError({
      message: error ? error.message : 'Unauthorized',
      status: UNAUTHORIZED,
    });

    try {
      if (error || !user) throw error;
    } catch (e) {
      return next(apiError);
    }

    req.currentUser = user;
    req.body.cursor = req.query['_c'];

    return next();
  };

export const ADMIN = 'admin';
export const LOGGED_USER = '_loggedUser';

export const authorize = () => (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, handleJWT(req, res, next))(req, res, next);
