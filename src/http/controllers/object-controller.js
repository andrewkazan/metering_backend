import { ObjectService } from '../service/object-service.js';

class ObjectController {
  async create(ctx) {
    const objectData = ctx.request.body;
    const object = await ObjectService.create(objectData);
    ctx.status = 200;
    ctx.body = { object, message: 'object was created' };
  }

  async read(ctx) {
    const { id } = ctx.params;
    const object = await ObjectService.read(id);
    ctx.status = 200;
    ctx.body = { object };
  }

  async update(ctx) {
    const { id } = ctx.params;
    const objectData = ctx.request.body;
    const object = await ObjectService.update(id, objectData);
    ctx.status = 200;
    ctx.body = { object, message: 'object was updated' };
  }

  async delete(ctx) {
    const { id } = ctx.params;
    const object = await ObjectService.delete(id);
    ctx.status = 200;
    ctx.body = { object, message: 'object was deleted' };
  }

  async list(ctx) {
    const objects = await ObjectService.list();
    ctx.status = 200;
    ctx.body = objects;
  }
}

const instanceOfObjectController = new ObjectController();
export { instanceOfObjectController as ObjectController };
