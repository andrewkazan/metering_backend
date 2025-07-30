import Router from '@koa/router';
import { UserController } from '../controllers/user-controller.js';
import { TestController } from '../controllers/test-controller.js';
import { ObjectController } from '../controllers/object-controller.js';
import { SDSController } from '../controllers/sds-controller.js';
import { DeviceController } from '../controllers/device-controller.js';
import { jwtPassport } from '../controllers/oauth/jwt.js';
import { WrxController } from '../controllers/wrx-controller/wrx-controller.js';

export const router = new Router({ prefix: '/api' });

// auth
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/registration', UserController.registration);
router.post('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activate);
// check live server
router.get('/test', TestController.test);
// users
router.get('/users', jwtPassport, UserController.list);
// objects
router.post('/objects', jwtPassport, ObjectController.create);
router.get('/objects/:id', jwtPassport, ObjectController.read);
router.put('/objects/:id', jwtPassport, ObjectController.update);
router.delete('/objects/:id', jwtPassport, ObjectController.delete);
router.get('/objects', jwtPassport, ObjectController.list);
// serial device server (SDS)
router.post('/sdss', jwtPassport, SDSController.create);
router.get('/sdss/:id', jwtPassport, SDSController.read);
router.put('/sdss/:id', jwtPassport, SDSController.update);
router.delete('/sdss/:id', jwtPassport, SDSController.delete);
router.get('/sdss', jwtPassport, SDSController.list);
// devices
router.post('/devices', jwtPassport, DeviceController.create);
router.get('/devices/:id', jwtPassport, DeviceController.read);
router.put('/devices/:id', jwtPassport, DeviceController.update);
router.delete('/devices/:id', jwtPassport, DeviceController.delete);
router.get('/devices', jwtPassport, DeviceController.list);
// wrx
router.get('/wrx/test', jwtPassport, WrxController.test.bind(WrxController));
router.get('/wrx/list', jwtPassport, WrxController.list.bind(WrxController));
router.get('/wrx/info', jwtPassport, WrxController.info.bind(WrxController));
router.get('/wrx/info', jwtPassport, WrxController.sendCommand.bind(WrxController));
