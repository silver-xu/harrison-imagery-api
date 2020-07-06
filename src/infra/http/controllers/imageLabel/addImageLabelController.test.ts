import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as imageLabelUseCase from '../../../../useCases/imageLabelUseCase';
import { addImageLabelController } from './addImageLabelController';

jest.mock('../../../../useCases/imageLabelUseCase');

describe('test addImageLabelController', () => {
  const mockedImageLabelUseCase = imageLabelUseCase as jest.Mocked<typeof imageLabelUseCase>;

  const mockAddImageLabelModel = {
    imageId: 1,
    labelId: 1,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };

  const mockGetImageLabelModel = {
    imageLabelId: 1,
    ...mockAddImageLabelModel,
  };

  describe('with invalid request body', () => {
    [
      {
        body: {
          ...mockAddImageLabelModel,
          imageId: undefined,
        },
        description: 'imageId is missing',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          labelId: undefined,
        },
        description: 'labelId is missing',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          x: undefined,
        },
        description: 'x is missing',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          x: undefined,
        },
        description: 'y is missing',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          width: undefined,
        },
        description: 'width is missing',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          height: undefined,
        },
        description: 'height is missing',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          x: 'foo',
        },
        description: 'x is string',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          y: 'foo',
        },
        description: 'y is string',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          width: 'foo',
        },
        description: 'width is string',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          height: 'foo',
        },
        description: 'height is string',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          x: -1,
        },
        description: 'x is less than 0',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          y: -1,
        },
        description: 'y is less than 0',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          width: 0,
        },
        description: 'width is 0 or less',
      },
      {
        body: {
          ...mockAddImageLabelModel,
          height: 0,
        },
        description: 'height is 0 or less',
      },
    ].forEach((body, description) => {
      it(`should call next(BadRequestError) if ${description}`, async () => {
        const mockRequest = {
          body,
        } as Request;
        const mockResponse = {} as Response;
        const next = jest.fn();

        await addImageLabelController(mockRequest, mockResponse, next);
        expect(next).toHaveBeenLastCalledWith(new BadRequestError('Request body is malformed'));
      });
    });
  });

  it('should send mockGetImageLabelModel if request is valid ', async () => {
    mockedImageLabelUseCase.addImageLabel.mockResolvedValue(mockGetImageLabelModel);
    const mockRequest = {
      body: mockAddImageLabelModel,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    await addImageLabelController(mockRequest, mockResponse, next);
    expect(imageLabelUseCase.addImageLabel).toHaveBeenLastCalledWith(mockAddImageLabelModel);
    expect(mockResponse.send).toHaveBeenLastCalledWith(mockGetImageLabelModel);
  });
});
