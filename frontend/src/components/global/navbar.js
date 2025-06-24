import React from 'react';
import './css_files/navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ context }) {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">Logo</div>

        {context === 'details' ? (
          <div className="nav-links">
            <span className="nav-text">Join</span>
            <Link to="/" className="nav-back">Back</Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/" className="nav-home">Home</Link>
            <Link to="/signup" className="nav-join">Join</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;