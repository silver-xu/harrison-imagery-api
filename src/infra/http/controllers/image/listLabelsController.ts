import { Request, Response } from 'express';

import { listLabels } from '../../../../useCases/labelUseCase';
import { Next } from '../../types/next';

export const listLabelsController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const labels = await listLabels();

    res.send(labels);
    next();
  } catch (error) {
    next(error);
  }
};
