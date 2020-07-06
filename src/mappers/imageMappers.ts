import { AddImageModel, GetImageModel, ImageStatusCodes, UpdateImageModel } from '../domains/image';
import { ImageSearchCriteriaModel } from '../domains/image/imageSearchCriteriaModel';
import { Image, SearchCriteria } from '../dto/image';

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

export const mapFromImageSearchCriteriaModel = (
  imageSearchCriteriaModel: ImageSearchCriteriaModel,
): SearchCriteria => ({
  labelId: imageSearchCriteriaModel.labelId,
  startDate: imageSearchCriteriaModel.searchDates?.startDate,
  endDate: imageSearchCriteriaModel.searchDates?.endDate,
  imageStatusCode: imageSearchCriteriaModel.imageStatusCode,
});
