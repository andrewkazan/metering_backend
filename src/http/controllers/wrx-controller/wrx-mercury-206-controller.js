import { ApiError } from '../../errors/api-error.js';
import { wrxCommands } from './wrx.config.js';
import { WrxController } from './wrx-controller.js';
import * as Utils from './wrx.utils.js';

class WrxMercury206Controller {
  handelRequest({ ctx, next, formatResponse }) {
    const { request: { body: { IMEI } } = {} } = ctx;

    if (!IMEI) {
      throw ApiError.BadRequest({ message: 'Has not IMEI for use' });
    }

    return WrxController.sendCommand.bind(WrxController)({ ctx, next, formatResponse });
  }

  getDateTime(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['dateTime'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parseDateTime });
  }

  getLimitPower(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['limitPower'],
    };

    this.handelRequest({ ctx, next });
  }

  async getLimitEnergy(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['limitEnergy'],
    };

    this.handelRequest({ ctx, next });
  }

  async getPowerReading(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['powerReading'],
    };

    this.handelRequest({ ctx, next });
  }

  async getValueOfEnergy(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['valueOfEnergy'],
    };

    this.handelRequest({ ctx, next });
  }

  async getBatteryVoltage(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: wrxCommands['batteryVoltage'],
    };

    this.handelRequest({ ctx, next });
  }
}

const instanceOfWrxMercury206Controller = new WrxMercury206Controller();
export { instanceOfWrxMercury206Controller as WrxMercury206Controller };
