import { Request, Response } from 'express';

import { LabelStatusCodes } from '../../../../domains/label';
import { BadRequestError } from '../../../../errors/badRequest';
import * as labelUseCase from '../../../../useCases/labelUseCase';
import { getLabelController } from '.';

jest.mock('../../../../useCases/labelUseCase');

describe('test getLabelController', () => {
  const mockedLabelUseCase = labelUseCase as jest.Mocked<typeof labelUseCase>;

  it('should call next(BadRequestError) if id is not provided', async () => {
    const mockRequest = {
      params: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await getLabelController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await getLabelController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id must be a number'));
  });

  it('should send label if id is valid', async () => {
    const mockRequest = {
      params: { id: 1 } as unknown,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();

    const mockGetLabelModel = {
      labelId: 1,
      label: 'foo',
      statusCode: LabelStatusCodes.InUse,
    };

    mockedLabelUseCase.getLabel.mockResolvedValue(mockGetLabelModel);

    labelUseCase.getLabel;

    await getLabelController(mockRequest, mockResponse, next);
    expect(mockResponse.send).toHaveBeenLastCalledWith(mockGetLabelModel);
  });
});
