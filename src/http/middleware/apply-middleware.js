import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { passport } from './pasport/passport.js';
import { router } from '../routes/routes.js';
import { router as routerMetering } from '../middleware/metering-middleware.js';
import config from 'config';
import { errorMiddleware } from './error-middleware.js';

const CLIENT_URL = config.get('app.clientURL');

export const applyMiddleware = (app) => {
    app.use(bodyParser());
    app.use(passport.initialize());
    app.use(
        cors({
            origin: CLIENT_URL,
            credentials: true
        })
    );
    app.use(routerMetering.middleware());
    app.use(router.middleware());
    app.use(errorMiddleware);
};
