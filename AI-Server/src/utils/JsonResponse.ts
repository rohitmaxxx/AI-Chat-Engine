import { Response } from 'express';
import { API_RESPONSE_FAIL, API_RESPONSE_SUCCESS } from './ErrorCodes';
export function responseSuccess(res: Response, message: string, dataName: string | null, data: object) {
  if (dataName != null) {
    res.status(200).json({
      code: API_RESPONSE_SUCCESS,
      message,
      [dataName]: data,
    });
  } else {
    res.status(200).json({
      code: API_RESPONSE_SUCCESS,
      message,
    });
  }
}

export function responseFail(res: Response, message: string, errorCode = API_RESPONSE_FAIL, statusCode = 200) {
  return res.status(statusCode).json({
    code: errorCode,
    message,
  });
}
