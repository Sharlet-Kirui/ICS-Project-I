import React from 'react';
import './css_files/navbar.css';
import { useLocation, Link } from 'react-router-dom';
import logoImage from './assets/logo.png'; // Replace with actual path

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path) => {
    return currentPath === path ? 'nav-link active' : 'nav-link';
  };
  
  const detectContext = () => {
    if (currentPath === '/') return 'home';            // Homepage
    if (currentPath === '/signup') return 'signup';    // Sign-up flow
    if (currentPath === '/details') return 'details';  // Startup details
    if (currentPath === '/documents') return 'documents';
    if (currentPath === '/contacts') return 'contacts';
    if (currentPath === '/investor/signup') return 'investor_signup';
    if (currentPath === '/investor/details') return 'investor_details';
    if (currentPath === '/investor/documents') return 'investor_documents';
    if (currentPath === '/investor/contacts') return 'investor_contacts';
    return 'default';
  };

  const context = detectContext();

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
      case 'investor_signup':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/investor/signup" className={getLinkClass('/investor/signup')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      case 'details':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/details" className={getLinkClass('/details')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      case 'investor_details':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/investor/details" className={getLinkClass('/investor/details')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      case 'documents':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/documents" className={getLinkClass('/documents')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      case 'investor_documents':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/investor/documents" className={getLinkClass('/investor/documents')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      case 'contacts':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/contacts" className={getLinkClass('/contacts')}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      case 'investor_contacts':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/investor/contacts" className={getLinkClass('/investor/contacts')}>Join</Link>
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
