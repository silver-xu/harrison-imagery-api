import { Label } from '../dto/label';
import { LabelPosition } from './common';
import { GetImageModel } from './imageModels';

export interface AddImageLabelModel {
  imageId: number;
  labelId: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GetLabellingsModel {
  labellings: LabellingModel[];
}

export interface LabellingModel {
  label: Label;
  labelPositions: LabelPosition[];
}

export interface GetLabelledImagesModel {
  images: LabeledImageModel[];
}

export interface LabeledImageModel {
  image: GetImageModel;
  labelPositions: LabelPosition[];
}
