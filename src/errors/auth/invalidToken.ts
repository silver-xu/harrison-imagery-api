export class InvalidTokenError extends Error {
  constructor() {
    super('Your authorization token is invalid');
  }
}
