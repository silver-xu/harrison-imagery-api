import { Request, Response } from 'express';

import { Next } from '../types/next';

export const httpLoggerMiddleware = async (req: Request, res: Response, next: Next): Promise<void> => {
  const userId = res.locals.appScope?.userId;

  const log = {
    logEntry: {
      timestamp: new Date(Date.now()),
      userId: userId ?? 'Anonymous',
      method: req.method,
      path: req.path,
      url: req.originalUrl,
      userAgent: req.get('user-agent'),
    },
  };

  console.log(log);

  next();
};
