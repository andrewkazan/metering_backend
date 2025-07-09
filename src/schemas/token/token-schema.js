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
  refreshTokenTs: {
    type: Date,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

// TTL-индекс по refreshTokenTs — запись удалится ровно в тот момент, когда refreshTokenTs станет меньше текущей даты
// Параметр expires: 0 означает, что MongoDB удалит документы сразу после наступления времени, указанного в refreshTokenTs
schema.index({ refreshTokenTs: 1 }, { expires: 0 });

export const TokenSchema = mongoose.model('Token', schema);
