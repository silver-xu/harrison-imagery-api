import { Request, Response } from 'express';

import { LabelStatusCodes } from '../../../../domains/label';
import * as labelUseCase from '../../../../useCases/labelUseCase';
import { listLabelsController } from './listLabelsController';

jest.mock('../../../../useCases/labelUseCase');

describe('test listLabelsController', () => {
  const mockedLabelUseCase = labelUseCase as jest.Mocked<typeof labelUseCase>;

  it('should send labels', async () => {
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
    mockedLabelUseCase.listLabels.mockResolvedValue([mockGetLabelModel]);

    await listLabelsController(mockRequest, mockResponse, next);
    expect(mockResponse.send).toHaveBeenLastCalledWith([mockGetLabelModel]);
  });
});
