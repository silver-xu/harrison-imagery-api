import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as imageLabelUseCase from '../../../../useCases/imageLabelUseCase';
import { getLabelledImagesController } from './getLabelledImagesController';

jest.mock('../../../../useCases/imageLabelUseCase');

describe('test getLabelledImagesController', () => {
  const mockedImageLabelUseCase = imageLabelUseCase as jest.Mocked<typeof imageLabelUseCase>;

  it('should call next(BadRequestError) if id is not provided', async () => {
    const mockRequest = {
      params: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await getLabelledImagesController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await getLabelledImagesController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id must be a number'));
  });

  it('should send image if id is valid', async () => {
    const mockRequest = {
      params: { id: 1 } as unknown,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    const mockGetLabelledImagesModel = {
      images: [
        {
          image: {
            imageId: 1,
            imagePath: 'http://example.com',
            width: 100,
            height: 100,
            statusCode: 'Labelled',
          },
          labelPositions: [
            {
              x: 0,
              y: 0,
              width: 25,
              height: 25,
            },
            {
              x: 25,
              y: 25,
              width: 25,
              height: 25,
            },
          ],
        },
        {
          image: {
            imageId: 2,
            imagePath: 'http://example2.com',
            width: 200,
            height: 200,
            statusCode: 'Labelled',
          },
          labelPositions: [
            {
              x: 50,
              y: 50,
              width: 50,
              height: 50,
            },
          ],
        },
      ],
    };

    mockedImageLabelUseCase.getLabelledImages.mockResolvedValue(mockGetLabelledImagesModel);

    await getLabelledImagesController(mockRequest, mockResponse, next);
    expect(mockResponse.send).toHaveBeenLastCalledWith(mockGetLabelledImagesModel);
  });
});
