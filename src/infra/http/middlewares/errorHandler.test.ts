import { Request, Response } from 'express';

import { InvalidTokenError, TokenExpiredError } from '../../../errors/auth';
import { NotFoundError } from '../../../errors/notFound';
import { errorHandlerMiddleware } from './errorHandler';

describe('test errorHandlerMiddleware', () => {
  const mockRequest = {} as Request;
  const mockSend = jest.fn() as unknown;
  const mockStatus = jest.fn().mockReturnValue({
    send: mockSend,
  }) as unknown;
  const mockResponse = {
    status: mockStatus,
  } as Response;

  const next = jest.fn();

  it('should call next() if no error', async () => {
    await errorHandlerMiddleware(undefined, mockRequest, mockResponse, next);
    expect(next).toHaveBeenLastCalledWith();
  });

  it('should return 404 if NotFoundError has been passed', async () => {
    await errorHandlerMiddleware(new NotFoundError('foobar'), mockRequest, mockResponse, next);
    expect(mockResponse.status).toHaveBeenLastCalledWith(404);
    expect(mockSend).toHaveBeenLastCalledWith('foobar');
  });

  it('should return 400 if InvalidTokenError has been passed', async () => {
    await errorHandlerMiddleware(new InvalidTokenError(), mockRequest, mockResponse, next);
    expect(mockResponse.status).toHaveBeenLastCalledWith(400);
    expect(mockSend).toHaveBeenLastCalledWith('Your authorization token is invalid');
  });

  it('should return 400 if TokenExpiredError has been passed', async () => {
    await errorHandlerMiddleware(new TokenExpiredError(), mockRequest, mockResponse, next);
    expect(mockResponse.status).toHaveBeenLastCalledWith(400);
    expect(mockSend).toHaveBeenLastCalledWith('Your authorization token has expired');
  });

  it('should return 500 if all other error has been passed', async () => {
    await errorHandlerMiddleware(new Error(), mockRequest, mockResponse, next);
    expect(mockResponse.status).toHaveBeenLastCalledWith(500);
    expect(mockSend).toHaveBeenLastCalledWith('A generic eror has happened. Please contact the system administrator');
  });
});
