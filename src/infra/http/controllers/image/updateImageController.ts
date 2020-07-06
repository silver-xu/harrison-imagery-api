import { Request, Response } from 'express';

import { ImageStatusCodes, UpdateImageModel } from '../../../../domains/image';
import { BadRequestError } from '../../../../errors/badRequest';
import { updateImage } from '../../../../useCases/imageUseCase';
import { Next } from '../../types/next';

const isRequestBodyValid = (image: UpdateImageModel): boolean =>
  image.imagePath &&
  image.statusCode &&
  Object.keys(ImageStatusCodes).includes(image.statusCode) &&
  !isNaN(image.width) &&
  !isNaN(image.height) &&
  image.height > 0 &&
  image.width > 0;

export const updateImageController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const updateImageModel = req.body as UpdateImageModel;

    const id = req.params['id'];
    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const imageId = parseInt(id, 10);
    if (isNaN(imageId)) {
      throw new BadRequestError('id must be a number');
    }

    if (!isRequestBodyValid(updateImageModel)) {
      throw new BadRequestError('Request body is malformed');
    }

    await updateImage(imageId, updateImageModel);

    res.send('Ok');
  } catch (error) {
    next(error);
  }
};
