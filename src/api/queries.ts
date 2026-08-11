import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAuthToken } from "lib/jwt";
import { API_URL } from "utils/constants";
import { isMultipleArticlesResponse, isProfileResponse, isSingleArticleResponse, isUserResponse } from "utils/guards";
import { Article, MultipleArticlesResponse, Profile, ProfileArticleFilter, User } from "utils/types";
import {
  GET_ARTICLE_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_FEED_ARTICLES_QUERY,
  GET_GLOBAL_ARTICLES_QUERY,
  GET_PROFILE_ARTICLES_QUERY,
  GET_PROFILE_QUERY,
} from "./constants";
import { fetchWithToken } from "utils/fetchWithToken";

const fetchWithOptionalToken = (url: string, init: RequestInit): Promise<Response> =>
  getAuthToken() ? fetchWithToken(url, init) : fetch(url, init);

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
  const response = await fetchWithOptionalToken(`${API_URL}/articles?${filter}=${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

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

const getGlobalArticles = async (): Promise<MultipleArticlesResponse> => {
  const response = await fetchWithOptionalToken(`${API_URL}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong during get global articles");
  }

  const data = await response.json();

  if (!isMultipleArticlesResponse(data)) {
    throw new Error("Invalid response from server for global articles");
  }

  return data;
};

export const useGetGlobalArticles = (enabled: boolean) =>
  useQuery({
    queryKey: [GET_GLOBAL_ARTICLES_QUERY],
    queryFn: () => getGlobalArticles(),
    enabled,
    retry: false,
  });

const getFeedArticles = async (): Promise<MultipleArticlesResponse> => {
  const response = await fetchWithToken(`${API_URL}/articles/feed`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong during get feed articles");
  }

  const data = await response.json();

  if (!isMultipleArticlesResponse(data)) {
    throw new Error("Invalid response from server for feed articles");
  }

  return data;
};

export const useGetFeedArticles = (username: string | undefined, enabled: boolean) =>
  useQuery({
    queryKey: [GET_FEED_ARTICLES_QUERY, username],
    queryFn: getFeedArticles,
    enabled: !!username && enabled,
    retry: false,
  });

const getArticle = async (slug: string): Promise<Article> => {
  const response = await fetchWithOptionalToken(`${API_URL}/articles/${encodeURIComponent(slug)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong during get article");
  }

  const data = await response.json();

  if (!isSingleArticleResponse(data)) {
    throw new Error("Invalid response from server for article");
  }

  return data.article;
};

export const useGetArticle = (slug: string) =>
  useQuery({
    queryKey: [GET_ARTICLE_QUERY, slug],
    queryFn: () => getArticle(slug),
    enabled: !!slug.trim(),
    retry: false,
  });
