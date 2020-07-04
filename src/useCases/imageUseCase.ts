import { AddImageModel, EditImageModel, GetImageLabellingsModel, GetImageModel } from '../domains/imageModels';
import { NotFoundError } from '../errors/notFound';
import { imageLabelRepository, imageRepository } from '../infra/database';
import {
  mapFromAddImageModel,
  mapFromUpdateImageModel,
  mapToGetImageModel,
  mapToGetLabelledImagesModel,
} from '../mappers/imageMappers';

export const getImage = async (imageId: number): Promise<GetImageModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  return mapToGetImageModel(image);
};

export const getImageLabellings = async (imageId: number): Promise<GetImageLabellingsModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const labellings = await imageLabelRepository.getLabellingsByImageId(imageId);

  return mapToGetLabelledImagesModel(image, labellings);
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

export const updateImage = async (imageModel: EditImageModel): Promise<void> => {
  const image = await imageRepository.getById(imageModel.imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const updatedImage = mapFromUpdateImageModel(imageModel);
  await imageRepository.update(updatedImage);
};
