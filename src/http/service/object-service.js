import { ObjectModel } from '../../models/object/object-model.js';
import { ApiError } from '../errors/api-error.js';

class ObjectService {
  async create({ name, lat, lon, country, region }) {
    if (!name || !lat || !lon || !country || !region) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, lat, lon, country or region' });
    }

    const object = new ObjectModel({ name, lat, lon, country, region });

    await object.save();
    return object;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return object' });
    }

    const findSuchObject = await ObjectModel.findById(id);

    if (!findSuchObject) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return findSuchObject;
  }

  async update(objectData) {
    if (!objectData.name || !objectData.lat || !objectData.lon || !objectData.country || !objectData.region) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, lat, lon, country or region' });
    }

    const updatedObject = await ObjectModel.findByIdAndUpdate(objectData.id, objectData, { new: true });

    if (!updatedObject) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return updatedObject;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete object' });
    }

    const deletedObject = await ObjectModel.findByIdAndDelete(id);

    if (!deletedObject) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return deletedObject;
  }

  async list() {
    const objects = await ObjectModel.find();
    return [...objects];
  }
}

const instanceOfObjectService = new ObjectService();
export { instanceOfObjectService as ObjectService };
