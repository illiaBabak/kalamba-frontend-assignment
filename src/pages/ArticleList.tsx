import { useGetCurrentUser, useGetFeedArticles, useGetGlobalArticles } from "api/queries";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";

type Feed = "global" | "personal";

export default function ArticleList() {
  const [selectedFeed, setSelectedFeed] = useState<Feed>("global");
  const { data: currentUser, isFetching: isCurrentUserFetching } = useGetCurrentUser();

  const activeFeed = currentUser && selectedFeed === "personal" ? "personal" : "global";

  const globalArticles = useGetGlobalArticles(activeFeed === "global" && !isCurrentUserFetching);

  const feedArticles = useGetFeedArticles(currentUser?.username, activeFeed === "personal" && !isCurrentUserFetching);

  const articlesQuery = activeFeed === "personal" ? feedArticles : globalArticles;

  useEffect(() => {
    if (!currentUser && selectedFeed === "personal") {
      setSelectedFeed("global");
    }
  }, [currentUser, selectedFeed]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {!!currentUser && (
                  <li className="nav-item">
                    <Link
                      to=""
                      className={`nav-link${activeFeed === "personal" ? " active" : ""}`}
                      onClick={() => setSelectedFeed("personal")}
                    >
                      Your Feed
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    to=""
                    className={`nav-link${activeFeed === "global" ? " active" : ""}`}
                    onClick={() => setSelectedFeed("global")}
                  >
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            {!articlesQuery.data && (isCurrentUserFetching || articlesQuery.isLoading) && (
              <div className="article-preview">Loading articles...</div>
            )}

            {articlesQuery.isError && <div className="article-preview">Unable to load articles.</div>}

            {!articlesQuery.isLoading && !articlesQuery.isError && articlesQuery.data?.articles.length === 0 && (
              <div className="article-preview">No articles are here... yet.</div>
            )}

            {articlesQuery.data?.articles.map(article => (
              <ArticlePreview article={article} key={article.slug} />
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <Link to="" className="tag-pill tag-default">
                  programming
                </Link>
                <Link to="" className="tag-pill tag-default">
                  javascript
                </Link>
                <Link to="" className="tag-pill tag-default">
                  emberjs
                </Link>
                <Link to="" className="tag-pill tag-default">
                  angularjs
                </Link>
                <Link to="" className="tag-pill tag-default">
                  react
                </Link>
                <Link to="" className="tag-pill tag-default">
                  mean
                </Link>
                <Link to="" className="tag-pill tag-default">
                  node
                </Link>
                <Link to="" className="tag-pill tag-default">
                  rails
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
