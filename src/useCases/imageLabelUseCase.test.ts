import { NotFoundError } from '../errors/notFound';
import { imageLabelRepository, imageRepository, labelRepository } from '../infra/database';
import {
  mapFromAddImageLabelModel,
  mapToGetLabelledImagesModel,
  mapToGetLabellingsModel,
} from '../mappers/imageLabelMappers';
import { addImageLabel, deleteImageLabel, getImageLabellings, getLabelledImages } from './imageLabelUseCase';

jest.mock('../infra/database');

describe('test imageLabelUseCase', () => {
  const mockedImageRepository = imageRepository as jest.Mocked<typeof imageRepository>;
  const mockedLabelRepository = labelRepository as jest.Mocked<typeof labelRepository>;
  const mockedImageLabelRepository = imageLabelRepository as jest.Mocked<typeof imageLabelRepository>;

  const mockImage = {
    imageId: 1,
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
    statusCode: 'Create',
  };

  const mockLabel = {
    labelId: 1,
    label: 'foobar',
    statusCode: 'InUse',
  };

  const mockAddImageLabelModel = {
    imageLabelId: 1,
    imageId: 1,
    labelId: 1,
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  };

  const mockImageLabel = mapFromAddImageLabelModel(mockAddImageLabelModel);

  const mockLabellings = [
    {
      imageLabelId: 1,
      x: 0,
      y: 0,
      width: 25,
      height: 25,
      labelId: 1,
      label: 'bar',
      statusCode: 'InUse',
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
    },
  ];

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
    },
  ];

  describe('test getImageLabellings', () => {
    it('should throw NotFoundError if image.getById is returning undefined', async () => {
      mockedImageRepository.getById.mockResolvedValue(undefined);

      await expect(getImageLabellings(1)).rejects.toEqual(new NotFoundError('Image was not found'));
    });

    it('should return GetLabellingsModel if imageRepository.getById is returning image', async () => {
      mockedImageRepository.getById.mockResolvedValue(mockImage);
      mockedImageLabelRepository.getLabellingsByImageId.mockResolvedValue(mockLabellings);

      const getLabellingsModel = await getImageLabellings(1);
      expect(getLabellingsModel).toEqual(mapToGetLabellingsModel(mockLabellings));
    });
  });

  describe('test getLabelledImages', () => {
    it('should throw NotFoundError if labelRepository.getById is returning undefined', async () => {
      mockedLabelRepository.getById.mockResolvedValue(undefined);

      await expect(getLabelledImages(1)).rejects.toEqual(new NotFoundError('Label was not found'));
    });

    it('should return getLabelledImageModel if labelRepository.getById is returning label', async () => {
      mockedLabelRepository.getById.mockResolvedValue(mockLabel);
      mockedImageLabelRepository.getLabelledImagesByLabelId.mockResolvedValue(mockLabelledImages);

      const getLabelledImagesModel = await getLabelledImages(1);
      expect(getLabelledImagesModel).toEqual(mapToGetLabelledImagesModel(mockLabelledImages));
    });
  });

  describe('test addImageLabel', () => {
    it('should throw NotFoundError if imageRepository.getById is returning undefined', async () => {
      mockedImageRepository.getById.mockResolvedValue(undefined);
      mockedLabelRepository.getById.mockResolvedValue(mockLabel);

      await expect(addImageLabel(mockAddImageLabelModel)).rejects.toEqual(new NotFoundError('Image was not found'));
    });

    it('should throw NotFoundError if labelRepository.getById is returning undefined', async () => {
      mockedImageRepository.getById.mockResolvedValue(mockImage);
      mockedLabelRepository.getById.mockResolvedValue(undefined);

      await expect(addImageLabel(mockAddImageLabelModel)).rejects.toEqual(new NotFoundError('Label was not found'));
    });

    it('should pass imageLabel to imageLabelRepository.add if labelRepository.getById and imageRepository.getById are returning values', async () => {
      mockedImageLabelRepository.add.mockResolvedValue(1);
      mockedImageRepository.getById.mockResolvedValue(mockImage);
      mockedLabelRepository.getById.mockResolvedValue(mockLabel);

      const imageLabel = await addImageLabel(mockAddImageLabelModel);
      expect(imageLabelRepository.add).toHaveBeenLastCalledWith(mapFromAddImageLabelModel(mockAddImageLabelModel));
      expect(mockAddImageLabelModel).toEqual({ imageLabelId: 1, ...imageLabel });
    });
  });

  describe('test deleteImageLabel', () => {
    it('should throw NotFoundError if imageLabelRepository.getById is returning undefined', async () => {
      mockedImageLabelRepository.getById.mockResolvedValue(undefined);

      await expect(deleteImageLabel(1)).rejects.toEqual(new NotFoundError('Image Label was not found'));
    });

    it('should pass call imageLabelRepository.delete if imageLabelRepository.getById is returning image label', async () => {
      mockedImageLabelRepository.getById.mockResolvedValue(mockImageLabel);

      await deleteImageLabel(1);
      expect(imageLabelRepository.delete).toHaveBeenLastCalledWith(1);
    });
  });
});
