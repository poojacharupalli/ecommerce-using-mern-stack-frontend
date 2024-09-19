import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";

const Header1 = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg header1">
      <div className="container-fluid">
        <NavLink className={` navbar-brand`} to="/">
          🛒Ecommerce
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flex"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            {/* <li className="nav-item flex">
          <NavLink className="nav-link" to="#">Link</NavLink>
        </li> */}
            {!auth.user ? (
              <>
                <li className="nav-item flex">
                  <NavLink className={`nav-link`} to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`nav-link`} to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown nav-item flex">
                  <button
                    className="nav-link"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {auth?.user?.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        onClick={handleLogout}
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
            <li className="nav-item cart">
              <NavLink
                className="nav-link active cart  "
                aria-current="page"
                to=""
              >
                Cart(0)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header1;
