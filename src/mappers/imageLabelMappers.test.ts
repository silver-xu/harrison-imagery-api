import { Labelling } from '../dto/imageLabel';
import { mapFromAddImageLabelModel, mapToGetLabelledImagesModel, mapToGetLabellingsModel } from './imageLabelMappers';

describe('test imageLabelMappers', () => {
  const date = new Date();
  describe('test mapFromAddImageLabelModel', () => {
    it('should map from addImageLabelModel to imageLabel', () => {
      const mockAddImageLabelModel = {
        imageId: 1,
        labelId: 1,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      };

      const imageLabel = mapFromAddImageLabelModel(mockAddImageLabelModel);
      const { imageId, labelId, x, y, width, height } = imageLabel;

      expect(imageLabel.imageLabelId).toEqual(0);
      expect({ imageId, labelId, x, y, width, height }).toEqual(mockAddImageLabelModel);
    });
  });

  describe('test mapToGetLabellingsModel', () => {
    it('should group and map from labellings to GetLabellingsModel', () => {
      const mockLabellings: Labelling[] = [
        {
          imageLabelId: 1,
          x: 0,
          y: 0,
          width: 25,
          height: 25,
          labelId: 1,
          label: 'bar',
          statusCode: 'InUse',
          labelledDate: date,
        },
        {
          imageLabelId: 2,
          x: 25,
          y: 25,
          width: 25,
          height: 25,
          labelId: 1,
          label: 'bar',
          statusCode: 'InUse',
          labelledDate: date,
        },
        {
          imageLabelId: 3,
          x: 50,
          y: 50,
          width: 25,
          height: 25,
          labelId: 2,
          label: 'foo',
          statusCode: 'InUse',
          labelledDate: date,
        },
      ];

      const getLabellingsModel = mapToGetLabellingsModel(mockLabellings);

      expect(getLabellingsModel).toEqual({
        labellings: [
          {
            label: {
              labelId: 1,
              label: 'bar',
              statusCode: 'InUse',
            },
            labelPositions: [
              {
                x: 0,
                y: 0,
                width: 25,
                height: 25,
                labelledDate: date,
              },
              {
                x: 25,
                y: 25,
                width: 25,
                height: 25,
                labelledDate: date,
              },
            ],
          },
          {
            label: {
              labelId: 2,
              label: 'foo',
              statusCode: 'InUse',
            },
            labelPositions: [
              {
                x: 50,
                y: 50,
                width: 25,
                height: 25,
                labelledDate: date,
              },
            ],
          },
        ],
      });
    });
  });

  describe('test mapToGetLabelImagesModel', () => {
    it('should group and map labelledImages to getLabelImagesModel', () => {
      const mockLabelledImages = [
        {
          imageLabelId: 1,
          labelId: 1,
          labelX: 0,
          labelY: 0,
          labelWidth: 25,
          labelHeight: 25,
          imageId: 1,
          imagePath: 'http://example.com',
          width: 100,
          height: 100,
          statusCode: 'Labelled',
          labelledDate: date,
        },
        {
          imageLabelId: 2,
          labelId: 1,
          labelX: 25,
          labelY: 25,
          labelWidth: 25,
          labelHeight: 25,
          imageId: 1,
          imagePath: 'http://example.com',
          width: 100,
          height: 100,
          statusCode: 'Labelled',
          labelledDate: date,
        },
        {
          imageLabelId: 3,
          labelId: 1,
          labelX: 50,
          labelY: 50,
          labelWidth: 50,
          labelHeight: 50,
          imageId: 2,
          imagePath: 'http://example2.com',
          width: 200,
          height: 200,
          statusCode: 'Labelled',
          labelledDate: date,
        },
      ];

      const getLabelledImagesModel = mapToGetLabelledImagesModel(mockLabelledImages);

      expect(getLabelledImagesModel).toEqual({
        images: [
          {
            image: {
              imageId: 1,
              imagePath: 'http://example.com',
              width: 100,
              height: 100,
              statusCode: 'Labelled',
            },
            labelPositions: [
              {
                x: 0,
                y: 0,
                width: 25,
                height: 25,
                labelledDate: date,
              },
              {
                x: 25,
                y: 25,
                width: 25,
                height: 25,
                labelledDate: date,
              },
            ],
          },
          {
            image: {
              imageId: 2,
              imagePath: 'http://example2.com',
              width: 200,
              height: 200,
              statusCode: 'Labelled',
            },
            labelPositions: [
              {
                x: 50,
                y: 50,
                width: 50,
                height: 50,
                labelledDate: date,
              },
            ],
          },
        ],
      });
    });
  });
});
