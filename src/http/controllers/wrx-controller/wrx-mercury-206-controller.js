import config from 'config';
import { ApiError } from '../../errors/api-error.js';
import { mercury206Commands } from './wrx.config.js';
import { WrxController } from './wrx-controller.js';
import * as Utils from './wrx.utils.js';
import { resultDefault } from './wrx.config.js';
import { awaiter } from '../../../utils/awaiter.js';

const MERCURY_206_RN_IMEI = config.get('mercuryMeter.206RNIMEI');
const WAIT_METERING_TIME = 60 * 1000;
const POLLING_GAP = 10 * 60 * 1000;

class WrxMercury206Controller {
  pollingInterval;

  constructor() {}

  handlePolling(ctx) {
    const pollingFlag = ctx.request?.body?.pollingFlag;

    console.log(new Date(), `Is polling complex request: ${pollingFlag}`);

    if (pollingFlag) {
      // call one time complex request immediately from start
      this.complexRequestMercury206();
      this.pollingInterval = setInterval(() => {
        this.complexRequestMercury206();
      }, POLLING_GAP);
    } else {
      clearInterval(this.pollingInterval);
    }

    ctx.status = 200;
    ctx.body = { setPollingFlag: pollingFlag };
  }

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
      command: mercury206Commands['dateTime'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parseDateTime });
  }

  getLimitPower(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: mercury206Commands['limitPower'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parseLimitsPower });
  }

  getLimitEnergy(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: mercury206Commands['limitEnergy'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parseLimitEnergy });
  }

  getPowerReading(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: mercury206Commands['powerReading'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parsePowerReading });
  }

  getValueOfEnergy(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: mercury206Commands['valueOfEnergy'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parseValueOfEnergy });
  }

  getBatteryVoltage(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: mercury206Commands['batteryVoltage'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parseBatteryVoltage });
  }

  getPowerNetParameters(ctx, next) {
    ctx.request.body = {
      ...ctx.request.body,
      command: mercury206Commands['powerNetParameters'],
    };

    return this.handelRequest({ ctx, next, formatResponse: Utils.parsePowerNetParameters });
  }

  async complexRequestMercury206() {
    const ctx = { request: { body: { IMEI: MERCURY_206_RN_IMEI } } };
    const result = { ...resultDefault };

    // get active sds list
    const wrxList = await WrxController.list.bind(WrxController)({ ctx });
    const hasTarget = Array.isArray(wrxList) && wrxList.some((wrx) => wrx.IMEI === MERCURY_206_RN_IMEI);
    // if it has not sds list or sds list has not such IMEI, stop
    if (!hasTarget) {
      return result;
    }

    const steps = [
      { label: 'dateTime', method: this.getDateTime },
      { label: 'limitPower', method: this.getLimitPower },
      { label: 'limitEnergy', method: this.getLimitEnergy },
      { label: 'powerReading', method: this.getPowerReading },
      { label: 'valueOfEnergy', method: this.getValueOfEnergy },
      { label: 'batteryVoltage', method: this.getBatteryVoltage },
      { label: 'powerNetParameters', method: this.getPowerNetParameters },
    ];

    for (const { label, method } of steps) {
      try {
        console.log(new Date(), `Complex request for "${label}" | imei: ${MERCURY_206_RN_IMEI}`);
        const response = await method.call(this, ctx);

        if (response) {
          if (response.hasOwnProperty('error') && response.error) {
            result[label].error = response;
          } else {
            console.log(new Date(), `Complex answer for "${label}": Ok | imei: ${MERCURY_206_RN_IMEI}`);
            result[label].data = response;
          }
        }
      } catch (e) {
        console.log(new Date(), `Complex answer for "${label}": Fail | imei: ${MERCURY_206_RN_IMEI} | error: ${e}`);
        result[label].error = e.message || String(e);
      }

      await awaiter(WAIT_METERING_TIME);
    }

    return result;
  }
}

const instanceOfWrxMercury206Controller = new WrxMercury206Controller();
export { instanceOfWrxMercury206Controller as WrxMercury206Controller };
