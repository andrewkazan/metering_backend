import { UserModel } from '../../models/user/user-model.js';
import { TokenService } from './token-service.js';
import { MailService } from './mail-service.js';
import { NotAuthorized } from '../errors/not-authorized.js';
import { BadRequest } from '../errors/bad-request.js';
import { v4 as uuidv4 } from 'uuid';
import config from 'config';

const APP_URL = config.get('app.apiUrl');

class UserService {
  async registration(ctx, email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new BadRequest({ ctx, message: `User with email ${email} already exist` });
    }

    const activationLink = uuidv4();
    const user = new UserModel({ email, password, activationLink });

    await MailService.sendActivationMail(email, `${APP_URL}/api/activate/${activationLink}`);

    await user.save();
    return user;
  }

  async activate(ctx, activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw new BadRequest({ ctx, message: 'Not correct link of activation' });
    }

    user.isActivated = true;
    await user.save();
  }

  async login(ctx, email, password) {
    const logoutUser = await UserModel.login(email, password);

    if (!logoutUser) {
      throw new BadRequest({ ctx, message: 'Wrong login or password' });
    }

    const { isActivated = false } = logoutUser || {};

    if (!isActivated) {
      throw new BadRequest({ ctx, message: 'Confirm your email' });
    }

    const user = await UserModel.findOne({ email });
    const tokens = await TokenService.generateTokens(user);
    const { _id: userId, email: userEmail, isActivated: userActivated } = user || {};
    return { ...tokens, user: { userId, email: userEmail, isActivated: userActivated } };
  }

  async logout(ctx, refreshToken) {
    if (!refreshToken) {
      throw new NotAuthorized({ ctx, message: 'user already exit or not exist' });
    }

    return await TokenService.removeToken(refreshToken);
  }

  async refresh(ctx, refreshToken) {
    if (!refreshToken) {
      throw new NotAuthorized(ctx);
    }

    const validateToken = TokenService.validateAccessToken(refreshToken);

    if (!validateToken) {
      throw new NotAuthorized({ ctx });
    }

    const token = TokenService.removeToken(refreshToken);

    if (!token) {
      throw new BadRequest({ ctx, message: `User already exit or not exist` });
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
