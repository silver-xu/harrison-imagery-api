import { MysqlImageLabelRepository } from './mysqlImageLabelRepository';

describe('test mysqlImageRepository', () => {
  const date = new Date();

  const mockImageLabelRaw = {
    image_label_id: 1,
    image_id: 1,
    label_id: 1,
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    labelled_date: date,
  };

  const mockImageLabel = {
    imageLabelId: 1,
    imageId: 1,
    labelId: 1,
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    labelledDate: date,
  };

  describe('test getById', () => {
    it('should return undefined while there is no matching imageLabel', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      const image = await repository.getById(1);

      expect(image).toBeUndefined();
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), [1]);
    });

    it('should return matching imageLabels while there is any', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[mockImageLabelRaw]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      const image = await repository.getById(1);

      expect(image).toEqual(mockImageLabel);
      expect(mockPool.query).toHaveBeenCalledWith(expect.anything(), [1]);
    });
  });

  describe('test getLabellingsByImageId', () => {
    const mockLabellingsRaw = {
      image_label_id: 1,
      label_id: 1,
      label: 'foobar',
      status_code: 'InUse',
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    };

    const mockLabellings = {
      imageLabelId: 1,
      labelId: 1,
      label: 'foobar',
      statusCode: 'InUse',
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    };

    it('should return empty array while there is no labelling', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      const labellings = await repository.getLabellingsByImageId(1);

      expect(labellings).toEqual([]);
    });

    it('should return labellings while there is any', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[mockLabellingsRaw]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      const labellings = await repository.getLabellingsByImageId(1);

      expect(labellings).toEqual([mockLabellings]);
    });
  });

  describe('test getLabelledImagesByLabelId', () => {
    const mockLabelledImageRaw = {
      image_label_id: 1,
      image_id: 1,
      image_path: 'http://example.com',
      width: 0,
      height: 0,
      status_code: 'Labelled',
      label_id: 1,
      label_x: 0,
      label_y: 0,
      label_width: 50,
      label_height: 50,
    };

    const mockLabelledImage = {
      imageLabelId: 1,
      imageId: 1,
      imagePath: 'http://example.com',
      width: 0,
      height: 0,
      statusCode: 'Labelled',
      labelId: 1,
      labelX: 0,
      labelY: 0,
      labelWidth: 50,
      labelHeight: 50,
    };

    it('should return empty array while there are no labelled images', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      const labellings = await repository.getLabellingsByImageId(1);

      expect(labellings).toEqual([]);
    });

    it('should return labelled images while there are any', async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue([[mockLabelledImageRaw]]),
        execute: jest.fn(),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      const labellings = await repository.getLabelledImagesByLabelId(1);

      expect(labellings).toEqual([mockLabelledImage]);
    });
  });

  describe('test CRUD', () => {
    describe('test add', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn().mockReturnValue([{ insertId: 1 }]),
      };

      const repository = new MysqlImageLabelRepository(mockPool);
      it('should invoke INSERT statement with correct parameters', async () => {
        const id = await repository.add(mockImageLabel);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), [
          mockImageLabel.imageId,
          mockImageLabel.labelId,
          mockImageLabel.x,
          mockImageLabel.y,
          mockImageLabel.width,
          mockImageLabel.height,
          mockImageLabel.labelledDate,
        ]);
        expect(id).toEqual(1);
      });
    });

    describe('test delete', () => {
      const mockPool = {
        query: jest.fn(),
        execute: jest.fn(),
      };
      const repository = new MysqlImageLabelRepository(mockPool);

      it('should invoke DELETE statement with correct parameters', async () => {
        await repository.delete(1);

        expect(mockPool.execute).toHaveBeenLastCalledWith(expect.anything(), [1]);
      });
    });
  });
});
