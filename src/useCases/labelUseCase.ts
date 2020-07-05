import { GetLabelledImagesModel } from '../domains/imageLabelModels';
import { AddLabelModel, GetLabelModel, UpdateLabelModel } from '../domains/labelModels';
import { NotFoundError } from '../errors/notFound';
import { imageLabelRepository, labelRepository } from '../infra/database';
import { mapToGetLabelImages } from '../mappers/imageLabelMappers';
import { mapFromAddLabelModel, mapFromUpdateLabelModel, mapToGetLabelModel } from '../mappers/labelMappers';

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

export const addLabel = async (labelModel: AddLabelModel): Promise<void> => {
  const label = mapFromAddLabelModel(labelModel);
  await labelRepository.add(label);
};

export const deleteLabel = async (labelId: number): Promise<void> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  await labelRepository.delete(labelId);
};

export const updateLabel = async (labelModel: UpdateLabelModel): Promise<void> => {
  const label = await labelRepository.getById(labelModel.labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  const updatedLabel = mapFromUpdateLabelModel(labelModel);
  await labelRepository.update(updatedLabel);
};
