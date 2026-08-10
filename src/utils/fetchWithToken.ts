import { GET_CURRENT_USER_QUERY } from "api/constants";
import { deleteAuthToken, getAuthToken } from "lib/jwt";
import { queryClient } from "lib/queryClient";

export const fetchWithToken = async (url: string, init?: RequestInit): Promise<Response> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Unauthenticated");
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Token ${token}`,
    },
  });

  if (response.status === 401 && token) {
    deleteAuthToken();
    queryClient.removeQueries({ queryKey: [GET_CURRENT_USER_QUERY] });
  }

  return response;
};
