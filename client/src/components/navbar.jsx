import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          <Link to="/" className="logo-link">PayMe</Link>
        </div>
        <div className="nav-links">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
