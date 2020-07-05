import { Request, Response } from 'express';

import { InvalidTokenError, TokenExpiredError } from '../../../errors/auth';
import { verifyToken } from '../../../useCases/authUseCase';

export const authMiddleware = async (req: Request, res: Response, next): Promise<void> => {
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
