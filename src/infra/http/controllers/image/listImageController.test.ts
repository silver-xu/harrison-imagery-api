import { Request, Response } from 'express';

import { ImageStatusCodes } from '../../../../domains/image';
import * as imageUseCase from '../../../../useCases/imageUseCase';
import { listImagesController } from './listImagesController';

jest.mock('../../../../useCases/imageUseCase');

describe('test listImagesController', () => {
  const mockedImageUseCase = imageUseCase as jest.Mocked<typeof imageUseCase>;

  it('should send images', async () => {
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
    mockedImageUseCase.listImages.mockResolvedValue([mockGetImageModel]);

    await listImagesController(mockRequest, mockResponse, next);
    expect(mockResponse.send).toHaveBeenLastCalledWith([mockGetImageModel]);
  });
});
