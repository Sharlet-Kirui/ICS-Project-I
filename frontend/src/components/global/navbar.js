import React from 'react';
import './css_files/navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/" className="nav-home">Home</Link>
          <Link to="/signup" className="nav-join">Join</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;