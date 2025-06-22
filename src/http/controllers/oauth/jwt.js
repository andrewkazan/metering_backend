import passport from 'koa-passport';

const jwtPassport = passport.authenticate('jwt', { session: false });

export { jwtPassport };
