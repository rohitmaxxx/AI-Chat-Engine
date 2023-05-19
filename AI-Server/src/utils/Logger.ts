/* eslint-disable  no-console */
import AppConfig from './AppConfig';
import { Model } from 'sequelize';
import Log from '../models/logs';
const TAG = 'Logger';

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}
const log = (TAG: string, message: string) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
    // eslint-disable-next-line no-console
    console.log(TAG, message);
  }
};

async function logToDatabase(tag: string, message: string, priority: Priority): Promise<Model> {
  log(TAG, message + ' - ' + priority);
  const value = await Log.create({
    tag,
    message,
    serviceName: AppConfig.app.name,
    priority,
  });
  return value;
}

const Logger = {
  log,
  logToDatabase,
  Priority,
};

export default Logger;
