import { Link, withRouter } from "react-router-dom";
import { signOut } from "../API/auth";
import { isAuthenticated } from "../auth/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return true;
  return false;
};

const Manu = ({ history }) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {(!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      isActive(history, "/signin")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isActive(history, "/signup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )) || (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      isActive(history, "/signup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={`/user/${isAuthenticated().user._id}`}
                  >
                    {`${isAuthenticated().user.name}'s profile`}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isActive(history, "/users")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={`/users`}
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    style={{ cursor: "pointer" }}
                    className={
                      isActive(history, "/signup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => signOut(() => history.push("/"))}
                  >
                    Sign Out
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </div>
);
export default withRouter(Manu);
