import Router from '@koa/router';

const router = new Router();

router.get('/', (ctx, next) => {
    console.log('--- get - ctx ---', ctx);
    next();
});

router.post('/', (ctx, next) => {
    console.log('--- post - ctx ---', ctx);
    next();
});

export { router };
