import { MysqlAuthTokenRepository } from './mysqlAuthTokenRepository';

jest.mock('mysql2/promise');

describe('test authTokenRepository', () => {
  describe('test getByToken', () => {
    it('should return undefined while there is no matching token', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[]]),
        execute: jest.fn(),
      };

      const repository = new MysqlAuthTokenRepository(mockPool);
      const token = await repository.getByToken('foobar');

      expect(token).toBeUndefined();
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), ['foobar']);
    });

    it('should return token while there is matching authToken dto', async () => {
      const date = new Date();
      const mockPool = {
        query: jest.fn().mockResolvedValue([
          [
            {
              token_id: 1,
              token: 'foobar',
              expiry_date: date,
            },
          ],
        ]),
        execute: jest.fn(),
      };

      const repository = new MysqlAuthTokenRepository(mockPool);
      const token = await repository.getByToken('foobar');

      expect(token).toEqual({
        tokenid: 1,
        token: 'foobar',
        expiryDate: date,
      });
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), ['foobar']);
    });
  });
});
