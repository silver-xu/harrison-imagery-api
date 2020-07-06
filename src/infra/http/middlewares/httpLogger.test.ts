import { Request, Response } from 'express';

import { httpLoggerMiddleware } from './httpLogger';

describe('test httpLoggerMiddleware', () => {
  const next = jest.fn();

  console.log = jest.fn();
  console.error = jest.fn();
  Date.now = jest.fn().mockReturnValue(0);

  describe('when no error has been passed', () => {
    it('should log actual userId if exists in locals', async () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
        get: jest.fn().mockReturnValue('foobar') as unknown,
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
          userAgent: 'foobar',
          timestamp: new Date(Date.now()),
        },
      });
    });

    it('should log Anonymous as userId if userId does not exist in locals', async () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
        get: jest.fn().mockReturnValue('foobar') as unknown,
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
          userAgent: 'foobar',
          timestamp: new Date(Date.now()),
        },
      });
    });
  });
});
