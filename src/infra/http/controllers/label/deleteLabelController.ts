import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import { deleteLabel } from '../../../../useCases/labelUseCase';
import { Next } from '../../types/next';

export const deleteLabelController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const id = req.params['id'];

    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const labelId = parseInt(id, 10);

    if (isNaN(labelId)) {
      throw new BadRequestError('id must be a number');
    }

    await deleteLabel(labelId);

    res.send('Ok');
  } catch (error) {
    next(error);
  }
};
