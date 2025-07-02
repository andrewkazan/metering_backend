import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
  numDevices: Number,
  lastUpdate: String,
});

export const ObjectModel = mongoose.model('Object', schema);
