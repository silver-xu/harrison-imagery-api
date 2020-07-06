import { Request, Response } from 'express';

import { errorLoggerMiddleware } from './errorLogger';

describe('test errorLoggerMiddleware', () => {
  const next = jest.fn();

  console.log = jest.fn();
  console.error = jest.fn();

  describe('when an error has been passed', () => {
    it('should log logEntry and error with actual userId if exists in locals', async () => {
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

      await errorLoggerMiddleware(new Error('foobar'), mockRequest, mockResponse, next);

      expect(console.error).toHaveBeenLastCalledWith({
        error: {
          userId: 1,
          message: 'foobar',
          stackTrace: expect.anything(),
        },
      });
    });

    it('should log redacted logEntry and error with anonymous if userId does not exist in locals', async () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
      } as Request;
      const mockResponse = {
        locals: {
          appScope: {},
        },
      } as Response;

      await errorLoggerMiddleware(new Error('David'), mockRequest, mockResponse, next);

      expect(console.error).toHaveBeenLastCalledWith({
        error: {
          userId: 'Anonymous',
          message: 'PERSON_NAME',
          stackTrace: expect.anything(),
        },
      });
    });
  });
});
