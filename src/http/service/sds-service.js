import { SdsSchema } from '../../schemas/sds-schema.js';
import { ApiError } from '../errors/api-error.js';
import mongoose from 'mongoose';

class SDSService {
  async create({ name, model, phone, comment, objectId }) {
    if (!name || !model || !phone || !comment || !objectId) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, phone, comment or objectId' });
    }

    const SDS = new SdsSchema({ name, model, phone, comment, objectId });
    await SDS.save();

    return SDS;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return SDS' });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw ApiError.BadRequest({ message: "It's not a valid SDSs id" });
    }

    const findSuchSDS = await SdsSchema.findById(id).populate('numDevices');

    if (!findSuchSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return findSuchSDS;
  }

  async update(id, { name, model, phone, comment, objectId }) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Has not SDSs id for update' });
    }

    if (!name || !model || !phone || !comment || !objectId) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, phone, comment or objectId' });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw ApiError.BadRequest({ message: "It's not a valid SDSs id" });
    }

    const updatedSDS = await SdsSchema.findByIdAndUpdate(id, { name, model, phone, comment, objectId }, { new: true });

    if (!updatedSDS) {
      throw ApiError.BadRequest({ message: 'Has not such SDS' });
    }

    return updatedSDS;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete SDS' });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw ApiError.BadRequest({ message: "It's not a valid SDSs id" });
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
