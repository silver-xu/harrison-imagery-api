import { Request, Response } from 'express';

import { AddImageModel } from '../../../../domains/image';
import { BadRequestError } from '../../../../errors/badRequest';
import { addImage } from '../../../../useCases/imageUseCase';
import { Next } from '../../types/next';

const isRequestValid = (image: AddImageModel): boolean =>
  image.imagePath && !isNaN(image.width) && !isNaN(image.height) && image.height > 0 && image.width > 0;

export const addImageController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const addImageModel = req.body as AddImageModel;

    if (!isRequestValid(addImageModel)) {
      throw new BadRequestError('Request body is malformed');
    }

    await addImage(addImageModel);

    res.send('Ok');
  } catch (error) {
    next(error);
  }
};
