import { useGetArticle, useGetCurrentUser } from "api/queries";
import { Link, useParams } from "react-router-dom";
import { resolveAvatarUrl } from "utils/avatar";
import { Article as ArticleType } from "utils/types";
import dayjs from "dayjs";

type ArticleRouteParams = {
  slug?: string;
};

type ArticleMetaProps = {
  article: ArticleType;
  showFollowButton: boolean;
};

function ArticleMeta({ article, showFollowButton }: ArticleMetaProps) {
  const { author } = article;

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={resolveAvatarUrl(author.image)} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{dayjs(article.createdAt).format("MMMM D, YYYY")}</span>
      </div>
      {showFollowButton && (
        <button className="btn btn-sm btn-outline-secondary" type="button">
          <i className={author.following ? "ion-minus-round" : "ion-plus-round"} />
          &nbsp; {author.following ? "Unfollow" : "Follow"} {author.username}
        </button>
      )}
      {showFollowButton && <>&nbsp;&nbsp;</>}
      <button className={`btn btn-sm ${article.favorited ? "btn-primary" : "btn-outline-primary"}`} type="button">
        <i className="ion-heart" />
        &nbsp; {article.favorited ? "Unfavorite Post" : "Favorite Post"}{" "}
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </div>
  );
}

export default function Article() {
  const { slug } = useParams<ArticleRouteParams>();

  const { data: article, isLoading, isError } = useGetArticle(slug ?? "");

  const { data: currentUser, isFetching: isCurrentUserFetching } = useGetCurrentUser();

  if (!slug?.trim()) {
    return <div className="container page">Invalid article.</div>;
  }

  if (isLoading) {
    return <div className="container page">Loading article...</div>;
  }

  if (isError || !article) {
    return <div className="container page">Unable to load article.</div>;
  }

  const isOwnArticle = currentUser?.username === article.author.username;
  const showFollowButton = !isCurrentUserFetching && !isOwnArticle;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} showFollowButton={showFollowButton} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p style={{ whiteSpace: "pre-line" }}>{article.body}</p>
            {!!article.tagList.length && (
              <ul className="tag-list">
                {article.tagList.map(tag => (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} showFollowButton={showFollowButton} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img
                  src={resolveAvatarUrl("http://i.imgur.com/Qr71crq.jpg")}
                  className="comment-author-img"
                  alt="Eric Simons"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <Link to="/profile/jacobschmidt" className="comment-author">
                  <img
                    src={resolveAvatarUrl("http://i.imgur.com/Qr71crq.jpg")}
                    className="comment-author-img"
                    alt="Jacob Schmidt"
                  />
                </Link>
                &nbsp;
                <Link to="/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </Link>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <Link to="/profile/jacobschmidt" className="comment-author">
                  <img
                    src={resolveAvatarUrl("http://i.imgur.com/Qr71crq.jpg")}
                    className="comment-author-img"
                    alt="Jacob Schmidt"
                  />
                </Link>
                &nbsp;
                <Link to="/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </Link>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
