import { SdsSchema } from '../../schemas/sds/sds-schema.js';
import { ApiError } from '../errors/api-error.js';

class SDSService {
  async create({ name, model, phone, comment }) {
    if (!name || !model || !model || !phone || !comment) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, phone or comment' });
    }

    const SDS = new SdsSchema({ name, model, phone, comment });

    await SDS.save();
    return SDS;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return SDS' });
    }

    const findSuchSDS = await SdsSchema.findById(id).populate('numSDSs');

    if (!findSuchSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return findSuchSDS;
  }

  async update(SDSData) {
    if (!SDSData.name || !SDSData.model || !SDSData.model || !SDSData.phone || !SDSData.comment) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, phone or comment' });
    }

    const updatedSDS = await SdsSchema.findByIdAndUpdate(SDSData.id, SDSData, { new: true });

    if (!updatedSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return updatedSDS;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete SDS' });
    }

    const deletedSDS = await SdsSchema.findByIdAndDelete(id);

    if (!deletedSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return deletedSDS;
  }

  async list() {
    const SDSs = await SdsSchema.find();
    return [...SDSs];
  }
}

const instanceOfSDSService = new SDSService();
export { instanceOfSDSService as SDSService };
