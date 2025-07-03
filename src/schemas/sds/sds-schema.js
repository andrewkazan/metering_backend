import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
  object: { type: mongoose.Schema.Types.ObjectId, ref: 'Object', required: true },
  numDevices: Number,
  status: Boolean,
});

export const SdsSchema = mongoose.model('SDS', schema);
