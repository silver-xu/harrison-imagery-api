import { Request, Response } from 'express';

import { BadRequestError } from '../../../../errors/badRequest';
import * as imageUseCase from '../../../../useCases/imageUseCase';
import { searchImageController } from './searchImageController';

jest.mock('../../../../useCases/imageUseCase');

describe('test searchImageController', () => {
  const mockedImageUseCase = imageUseCase as jest.Mocked<typeof imageUseCase>;

  [
    {
      query: {
        labelId: 'foo',
      },
      testCase: 'labelId is invalid',
      error: 'label id must be a number',
    },
    {
      query: {
        startDate: 'foo',
        endDate: '2000-01-01',
      },
      testCase: 'startDate is invalid',
      error: 'date formats are malformed',
    },
    {
      query: {
        startDate: '2000-01-01',
        endDate: 'foo',
      },
      testCase: 'endDate is invalid',
      error: 'date formats are malformed',
    },
    {
      query: {
        startDate: '2000-01-01',
      },
      testCase: 'endDate missing',
      error: 'dates have to be both absent or present',
    },
    {
      query: {
        endDate: '2000-01-01',
      },
      testCase: 'startDate missing',
      error: 'dates have to be both absent or present',
    },
    {
      query: {
        startDate: '2000-01-01',
        endDate: '2000-01-01',
      },
      testCase: 'startDate equals endDate',
      error: 'start date must be before end date',
    },
    {
      query: {
        imageStatusCode: 'foo',
      },
      testCase: 'invalid image status code',
      error: 'image status code is not valid',
    },
  ].forEach(({ query, testCase, error }) => {
    it(`should call next(BadRequestError) if ${testCase}`, async () => {
      const mockRequest = {
        query: query as unknown,
      } as Request;
      const mockResponse = {} as Response;
      const next = jest.fn();

      await searchImageController(mockRequest, mockResponse, next);
      expect(next).toHaveBeenLastCalledWith(new BadRequestError(error));
    });

    it('should send images if request is valid', async () => {
      const mockRequest = {
        query: {},
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
        statusCode: 'Created',
      };
      mockedImageUseCase.searchImages.mockResolvedValue([mockGetImageModel]);

      await searchImageController(mockRequest, mockResponse, next);
      expect(imageUseCase.searchImages).toHaveBeenLastCalledWith({});
      expect(mockResponse.send).toHaveBeenLastCalledWith([mockGetImageModel]);
    });
  });
});
