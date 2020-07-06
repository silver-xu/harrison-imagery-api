import { Request, Response } from 'express';

import { Next } from '../types/next';

export const httpLoggerMiddleware = async (req: Request, res: Response, next: Next): Promise<void> => {
  const userId = res.locals.appScope?.userId;

  const log = {
    logEntry: {
      userId: userId ?? 'Anonymous',
      method: req.method,
      path: req.path,
    },
  };

  console.log(log);

  next();
};
