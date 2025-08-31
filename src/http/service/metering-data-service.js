import { MeteringDataItemSchema } from '../../schemas/metering-data-schema.js';
import mongoose from 'mongoose';
import { ApiError } from '../errors/api-error.js';

export class MeteringDataService {
  async create(data) {
    const { dateTime, limitPower, limitEnergy, powerReading, valueOfEnergy, batteryVoltage, powerNetParameters } = data;

    if (
      !dateTime ||
      !limitPower ||
      !limitEnergy ||
      !powerReading ||
      !valueOfEnergy ||
      !batteryVoltage ||
      !powerNetParameters
    ) {
      console.error(new Date(), 'Has not required metering item data for save');
    }

    const meteringData = await MeteringDataItemSchema.create(data);
    await meteringData.save();
    return meteringData;
  }

  async read(id) {
    if (!id) {
      console.error(new Date(), 'Has not id for get metering item');
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      console.error(new Date(), "It's not a valid metering item id");
    }

    const findSuchMeteringItem = await MeteringDataItemSchema.findById(id);

    if (!findSuchMeteringItem) {
      console.error(new Date(), 'Has not such metering item');
    }

    return findSuchObject;
  }

  async update(id, data) {
    if (!id) {
      console.error(new Date(), 'Has not id for update metering item');
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      console.error(new Date(), "It's not a valid metering item id");
    }

    const { dateTime, limitPower, limitEnergy, powerReading, valueOfEnergy, batteryVoltage, powerNetParameters } = data;

    if (
      !dateTime ||
      !limitPower ||
      !limitEnergy ||
      !powerReading ||
      !valueOfEnergy ||
      !batteryVoltage ||
      !powerNetParameters
    ) {
      console.error(new Date(), 'Has not required metering item data for update');
    }

    const updatedMeteringItem = await MeteringDataItemSchema.findByIdAndUpdate(id, data, { new: true });

    if (!updatedMeteringItem) {
      console.error(new Date(), 'Has not such metering item for update');
    }

    return updatedMeteringItem;
  }

  async delete(id) {
    if (!id) {
      console.error(new Date(), 'Has not id for delete metering item');
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      console.error(new Date(), "It's not a valid metering item id");
    }

    const deletedMeteringItem = await MeteringDataItemSchema.findByIdAndDelete(id);

    if (!deletedMeteringItem) {
      throw ApiError.BadRequest({ message: 'Has not such metering item' });
    }

    return deletedMeteringItem;
  }

  async list({ start, end }) {
    if (!start || !end) {
      console.error(new Date(), 'Has not start or end for get metering item list');
    }

    return await MeteringDataItemSchema.find({
      createdAt: { $gte: start, $lt: end },
    }).lean();
  }
}

export const instanceOfMeteringDataService = new MeteringDataService();
