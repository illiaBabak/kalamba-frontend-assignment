import { useGetCurrentUser } from "api/queries";
import { Link, useLocation } from "react-router-dom";
import { resolveAvatarUrl } from "utils/avatar";

export default function Navbar() {
  const { data: currentUser } = useGetCurrentUser();

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/") ? "active" : ""}`} to="/">
              Home
            </Link>
          </li>

          {currentUser ? (
            <>
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/editor") ? "active" : ""}`} to="/editor">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/settings") ? "active" : ""}`} to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive(`/profile/${currentUser.username}`) ? "active" : ""}`}
                  to={`/profile/${currentUser.username}`}
                >
                  <img className="user-pic" src={resolveAvatarUrl(currentUser.image)} alt={currentUser.username} />
                  {currentUser.username}
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/login") ? "active" : ""}`} to="/login">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
