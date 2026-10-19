export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  email: string;
  password: string;
}
