import { MysqlImageRepository } from './mysqlImageRepository';

describe('test mysqlImageRepository', () => {
  const mockImageRaw = {
    image_id: 1,
    image_path: 'http://example.com',
    width: 100,
    height: 100,
    status_code: 'Created',
  };

  const mockImage = {
    imageId: 1,
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
    statusCode: 'Created',
  };

  describe('test getById', () => {
    it('should return undefined while there is no matching image', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageRepository(mockPool);
      const image = await repository.getById(1);

      expect(image).toBeUndefined();
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), [1]);
    });

    it('should return matching images while there is any', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[mockImageRaw]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageRepository(mockPool);
      const image = await repository.getById(1);

      expect(image).toEqual(mockImage);
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), [1]);
    });
  });

  describe('test CRUD', () => {
    describe('test add', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn().mockReturnValue([{ insertId: 1 }]),
      };

      const repository = new MysqlImageRepository(mockPool);

      it('should invoke INSERT statement with correct parameters', async () => {
        const id = await repository.add(mockImage);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), [
          'http://example.com',
          100,
          100,
          'Created',
        ]);

        expect(id).toEqual(1);
      });
    });

    describe('test delete', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn(),
      };

      const repository = new MysqlImageRepository(mockPool);

      it('should invoke DELETE statement with correct parameters', async () => {
        await repository.delete(1);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), [1]);
      });
    });

    describe('test update', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn(),
      };

      const repository = new MysqlImageRepository(mockPool);

      it('should invoke UPDATE statement with correct parameters', async () => {
        await repository.update(mockImage);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), [
          'http://example.com',
          100,
          100,
          1,
          'Created',
        ]);
      });
    });
  });
});
