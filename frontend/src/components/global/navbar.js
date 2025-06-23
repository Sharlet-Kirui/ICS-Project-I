import React from 'react';
import './css_files/navbar.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logoImage from './assets/logo.png'; // Replace with actual path

function Navbar({ context }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path) => {
    return currentPath === path ? 'nav-link active' : 'nav-link';
  };
  const renderLinks = () => {
    switch (context) {
      case 'home':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/investor" className={getLinkClass('/investor')}>Investor</Link>
            <Link to="/startup" className={getLinkClass('/startup')}>Startup</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
          </>
        );
      case 'signup':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/signup" className={getLinkClass('/signup')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
          </>
        );
      case 'details':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          {renderLinks()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
