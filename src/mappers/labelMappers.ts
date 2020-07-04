import { Image } from '../dto/image';
import { AddImageModel, EditImageModel } from '../domains/imageModels';
import { Label } from '../dto/label';
import { LabelledImage } from '../dto/imageLabel/labelledImage';
import { GetLabelledImagesModel } from '../domains/labelModels';

export const mapToGetLabelModel = (label: Label) => label;

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

export const mapFromAddImageModel = (addImageModel: AddImageModel): Image => addImageModel;

export const mapFromEditImageModel = (editImageModel: EditImageModel): Image => editImageModel;
