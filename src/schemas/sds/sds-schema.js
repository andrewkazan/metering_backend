import mongoose from 'mongoose';

// SDS (Smart Distributed System) — промышленная сетевая шина

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: 'object', required: true },
  status: {
    type: Boolean,
    default: false,
  },
});

schema.virtual('numDevices', {
  ref: 'Device',
  localField: '_id',
  foreignField: 'sds',
  count: true,
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export const SdsSchema = mongoose.model('SDS', schema);
