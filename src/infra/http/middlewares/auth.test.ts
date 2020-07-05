import { Request, Response } from 'express';

import { InvalidTokenError, TokenExpiredError } from '../../../errors/auth';
import * as authUseCase from '../../../useCases/authUseCase';
import { authMiddleware } from './auth';

jest.mock('../../../useCases/authUseCase');

describe('test authMiddleware', () => {
  const mockedAuthUseCase = authUseCase as jest.Mocked<typeof authUseCase>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call next(InvalidTokenError) if token not in header', async () => {
    const mockRequest = {
      headers: {},
    } as Request;
    const mockResponse = {} as Response;
    const next = jest.fn();

    await authMiddleware(mockRequest, mockResponse, next);

    expect(next).toHaveBeenLastCalledWith(new InvalidTokenError());
  });

  it('should call next(InvalidTokenError) if token is not valid', async () => {
    mockedAuthUseCase.verifyToken.mockResolvedValue({
      isAuthorised: false,
      rejectionReason: 'invalid',
    });

    const mockRequest = {
      headers: {
        'x-auth': 'abc',
      } as unknown,
    } as Request;

    const mockResponse = {} as Response;
    const next = jest.fn();

    await authMiddleware(mockRequest, mockResponse, next);

    expect(next).toHaveBeenLastCalledWith(new InvalidTokenError());
  });

  it('should call next(InvalidTokenError) if token is not valid', async () => {
    mockedAuthUseCase.verifyToken.mockResolvedValue({
      isAuthorised: false,
      rejectionReason: 'expired',
    });

    const mockRequest = {
      headers: {
        'x-auth': 'abc',
      } as unknown,
    } as Request;

    const mockResponse = {} as Response;
    const next = jest.fn();

    await authMiddleware(mockRequest, mockResponse, next);

    expect(next).toHaveBeenLastCalledWith(new TokenExpiredError());
  });

  it('should call next() if token is valid and not expired', async () => {
    mockedAuthUseCase.verifyToken.mockResolvedValue({
      isAuthorised: true,
      userId: 1,
    });

    const mockRequest = {
      headers: {
        'x-auth': 'abc',
      } as unknown,
    } as Request;

    const mockResponse = {
      locals: {},
    } as Response;
    const next = jest.fn();

    await authMiddleware(mockRequest, mockResponse, next);

    expect(next).toHaveBeenLastCalledWith();
  });
});
