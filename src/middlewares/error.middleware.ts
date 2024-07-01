import { NextFunction, Response } from 'express';
import { logError } from '../utils/error.utils';

export function logErrorMiddleware(
  err: any,
  req: any,
  res: Response,
  next: NextFunction
) {
  logError(err);
  next(err);
}

export function returnError(
  err: any,
  req: any,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const errorText = err.detail || err.message || err;
  const statusCode = err.customCode || err.status || 500;

  res.status(err.status || 500);
  res.json({
    sucess: false,
    statusCode,
    error: errorText,
  });
}
