import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import logo from "../../../assets/images/logo.png";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="CareConnect" className="navbar-logo-image" />
        </Link>

        {/* Desktop Actions */}
        <nav className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

              <Link to="/profile" className="navbar-profile">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="navbar-avatar"
                  />
                ) : (
                  <div className="navbar-avatar navbar-avatar-placeholder">
                    {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="navbar-create-account">
                Create Account
              </Link>

              <Link to="/login" className="navbar-login">
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Burger Button */}
        <button
          type="button"
          className={`navbar-burger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <nav className={`navbar-mobile-menu ${isMenuOpen ? "open" : ""}`}>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="mobile-profile"
                onClick={closeMenu}
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="navbar-avatar"
                  />
                ) : (
                  <div className="navbar-avatar navbar-avatar-placeholder">
                    {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <span>My Profile</span>
              </Link>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="mobile-create-account"
                onClick={closeMenu}
              >
                Create Account
              </Link>

              <Link to="/login" className="mobile-login" onClick={closeMenu}>
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
