import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as imageUseCase from '../../../../useCases/imageUseCase';
import { deleteImageController } from '.';

jest.mock('../../../../useCases/imageUseCase');

describe('test deleteImageController', () => {
  it('should call next(BadRequestError) if id is not provided', async () => {
    const mockRequest = {
      params: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await deleteImageController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await deleteImageController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id must be a number'));
  });

  it('should send ok if id is valid', async () => {
    const mockRequest = {
      params: { id: 1 } as unknown,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    imageUseCase.deleteImage;

    await deleteImageController(mockRequest, mockResponse, next);
    expect(imageUseCase.deleteImage).toHaveBeenLastCalledWith(1);
    expect(mockResponse.send).toHaveBeenLastCalledWith('Ok');
  });
});
