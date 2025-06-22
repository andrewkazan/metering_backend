import config from 'config';
import mongoose from 'mongoose';

const ACCESS_TOKEN_EXPIRE = config.get('auth.jwt.accessTokenExpires');
const REFRESH_TOKEN_EXPIRE = config.get('auth.jwt.refreshTokenExpires');

const schema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    sub: String,
    ts: {
        type: Date,
        default: new Date()
    },
    userEmail: String
});

schema.index({ accessToken: 1, refreshToken: 2 });
schema.index({ ts: 1 }, { expires: ACCESS_TOKEN_EXPIRE });
schema.index({ ts: 2 }, { expires: REFRESH_TOKEN_EXPIRE });

export const TokenModel = mongoose.model('Token', schema);
