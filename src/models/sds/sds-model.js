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
  phone: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  object: String,
  status: Boolean,
});

export const SDSModel = mongoose.model('SDS', schema);
