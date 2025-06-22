class TestController {
  async test(ctx, next) {
    try {
      ctx.status = 200;
      ctx.body = { message: 'Service OK' };
    } catch (e) {
      next(e);
    }
  }
}

const instanceOfTestController = new TestController();
export { instanceOfTestController as TestController };
