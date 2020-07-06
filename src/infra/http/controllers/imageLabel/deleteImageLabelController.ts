import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import { deleteImageLabel } from '../../../../useCases/imageLabelUseCase';
import { Next } from '../../types/next';

export const deleteImageLabelController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const id = req.params['id'];

    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const imageImageLabelId = parseInt(id, 10);

    if (isNaN(imageImageLabelId)) {
      throw new BadRequestError('id must be a number');
    }

    await deleteImageLabel(imageImageLabelId);

    res.send('Ok');
  } catch (error) {
    next(error);
  }
};
