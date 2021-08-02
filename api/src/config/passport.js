const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');

const jwtOptions = {
  secretOrKey: Buffer.from(jwtSecret, 'base64').toString('utf-8'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    console.log(payload);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
