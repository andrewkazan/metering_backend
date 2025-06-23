import config from 'config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../../../../models/user/user-model.js';

const AUTH_JWT_SECRET = config.get('auth.jwt.secret');

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AUTH_JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.sub);

      if (!user) {
        return done(null, false, { message: 'Unauthorized' });
      }

      done(null, user);
    } catch (e) {
      done(e);
    }
  },
);

export { jwtStrategy };
