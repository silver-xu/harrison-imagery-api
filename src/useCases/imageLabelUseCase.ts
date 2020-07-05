import { AddImageLabelModel } from '../domains/imageLabelModels';
import { NotFoundError } from '../errors/notFound';
import { imageLabelRepository, imageRepository, labelRepository } from '../infra/database';
import { mapFromAddImageLabelModel } from '../mappers/imageLabelMappers';

export const addImageLabel = async (addImageLabelModel: AddImageLabelModel): Promise<void> => {
  const image = await imageRepository.getById(addImageLabelModel.imageId);
  if (!image) {
    throw new NotFoundError('Image was not found');
  }

  const label = await labelRepository.getById(addImageLabelModel.labelId);
  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  const imageLabel = mapFromAddImageLabelModel(addImageLabelModel);
  await imageLabelRepository.add(imageLabel);

  image.statusCode = 'Labelled';
  await imageRepository.update(image);
};

export const deleteImageLabel = async (imageLabelId: number): Promise<void> => {
  const imageLabel = await imageLabelRepository.getById(imageLabelId);

  if (!imageLabel) {
    throw new NotFoundError('Image Label was not found');
  }

  await imageLabelRepository.delete(imageLabelId);
};
