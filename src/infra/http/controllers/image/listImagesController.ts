import { Request, Response } from 'express';

import { listImages } from '../../../../useCases/imageUseCase';
import { Next } from '../../types/next';

export const listImagesController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const images = await listImages();

    res.send(images);
    next();
  } catch (error) {
    next(error);
  }
};
