import { Request, Response } from 'express';

import { loggerMiddleware } from './logger';

describe('test loggerMiddleware', () => {
  const next = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();

  describe('when no error has been passed', () => {
    it('should log actual userId if exists in locals', () => {
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

      loggerMiddleware(undefined, mockRequest, mockResponse, next);
      expect(console.log).toHaveBeenLastCalledWith({
        logEntry: {
          userId: 1,
          method: 'foo',
          path: 'bar',
        },
      });
    });

    it('should log Anonymous as userId if userId does not exist in locals', () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
      } as Request;
      const mockResponse = {
        locals: {
          appScope: {},
        },
      } as Response;

      loggerMiddleware(undefined, mockRequest, mockResponse, next);
      expect(console.log).toHaveBeenLastCalledWith({
        logEntry: {
          userId: 'Anonymous',
          method: 'foo',
          path: 'bar',
        },
      });
    });
  });

  describe('when an error has been passed', () => {
    it('should log logEntry and error with actual userId if exists in locals', () => {
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

      loggerMiddleware(new Error('foobar'), mockRequest, mockResponse, next);
      expect(console.log).toHaveBeenLastCalledWith({
        logEntry: {
          userId: 1,
          method: 'foo',
          path: 'bar',
        },
      });

      expect(console.error).toHaveBeenLastCalledWith({
        error: {
          userId: 1,
          message: 'foobar',
          stackTrace: expect.anything(),
        },
      });
    });

    it('should log logEntry and error with anonymous if userId does not exist in locals', () => {
      const mockRequest = {
        method: 'foo',
        path: 'bar',
      } as Request;
      const mockResponse = {
        locals: {
          appScope: {},
        },
      } as Response;

      loggerMiddleware(new Error('foobar'), mockRequest, mockResponse, next);
      expect(console.log).toHaveBeenLastCalledWith({
        logEntry: {
          userId: 'Anonymous',
          method: 'foo',
          path: 'bar',
        },
      });

      expect(console.error).toHaveBeenLastCalledWith({
        error: {
          userId: 'Anonymous',
          message: 'foobar',
          stackTrace: expect.anything(),
        },
      });
    });
  });
});
