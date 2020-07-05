import { Request, Response } from 'express';

import { InvalidTokenError, TokenExpiredError } from '../../../errors/auth';
import { BadRequestError } from '../../../errors/badRequest';
import { NotFoundError } from '../../../errors/notFound';
import { Next } from '../types/next';

export const errorHandlerMiddleware = (error: Error, _req: Request, res: Response, next: Next): void => {
  if (!error) {
    return next();
  }

  if (error instanceof NotFoundError) {
    res.status(404).send(error.message);
  } else if (error instanceof BadRequestError) {
    res.status(400).send(error.message);
  } else if (error instanceof InvalidTokenError || error instanceof TokenExpiredError) {
    res.status(401).send(error.message);
  } else {
    res.status(500).send('A generic eror has happened. Please contact the system administrator');
  }
};
