import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import { getLabelledImages } from '../../../../useCases/imageLabelUseCase';
import { Next } from '../../types/next';

export const getLabelledImagesController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const id = req.params['id'];

    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const labelId = parseInt(id, 10);

    if (isNaN(labelId)) {
      throw new BadRequestError('id must be a number');
    }

    const labelledImages = await getLabelledImages(labelId);

    res.send(labelledImages);
  } catch (error) {
    next(error);
  }
};
