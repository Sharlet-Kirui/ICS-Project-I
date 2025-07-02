import React, { useState, useEffect } from 'react';
import './css_files/navbar.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiBell, FiUser } from 'react-icons/fi';
import logoImage from './assets/logo.png';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const type = localStorage.getItem('userType');

    if (token && email) {
      setIsAuthenticated(true);
      setUserType(type);
    }
  }, []);

  const getLinkClass = (path) => {
    return currentPath === path ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const detectContext = () => {
    if (currentPath === '/') return 'home';
    if (currentPath.includes('/dashboard')) return 'dashboard';
    if (currentPath === '/signup') return 'signup';
    if (currentPath === '/details') return 'details';
    if (currentPath === '/documents') return 'documents';
    if (currentPath === '/contacts') return 'contacts';
    if (currentPath === '/investor/signup') return 'investor_signup';
    if (currentPath === '/investor/details') return 'investor_details';
    if (currentPath === '/investor/documents') return 'investor_documents';
    if (currentPath === '/investor/contacts') return 'investor_contacts';
    return 'default';
  };

  const context = detectContext();

  const renderDashboardLinks = () => (
  <>
    <Link
      to={userType === 'investor' ? '/investor/dashboard' : '/dashboard'}
      className={getLinkClass(userType === 'investor' ? '/investor/dashboard' : '/dashboard')}
    >
      <FiHome size={20} />
      <span>Home</span>
    </Link>

    <Link
      to={userType === 'investor' ? '/investor/network' : '/startupNetwork'}
      className={getLinkClass(userType === 'investor' ? '/investor/network' : '/startupNetwork')}
    >
      <FiUsers size={20} />
      <span>My Network</span>
    </Link>

    <Link
      to={userType === 'investor' ? '/investorNotifications' : '/startupNotifications'}
      className={getLinkClass(userType === 'investor' ? '/investorNotifications' : '/startupNotifications')}
    >
      <FiBell size={20} />
      <span>Notifications</span>
    </Link>

    <div className="profile-wrapper">
      <div className="nav-link">
        <FiUser size={20} />
        <span>Profile</span>
      </div>
      <div className="profile-dropdown-content">
        <Link
          to={userType === 'investor' ? '/investorProfile' : '/startupProfile'}
          className="dropdown-link"
        >
          View Profile
        </Link>
        <button className="dropdown-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </>
);


  const renderDefaultLinks = () => {
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
      case 'investor_signup':
      case 'details':
      case 'investor_details':
      case 'documents':
      case 'investor_documents':
      case 'contacts':
      case 'investor_contacts':
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to={currentPath} className={getLinkClass(currentPath)}>Join</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="#" className="nav-link" onClick={() => window.history.back()}>Back</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
            <Link to="/signup" className={getLinkClass('/signup')}>Join</Link>
          </>
        );
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          {isAuthenticated && context === 'dashboard' ? renderDashboardLinks() : renderDefaultLinks()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
