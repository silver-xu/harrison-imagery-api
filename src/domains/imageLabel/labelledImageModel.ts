import { LabelPosition } from '../common';
import { GetImageModel } from '../image';

export interface LabeledImageModel {
  image: GetImageModel;
  labelPositions: LabelPosition[];
}
