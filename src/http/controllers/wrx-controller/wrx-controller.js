import { ApiError } from '../../errors/api-error.js';
import { isKoaContext } from '../../../utils/is-koa-ctx.js';

class WrxController {
  async handleRequest({ ctx, next, url, sendData, formatResponse }) {
    let options = {
      method: 'GET',
      headers: {},
    };

    if (sendData) {
      options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(sendData),
      };
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const formatedData = formatResponse ? formatResponse(data) : data;

      if (isKoaContext(ctx)) {
        if (formatedData) {
          ctx.status = 200;
          ctx.body = formatedData;
        } else {
          ctx.status = 404;
          ctx.body = { message: 'Wrx server is not available' };
        }
      } else {
        if (formatedData) {
          return formatedData;
        } else {
          return null;
        }
      }
    } catch (e) {
      next();
    }
  }

  test(ctx, next) {
    return this.handleRequest({ ctx, next, url: 'http://wrx_server:4000/uspd/test' });
  }

  list(ctx, next) {
    return this.handleRequest({ ctx, next, url: 'http://wrx_server:4000/uspd/list' });
  }

  info(ctx, next) {
    return this.handleRequest({ ctx, next, url: 'http://wrx_server:4000/uspd/info' });
  }

  sendCommand({ ctx, next, formatResponse }) {
    const { request: { body: { IMEI, command } } = {} } = ctx;

    if (!IMEI || !command) {
      throw ApiError.BadRequest({ message: 'Has not IMEI or command' });
    }

    return this.handleRequest({
      ctx,
      next,
      url: 'http://wrx_server:4000/sendCommand',
      sendData: { IMEI, command },
      formatResponse,
    });
  }
}

const instanceOfWrxController = new WrxController();
export { instanceOfWrxController as WrxController };
