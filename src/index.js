import Koa from 'koa';
import mongoose from 'mongoose';
import config from 'config';
import { applyMiddleware } from './http/middleware/apply-middleware.js';

const DB_URL = config.get('mongo.url');
const DB_USER = config.get('mongo.dbUser');
const DB_PASS = config.get('mongo.dbPass');
const APP_PORT = config.get('app.port') || 3001;

mongoose.set('debug', true);

const app = new Koa();
applyMiddleware(app);

mongoose
  .connect(DB_URL, {
    user: DB_USER,
    pass: DB_PASS,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(APP_PORT, () => {
      console.log(`Server started at port: ${APP_PORT}`);
    });
  })
  .catch((e) => {
    console.error('MongoDB connection error:', e.message);
  });
