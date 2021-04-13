export const ENV = process.env.NODE_ENV || 'dev';
export const PORT = process.env.PORT || 3001;
export const API_PREFIX = 'api';

const server = {
  dev: `http://localhost:${PORT}`,
  staging: 'https://beautty-saloon-server.herokuapp.com/api',
  production: 'https://beautty-saloon-server.herokuapp.com/api',
};

export const API_PATH = `${server[ENV]}/${API_PREFIX}`;

export const FIREBASE_STORAGE_HOST = 'https://firebasestorage.googleapis.com';
export const FIREBASE_STORAGE_BUCKET = 'gs://beautyserver-f04c1.appspot.com';
export const FIREBASE_STOREAGE_KEYFILE = 'beautyserver-f04c1-firebase-adminsdk-scb1f-a60607ac9a.json';
