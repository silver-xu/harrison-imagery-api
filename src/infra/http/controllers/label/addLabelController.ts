import { Request, Response } from 'express';

import { AddLabelModel } from '../../../../domains/label';
import { BadRequestError } from '../../../../errors/badRequest';
import { addLabel } from '../../../../useCases/labelUseCase';
import { Next } from '../../types/next';

export const addLabelController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const addLabelModel = req.body as AddLabelModel;

    if (!addLabelModel.label) {
      throw new BadRequestError('Request body is malformed');
    }

    await addLabel(addLabelModel);

    res.send('Ok');
  } catch (error) {
    next(error);
  }
};
