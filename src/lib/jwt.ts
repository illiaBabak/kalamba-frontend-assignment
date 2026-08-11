const AUTH_TOKEN = "token";

export const getAuthToken = (): string | null => {
  const storageToken = localStorage.getItem(AUTH_TOKEN);

  if (!storageToken) return null;

  return storageToken;
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const deleteAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};
