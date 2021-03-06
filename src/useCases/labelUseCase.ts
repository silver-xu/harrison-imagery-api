import { AddLabelModel, GetLabelModel, LabelStatusCodes, UpdateLabelModel } from '../domains/label';
import { NotFoundError } from '../errors/notFound';
import { labelRepository } from '../infra/database';
import { mapFromAddLabelModel, mapFromUpdateLabelModel, mapToGetLabelModel } from '../mappers/labelMappers';

export const listLabels = async (): Promise<GetLabelModel[]> => {
  const labels = await labelRepository.getAll();
  return labels.map((label) => mapToGetLabelModel(label));
};

export const getLabel = async (labelId: number): Promise<GetLabelModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  return mapToGetLabelModel(label);
};

export const addLabel = async (labelModel: AddLabelModel): Promise<GetLabelModel> => {
  const label = mapFromAddLabelModel(labelModel);
  const labelId = await labelRepository.add(label);

  return {
    ...label,
    labelId,
    statusCode: LabelStatusCodes.InUse,
  };
};

export const deleteLabel = async (labelId: number): Promise<void> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  await labelRepository.delete(labelId);
};

export const updateLabel = async (labelId: number, labelModel: UpdateLabelModel): Promise<GetLabelModel> => {
  const label = await labelRepository.getById(labelId);

  if (!label) {
    throw new NotFoundError('Label was not found');
  }

  const updatedLabel = mapFromUpdateLabelModel(labelId, labelModel);
  await labelRepository.update(updatedLabel);

  return { ...labelModel, labelId };
};
