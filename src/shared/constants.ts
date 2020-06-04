
export const ENV = process.env.NODE_ENV || 'dev';
export const PORT = process.env.PORT || 3000;
export const API_PREFIX = 'api';

const server = {
  dev: `http://localhost:${PORT}`,
  staging: 'https://beauty-saloon-api.herokuapp.com',
  production: 'https://beauty-saloon-api.herokuapp.com',
};

export const API_PATH = `${server[ENV]}/${API_PREFIX}`;

