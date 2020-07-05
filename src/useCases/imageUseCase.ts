import { GetLabellingsModel } from '../domains/imageLabelModels';
import { AddImageModel, GetImageModel, UpdateImageModel } from '../domains/imageModels';
import { NotFoundError } from '../errors/notFound';
import { imageLabelRepository, imageRepository } from '../infra/database';
import { mapToGetLabellingsModel } from '../mappers/imageLabelMappers';
import { mapFromAddImageModel, mapFromUpdateImageModel, mapToGetImageModel } from '../mappers/imageMappers';

export const getImage = async (imageId: number): Promise<GetImageModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  return mapToGetImageModel(image);
};

export const getImageLabellings = async (imageId: number): Promise<GetLabellingsModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const labellings = await imageLabelRepository.getLabellingsByImageId(imageId);

  return mapToGetLabellingsModel(labellings);
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
