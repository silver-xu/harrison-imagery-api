import { AddLabelModel, GetLabelModel, LabelStatusCodes, UpdateLabelModel } from '../domains/labelModels';
import { Label } from '../dto/label';

export const mapToGetLabelModel = (label: Label): GetLabelModel => label;

export const mapFromAddLabelModel = (addLabelModel: AddLabelModel): Label => ({
  ...addLabelModel,
  labelId: 0,
  statusCode: LabelStatusCodes.InUse,
});

export const mapFromUpdateLabelModel = (updateLabelModel: UpdateLabelModel): Label => updateLabelModel;
