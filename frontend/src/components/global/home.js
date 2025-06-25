import React from 'react';
import './css_files/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-banner">
      <div className="home-left">
        <h1 className="tagline">Empowering African Innovation</h1>
        <div className="stats">
          <div className="stat-box">
            <div className="number">50+</div>
            <div className="label">Investors</div>
          </div>
          <div className="divider" />
          <div className="stat-box">
            <div className="number">100+</div>
            <div className="label">Startups</div>
          </div>
        </div>
        <div className="buttons">
          <Link to="/investor/signup" className="button">Join as Investor</Link>
          <Link to="/signup" className="button">Join as Startup</Link>
        </div>
      </div>
      <div className="home-right" />
    </div>
  );
}

export default Home;
