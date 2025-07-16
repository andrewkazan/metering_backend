import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  userId: String,
  userEmail: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TokenSchema = mongoose.model('Token', schema);
