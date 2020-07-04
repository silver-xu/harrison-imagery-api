import { Label } from '../dto/label';
import { GetImageModel } from './imageModels';

export interface GetLabelModel extends Label {}

export interface AddLabelModel extends Label {}
export interface UpdateLabelModel extends Label {}

export interface GetLabelledImagesModel {
  images: LabeledImageModel[];
}

export interface LabeledImageModel {
  image: GetImageModel;
  labelPositions: LabelPosition[];
}

export interface LabelPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum LabelStatusCodes {
  InUse = 'InUse',
  Deleted = 'Deleted',
}
