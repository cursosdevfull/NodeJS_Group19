export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthPort = {
  login(auth: any): Promise<Tokens | null>;
};
