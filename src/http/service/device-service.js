import { DeviceSchema } from '../../schemas/device/device-schema.js';
import { ApiError } from '../errors/api-error.js';

class DeviceService {
  async create({ name, model, IMEI, kind, comment }) {
    if (!name || !model || !IMEI || !kind || !comment) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, IMEI, kind or comment' });
    }

    const device = new DeviceSchema({ name, model, IMEI, kind, comment });

    await device.save();
    return device;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return device' });
    }

    const findSuchDevice = await DeviceSchema.findById(id);

    if (!findSuchDevice) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return findSuchDevice;
  }

  async update(deviceData) {
    if (!deviceData.name || !deviceData.model || !deviceData.IMEI || !deviceData.kind || !deviceData.comment) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, model, IMEI, kind or comment' });
    }

    const updatedDevice = await DeviceSchema.findByIdAndUpdate(deviceData.id, deviceData, { new: true });

    if (!updatedDevice) {
      throw ApiError.BadRequest({ message: 'Has not such device' });
    }

    return updatedDevice;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete device' });
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
