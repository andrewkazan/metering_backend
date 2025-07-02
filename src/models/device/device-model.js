import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  IMEI: {
    type: String,
    required: true,
  },
  sds: String,
  comment: {
    type: String,
    required: true,
  },
  status: Boolean,
});

export const DeviceModel = mongoose.model('Device', schema);
