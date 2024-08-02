interface IAuthData {
  user: { data: unknown } | null;
  tokensData: { accessToken: string; refreshToken: string } | null;
}

export const useAuth = (): IAuthData => {
  return {
    user: null,
    tokensData: null,
  };
};
