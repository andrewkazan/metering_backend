import config from 'config';
import jwt from 'jsonwebtoken';
import { TokenModel } from '../../models/token/token-model.js';
import { UserModel } from '../../models/user/user-model.js';

const TOKEN_SECRET = config.get('auth.jwt.secret');
const TOKEN_ALGORITHM = config.get('auth.jwt.algorithm');
const ACCESS_TOKEN_EXPIRE_IN = config.get('auth.jwt.accessTokenExpires');
const REFRESH_TOKEN_EXPIRE_IN = config.get('auth.jwt.refreshTokenExpires');

class TokenService {
  async generateTokens(user) {
    const accessToken = jwt.sign({ sub: user.id }, TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      expiresIn: ACCESS_TOKEN_EXPIRE_IN,
    });

    const refreshToken = jwt.sign({ sub: user.id }, TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      expiresIn: REFRESH_TOKEN_EXPIRE_IN,
    });

    await TokenModel.create({
      accessToken,
      refreshToken,
      sub: user.id,
      userEmail: user.email,
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(accessToken, refreshToken) {
    const token = await TokenModel.findOne({ accessToken, refreshToken }).exec();

    if (token) {
      const user = await UserModel.findById(token.sub);
      const [accessToken, refreshToken] = await this.generateTokens(user);
      return [accessToken, refreshToken];
    } else {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const removedToken = await TokenModel.findOneAndDelete({ refreshToken }).exec();

    if (removedToken) {
      const { refreshToken } = removedToken || {};
      return refreshToken;
    } else {
      return null;
    }
  }

  validateToken(token) {
    try {
      return jwt.verify(token, TOKEN_SECRET);
    } catch (e) {
      return null;
    }
  }
}

const instanceOfTokenService = new TokenService();
export { instanceOfTokenService as TokenService };
