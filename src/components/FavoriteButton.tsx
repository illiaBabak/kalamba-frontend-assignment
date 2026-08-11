import { useUpdateFavorite } from "api/mutations";
import { useGetCurrentUser } from "api/queries";
import { useHistory } from "react-router-dom";
import { Article } from "utils/types";

type FavoriteButtonProps = {
  article: Article;
  compact?: boolean;
};

export default function FavoriteButton({ article, compact = false }: FavoriteButtonProps) {
  const history = useHistory();

  const { data: currentUser, isFetching: isCurrentUserFetching } = useGetCurrentUser();

  const { mutate: updateFavorite, isLoading } = useUpdateFavorite();

  const handleClick = () => {
    if (!currentUser) {
      history.push("/login");
      return;
    }

    updateFavorite({ slug: article.slug, isFavorited: article.favorited });
  };

  return (
    <button
      className={`btn btn-sm ${article.favorited ? "btn-primary" : "btn-outline-primary"}${
        compact ? " pull-xs-right" : ""
      }`}
      type="button"
      disabled={isLoading || isCurrentUserFetching}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();

        handleClick();
      }}
    >
      <i className="ion-heart" />
      {compact ? (
        <> {article.favoritesCount}</>
      ) : (
        <>
          &nbsp; {article.favorited ? "Unfavorite Post" : "Favorite Post"}{" "}
          <span className="counter">({article.favoritesCount})</span>
        </>
      )}
    </button>
  );
}
