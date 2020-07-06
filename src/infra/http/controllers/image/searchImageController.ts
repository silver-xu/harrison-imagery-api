import { Request, Response } from 'express';

import { ImageStatusCodes } from '../../../../domains/image';
import { BadRequestError } from '../../../../errors/badRequest';
import { searchImages } from '../../../../useCases/imageUseCase';
import { Next } from '../../types/next';

export const searchImageController = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const { labelId, startDate, endDate, imageStatusCode } = req.query as { [key: string]: string };

    const startDateMalformed = startDate && isNaN(Date.parse(startDate));
    const endDateMalformed = endDate && isNaN(Date.parse(endDate));
    if (startDateMalformed || endDateMalformed) {
      throw new BadRequestError('date formats are malformed');
    }

    const oneDateMissing = (startDate && !endDate) || (!startDate && endDate);
    if (oneDateMissing) {
      throw new BadRequestError('dates have to be both absent or present');
    }

    const parsedStartDate = startDate && new Date(startDate);
    const parsedEndDate = endDate && new Date(endDate);

    const startDateAfterEndDate = parsedStartDate && parsedEndDate && parsedStartDate >= parsedEndDate;
    if (startDateAfterEndDate) {
      throw new BadRequestError('start date must be before end date');
    }

    const parsedLabelId = labelId && parseInt(labelId, 10);
    if (labelId && isNaN(parsedLabelId)) {
      throw new BadRequestError('label id must be a number');
    }

    const imageStatusCodeInvalid = imageStatusCode && !Object.keys(ImageStatusCodes).includes(imageStatusCode);
    if (imageStatusCodeInvalid) {
      throw new BadRequestError('image status code is not valid');
    }

    const imageSearchCriteriaModel = {
      labelId: parsedLabelId,
      searchDates: parsedStartDate &&
        parsedEndDate && {
          startDate: parsedStartDate,
          endDate: parsedEndDate,
        },
      imageStatusCode: ImageStatusCodes[imageStatusCode],
    };

    const images = await searchImages(imageSearchCriteriaModel);

    res.send(images);
  } catch (error) {
    next(error);
  }
};
