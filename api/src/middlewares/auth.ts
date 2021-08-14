import { UNAUTHORIZED } from 'http-status';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import APIError from '../errors/APIError';
import CurrentUser from '../models/CurrentUser';

const handleJWT =
  (req: Request, res: Response, next: NextFunction) => async (err: any, user: CurrentUser, info: any) => {
    console.log('In handle ', err, user, info, '\n');
    const error = err || info;
    console.log('Error ', typeof error);
    const apiError = new APIError({
      message: error ? error.message : 'Unauthorized',
      status: UNAUTHORIZED,
    });
    console.log('API error', apiError);

    try {
      if (error || !user) throw error;
    } catch (e) {
      return next(apiError);
    }

    req.currentUser = user;

    return next();
  };

export const ADMIN = 'admin';
export const LOGGED_USER = '_loggedUser';

export const authorize = () => (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, handleJWT(req, res, next))(req, res, next);
