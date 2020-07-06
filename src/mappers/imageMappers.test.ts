import { ImageStatusCodes } from '../domains/image';
import {
  mapFromAddImageModel,
  mapFromImageSearchCriteriaModel,
  mapFromUpdateImageModel,
  mapToGetImageModel,
} from './imageMappers';

describe('test imageMappers', () => {
  const mockImage = {
    imageId: 1,
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
    statusCode: 'Created',
  };

  describe('test mapToGetImageModel', () => {
    it('should map image to getImageModel', () => {
      const getImageModel = mapToGetImageModel(mockImage);

      expect(getImageModel).toEqual(getImageModel);
    });
  });

  describe('test mapFromAddImageModel', () => {
    it('should map addImageModel to image', () => {
      const mockaddImageModel = {
        imagePath: 'http://example.com',
        width: 100,
        height: 100,
      };

      const image = mapFromAddImageModel(mockaddImageModel);

      expect(image).toEqual({
        imageId: 0,
        ...mockaddImageModel,
        statusCode: 'Created',
      });
    });
  });

  describe('test mapFromUpdateImageModel', () => {
    it('should map updateImageModel to image ', () => {
      const mockUpdateImageModel = {
        imagePath: 'http://example.com',
        width: 100,
        height: 100,
        statusCode: ImageStatusCodes.Created,
      };

      const image = mapFromUpdateImageModel(1, mockUpdateImageModel);

      expect({ imageId: 1, ...mockUpdateImageModel }).toEqual(image);
    });
  });

  describe('test mapFromImageSearchCriteriaModel', () => {
    it('should map imageSearchCriteriaModel to searchCriteria', () => {
      const date = new Date();

      const mockSearchCriteria = {
        labelId: 1,
        searchDates: {
          startDate: date,
          endDate: date,
        },
        imageStatusCode: ImageStatusCodes.Created,
      };

      const searchCriteria = mapFromImageSearchCriteriaModel(mockSearchCriteria);

      expect(searchCriteria).toEqual({
        labelId: 1,
        startDate: date,
        endDate: date,
        imageStatusCode: 'Created',
      });
    });
  });
});
