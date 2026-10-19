export type TokenResponse = {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  email: string;
  password: string;
}
