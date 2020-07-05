import { Label } from '../dto/label';

export interface GetLabelModel extends Label {}

export interface AddLabelModel {
  label: string;
}
export interface UpdateLabelModel extends Label {}

export enum LabelStatusCodes {
  InUse = 'InUse',
  Deleted = 'Deleted',
}
