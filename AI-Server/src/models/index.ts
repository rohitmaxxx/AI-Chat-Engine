import { Sequelize, Dialect } from 'sequelize';
import AppConfig from '../utils/AppConfig';

const dbName = AppConfig.db.database;
const dbUser = AppConfig.db.user;
const dbHost = AppConfig.db.host;
const dbPort = AppConfig.db.port;
const dbDriver = AppConfig.db.dialect as Dialect;
const dbPassword = AppConfig.db.password;

const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDriver,
  host: dbHost,
  port: dbPort,
  logging: process.env.NODE_ENV !== 'production',
});

export default dbConnection;
