import passport from 'koa-passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import { TokenSchema } from '../../../schemas/token-schema.js';

const TOKEN_SECRET = config.get('auth.jwt.secret');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET,
};

export const instanceOfJWTStrategy = new JwtStrategy(opts, async function (userData, done) {
  const { userId } = userData;

  const findUserByToken = await TokenSchema.findOne({ userId });

  if (findUserByToken) {
    return done(null, findUserByToken);
  }

  return done(null, false);
});

// This function is using like middleware for check access to route
export const jwtPassport = passport.authenticate('jwt', { session: false });
