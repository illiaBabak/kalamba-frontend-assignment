const DEFAULT_AVATAR_URL = "/images/default-avatar.svg";

export const resolveAvatarUrl = (image?: string | null): string => (image && image.trim() ? image : DEFAULT_AVATAR_URL);
