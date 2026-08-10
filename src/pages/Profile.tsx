import { Link, useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
              <h4>Eric Simons</h4>
              <p>
                Cofounder @GoThinkster, lived in Aol&lsquo;s HQ for a few months, kinda looks like Peeta from the Hunger
                Games
              </p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round" />
                &nbsp; Follow Eric Simons
              </button>
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
                  <Link to={location.pathname} className="nav-link active">
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${location.pathname}/favorites`} className="nav-link">
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <Link to="/profile/albertpai">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
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
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
