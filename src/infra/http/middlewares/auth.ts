import { Request, Response } from 'express';

import { InvalidTokenError, TokenExpiredError } from '../../../errors/auth';
import { verifyToken } from '../../../useCases/authUseCase';
import { Next } from '../types/next';

export const authMiddleware = async (req: Request, res: Response, next: Next): Promise<void> => {
  const isRequestStaticResource = req.path.startsWith('/static/');
  if (isRequestStaticResource) {
    return next();
  }

  const authToken = req.headers['x-auth'] as string;

  let error;

  if (authToken) {
    const authResult = await verifyToken(authToken);

    if (authResult.isAuthorised === true) {
      res.locals.appScope = { userId: authResult.userId };
      return next();
    } else {
      error = authResult.rejectionReason === 'expired' ? new TokenExpiredError() : new InvalidTokenError();
    }
  } else {
    error = new InvalidTokenError();
  }

  next(error);
};
