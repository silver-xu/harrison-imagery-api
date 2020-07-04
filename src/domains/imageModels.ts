import { Image } from '../dto/image';
import { Labelling } from '../dto/imageLabel';

export interface GetImageModel extends Image {}
export interface GetImageWithLabelsModel extends GetImageModel {
  imageLabels: ImageLabelModel[];
}

export interface AddImageModel extends Image {}
export interface EditImageModel extends Image {}

export interface ImageLabelModel extends Labelling {
  label: string;
}

export enum ImageStatusCodes {
  Created = 'Created',
  Labelled = 'Labelled',
  Deleted = 'Deleted',
}

export interface ImageModel {
  imageId: number;
  imagePath: string;
  width: number;
  height: number;
  statusCode: string;
  imageLabels: ImageLabelModel[];
}
