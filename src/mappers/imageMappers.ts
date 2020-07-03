import { Image } from '../dto/image';
import { Labelling } from '../dto/imageLabel';
import {
  AddImageModel,
  EditImageModel as UpdateImageModel,
  GetImageWithLabelsModel,
  GetImageModel,
} from '../domains/imageModels';

export const mapToGetImageModel = (image: Image): GetImageModel => image;

export const mapToGetImageWithLabelsModel = (image: Image, labellings: Labelling[]): GetImageWithLabelsModel => {
  return {
    ...image,
    imageLabels: labellings.map((labelling) => ({
      ...labelling,
    })),
  };
};

export const mapFromAddImageModel = (addImageModel: AddImageModel): Image => addImageModel;

export const mapFromUpdateImageModel = (updateImageModel: UpdateImageModel): Image => updateImageModel;
