import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "utils/constants";
import { isUserResponse } from "utils/guards";
import { User } from "utils/types";
import { AUTH_MUTATION, GET_CURRENT_USER_QUERY, LOGIN_MUTATION, LOGOUT_MUTATION } from "./constants";
import { deleteAuthToken, setAuthToken } from "lib/jwt";

const login = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong during login");
  }

  const data = await response.json();

  if (!isUserResponse(data)) {
    throw new Error("Invalid response from server for login");
  }

  return data.user;
};

export const useLogin = (): UseMutationResult<User, Error, { email: string; password: string }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [AUTH_MUTATION, LOGIN_MUTATION],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess(data) {
      setAuthToken(data.token);
      queryClient.setQueryData([GET_CURRENT_USER_QUERY], data);
    },
  });
};

const logout = async (): Promise<void> => {
  deleteAuthToken();
};

export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [AUTH_MUTATION, LOGOUT_MUTATION],
    mutationFn: logout,
    onSuccess() {
      queryClient.removeQueries({ queryKey: [GET_CURRENT_USER_QUERY] });
    },
  });
};
