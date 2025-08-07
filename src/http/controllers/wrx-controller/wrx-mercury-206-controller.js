import { ApiError } from '../../errors/api-error.js';
import { wrxCommands } from './wrx.config.js';
import { WrxController } from './wrx-controller.js';

class WrxMercury206Controller {
  async handelRequest(ctx, next) {
    const { request: { body: { IMEI } } = {} } = ctx;

    if (!IMEI) {
      throw ApiError.BadRequest({ message: 'Has not IMEI for use' });
    }

    return WrxController.sendCommand.bind(WrxController)(ctx, next, 'http://wrx_server:4000/sendCommand');
  }

  async getDateTime(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['dateTime'],
    };

    return this.handelRequest(ctx, next);
  }

  async getLimitPower() {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['limitPower'],
    };

    return this.handelRequest(ctx, next);
  }

  async getLimitEnergy(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['limitEnergy'],
    };

    return this.handelRequest(ctx, next);
  }

  async getPowerReading(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['powerReading'],
    };

    return this.handelRequest(ctx, next);
  }

  async getValueOfEnergy(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['valueOfEnergy'],
    };

    return this.handelRequest(ctx, next);
  }

  async getBatteryVoltage(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['batteryVoltage'],
    };

    return this.handelRequest(ctx, next);
  }
}

const instanceOfWrxMercury206Controller = new WrxMercury206Controller();
export { instanceOfWrxMercury206Controller as WrxMercury206Controller };
