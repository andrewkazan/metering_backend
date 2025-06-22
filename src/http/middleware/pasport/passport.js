import passport from 'koa-passport';
import { strategies } from './strategies/strategies.js';

const { jwt } = strategies;

passport.use(jwt);

export { passport };
