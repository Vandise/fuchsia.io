const ENV = process.env['NODE_ENV'];

export function isDevelopment() {
  return ENV == 'development';
}

export function isTest() {
  return ENV == 'test';
}

export function isProduction() {
  return ENV == 'production';
}