import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import { getLabel } from '../../../../useCases/labelUseCase';
import { Next } from '../../types/next';

export const getLabelController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const id = req.params['id'];

    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const labelId = parseInt(id, 10);

    if (isNaN(labelId)) {
      throw new BadRequestError('id must be a number');
    }

    const label = await getLabel(labelId);

    res.send(label);
  } catch (error) {
    next(error);
  }
};
