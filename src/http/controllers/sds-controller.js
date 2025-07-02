import { SDSService } from '../service/sds-service.js';
import { ApiError } from '../errors/api-error.js';

class SDSController {
  async create(ctx) {
    const { SDSData } = ctx.request.body;
    const SDS = await SDSService.create(SDSData);
    ctx.status = 201;
    ctx.body = { SDS, message: 'SDS was created' };
  }

  async read(ctx) {
    const { id } = ctx.params;
    const SDS = await SDSService.read(id);
    ctx.status = 201;
    ctx.body = { SDS };
  }

  async update(ctx) {
    const { SDSData } = ctx.request.body;
    const SDS = await SDSService.update(SDSData);
    ctx.status = 201;
    ctx.body = { SDS, message: 'SDS was updated' };
  }

  async delete(ctx) {
    const { id } = ctx.params;
    const SDS = await SDSService.delete(id);
    ctx.status = 201;
    ctx.body = { SDS, message: 'SDS was deleted' };
  }

  async list(ctx) {
    if (!ctx.isAuthenticated()) {
      throw ApiError.Unauthorized();
    }

    const SDSs = await SDSService.list();
    ctx.status = 200;
    ctx.body = SDSs;
  }
}

const instanceOfSDSController = new SDSController();
export { instanceOfSDSController as SDSController };
