export type AuthResult =
  | { isAuthorised: true; userId: number }
  | { isAuthorised: false; rejectionReason: 'expired' | 'invalid' };
