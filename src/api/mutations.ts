import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "utils/constants";
import { isSingleArticleResponse, isUserResponse } from "utils/guards";
import { Article, MultipleArticlesResponse, User } from "utils/types";
import {
  AUTH_MUTATION,
  FAVORITE_ARTICLE_MUTATION,
  GET_ARTICLE_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_FEED_ARTICLES_QUERY,
  GET_GLOBAL_ARTICLES_QUERY,
  GET_PROFILE_ARTICLES_QUERY,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from "./constants";
import { deleteAuthToken, setAuthToken } from "lib/jwt";
import { fetchWithToken } from "utils/fetchWithToken";

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

type FavoriteArticleVariables = {
  slug: string;
  isFavorited: boolean;
};

const updateFavorite = async ({ slug, isFavorited }: FavoriteArticleVariables): Promise<Article> => {
  console.log(isFavorited);
  const response = await fetchWithToken(`${API_URL}/articles/${encodeURIComponent(slug)}/favorite`, {
    method: isFavorited ? "DELETE" : "POST",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      isFavorited ? "Something went wrong while unfavoriting article" : "Something went wrong while favoriting article"
    );
  }

  const data = await response.json();

  if (!isSingleArticleResponse(data)) {
    throw new Error("Invalid response from server for favorite article");
  }

  return data.article;
};

export const useUpdateFavorite = (): UseMutationResult<Article, Error, FavoriteArticleVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [FAVORITE_ARTICLE_MUTATION],
    mutationFn: updateFavorite,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_ARTICLE_QUERY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_GLOBAL_ARTICLES_QUERY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_FEED_ARTICLES_QUERY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_PROFILE_ARTICLES_QUERY],
        }),
      ]);
    },
  });
};
