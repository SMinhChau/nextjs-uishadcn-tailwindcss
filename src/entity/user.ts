export type User = {
  displayName: string;
  email: string;
  registered: string;
  stsTokenManager: {
    accessToken: string;
    refreshToken: string;
  };
};
