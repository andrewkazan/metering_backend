import Router from '@koa/router';
import { UserController } from '../controllers/user-controller.js';
import { TestController } from '../controllers/test-controller.js';
import { jwtPassport } from '../controllers/oauth/jwt.js';

export const router = new Router({ prefix: '/api' });

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/registration', UserController.registration);
router.post('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activate);
router.get('/test', TestController.test);
router.get('/users', jwtPassport, UserController.getUsers);
