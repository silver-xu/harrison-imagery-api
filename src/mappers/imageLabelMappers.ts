import { ImageStatusCodes } from '../domains/image';
import { AddImageLabelModel, GetLabelledImagesModel, GetLabellingsModel } from '../domains/imageLabel';
import { ImageLabel, Labelling } from '../dto/imageLabel';
import { LabelledImage } from '../dto/imageLabel/labelledImage';

export const mapFromAddImageLabelModel = (addImageLabelModel: AddImageLabelModel): ImageLabel => ({
  imageLabelId: 0,
  ...addImageLabelModel,
  labelledDate: new Date(Date.now()),
});

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
          labelledDate: labelling.labelledDate,
        })),
    })),
  };
};

export const mapToGetLabelledImagesModel = (labelledImages: LabelledImage[]): GetLabelledImagesModel => {
  const distinctLabelledImages = labelledImages.filter(
    (labelledImage, index, uniqueList) =>
      uniqueList.findIndex((item) => item.imageId === labelledImage.imageId) === index,
  );

  return {
    images: distinctLabelledImages.map((distinctLabelImage) => ({
      image: {
        imageId: distinctLabelImage.imageId,
        imagePath: distinctLabelImage.imagePath,
        statusCode: ImageStatusCodes[distinctLabelImage.statusCode],
        width: distinctLabelImage.width,
        height: distinctLabelImage.height,
      },
      labelPositions: labelledImages
        .filter((labelledImage) => labelledImage.imageId === distinctLabelImage.imageId)
        .map((labelledImage) => ({
          x: labelledImage.labelX,
          y: labelledImage.labelY,
          width: labelledImage.labelWidth,
          height: labelledImage.labelHeight,
          labelledDate: labelledImage.labelledDate,
        })),
    })),
  };
};
