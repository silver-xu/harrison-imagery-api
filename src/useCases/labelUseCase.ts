import { GetLabelModel, GetLabelledImagesModel, LabelStatusCodes, UpdateLabelModel } from '../domains/labelModels';
import { labelRepository, imageLabelRepository } from '../infra/database';
import {
  mapToGetLabelModel,
  mapToGetLabelImages,
  mapFromUpdateLabelModel,
  mapFromAddLabelModel,
} from '../mappers/labelMappers';
import { NotFoundError } from '../errors/notFound';

export const getLabel = async (labelId: number): Promise<GetLabelModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label || label.statusCode === LabelStatusCodes.Deleted) {
    throw new NotFoundError('Label was not found');
  }

  return mapToGetLabelModel(label);
};

export const getLabelledImages = async (labelId: number): Promise<GetLabelledImagesModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label || label.statusCode === LabelStatusCodes.Deleted) {
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

  if (!label || label.statusCode === LabelStatusCodes.Deleted) {
    throw new NotFoundError('Label was not found');
  }

  await labelRepository.delete(labelId);
};

export const updateImage = async (labelModel: UpdateLabelModel): Promise<void> => {
  const label = await labelRepository.getById(labelModel.labelId);

  if (!label || label.statusCode === LabelStatusCodes.Deleted) {
    throw new NotFoundError('Label was not found');
  }

  const updatedLabel = mapFromUpdateLabelModel(labelModel);
  await labelRepository.update(updatedLabel);
};
