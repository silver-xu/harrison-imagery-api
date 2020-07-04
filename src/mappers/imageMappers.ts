import {
  AddImageModel,
  GetImageModel,
  GetLabellingsModel,
  ImageStatusCodes,
  UpdateImageModel,
} from '../domains/imageModels';
import { Image } from '../dto/image';
import { Labelling } from '../dto/imageLabel';

export const mapToGetImageModel = (image: Image): GetImageModel => image;

export const mapToGetLabellingsModel = (labellings: Labelling[]): GetLabellingsModel => {
  const distinctLabellings = labellings.filter(
    (labelling, index, uniqueList) => uniqueList.findIndex((item) => item.labelId === labelling.labelId) === index,
  );

  return {
    labellings: distinctLabellings.map((distinctLabelling) => ({
      label: {
        labelId: distinctLabelling.labelId,
        label: distinctLabelling.label,
        statusCode: distinctLabelling.statusCode,
      },
      labelPositions: labellings
        .filter((labelling) => labelling.labelId === distinctLabelling.labelId)
        .map((labelling) => ({
          x: labelling.x,
          y: labelling.y,
          width: labelling.width,
          height: labelling.height,
        })),
    })),
  };
};

export const mapFromAddImageModel = (addImageModel: AddImageModel): Image => ({
  ...addImageModel,
  imageId: 0,
  statusCode: ImageStatusCodes.Created,
});

export const mapFromUpdateImageModel = (updateImageModel: UpdateImageModel): Image => updateImageModel;
