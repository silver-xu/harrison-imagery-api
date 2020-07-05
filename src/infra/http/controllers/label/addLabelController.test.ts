import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as labelUseCase from '../../../../useCases/labelUseCase';
import { addLabelController } from './addLabelController';

jest.mock('../../../../useCases/labelUseCase');

describe('test addLabelController', () => {
  const mockAddLabelModel = {
    label: 'foo',
  };

  it(`should call next(BadRequestError) if label is missing`, async () => {
    const mockRequest = {
      body: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await addLabelController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('Request body is malformed'));
  });

  it('should send Ok if request is valid ', async () => {
    const mockRequest = {
      body: mockAddLabelModel,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    await addLabelController(mockRequest, mockResponse, next);
    expect(labelUseCase.addLabel).toHaveBeenLastCalledWith(mockAddLabelModel);
    expect(mockResponse.send).toHaveBeenLastCalledWith('Ok');
  });
});
