import {
  AddLabelModel,
  GetLabelledImagesModel,
  GetLabelModel,
  LabelStatusCodes,
  UpdateLabelModel,
} from '../domains/labelModels';
import { LabelledImage } from '../dto/imageLabel/labelledImage';
import { Label } from '../dto/label';

export const mapToGetLabelModel = (label: Label): GetLabelModel => label;

export const mapToGetLabelImages = (labelledImages: LabelledImage[]): GetLabelledImagesModel => {
  const distinctLabelledImages = labelledImages.filter(
    (labelledImage, index, uniqueList) =>
      uniqueList.findIndex((item) => item.imageId === labelledImage.imageId) === index,
  );

  return {
    images: distinctLabelledImages.map((distinctLabelImage) => ({
      image: {
        imageId: distinctLabelImage.imageId,
        imagePath: distinctLabelImage.imagePath,
        statusCode: distinctLabelImage.statusCode,
        width: distinctLabelImage.width,
        height: distinctLabelImage.height,
      },
      labelPositions: labelledImages
        .filter((labelledImage) => labelledImage.labelId === distinctLabelImage.labelId)
        .map((labelledImage) => ({
          x: labelledImage.labelX,
          y: labelledImage.labelY,
          width: labelledImage.labelWidth,
          height: labelledImage.labelHeight,
        })),
    })),
  };
};

export const mapFromAddLabelModel = (addLabelModel: AddLabelModel): Label => ({
  ...addLabelModel,
  labelId: 0,
  statusCode: LabelStatusCodes.InUse,
});

export const mapFromUpdateLabelModel = (updateLabelModel: UpdateLabelModel): Label => updateLabelModel;
