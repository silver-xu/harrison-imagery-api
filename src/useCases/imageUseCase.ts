import {
  GetImageModel,
  AddImageModel,
  EditImageModel,
  GetImageWithLabelsModel,
  ImageStatusCodes,
} from '../domains/imageModels';
import { imageRepository, imageLabelRepository } from '../infra/database';
import { mapFromAddImageModel, mapToGetImageWithLabelsModel, mapToGetImageModel } from '../mappers/imageMappers';
import { NotFoundError } from '../errors/notFound';

export const getImage = async (imageId: number): Promise<GetImageModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image || image.statusCode === ImageStatusCodes.Deleted) {
    throw new NotFoundError('Image was not found');
  }

  return mapToGetImageModel(image);
};

export const getImageById = async (imageId: number): Promise<GetImageWithLabelsModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image || image.statusCode === ImageStatusCodes.Deleted) {
    throw new NotFoundError('Image was not found');
  }

  const labellings = await imageLabelRepository.getLabellingsByImageId(imageId);

  return mapToGetImageWithLabelsModel(image, labellings);
};

export const addImage = async (imageModel: AddImageModel): Promise<void> => {
  const image = mapFromAddImageModel(imageModel);
  await imageRepository.add(image);
};

export const deleteImage = async (imageId: number): Promise<void> => {
  const image = await imageRepository.getById(imageId);

  if (!image || image.statusCode === ImageStatusCodes.Deleted) {
    throw new NotFoundError('Image was not found');
  }

  await imageRepository.delete(imageId);
};

export const updateImage = async (imageModel: EditImageModel): Promise<void> => {
  const image = await imageRepository.getById(imageModel.imageId);

  if (!image || image.statusCode === ImageStatusCodes.Deleted) {
    throw new NotFoundError('Image was not found');
  }

  await imageRepository.update(imageModel);
};
