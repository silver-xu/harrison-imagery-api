import { mapFromAddImageModel, mapFromUpdateImageModel, mapToGetImageModel } from './imageMappers';

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
    it('should map image to updateImageModel', () => {
      const mockUpdateImageModel = {
        imagePath: 'http://example.com',
        width: 100,
        height: 100,
        statusCode: 'Created',
      };

      const updateImageModel = mapFromUpdateImageModel(1, mockUpdateImageModel);

      expect(updateImageModel).toEqual(updateImageModel);
    });
  });
});
