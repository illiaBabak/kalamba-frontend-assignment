import { User, UserResponse } from "./types";

export const isString = (data: unknown): data is string => typeof data === "string";

export const isObject = (data: unknown): data is Record<string, unknown> => typeof data === "object" && data !== null;

export const isUser = (data: unknown): data is User =>
  isObject(data) &&
  "email" in data &&
  "token" in data &&
  "username" in data &&
  "bio" in data &&
  "image" in data &&
  isString(data.email) &&
  isString(data.token) &&
  isString(data.username) &&
  isString(data.bio) &&
  isString(data.image);

export const isUserResponse = (data: unknown): data is UserResponse =>
  isObject(data) && "user" in data && isUser(data.user);
