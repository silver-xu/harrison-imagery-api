import { Label } from '../dto/label';
import { GetImageModel } from './imageModels';

export interface GetLabelModel extends Label {}

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
