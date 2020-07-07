import { MysqlLabelRepository } from './mysqlLabelRepository';

describe('test mysqlImageRepository', () => {
  const mockLabelRaw = {
    label_id: 1,
    label: 'foobar',
    status_code: 'InUse',
  };

  const mockLabel = {
    labelId: 1,
    label: 'foobar',
    statusCode: 'InUse',
  };

  describe('test getAll', () => {
    it('should return images', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[mockLabelRaw]]),
        execute: jest.fn(),
      };

      const repository = new MysqlLabelRepository(mockPool);
      const labels = await repository.getAll();

      expect(labels).toEqual([mockLabel]);
    });
  });

  describe('test getById', () => {
    it('should return undefined while there is no matching label', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[]]),
        execute: jest.fn(),
      };

      const repository = new MysqlLabelRepository(mockPool);
      const label = await repository.getById(1);

      expect(label).toBeUndefined();
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), [1]);
    });

    it('should return matching label while there is any', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[mockLabelRaw]]),
        execute: jest.fn(),
      };

      const repository = new MysqlLabelRepository(mockPool);
      const label = await repository.getById(1);

      expect(label).toEqual(mockLabel);
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), [1]);
    });
  });

  describe('test CRUD', () => {
    describe('test add', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn().mockReturnValue([{ insertId: 1 }]),
      };

      const repository = new MysqlLabelRepository(mockPool);

      it('should invoke INSERT statement with correct parameters', async () => {
        const id = await repository.add(mockLabel);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), ['foobar', 'InUse']);
        expect(id).toEqual(1);
      });
    });

    describe('test delete', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn(),
      };

      const repository = new MysqlLabelRepository(mockPool);

      it('should invoke DELETE statement with correct parameters', async () => {
        await repository.delete(1);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), [1]);
      });
    });

    describe('test update', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn().mockReturnValue([{ insertId: 1 }]),
      };

      const repository = new MysqlLabelRepository(mockPool);
      it('should invoke UPDATE statement with correct parameters', async () => {
        await repository.update(mockLabel);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), ['foobar', 1]);
      });
    });
  });
});
