import { CustomError } from '../utils/CustomError';
import { NextFunction, Request, Response } from 'express';
import { ERROR_NOT_A_CLUE, getErrorDetails } from '../utils/ErrorCodes';
import { responseFail } from '../utils/JsonResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const code = (err && (err as CustomError).code) || ERROR_NOT_A_CLUE;
  const error = getErrorDetails(code);
  // eslint-disable-next-line no-console
  console.error(err.message);
  return responseFail(res, error.message, code, error.statusCode);
};
