import Router from '@koa/router';
import { UserController } from '../controllers/user-controller.js';
import { jwtPassport } from '../controllers/oauth/jwt.js';

const router = new Router({ prefix: '/api' });

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/registration', UserController.registration);
router.post('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activate);
router.get('/users', jwtPassport, UserController.getUsers);

export { router };
