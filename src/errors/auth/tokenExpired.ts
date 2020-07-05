export class TokenExpiredError extends Error {
  constructor() {
    super('Your authorization token has expired');
  }
}
