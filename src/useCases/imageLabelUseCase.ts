import { AddImageLabelModel } from '../domains/imageLabelModels';
import { mapFromAddImageLabelModel } from '../mappers/imageLabelMappers';
import { imageLabelRepository } from '../infra/database';
import { NotFoundError } from '../errors/notFound';

export const addImageLabel = async (addImageLabelModel: AddImageLabelModel): Promise<void> => {
  const imageLabel = mapFromAddImageLabelModel(addImageLabelModel);
  await imageLabelRepository.add(imageLabel);
};

export const deleteImageLabel = async (imageLabelId: number): Promise<void> => {
  const imageLabel = await imageLabelRepository.getById(imageLabelId);

  if (!imageLabel) {
    throw new NotFoundError('Image Label was not found');
  }

  await imageLabelRepository.delete(imageLabelId);
};
