import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: String,
  street: String,
  building: String,
  room: String,
  description: String,
  lastUpdate: String,
});

schema.virtual('numSDSs', {
  ref: 'SDS',
  localField: '_id',
  foreignField: 'object',
  count: true,
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export const ObjectSchema = model('Object', schema);
