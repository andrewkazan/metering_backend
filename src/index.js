import mongoose from 'mongoose';
import config from 'config';
import { app } from './app/app.js';

const DB_URL = config.get('mongo.url');
const DB_USER = config.get('mongo.dbUser');
const DB_PASS = config.get('mongo.dbPass');
const DB_AUTH_SOURCE = config.get('mongo.authSource');
const APP_PORT = config.get('app.port') || 3001;

mongoose.set('debug', true);

mongoose
  .connect(DB_URL, {
    user: DB_USER,
    pass: DB_PASS,
    authSource: DB_AUTH_SOURCE,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(APP_PORT, () => {
      console.log(`Server started at port: ${APP_PORT}`);
    });
  })
  .catch((e) => {
    console.error('Server failure caused by unavailable MongoDB connection:', e.message);
  });

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing MongoDB connection...');
  await mongoose.disconnect();
  setTimeout(() => process.exit(0), 500);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing MongoDB connection...');
  await mongoose.disconnect();
  setTimeout(() => process.exit(0), 500);
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await mongoose.disconnect();
  setTimeout(() => process.exit(0), 500);
});
