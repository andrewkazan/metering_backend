import Koa from 'koa';
import path from 'path';
import koaStatic from 'koa-static';
import koaBodyParser from 'koa-bodyparser';
import { router } from '../http/routes/routes.js';
import { applyMiddleware } from '../http/middleware/apply-middleware.js';

const app = new Koa();

applyMiddleware(app);

app.use(koaStatic(path.join(path.dirname(new URL(import.meta.url).pathname), 'public')));
app.use(koaBodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
