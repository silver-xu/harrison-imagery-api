import { ImageStatusCodes } from './imageStatusCodes';

export interface UpdateImageModel {
  imagePath: string;
  width: number;
  height: number;
  statusCode: ImageStatusCodes;
}
