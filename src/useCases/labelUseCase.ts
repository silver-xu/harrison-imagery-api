import { GetLabelModel, GetLabelledImagesModel } from '../domains/labelModels';
import { labelRepository, imageLabelRepository } from '../infra/database';
import { mapToGetLabelModel, mapToGetLabelImages } from '../mappers/labelMappers';
import { NotFoundError } from '../errors/notFound';

export const getLabel = async (labelId: number): Promise<GetLabelModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  return mapToGetLabelModel(label);
};

export const getLabelledImages = async (labelId: number): Promise<GetLabelledImagesModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  const labelledImages = await imageLabelRepository.getLabelledImagesByLabelId(labelId);

  return mapToGetLabelImages(labelledImages);
};
