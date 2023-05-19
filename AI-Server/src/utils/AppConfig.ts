import dotenv from 'dotenv';

dotenv.config();

const AppConfig = {
  env: process.env.NODE_ENV ?? 'local',
  appEnv: process.env.APP_ENV,
  appBaseUrl: process.env.APP_BASE_URL,
  authKey: process.env.AUTH_KEY,
  intermediatePage: process.env.INTERMEDIATE_PAGE,
  port: Number(process.env.SERVER_PORT),
  isStaging: process.env.APP_ENV !== 'production',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'boomer',
    expiresIn: 86400 * 365, // 1 year
  },
  auth: {
    googleClientId: '1095793448759-oljrpougkgt3190egqjasi2n2bnl0pcg.apps.googleusercontent.com',
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD ?? '',
  },
  app: {
    name: process.env.APP_NAME ?? 'boomer',
    version: process.env.APP_VERSION ?? '1.0.0',
    build: Number(process.env.BUILD_VERSION),
  },
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_DOCKER_PORT ?? 0),
    database: process.env.DB_NAME ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    dialect: process.env.DB_DIALECT ?? 'mysql',
  },
  rabbitMq: {
    host: process.env.RABBITMQ_HOST ?? '',
    username: process.env.RABBITMQ_DEFAULT_USER ?? '',
    password: process.env.RABBITMQ_DEFAULT_PASS ?? '',
    port: process.env.RABBIT_MQ_IN_DOCKER_PORT ?? '',
  },
};

export default AppConfig;
