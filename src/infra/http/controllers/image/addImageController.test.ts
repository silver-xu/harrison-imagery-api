import { Request, Response } from 'express';

import { ImageStatusCodes } from '../../../../domains/image';
import { BadRequestError } from '../../../../errors/badRequest';
import * as imageUseCase from '../../../../useCases/imageUseCase';
import { addImageController } from './addImageController';

jest.mock('../../../../useCases/imageUseCase');

describe('test addImageController', () => {
  const mockedImageUseCase = imageUseCase as jest.Mocked<typeof imageUseCase>;

  const mockAddImageModel = {
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
  };

  const mockGetImageModel = {
    imageId: 1,
    ...mockAddImageModel,
    statusCode: ImageStatusCodes.Created,
  };

  describe('with invalid request body', () => {
    [
      {
        body: {
          ...mockAddImageModel,
          imagePath: undefined,
        },
        description: 'imagePath is missing',
      },
      {
        body: {
          ...mockAddImageModel,
          width: undefined,
        },
        description: 'width is missing',
      },
      {
        body: {
          ...mockAddImageModel,
          height: undefined,
        },
        description: 'height is missing',
      },
      {
        body: {
          ...mockAddImageModel,
          width: 'foo',
        },
        description: 'width is string',
      },
      {
        body: {
          ...mockAddImageModel,
          height: 'foo',
        },
        description: 'height is string',
      },
      {
        body: {
          ...mockAddImageModel,
          width: 0,
        },
        description: 'width is 0 or less',
      },
      {
        body: {
          ...mockAddImageModel,
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

        await addImageController(mockRequest, mockResponse, next);
        expect(next).toHaveBeenLastCalledWith(new BadRequestError('Request body is malformed'));
      });
    });
  });

  it('should send mockGetImageModel if request is valid ', async () => {
    mockedImageUseCase.addImage.mockResolvedValue(mockGetImageModel);

    const mockRequest = {
      body: mockAddImageModel,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    await addImageController(mockRequest, mockResponse, next);
    expect(imageUseCase.addImage).toHaveBeenLastCalledWith(mockAddImageModel);
    expect(mockResponse.send).toHaveBeenLastCalledWith(mockGetImageModel);
  });
});
