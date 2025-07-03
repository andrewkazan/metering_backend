import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  IMEI: { type: String, required: true },
  comment: { type: String, required: true },
  sds: { type: mongoose.Schema.Types.ObjectId, ref: 'SDS', required: true },
  status: Boolean,
});

export const DeviceSchema = mongoose.model('Device', schema);
