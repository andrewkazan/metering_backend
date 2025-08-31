import mongoose from 'mongoose';
import { DeviceSchema } from '../../schemas/device-schema.js';
import { ApiError } from '../errors/api-error.js';

class DeviceService {
  async create({ name, model, IMEI, comment, sdsId }) {
    if (!name || !model || !IMEI || !comment || !sdsId) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, IMEI, sdsId or comment' });
    }

    const device = new DeviceSchema({ name, model, IMEI, comment, sdsId });

    await device.save();
    return device;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return device' });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw ApiError.BadRequest({ message: "It's not a valid Device id" });
    }

    const findSuchDevice = await DeviceSchema.findById(id);

    if (!findSuchDevice) {
      throw ApiError.BadRequest({ message: 'Has not such device' });
    }

    return findSuchDevice;
  }

  async update(id, { name, model, IMEI, comment, sdsId }) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return device' });
    }

    if (!name || !model || !IMEI || !comment || !sdsId) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, IMEI, sdsId or comment' });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw ApiError.BadRequest({ message: "It's not a valid Device id" });
    }

    const updatedDevice = await DeviceSchema.findByIdAndUpdate(
      id,
      { name, model, IMEI, comment, sdsId },
      { new: true },
    );

    if (!updatedDevice) {
      throw ApiError.BadRequest({ message: 'Has not such device' });
    }

    return updatedDevice;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete device' });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw ApiError.BadRequest({ message: "It's not a valid Device id" });
    }

    const deletedDevice = await DeviceSchema.findByIdAndDelete(id);

    if (!deletedDevice) {
      throw ApiError.BadRequest({ message: 'Has not such device' });
    }

    return deletedDevice;
  }

  async list() {
    const devices = await DeviceSchema.find();
    return [...devices];
  }
}

const instanceOfDeviceService = new DeviceService();
export { instanceOfDeviceService as DeviceService };
