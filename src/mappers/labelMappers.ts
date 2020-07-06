import { AddLabelModel, GetLabelModel, LabelStatusCodes, UpdateLabelModel } from '../domains/label';
import { Label } from '../dto/label';

export const mapToGetLabelModel = ({ labelId, label, statusCode }: Label): GetLabelModel => ({
  labelId,
  label,
  statusCode: LabelStatusCodes[statusCode],
});

export const mapFromAddLabelModel = (addLabelModel: AddLabelModel): Label => ({
  ...addLabelModel,
  labelId: 0,
  statusCode: LabelStatusCodes.InUse,
});

export const mapFromUpdateLabelModel = (labelId: number, updateLabelModel: UpdateLabelModel): Label => ({
  labelId,
  ...updateLabelModel,
});
