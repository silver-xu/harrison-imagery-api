import { AuthToken } from '../../dto/auth';

export interface AuthTokenRepository {
  getByToken(token: string): Promise<AuthToken>;
}
