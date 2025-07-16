import { DeviceService } from '../service/device-service.js';
import { ApiError } from '../errors/api-error.js';

class DeviceController {
  async create(ctx) {
    const deviceData = ctx.request.body;
    const device = await DeviceService.create(deviceData);
    ctx.status = 201;
    ctx.body = { device, message: 'device was created' };
  }

  async read(ctx) {
    const { id } = ctx.params;
    const device = await DeviceService.read(id);
    ctx.status = 201;
    ctx.body = { device };
  }

  async update(ctx) {
    const { id } = ctx.params;
    const deviceData = ctx.request.body;
    const device = await DeviceService.update(id, deviceData);
    ctx.status = 201;
    ctx.body = { device, message: 'device was updated' };
  }

  async delete(ctx) {
    const { id } = ctx.params;
    const device = await DeviceService.delete(id);
    ctx.status = 201;
    ctx.body = { device, message: 'device was deleted' };
  }

  async list(ctx) {
    if (!ctx.isAuthenticated()) {
      throw ApiError.Unauthorized();
    }

    const devices = await DeviceService.list();
    ctx.status = 200;
    ctx.body = devices;
  }
}

const instanceOfDeviceController = new DeviceController();
export { instanceOfDeviceController as DeviceController };
