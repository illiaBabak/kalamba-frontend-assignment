import { useGetCurrentUser } from "api/queries";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { data } = useGetCurrentUser();

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
            <Link className={`nav-link ${isActive("/login") ? "active" : ""}`} to="/login">
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
