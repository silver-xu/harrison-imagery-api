import { Request, Response } from 'express';

import { httpLoggerMiddleware } from './httpLogger';

describe('test httpLoggerMiddleware', () => {
  const next = jest.fn();

  console.log = jest.fn();
  console.error = jest.fn();

  describe('when no error has been passed', () => {
    it('should log actual userId if exists in locals', async () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
      } as Request;
      const mockResponse = {
        locals: {
          appScope: {
            userId: 1,
          },
        },
      } as Response;

      await httpLoggerMiddleware(mockRequest, mockResponse, next);
      expect(console.log).toHaveBeenLastCalledWith({
        logEntry: {
          userId: 1,
          method: 'foo',
          path: 'bar',
        },
      });
    });

    it('should log Anonymous as userId if userId does not exist in locals', async () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
      } as Request;
      const mockResponse = {
        locals: {
          appScope: {},
        },
      } as Response;

      await httpLoggerMiddleware(mockRequest, mockResponse, next);
      expect(console.log).toHaveBeenLastCalledWith({
        logEntry: {
          userId: 'Anonymous',
          method: 'foo',
          path: 'bar',
        },
      });
    });
  });
});
