import {
  Article,
  MultipleArticlesResponse,
  Profile,
  ProfileResponse,
  SingleArticleResponse,
  User,
  UserResponse,
} from "./types";

export const isString = (data: unknown): data is string => typeof data === "string";

export const isBoolean = (data: unknown): data is boolean => typeof data === "boolean";

export const isNumber = (data: unknown): data is number => typeof data === "number";

export const isObject = (data: unknown): data is Record<string, unknown> => typeof data === "object" && data !== null;

export const isUser = (data: unknown): data is User =>
  isObject(data) &&
  "email" in data &&
  "token" in data &&
  "username" in data &&
  "bio" in data &&
  isString(data.email) &&
  isString(data.token) &&
  isString(data.username) &&
  isString(data.bio) &&
  (data.image === undefined || data.image === null || isString(data.image));

export const isUserResponse = (data: unknown): data is UserResponse =>
  isObject(data) && "user" in data && isUser(data.user);

export const isProfile = (data: unknown): data is Profile =>
  isObject(data) &&
  "username" in data &&
  "bio" in data &&
  "following" in data &&
  isString(data.username) &&
  isString(data.bio) &&
  (data.image === undefined || data.image === null || isString(data.image)) &&
  isBoolean(data.following);

export const isProfileResponse = (data: unknown): data is ProfileResponse =>
  isObject(data) && "profile" in data && isProfile(data.profile);

export const isArticle = (data: unknown): data is Article =>
  isObject(data) &&
  "slug" in data &&
  "title" in data &&
  "description" in data &&
  "body" in data &&
  "tagList" in data &&
  "createdAt" in data &&
  "updatedAt" in data &&
  "favorited" in data &&
  "favoritesCount" in data &&
  "author" in data &&
  isString(data.slug) &&
  isString(data.title) &&
  isString(data.description) &&
  isString(data.body) &&
  Array.isArray(data.tagList) &&
  data.tagList.every(isString) &&
  isString(data.createdAt) &&
  isString(data.updatedAt) &&
  isBoolean(data.favorited) &&
  isNumber(data.favoritesCount) &&
  isProfile(data.author);

export const isMultipleArticlesResponse = (data: unknown): data is MultipleArticlesResponse =>
  isObject(data) &&
  "articles" in data &&
  "articlesCount" in data &&
  Array.isArray(data.articles) &&
  data.articles.every(isArticle) &&
  isNumber(data.articlesCount);

export const isSingleArticleResponse = (data: unknown): data is SingleArticleResponse =>
  isObject(data) && "article" in data && isArticle(data.article);
