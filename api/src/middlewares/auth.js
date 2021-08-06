const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../errors/api-error');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
  });

  try {
    if (error || !user) throw error;
  } catch (e) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = () => (req, res, next) =>
  passport.authenticate('jwt', { session: false }, handleJWT(req, res, next))(req, res, next);
