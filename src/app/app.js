import Koa from 'koa';
import path from 'path';
import koaStatic from 'koa-static';
import koaBodyParser from 'koa-bodyparser';
import { router } from '../http/routes/routes.js';
import { applyMiddleware } from '../http/middleware/apply-middleware.js';
import passport from 'koa-passport';
import { instanceOfJWTStrategy } from '../http/controllers/oauth/jwt.js';

passport.use(instanceOfJWTStrategy);

export const app = new Koa();

applyMiddleware(app);

app.use(koaStatic(path.join(path.dirname(new URL(import.meta.url).pathname), 'public')));
app.use(koaBodyParser());
app.use(router.routes()).use(router.allowedMethods());
