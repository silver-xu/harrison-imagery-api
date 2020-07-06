import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as imageLabelUseCase from '../../../../useCases/imageLabelUseCase';
import { deleteImageLabelController } from '.';

jest.mock('../../../../useCases/imageLabelUseCase');

describe('test deleteImageLabelController', () => {
  it('should call next(BadRequestError) if id is not provided', async () => {
    const mockRequest = {
      params: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await deleteImageLabelController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await deleteImageLabelController(mockRequest, mockResponse, next);
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

    imageLabelUseCase.deleteImageLabel;

    await deleteImageLabelController(mockRequest, mockResponse, next);
    expect(imageLabelUseCase.deleteImageLabel).toHaveBeenLastCalledWith(1);
    expect(mockResponse.send).toHaveBeenLastCalledWith('Ok');
  });
});
