const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');
const logger = require('../config/logger');

const jwtOptions = {
  secretOrKey: Buffer.from(jwtSecret, 'base64').toString('utf-8'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const user = { userId: payload.userId, username: payload.sub, org: payload.org }; // TODO Get user from User table
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
