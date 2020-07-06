import { ImageStatusCodes } from './imageStatusCodes';

export interface GetImageModel {
  imageId: number;
  imagePath: string;
  width: number;
  height: number;
  statusCode: ImageStatusCodes;
}
