const AUTH_TOKEN = "token";

export const getAuthToken = () => {
  const storageToken = localStorage.getItem(AUTH_TOKEN);

  if (!storageToken) return null;

  return storageToken;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const deleteAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
