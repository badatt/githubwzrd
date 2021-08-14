import { ExtractJwt, Strategy } from 'passport-jwt';
import { publicDecrypt } from 'crypto';
import vars from './vars';

const jwtOptions = {
  secretOrKey: Buffer.from(vars.jwtSecret, 'base64').toString('utf-8'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const verifyJwt = async (payload: any, done: any) => {
  try {
    const decryptedPayload = publicDecrypt(
      Buffer.from(vars.jwtSecret, 'base64').toString('utf-8'),
      Buffer.from(payload.payload, 'base64'),
    );
    const userSessionData = JSON.parse(decryptedPayload.toString());
    const currentUser = { ...userSessionData, username: payload.sub };
    if (currentUser) return done(null, currentUser);
    return done(null, false);
  } catch (error) {
    console.log('verifyJWT ', error);
    return done(error, false);
  }
};

export const jwtStrategy = new Strategy(jwtOptions, verifyJwt);
