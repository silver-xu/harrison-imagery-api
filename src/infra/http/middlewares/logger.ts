import { Request, Response } from 'express';

import { Next } from '../types/next';

export const loggerMiddleware = (error: Error, req: Request, res: Response, next: Next): void => {
  const userId = res.locals.appScope?.userId;

  const log = {
    logEntry: {
      userId: userId ?? 'Anonymous',
      method: req.method,
      path: req.path,
    },
  };

  console.log(log);

  if (error) {
    const errorLog = {
      error: {
        userId: userId ?? 'Anonymous',
        message: error.message,
        stackTrace: error.stack,
      },
    };

    console.error(errorLog);
  }

  next(error);
};
