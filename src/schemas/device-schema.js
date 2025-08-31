import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  IMEI: { type: String, required: true },
  comment: { type: String, required: true },
  sdsId: { type: Schema.Types.ObjectId, ref: 'sds', required: true },
  status: {
    type: Boolean,
    default: false,
  },
});

export const DeviceSchema = model('Device', schema);
