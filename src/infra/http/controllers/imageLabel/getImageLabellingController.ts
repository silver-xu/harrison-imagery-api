import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import { getImageLabellings } from '../../../../useCases/imageLabelUseCase';
import { Next } from '../../types/next';

export const getImageLabellingController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const id = req.params['id'];

    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const imageId = parseInt(id, 10);

    if (isNaN(imageId)) {
      throw new BadRequestError('id must be a number');
    }

    const imageLabellings = await getImageLabellings(imageId);

    res.send(imageLabellings);
  } catch (error) {
    next(error);
  }
};
