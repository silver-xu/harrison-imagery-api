import { Request, Response } from 'express';

import { LabelStatusCodes, UpdateLabelModel } from '../../../../domains/label';
import { BadRequestError } from '../../../../errors/badRequest';
import { updateLabel } from '../../../../useCases/labelUseCase';
import { Next } from '../../types/next';

const isRequestBodyValid = (label: UpdateLabelModel): boolean =>
  label.label && label.statusCode && Object.keys(LabelStatusCodes).includes(label.statusCode);

export const updateLabelController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const updateLabelModel = req.body as UpdateLabelModel;

    const id = req.params['id'];
    if (!id) {
      throw new BadRequestError('id is a mandatory parameter');
    }

    const labelId = parseInt(id, 10);
    if (isNaN(labelId)) {
      throw new BadRequestError('id must be a number');
    }

    if (!isRequestBodyValid(updateLabelModel)) {
      throw new BadRequestError('Request body is malformed');
    }

    const result = await updateLabel(labelId, updateLabelModel);

    res.send(result);
  } catch (error) {
    next(error);
  }
};
