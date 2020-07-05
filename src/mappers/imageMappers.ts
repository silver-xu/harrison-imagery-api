import { AddImageModel, GetImageModel, ImageStatusCodes, UpdateImageModel } from '../domains/image';
import { Image } from '../dto/image';

export const mapToGetImageModel = (image: Image): GetImageModel => image;

export const mapFromAddImageModel = (addImageModel: AddImageModel): Image => ({
  ...addImageModel,
  imageId: 0,
  statusCode: ImageStatusCodes.Created,
});

export const mapFromUpdateImageModel = (imageId: number, updateImageModel: UpdateImageModel): Image => ({
  imageId,
  ...updateImageModel,
});
