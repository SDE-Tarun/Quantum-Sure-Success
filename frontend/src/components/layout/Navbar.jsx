import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link
          to="/"
          className="navbar__logo"
          onClick={closeMenu}
        >
          Quantum Sure Success
        </Link>

        <nav
          className={`navbar__links ${
            isOpen ? "navbar__links--open" : ""
          }`}
        >
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link
            to="/scans"
            onClick={closeMenu}
          >
            Scans
          </Link>

          <a
            href="/#how-it-works"
            onClick={closeMenu}
          >
            How It Works
          </a>

          <a
            href="/#about"
            onClick={closeMenu}
          >
            About
          </a>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="navbar__login"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <button
                type="button"
                className="navbar__logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="navbar__login"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="navbar__menu-button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;