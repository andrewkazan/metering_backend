import { instanceOfMeteringDataService } from '../service/metering-data-service.js';

class MeteringDataController {
  async create(ctx) {
    const meteringDataItem = ctx.request.body;
    const meteringItem = await instanceOfMeteringDataService.create(meteringDataItem);
    ctx.status = 200;
    ctx.body = { meteringItem, message: 'Metering data item was created' };
  }

  async read(ctx) {
    const { id } = ctx.params;
    const meteringDataItem = await instanceOfMeteringDataService.read(id);
    ctx.status = 200;
    ctx.body = { meteringDataItem };
  }

  async update(ctx) {
    const { id } = ctx.params;
    const meteringDataItem = ctx.request.body;
    const meteringItem = await instanceOfMeteringDataService.update(id, meteringDataItem);
    ctx.status = 200;
    ctx.body = { meteringItem, message: 'Metering data item was updated' };
  }

  async delete(ctx) {
    const { id } = ctx.params;
    const meteringItem = await instanceOfMeteringDataService.delete(id);
    ctx.status = 200;
    ctx.body = { meteringItem, message: 'Metering data item was deleted' };
  }

  async list(ctx) {
    const { start, end } = ctx.query;
    const meteringDataList = await instanceOfMeteringDataService.list({ start, end });
    ctx.status = 200;
    ctx.body = meteringDataList;
  }
}

const instanceOfMeteringDataController = new MeteringDataController();
export { instanceOfMeteringDataController as MeteringDataController };
