const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { publicDecrypt } = require('crypto');
const { jwtSecret, userSessionTable } = require('./vars');
const logger = require('../config/logger');

const jwtOptions = {
  secretOrKey: Buffer.from(jwtSecret, 'base64').toString('utf-8'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const decryptedPayload = publicDecrypt(
      Buffer.from(jwtSecret, 'base64').toString('utf-8'),
      Buffer.from(payload.payload, 'base64'),
    );
    const userSessionData = JSON.parse(decryptedPayload.toString());
    const user = { ...userSessionData, username: payload.sub };
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
