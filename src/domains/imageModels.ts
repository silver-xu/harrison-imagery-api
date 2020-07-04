import { Image } from '../dto/image';
import { Labelling } from '../dto/imageLabel';

export interface GetImageModel extends Image {}
export interface GetImageLabellingsModel extends GetImageModel {
  imageLabellings: ImageLabellingModel[];
}

export interface AddImageModel extends Image {}
export interface EditImageModel extends Image {}

export interface ImageLabellingModel extends Labelling {
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
  imageLabels: ImageLabellingModel[];
}
