import { AddImageLabelModel, GetLabelledImagesModel, GetLabellingsModel } from '../domains/imageLabel';
import { GetImageLabelModel } from '../domains/imageLabel/getImageLabelModel';
import { NotFoundError } from '../errors/notFound';
import { imageLabelRepository, imageRepository, labelRepository } from '../infra/database';
import {
  mapFromAddImageLabelModel,
  mapToGetLabelledImagesModel,
  mapToGetLabellingsModel,
} from '../mappers/imageLabelMappers';

export const getImageLabellings = async (imageId: number): Promise<GetLabellingsModel> => {
  const image = await imageRepository.getById(imageId);

  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const labellings = await imageLabelRepository.getLabellingsByImageId(imageId);

  return mapToGetLabellingsModel(labellings);
};

export const getLabelledImages = async (labelId: number): Promise<GetLabelledImagesModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  const labelledImages = await imageLabelRepository.getLabelledImagesByLabelId(labelId);

  return mapToGetLabelledImagesModel(labelledImages);
};

export const addImageLabel = async (addImageLabelModel: AddImageLabelModel): Promise<GetImageLabelModel> => {
  const image = await imageRepository.getById(addImageLabelModel.imageId);
  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const label = await labelRepository.getById(addImageLabelModel.labelId);
  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  const imageLabel = mapFromAddImageLabelModel(addImageLabelModel);
  const imageLabelId = await imageLabelRepository.add(imageLabel);

  return {
    imageLabelId,
    ...imageLabel,
  };
};

export const deleteImageLabel = async (imageLabelId: number): Promise<void> => {
  const imageLabel = await imageLabelRepository.getById(imageLabelId);

  if (!imageLabel) {
    throw new NotFoundError('Image Label was not found');
  }

  await imageLabelRepository.delete(imageLabelId);
};
