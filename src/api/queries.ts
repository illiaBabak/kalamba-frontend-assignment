import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "lib/jwt";
import { API_URL } from "utils/constants";
import { isUserResponse } from "utils/guards";
import { User } from "utils/types";
import { GET_CURRENT_USER_QUERY } from "./constants";
import { fetchWithToken } from "utils/fetchWithToken";

const getCurrentUser = async (): Promise<User> => {
  const response = await fetchWithToken(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong during get current user");
  }

  const data = await response.json();

  if (!isUserResponse(data)) {
    throw new Error("Invalid response from server for current user");
  }

  return data.user;
};

export const useGetCurrentUser = () =>
  useQuery({
    queryKey: [GET_CURRENT_USER_QUERY],
    queryFn: getCurrentUser,
    enabled: !!getAuthToken(),
    retry: false,
  });
