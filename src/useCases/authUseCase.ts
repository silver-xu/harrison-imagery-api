import { AuthResult } from '../domains/auth/authModels';
import { authTokenRepository } from '../infra/database';

export const verifyToken = async (token: string): Promise<AuthResult> => {
  const authToken = await authTokenRepository.getByToken(token);

  const currentDateTime = new Date();

  if (!authToken) {
    return { isAuthorised: false, rejectionReason: 'invalid' };
  }

  if (authToken.expiryDate <= currentDateTime) {
    return { isAuthorised: false, rejectionReason: 'expired' };
  }

  return { isAuthorised: true, userId: authToken.userId };
};
