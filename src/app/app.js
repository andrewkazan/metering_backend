import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';

const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const router = new Router({ prefix: '/api' });

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status) {
            ctx.status = err.status;
            ctx.body = { error: err.message };
        } else {
            console.error(err);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
});

app.use(router.routes());

export default app;
