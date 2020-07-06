import { LabelStatusCodes } from './labelStatusCodes';

export interface GetLabelModel {
  labelId: number;
  label: string;
  statusCode: LabelStatusCodes;
}
