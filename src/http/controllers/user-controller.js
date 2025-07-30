import { UserService } from '../service/user-service.js';
import config from 'config';

const APP_URL = config.get('app.clientURL');

class UserController {
  async registration(ctx) {
    const { email, password, name } = ctx.request.body;
    const user = await UserService.registration({ email, password, name });
    ctx.status = 201;
    ctx.body = { user, message: 'user was created' };
  }

  async login(ctx) {
    const { request: { body: { email, password } = {} } = {} } = ctx;
    const userData = await UserService.login(ctx, email, password);
    ctx.status = 201;
    ctx.body = userData;
  }

  async logout(ctx) {
    const { request: { body: { refreshToken } = {} } = {} } = ctx;
    const token = await UserService.logout(ctx, refreshToken);
    ctx.status = 201;
    ctx.body = { token, message: 'Logout' };
  }

  async activate(ctx) {
    const activationLink = ctx.params.link;
    await UserService.activate(ctx, activationLink);
    return ctx.redirect(APP_URL);
  }

  async refresh(ctx) {
    const { request: { body: { refreshToken } = {} } = {} } = ctx;
    const tokens = await UserService.refresh(ctx, refreshToken);
    ctx.status = 201;
    ctx.body = { ...tokens, message: 'New tokens' };
  }

  async list(ctx) {
    const users = await UserService.list();
    ctx.status = 200;
    ctx.body = users;
  }
}

const instanceOfUserController = new UserController();
export { instanceOfUserController as UserController };
