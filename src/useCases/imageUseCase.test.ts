import { NotFoundError } from '../errors/notFound';
import { imageRepository } from '../infra/database';
import { mapFromAddImageModel, mapFromUpdateImageModel } from '../mappers/imageMappers';
import { addImage, deleteImage, getImage, searchImages, updateImage } from './imageUseCase';

jest.mock('../infra/database');

describe('test imageUseCase', () => {
  const mockedImageRepository = imageRepository as jest.Mocked<typeof imageRepository>;

  const mockImage = {
    imageId: 1,
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
    statusCode: 'Create',
  };

  const mockUpdateImageModel = {
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
    statusCode: 'Create',
  };

  describe('test getImage', () => {
    it('should throw NotFoundError if imageRepository.getById is returning undefined', async () => {
      mockedImageRepository.getById.mockResolvedValue(undefined);

      await expect(getImage(1)).rejects.toEqual(new NotFoundError('Image was not found'));
    });

    it('should return getImageModel if imageRepository.getById is returning image', async () => {
      mockedImageRepository.getById.mockResolvedValue(mockImage);
      const image = await getImage(1);
      expect(image).toEqual(mockImage);
    });
  });

  describe('test searchImage', () => {
    it('should return getImageModel if imageRepository.search is returning images', async () => {
      mockedImageRepository.search.mockResolvedValue([mockImage]);
      const image = await searchImages({});
      expect(image).toEqual([mockImage]);
    });
  });

  describe('test addImage', () => {
    it('should map and pass addImageModel to imageRepository.add', async () => {
      mockedImageRepository.add.mockResolvedValue(1);

      const addImageModel = {
        imagePath: 'http://example.com',
        width: 100,
        height: 100,
      };

      const image = await addImage(addImageModel);

      expect(mockedImageRepository.add).toHaveBeenLastCalledWith(mapFromAddImageModel(addImageModel));
      expect(image).toEqual({
        imageId: 1,
        ...addImageModel,
        statusCode: 'Created',
      });
    });
  });

  describe('test deleteImage', () => {
    it('should throw NotFoundError if imageRepository.getById is returning undefined', async () => {
      mockedImageRepository.getById.mockResolvedValue(undefined);

      await expect(deleteImage(1)).rejects.toEqual(new NotFoundError('Image was not found'));
    });

    it('should call imageRepository.delete if imageRepository.getById is returning image', async () => {
      mockedImageRepository.getById.mockResolvedValue(mockImage);

      await deleteImage(1);

      expect(mockedImageRepository.delete).toHaveBeenLastCalledWith(1);
    });
  });

  describe('test updateImage', () => {
    it('should throw NotFoundError if imageRepository.getById is returning undefined', async () => {
      mockedImageRepository.getById.mockResolvedValue(undefined);

      await expect(updateImage(1, mockUpdateImageModel)).rejects.toEqual(new NotFoundError('Image was not found'));
    });

    it('should call imageRepository.delete if imageRepository.getById is returning image', async () => {
      mockedImageRepository.getById.mockResolvedValue(mockImage);

      await updateImage(1, mockUpdateImageModel);

      expect(mockedImageRepository.update).toHaveBeenLastCalledWith(mapFromUpdateImageModel(1, mockUpdateImageModel));
    });
  });
});
