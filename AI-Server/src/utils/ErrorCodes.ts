import { CustomErrorDetails, CustomErrorPayload } from '../@types/types';

export const ERROR_USER_NOT_FOUND = '00UNF';
export const ERROR_EMAIL_ALREADY_EXISTS = '00EAE';
export const ERROR_EMAIL_NOT_FOUND = '00ENF';
export const ERROR_EMAIL_PASS_NOT_MATCHED = '0EPNM';
export const ERROR_EMAIL_NOT_ATTACHED_GOOGLE = '0ENAG';
export const ERROR_FACEBOOK_ID = '00EFF';

export const API_RESPONSE_SUCCESS = '00000';
export const API_RESPONSE_FAIL = '000RF';
export const API_RC_ROUTE_NOT_FOUND = '00RNF';
export const ERROR_NO_TOKEN_PROVIDED = '00NTP';
export const ERROR_UNAUTHORIZED = '000UN';
export const ERROR_NOT_A_CLUE = '000NAC';

const ErrorDetails: CustomErrorDetails = {
  [ERROR_USER_NOT_FOUND]: {
    statusCode: 400,
    message: 'userId not found',
  },
  [ERROR_EMAIL_ALREADY_EXISTS]: {
    statusCode: 400,
    message: 'email already exists.',
  },
  [ERROR_EMAIL_NOT_FOUND]: {
    statusCode: 400,
    message: 'email not found',
  },
  [ERROR_EMAIL_PASS_NOT_MATCHED]: {
    statusCode: 400,
    message: 'email or password does not match',
  },
  [ERROR_EMAIL_NOT_ATTACHED_GOOGLE]: {
    statusCode: 400,
    message: 'email not attached to the google id',
  },
  [ERROR_FACEBOOK_ID]: {
    statusCode: 400,
    message: 'facebook id not matched with access token',
  },
  [API_RC_ROUTE_NOT_FOUND]: {
    statusCode: 404,
    message: 'route not found.',
  },
};

export function getErrorDetails(errorCode: string): CustomErrorPayload {
  const mErrorDetails = ErrorDetails[errorCode];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return !mErrorDetails
    ? {
        statusCode: 502,
        message: 'something went wrong',
      }
    : mErrorDetails;
}
