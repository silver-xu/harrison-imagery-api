import { Request, Response } from 'express';

import { InvalidTokenError } from '../../../errors/auth';
import { NotFoundError } from '../../../errors/notFound';

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next): void => {
  if (!error) {
    return next();
  }

  if (error instanceof NotFoundError) {
    res.status(404).send(error.message);
  } else if (error instanceof InvalidTokenError) {
    res.status(400).send(error.message);
  } else {
    res.status(500).send('A generic eror has happened. Please contact the system administrator');
  }
};
