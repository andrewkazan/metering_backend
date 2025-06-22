import { UserService } from '../service/user-service.js';
import { NotAuthorized } from '../errors/not-authorized.js';
import config from 'config';

const APP_URL = config.get('app.clientURL');

class UserController {
  async registration(ctx, next) {
    try {
      const { email, password } = ctx.request.body;
      const user = await UserService.registration(ctx, email, password);
      ctx.status = 201;
      ctx.body = { user, message: 'user was created' };
    } catch (e) {
      next(e);
    }
  }

  async login(ctx, next) {
    try {
      const { request: { body: { email, password } = {} } = {} } = ctx;
      const userData = await UserService.login(ctx, email, password);
      ctx.status = 201;
      ctx.body = userData;
    } catch (e) {
      next(e);
    }
  }

  async logout(ctx, next) {
    try {
      const { request: { body: { refreshToken } = {} } = {} } = ctx;
      const token = await UserService.logout(ctx, refreshToken);
      ctx.status = 201;
      ctx.body = { token, message: 'Logout' };
    } catch (e) {
      next(e);
    }
  }

  async activate(ctx, next) {
    try {
      const activationLink = ctx.params.link;
      await UserService.activate(ctx, activationLink);
      return ctx.redirect(APP_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(ctx, next) {
    try {
      const { request: { body: { refreshToken } = {} } = {} } = ctx;
      const tokens = await UserService.refresh(ctx, refreshToken);
      ctx.status = 201;
      ctx.body = { ...tokens, message: 'New tokens' };
    } catch (e) {
      next(e);
    }
  }

  async getUsers(ctx) {
    if (!ctx.isAuthenticated()) {
      throw new NotAuthorized(ctx);
    }

    const users = await UserService.getUsers();
    ctx.status = 200;
    ctx.body = users;
  }
}

const instanceOfUserController = new UserController();
export { instanceOfUserController as UserController };
