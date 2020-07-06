import { Request, Response } from 'express';

import { AddImageLabelModel } from '../../../../domains/imageLabel';
import { BadRequestError } from '../../../../errors/badRequest';
import { addImageLabel } from '../../../../useCases/imageLabelUseCase';
import { Next } from '../../types/next';

const isRequestBodyValid = (imageLabel: AddImageLabelModel): boolean =>
  !isNaN(imageLabel.imageId) &&
  !isNaN(imageLabel.labelId) &&
  !isNaN(imageLabel.x) &&
  !isNaN(imageLabel.y) &&
  !isNaN(imageLabel.width) &&
  !isNaN(imageLabel.height) &&
  imageLabel.x >= 0 &&
  imageLabel.y >= 0 &&
  imageLabel.height > 0 &&
  imageLabel.width > 0;

export const addImageLabelController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const addLabelModel = req.body as AddImageLabelModel;

    if (!isRequestBodyValid(addLabelModel)) {
      throw new BadRequestError('Request body is malformed');
    }

    const imageLabel = await addImageLabel(addLabelModel);

    res.send(imageLabel);
  } catch (error) {
    next(error);
  }
};
