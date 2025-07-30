import { ApiError } from '../../errors/api-error.js';

class WrxController {
  async handleRequest(ctx, next, url, sendData) {
    const options = {
      method: 'GET',
      headers: {},
    };

    if (sendData) {
      options.headers = {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(sendData),
      };
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data) {
        ctx.status = 200;
        ctx.body = data;
      } else {
        ctx.status = 404;
        ctx.body = { message: 'Wrx server is not available' };
      }
    } catch (e) {
      next(e);
    }
  }

  async test(ctx, next) {
    return this.handleRequest(ctx, next, 'http://wrx_server:4000/test');
  }

  async list(ctx, next) {
    return this.handleRequest(ctx, next, 'http://wrx_server:4000/uspd/list');
  }

  async info(ctx, next) {
    return this.handleRequest(ctx, next, 'http://wrx_server:4000/uspd/info');
  }

  async sendCommand(ctx, next) {
    const { request: { body: { IMEI, command } } = {} } = ctx;

    if (!IMEI || !command) {
      throw ApiError.BadRequest({ message: 'Has not IMEI or command' });
    }

    return this.handleRequest(ctx, next, 'http://wrx_server:4000/sendCommand', { IMEI, command });
  }
}

const instanceOfWrxController = new WrxController();
export { instanceOfWrxController as WrxController };
