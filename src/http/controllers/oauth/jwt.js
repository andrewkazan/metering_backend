import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import { TokenModel } from '../../../models/token/token-model.js';

const TOKEN_SECRET = config.get('auth.jwt.secret');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET,
};

export const instanceOfJWTStrategy = new JwtStrategy(opts, async function (userData, done) {
  // sub = userID
  const { sub } = userData;

  const findUserByToken = await TokenModel.findOne({ sub });

  console.log('--- findUserByToken ---', findUserByToken);

  if (findUserByToken) {
    return done(null, findUserByToken);
  }

  return done(null, false);
});

// This function is using like middleware for check access to route
export const jwtPassport = passport.authenticate('jwt', { session: false });
