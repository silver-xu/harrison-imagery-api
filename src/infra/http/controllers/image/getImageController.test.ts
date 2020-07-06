import { Request, Response } from 'express';

import { ImageStatusCodes } from '../../../../domains/image';
import { BadRequestError } from '../../../../errors/badRequest';
import * as imageUseCase from '../../../../useCases/imageUseCase';
import { getImageController } from '.';

jest.mock('../../../../useCases/imageUseCase');

describe('test getImageController', () => {
  const mockedImageUseCase = imageUseCase as jest.Mocked<typeof imageUseCase>;

  it('should call next(BadRequestError) if id is not provided', async () => {
    const mockRequest = {
      params: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await getImageController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await getImageController(mockRequest, mockResponse, next);
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
    const mockGetImageModel = {
      imageId: 1,
      imagePath: 'http://example.com',
      width: 100,
      height: 100,
      statusCode: ImageStatusCodes.Created,
    };
    mockedImageUseCase.getImage.mockResolvedValue(mockGetImageModel);

    imageUseCase.getImage;

    await getImageController(mockRequest, mockResponse, next);
    expect(mockResponse.send).toHaveBeenLastCalledWith(mockGetImageModel);
  });
});
