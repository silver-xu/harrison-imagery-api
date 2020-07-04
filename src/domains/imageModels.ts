import { Labelling } from '../dto/imageLabel';
import { Image } from '../dto/image';

export interface GetImageModel extends Image {}
export interface GetImageWithLabelsModel extends GetImageModel {
  imageLabels: ImageLabelModel[];
}

export interface AddImageModel extends Image {}
export interface EditImageModel extends Image {}

export interface ImageLabelModel extends Labelling {}

export enum ImageStatusCodes {
  Created = 'Created',
  Labelled = 'Labelled',
  Deleted = 'Deleted',
}
