import { Request, Response } from 'express';
import { AsyncRedactor } from 'redact-pii';

const redactor = new AsyncRedactor();

import { Next } from '../types/next';

export const errorLoggerMiddleware = async (error: Error, req: Request, res: Response, next: Next): Promise<void> => {
  const userId = res.locals.appScope?.userId;

  if (error) {
    const redactedMessage = await redactor.redactAsync(error.message);
    const redactedStackTrace = await redactor.redactAsync(error.stack);

    const errorLog = {
      error: {
        timestamp: new Date(Date.now()),
        userId: userId ?? 'Anonymous',
        message: redactedMessage,
        stackTrace: redactedStackTrace,
      },
    };

    console.error(errorLog);
  }

  next(error);
};
