import { AddImageModel, GetImageModel, UpdateImageModel } from '../domains/image';
import { NotFoundError } from '../errors/notFound';
import { imageRepository } from '../infra/database';
import { mapFromAddImageModel, mapFromUpdateImageModel, mapToGetImageModel } from '../mappers/imageMappers';

export const getImage = async (imageId: number): Promise<GetImageModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  return mapToGetImageModel(image);
};

export const addImage = async (imageModel: AddImageModel): Promise<void> => {
  const image = mapFromAddImageModel(imageModel);
  await imageRepository.add(image);
};

export const deleteImage = async (imageId: number): Promise<void> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  await imageRepository.delete(imageId);
};

export const updateImage = async (imageModel: UpdateImageModel): Promise<void> => {
  const image = await imageRepository.getById(imageModel.imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const updatedImage = mapFromUpdateImageModel(imageModel);
  await imageRepository.update(updatedImage);
};
