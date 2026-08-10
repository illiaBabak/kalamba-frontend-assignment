export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: string | null;
};

export type UserResponse = {
  user: User;
};

export type Profile = {
  username: string;
  bio: string;
  image?: string | null;
  following: boolean;
};

export type ProfileResponse = {
  profile: Profile;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
};

export type MultipleArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

export type ProfileArticleFilter = "author" | "favorited";
