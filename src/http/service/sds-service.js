import { SDSModel } from '../../models/sds/sds-model.js';
import { ApiError } from '../errors/api-error.js';

class SDSService {
  async create({ name, model, phone, comment }) {
    if (!name || !model || !model || !phone || !comment) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, phone or comment' });
    }

    const SDS = new SDSModel({ name, model, phone, comment });

    await SDS.save();
    return SDS;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return SDS' });
    }

    const findSuchSDS = await SDSModel.findById(id);

    if (!findSuchSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return findSuchSDS;
  }

  async update(SDSData) {
    if (!SDSData.name || !SDSData.model || !SDSData.model || !SDSData.phone || !SDSData.comment) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, phone or comment' });
    }

    const updatedSDS = await SDSModel.findByIdAndUpdate(SDSData.id, SDSData, { new: true });

    if (!updatedSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return updatedSDS;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete SDS' });
    }

    const deletedSDS = await SDSModel.findByIdAndDelete(id);

    if (!deletedSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return deletedSDS;
  }

  async list() {
    const SDSs = await SDSModel.find();
    return [...SDSs];
  }
}

const instanceOfSDSService = new SDSService();
export { instanceOfSDSService as SDSService };
