import { Request, Response } from 'express';

import { LabelStatusCodes } from '../../../../domains/label';
import { BadRequestError } from '../../../../errors/badRequest';
import { mapFromUpdateLabelModel, mapToGetLabelModel } from '../../../../mappers/labelMappers';
import * as labelUseCase from '../../../../useCases/labelUseCase';
import { updateLabelController } from './updateLabelController';

jest.mock('../../../../useCases/labelUseCase');

describe('test updateLabelController', () => {
  const mockedLabelUseCase = labelUseCase as jest.Mocked<typeof labelUseCase>;
  const mockUpdateLabelModel = {
    label: 'foo',
    statusCode: LabelStatusCodes.InUse,
  };
  const mockGetLabelModel = mapToGetLabelModel(mapFromUpdateLabelModel(1, mockUpdateLabelModel));

  describe('with invalid request body', () => {
    [
      {
        body: {
          ...mockUpdateLabelModel,
          label: undefined,
        },
        description: 'labelis missing',
      },
      {
        body: {
          ...mockUpdateLabelModel,
          statusCode: undefined,
        },
        description: 'status code is missing',
      },
      {
        body: {
          ...mockUpdateLabelModel,
          statusCode: 'foobar',
        },
        description: 'status code is not in LabelStatusCodesEnum',
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

        await updateLabelController(mockRequest, mockResponse, next);
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

    await updateLabelController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id is a mandatory parameter'));
  });

  it('should call next(BadRequestError) if id is not a number', async () => {
    const mockRequest = {
      params: { id: 'foobar' } as unknown,
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await updateLabelController(mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith(new BadRequestError('id must be a number'));
  });

  it('should send Ok if request is valid ', async () => {
    const mockRequest = {
      body: mockUpdateLabelModel,
      params: {
        id: 1,
      } as unknown,
    } as Request;
    const mockResponse = {
      send: jest.fn() as unknown,
    } as Response;
    const next = jest.fn();
    mockedLabelUseCase.updateLabel.mockResolvedValue(mockGetLabelModel);

    await updateLabelController(mockRequest, mockResponse, next);
    expect(labelUseCase.updateLabel).toHaveBeenLastCalledWith(1, mockUpdateLabelModel);
    expect(mockResponse.send).toHaveBeenLastCalledWith(mockGetLabelModel);
  });
});
