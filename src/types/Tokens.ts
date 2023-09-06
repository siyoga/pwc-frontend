export interface Tokens {
  accessToken: string;
  refreshToken: string;
  iat: number;
  exp: number;
}

export interface RefreshToken {
  companyId: string;
  rtToken: string;
}
