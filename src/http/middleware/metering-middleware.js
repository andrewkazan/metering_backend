export const meteringMiddleware = async (ctx, next) => {
  const { method, url } = ctx.request;

  if (url.startsWith('/api')) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  }

  await next();
};
