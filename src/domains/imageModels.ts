import { Image } from '../dto/image';
import { Label } from '../dto/label';
import { LabelPosition } from './common';

export interface GetImageModel extends Image {}
export interface GetLabellingsModel {
  labellings: LabellingModel[];
}

export interface AddImageModel {
  imagePath: string;
  width: number;
  height: number;
}

export interface UpdateImageModel extends Image {}

export interface LabellingModel {
  label: Label;
  labelPositions: LabelPosition[];
}

export enum ImageStatusCodes {
  Created = 'Created',
  Labelled = 'Labelled',
  Deleted = 'Deleted',
}
