import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { passport } from './pasport/passport.js';
import { router } from '../routes/routes.js';
import { meteringMiddleware } from './metering-middleware.js';
import config from 'config';
import { errorMiddleware } from './error-middleware.js';

const CLIENT_URL = config.get('app.clientURL');
const ENV = process.env.NODE_ENV;

export const applyMiddleware = (app) => {
  app.use(errorMiddleware);
  app.use(bodyParser());
  app.use(passport.initialize());

  if (ENV === 'development') {
    app.use(meteringMiddleware);
  }

  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    }),
  );
  app.use(router.middleware());
};
