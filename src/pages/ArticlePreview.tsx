import { Link } from "react-router-dom";

export default function ArticlePreview() {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to="/profile/ericsimmons">
          <img src="http://i.imgur.com/Qr71crq.jpg" />
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
  );
}
