import { LabelStatusCodes } from './labelStatusCodes';

export interface UpdateLabelModel {
  label: string;
  statusCode: LabelStatusCodes;
}
