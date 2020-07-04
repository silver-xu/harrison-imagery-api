import {
  AddImageModel,
  EditImageModel as UpdateImageModel,
  GetImageLabellingsModel,
  GetImageModel,
} from '../domains/imageModels';
import { Image } from '../dto/image';
import { Labelling } from '../dto/imageLabel';

export const mapToGetImageModel = (image: Image): GetImageModel => image;

export const mapToGetLabelledImagesModel = (image: Image, labellings: Labelling[]): GetImageLabellingsModel => {
  return {
    ...image,
    imageLabellings: labellings.map((labelling) => ({
      ...labelling,
    })),
  };
};

export const mapFromAddImageModel = (addImageModel: AddImageModel): Image => addImageModel;

export const mapFromUpdateImageModel = (updateImageModel: UpdateImageModel): Image => updateImageModel;
