import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  IMEI: { type: String, required: true },
  comment: { type: String, required: true },
  sdsId: { type: mongoose.Schema.Types.ObjectId, ref: 'sds', required: true },
  status: {
    type: Boolean,
    default: false,
  },
});

export const DeviceSchema = mongoose.model('Device', schema);
