import { responseFail, responseSuccess } from '../utils/JsonResponse';
import { NextFunction, Request, Response } from 'express';
import AppConfig from '../utils/AppConfig';
import Logger from '../utils/Logger';
import Log from '../models/logs';
import { CustomError } from '../utils/CustomError';
import { ERROR_NOT_A_CLUE } from '../utils/ErrorCodes';

const TAG = 'ControllerHealth';
export const test = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { throwError = false } = _req.body as { throwError: boolean };
    if (throwError) {
      throw new CustomError(ERROR_NOT_A_CLUE);
    }
    await Logger.logToDatabase(TAG, 'hello world', Logger.Priority.Low);
    const logs = await Log.findAll({
      offset: 0,
      limit: 5,
      order: [['createdAt', 'desc']],
    });

    return responseSuccess(res, 'success', 'result', logs);
  } catch (e) {
    next(e);
  }
};

export const health = (_req: Request, res: Response) => {
  try {
    const data = {
      name: AppConfig.app.name,
      env: AppConfig.appEnv,
      version: AppConfig.app.version,
      build: AppConfig.app.build,
    };
    return responseSuccess(res, 'success', 'app', data);
  } catch (e) {
    return responseFail(res, (e as Error).message);
  }
};
