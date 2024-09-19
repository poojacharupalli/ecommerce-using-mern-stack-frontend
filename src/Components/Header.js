import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";
import SearchInput from "./form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";
import '../App.css';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            🛒 Ecommerce App
          </Link>

          {/* Toggler for mobile view to open offcanvas */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas Sidebar for Nav Items */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Navigation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {/* Search Input */}
                <li className="nav-item">
                  <SearchInput />
                </li>

                {/* Home Link */}
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>

                {/* Categories Dropdown */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={"/categories"}
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/categories">
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li key={c._id}>
                        <Link className="dropdown-item" to={`/category/${c.slug}`}>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Register/Login or Dashboard/Logout */}
                {!auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}

                {/* Cart Link */}
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Cart <sup>{cart?.length}</sup>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
  