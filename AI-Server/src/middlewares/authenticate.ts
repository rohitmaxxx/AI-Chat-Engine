import jwt from 'jsonwebtoken';
import AppConfig from '../utils/AppConfig';
import { AppHeaders } from '../utils/ApiConstants';
import { NextFunction, Request, Response } from 'express';
import { addDefaultEntries } from '../controllers/ControllerUserInfo';
import Logger from '../utils/Logger';
import { ERROR_UNAUTHORIZED } from '../utils/ErrorCodes';

const TAG = 'authenticate';
// const EXP_1Y =  86400 * 365; // 1 year
const EXP_30m = 30 * 60 * 1000; // 30 Minutes
const EXP_30D = 2592000; // 30 Days
export const TokenTypeRefresh = 'typeRefreshToken';
export const TokenTypeAccess = 'typeAccessToken';

export type TokenType = 'typeRefreshToken' | 'typeAccessToken';

export interface TokenInterface extends Request {
  userId: string;
  tokenType: TokenType;
}

export interface RequestInterface extends Request {
  userId: string;
}

function isTokenPresentInHeader(req: Request) {
  const header = req.headers.authorization;
  if (!header) throw new Error('no token provided.');
  return header;
}

function getTokenFromHeader(header: string) {
  const bearer = header.split(' ');
  if (bearer.length < 2) throw new Error('invalid token');
  return bearer[1];
}

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = isTokenPresentInHeader(req);
    const token = getTokenFromHeader(header);

    jwt.verify(token, AppConfig.jwt.secret, (err, decoded) => {
      if (err) throw new Error(err.message);
      if ((decoded as TokenInterface).tokenType !== TokenTypeAccess) throw new Error('access token is required.');
      if (!(decoded as TokenInterface).userId) throw new Error('userId not found in jwt');
      (req as RequestInterface).userId = (decoded as TokenInterface).userId;
      next();
    });
  } catch (e) {
    res.status(403).json({
      code: ERROR_UNAUTHORIZED,
      message: (e as Error).message,
    });
  }
};

export const authWithApiKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authKey = req.headers[AppHeaders.X_AUTH_KEY];
    if (!authKey) throw new Error(`${AppHeaders.X_AUTH_KEY} not found.`);

    if (authKey !== AppConfig.authKey) {
      throw new Error(`${AppHeaders.X_AUTH_KEY} is invalid or expired.`);
    }
    next();
  } catch (e) {
    res.status(403).json({
      code: ERROR_UNAUTHORIZED,
      message: (e as Error).message,
    });
  }
};

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = isTokenPresentInHeader(req);
    const token = getTokenFromHeader(header);
    jwt.verify(token, AppConfig.jwt.secret, (err, decoded) => {
      if (err) throw new Error(err.message);
      if ((decoded as TokenInterface).tokenType !== TokenTypeRefresh) throw new Error('refresh token is required.');
      if (!(decoded as TokenInterface).userId) throw new Error('userId not found in jwt');
      (req as RequestInterface).userId = (decoded as TokenInterface).userId;
      next();
    });
  } catch (e) {
    res.status(403).json({
      code: ERROR_UNAUTHORIZED,
      message: (e as Error).message,
    });
  }
};

export function generateJWT(userId: string, tokenType: TokenType, expiryInSeconds: number) {
  const token = jwt.sign(
    {
      userId,
      tokenType,
    },
    AppConfig.jwt.secret,
    {
      expiresIn: expiryInSeconds,
    },
  );
  return token;
}

export function getJwtResponseData(userId: string) {
  addDefaultEntries(userId)
    .then(() => {
      Logger.log(TAG, 'added default entries success');
    })
    .catch((err) => Logger.log(TAG, (err as Error).message));

  const data = {
    access: {
      token: generateJWT(userId, TokenTypeAccess, EXP_30m),
      expiry: EXP_30m,
    },
    refresh: {
      token: generateJWT(userId, TokenTypeRefresh, EXP_30D),
      expiry: EXP_30D,
    },
  };
  return data;
}
