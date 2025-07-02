import { UserModel } from '../../models/user/user-model.js';
import { TokenService } from './token-service.js';
import { MailService } from './mail-service.js';
import { ApiError } from '../errors/api-error.js';
import { v4 as uuidv4 } from 'uuid';
import config from 'config';

const APP_URL = config.get('app.apiUrl');

class UserService {
  async registration({ email, password, name }) {
    if (!email || !password || !name) {
      throw ApiError.BadRequest({ message: 'Has not required field: email, password or name' });
    }

    const findSuchUser = await UserModel.findOne({ email });

    if (findSuchUser) {
      throw ApiError.BadRequest({ message: `User with email ${email} already exist` });
    }

    const activationLink = uuidv4();
    const user = new UserModel({ email, password, name, activationLink });

    // TODO make mail service
    // await MailService.sendActivationMail(email, `${APP_URL}/api/activate/${activationLink}`);

    await user.save();
    return user;
  }

  async activate(ctx, activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest({ message: 'Not correct link of activation' });
    }

    user.isActivated = true;

    await user.save();
  }

  async login(ctx, email, password) {
    if (!email || !password) {
      throw ApiError.BadRequest({ message: "Hasn't email or password" });
    }

    const logoutUser = await UserModel.login({ email, password });

    if (!logoutUser) {
      throw ApiError.BadRequest({ message: "Hasn't such user" });
    }

    const { isActivated = false } = logoutUser || {};

    if (!isActivated) {
      throw ApiError.BadRequest({ message: 'Confirm your email' });
    }

    // Тут ищем есть ли уже токены у этого пользователя? Если есть, удаляем из списка токенов, делаем новые и отправляем ему

    const user = await UserModel.findOne({ email });
    const tokens = await TokenService.generateTokens(user);
    const { _id: userId, email: userEmail, isActivated: userActivated } = user || {};
    return { ...tokens, user: { userId, email: userEmail, isActivated: userActivated } };
  }

  async logout(ctx, refreshToken) {
    if (!refreshToken) {
      throw new ApiError.BadRequest({ ctx, message: 'user already exit or not exist' });
    }

    return await TokenService.removeToken(refreshToken);
  }

  async refresh(ctx, refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const validateToken = TokenService.validateToken(refreshToken);

    if (!validateToken) {
      throw ApiError.Unauthorized();
    }

    const token = TokenService.removeToken(refreshToken);

    if (!token) {
      throw ApiError.BadRequest({ message: `User already exit or not exist` });
    }

    const user = await UserModel.findOne({ id: token.sub });
    return await TokenService.generateTokens(user);
  }

  async getUsers() {
    const users = await UserModel.find();
    return [...users];
  }
}

const instanceOfUserService = new UserService();
export { instanceOfUserService as UserService };
