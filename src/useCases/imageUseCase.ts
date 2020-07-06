import { AddImageModel, GetImageModel, UpdateImageModel } from '../domains/image';
import { ImageSearchCriteriaModel } from '../domains/image/imageSearchCriteriaModel';
import { NotFoundError } from '../errors/notFound';
import { imageRepository } from '../infra/database';
import {
  mapFromAddImageModel,
  mapFromImageSearchCriteriaModel,
  mapFromUpdateImageModel,
  mapToGetImageModel,
} from '../mappers/imageMappers';

export const getImage = async (imageId: number): Promise<GetImageModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  return mapToGetImageModel(image);
};

export const addImage = async (imageModel: AddImageModel): Promise<GetImageModel> => {
  const image = mapFromAddImageModel(imageModel);
  const imageId = await imageRepository.add(image);

  return {
    ...image,
    imageId,
    statusCode: 'Created',
  };
};

export const searchImages = async (imageSearchCriteriaModel: ImageSearchCriteriaModel): Promise<GetImageModel[]> => {
  const searchCritera = mapFromImageSearchCriteriaModel(imageSearchCriteriaModel);
  const images = await imageRepository.search(searchCritera);

  return images.map((image) => mapToGetImageModel(image));
};

export const deleteImage = async (imageId: number): Promise<void> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  await imageRepository.delete(imageId);
};

export const updateImage = async (imageId: number, imageModel: UpdateImageModel): Promise<void> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const updatedImage = mapFromUpdateImageModel(imageId, imageModel);
  await imageRepository.update(updatedImage);
};
