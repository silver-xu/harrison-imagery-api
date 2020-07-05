import { authTokenRepository } from '../infra/database';
import { verifyToken } from './authUseCase';

jest.mock('../infra/database');

const getDay = (day: number): Date => {
  const yesterday = new Date();
  yesterday.setTime(yesterday.getTime() + day * 86400000);

  return yesterday;
};

describe('test authUseCase', () => {
  const mockedAuthTokenRepository = authTokenRepository as jest.Mocked<typeof authTokenRepository>;

  describe('test verifyToken', () => {
    it('it should return invalid as rejectionReason if token does not exist', async () => {
      mockedAuthTokenRepository.getByToken.mockResolvedValue(undefined);

      const authResult = await verifyToken('foobar');
      expect(authResult).toEqual({ rejectionReason: 'invalid' });
    });

    it('it should return expired as rejectionReason if token expiry date is less than or equal to now', async () => {
      const yesterday = getDay(-1);

      mockedAuthTokenRepository.getByToken.mockResolvedValue({
        tokenId: 1,
        token: 'foobar',
        expiryDate: yesterday,
      });

      const authResult = await verifyToken('foobar');
      expect(authResult).toEqual({ rejectionReason: 'expired' });
    });

    it('it should return true if token is valid and not expired', async () => {
      const tomorrow = getDay(1);

      mockedAuthTokenRepository.getByToken.mockResolvedValue({
        tokenId: 1,
        token: 'foobar',
        expiryDate: tomorrow,
      });

      const authResult = await verifyToken('foobar');
      expect(authResult).toEqual(true);
    });
  });
});
