import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as imageUseCase from '../../../../useCases/imageUseCase';
import { updateImageController } from './updateImageController';

jest.mock('../../../../useCases/imageUseCase');

describe('test updateImageController', () => {
  const mockUpdateImageModel = {
    imagePath: 'http://example.com',
    width: 100,
    height: 100,
    statusCode: 'Created',
  };

  describe('with invalid request body', () => {
    [
      {
        body: {
          ...mockUpdateImageModel,
          imagePath: undefined,
        },
        description: 'imagePath is missing',
      },
      {
        body: {
          ...mockUpdateImageModel,
          width: undefined,
        },
        description: 'width is missing',
      },
      {
        body: {
          ...mockUpdateImageModel,
          height: undefined,
        },
        description: 'height is missing',
      },
      {
        body: {
          ...mockUpdateImageModel,
          statusCode: undefined,
        },
        description: 'status code is missing',
      },
      {
        body: {
          ...mockUpdateImageModel,
          statusCode: 'foobar',
        },
        description: 'status code is not in ImageStatusCodesEnum',
      },
      {
        body: {
          ...mockUpdateImageModel,
          width: 'foo',
        },
        description: 'width is string',
      },
      {
        body: {
          ...mockUpdateImageModel,
          height: 'foo',
        },
        description: 'height is string',
      },
      {
        body: {
          ...mockUpdateImageModel,
          width: 0,
        },
        description: 'width is 0 or less',
      },
      {
        body: {
          ...mockUpdateImageModel,
          height: 0,
        },
        description: 'height is 0 or less',
      },
    ].forEach((body, description) => {
      it(`should call next(BadRequestError) if ${description}`, async () => {
        const mockRequest = {
          body,
          params: {
            id: 1,
          } as unknown,
        } as Request;
        const mockResponse = {} as Response;
        const next = jest.fn();

        await updateImageController(mockRequest, mockResponse, next);
        expect(next).toHaveBeenLastCalledWith(new BadRequestError('Request body is malformed'));
      });
    });
  });

  it('should call next(BadRequestError) if id is not provided', async () => {
    const mockRequest = {
      params: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await updateImageController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await updateImageController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id must be a number'));
  });

  it('should send Ok if request is valid ', async () => {
    const mockRequest = {
      body: mockUpdateImageModel,
      params: {
        id: 1,
      } as unknown,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    await updateImageController(mockRequest, mockResponse, next);
    expect(imageUseCase.updateImage).toHaveBeenLastCalledWith(1, mockUpdateImageModel);
    expect(mockResponse.send).toHaveBeenLastCalledWith('Ok');
  });
});
