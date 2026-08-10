import { useGetCurrentUser, useGetProfile, useGetProfileArticles } from "api/queries";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { resolveAvatarUrl } from "utils/avatar";
import ArticlePreview from "./ArticlePreview";

type ProfileRouteParams = {
  username: string;
};

export default function Profile() {
  const { username } = useParams<ProfileRouteParams>();
  const isFavoritesTab = !!useRouteMatch({ path: "/profile/:username/favorites", exact: true });
  const articleFilter = isFavoritesTab ? "favorited" : "author";

  const { data: profile } = useGetProfile(username);
  const { data: currentUser } = useGetCurrentUser();
  const { data: articlesResponse, isLoading, isError } = useGetProfileArticles(username, articleFilter);

  if (!profile) return null;

  const isOwnProfile = currentUser?.username === profile.username;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={resolveAvatarUrl(profile.image)} className="user-img" alt={profile.username} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {isOwnProfile ? (
                <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp; Edit Profile Settings
                </Link>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn" type="button">
                  <i className={profile.following ? "ion-minus-round" : "ion-plus-round"} />
                  &nbsp; {profile.following ? "Unfollow" : "Follow"} {profile.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link to={`/profile/${username}`} className={`nav-link${isFavoritesTab ? "" : " active"}`}>
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/profile/${username}/favorites`} className={`nav-link${isFavoritesTab ? " active" : ""}`}>
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            {isLoading && <div className="article-preview">Loading articles...</div>}

            {isError && <div className="article-preview">Unable to load articles.</div>}

            {!isLoading && !isError && articlesResponse?.articles.length === 0 && (
              <div className="article-preview">No articles are here... yet.</div>
            )}

            {articlesResponse?.articles.map(article => (
              <ArticlePreview article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
