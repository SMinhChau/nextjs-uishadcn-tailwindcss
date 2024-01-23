export interface User {
  displayName: string;
  email: string;
  registered: string;
  stsTokenManager: {
    accessToken: string;
    refreshToken: string;
  };
}
