import { Link } from "react-router-dom";
import { resolveAvatarUrl } from "utils/avatar";

export default function ArticleList() {
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
                <li className="nav-item">
                  <Link to="" className="nav-link disabled">
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="" className="nav-link active">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <Link to="/profile/ericsimmons">
                  <img src={resolveAvatarUrl("http://i.imgur.com/Qr71crq.jpg")} alt="Eric Simons" />
                </Link>
                <div className="info">
                  <Link to="/profile/ericsimmons" className="author">
                    Eric Simons
                  </Link>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" /> 29
                </button>
              </div>
              <Link to="/how-to-build-webapps-that-scale" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </Link>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <Link to="/profile/albertpai">
                  <img src={resolveAvatarUrl("http://i.imgur.com/N4VcUeJ.jpg")} alt="Albert Pai" />
                </Link>
                <div className="info">
                  <Link to="/profile/albertpai" className="author">
                    Albert Pai
                  </Link>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" /> 32
                </button>
              </div>
              <Link to="/the-song-you-wont-ever-stop-singing" className="preview-link">
                <h1>The song you won&lsquo;t ever stop singing. No matter how hard you try.</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </Link>
            </div>
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
