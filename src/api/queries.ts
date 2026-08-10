import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "lib/jwt";
import { API_URL } from "utils/constants";
import { isMultipleArticlesResponse, isProfileResponse, isUserResponse } from "utils/guards";
import { MultipleArticlesResponse, Profile, ProfileArticleFilter, User } from "utils/types";
import { GET_CURRENT_USER_QUERY, GET_PROFILE_ARTICLES_QUERY, GET_PROFILE_QUERY } from "./constants";
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

const getProfile = async (username: string): Promise<Profile> => {
  const response = await fetch(`${API_URL}/profiles/${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong during get profile");
  }

  const data = await response.json();

  if (!isProfileResponse(data)) {
    throw new Error("Invalid response from server for profile");
  }

  return data.profile;
};

export const useGetProfile = (username: string) =>
  useQuery({
    queryKey: [GET_PROFILE_QUERY, username],
    queryFn: () => getProfile(username),
    retry: false,
  });

const getProfileArticles = async (
  username: string,
  filter: ProfileArticleFilter
): Promise<MultipleArticlesResponse> => {
  const url = `${API_URL}/articles?${filter}=${encodeURIComponent(username)}`;
  const init: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = getAuthToken() ? await fetchWithToken(url, init) : await fetch(url, init);

  if (!response.ok) {
    throw new Error("Something went wrong during get profile articles");
  }

  const data = await response.json();

  if (!isMultipleArticlesResponse(data)) {
    throw new Error("Invalid response from server for profile articles");
  }

  return data;
};

export const useGetProfileArticles = (username: string, filter: ProfileArticleFilter) =>
  useQuery({
    queryKey: [GET_PROFILE_ARTICLES_QUERY, username, filter],
    queryFn: () => getProfileArticles(username, filter),
    retry: false,
  });
