import { ObjectSchema } from '../../schemas/object/object-schema.js';
import { ApiError } from '../errors/api-error.js';

class ObjectService {
  async create({ name, lat, lon, country, region, city, street, building, room, description }) {
    if (!name || !lat || !lon || !country || !region) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, lat, lon, country or region' });
    }

    const object = new ObjectSchema({ name, lat, lon, country, region, city, street, building, room, description });

    await object.save();
    return object;
  }

  async read(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for return object' });
    }

    const findSuchObject = await ObjectSchema.findById(id).populate('numSDSs');

    if (!findSuchObject) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return findSuchObject;
  }

  async update(id, { name, lat, lon, country, region, city, street, building, room, description }) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Has not object id for update' });
    }

    if (!name || !lat || !lon || !country || !region) {
      throw ApiError.BadRequest({ message: 'Has not required fields: name, lat, lon, country or region' });
    }

    const updatedObject = await ObjectSchema.findByIdAndUpdate(
      id,
      { name, lat, lon, country, region, city, street, building, room, description },
      { new: true },
    );

    if (!updatedObject) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return updatedObject;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest({ message: 'Need id for delete object' });
    }

    const deletedObject = await ObjectSchema.findByIdAndDelete(id);

    if (!deletedObject) {
      throw ApiError.BadRequest({ message: 'Has not such object' });
    }

    return deletedObject;
  }

  async list() {
    const objects = await ObjectSchema.find();
    return [...objects];
  }
}

const instanceOfObjectService = new ObjectService();
export { instanceOfObjectService as ObjectService };
