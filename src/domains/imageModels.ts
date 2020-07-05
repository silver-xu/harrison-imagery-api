import { Image } from '../dto/image';

export interface GetImageModel extends Image {}

export interface AddImageModel {
  imagePath: string;
  width: number;
  height: number;
}

export interface UpdateImageModel extends Image {}

export enum ImageStatusCodes {
  Created = 'Created',
  Labelled = 'Labelled',
  Deleted = 'Deleted',
}
