import React from 'react';
import './css_files/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
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
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="how-cards">
        <div className="how-card">
          <div className="how-icon">🔍</div>
          <div className="how-title">Discover</div>
          <div className="how-description">Browse a curated list of innovative African startups.</div>
        </div>
        <div className="how-card">
          <div className="how-icon">🤝</div>
          <div className="how-title">Connect</div>
          <div className="how-description">Engage with startups and investors through our platform.</div>
        </div>
        <div className="how-card">
          <div className="how-icon">🚀</div>
          <div className="how-title">Grow</div>
          <div className="how-description">Support and scale promising ventures.</div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
