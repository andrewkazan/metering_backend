const errorMiddleware = (ctx, status, message) => {
    ctx.status = status || 500;
    ctx.body = { message: message || 'Непредвиденная ошибка' };
};

export { errorMiddleware };
