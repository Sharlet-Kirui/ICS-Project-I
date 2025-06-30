
import React, { useEffect, useState } from 'react';
import "./css_files/dashboard.css";
const DASHBOARD_STATS_ENDPOINT = 'http://localhost:5000/api/investor-dashboard/stats';
const PROFILE_ENDPOINT = 'http://localhost:5000/api/investor-dashboard/profiles';

const Dashboard = () => {
  const [stats, setStats] = useState({
    matchedStartups: 0,
    pendingInvites: 0,
    contactRequests: 0
  });

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(DASHBOARD_STATS_ENDPOINT)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Stats Error:', err));

    fetch(PROFILE_ENDPOINT)
      .then(res => res.json())
      .then(data => setProfile(data[0]))
      .catch(err => console.error('Profile Error:', err));
  }, []);

  return (
    <div className="dashboard-container">
      {/* === TOP SUMMARY CARDS === */}
      <div className="summary-cards">
        <div className="summary-card">
          Matched Startups
          <span>{stats.matchedStartups}</span>
        </div>
        <div className="summary-card">
          Pending Invites
          <span>{stats.pendingInvites}</span>
        </div>
        <div className="summary-card">
          Contact Requests
          <span>{stats.contactRequests}</span>
        </div>
      </div>

      {/* === FILTERS + SEARCH === */}
      <div className="tool-row">
        <div className="filters">
          <div>
            <label>Investor type</label>
            <select>
              <option>Venture Capital</option>
              <option>Angel Investor</option>
              <option>Family Office</option>
            </select>
          </div>

          <div>
            <label>Startup Stage (range)</label>
            <input type="range" min="10000" max="500000" />
          </div>

          <div>
            <label>Industry focus</label>
            <select>
              <option>HealthTech</option>
              <option>Agri-Tech</option>
              <option>ClimateTech</option>
            </select>
          </div>

          <div>
            <label>Geography focus</label>
            <select>
              <option>Sub-Saharan Africa</option>
              <option>North Africa</option>
              <option>East Africa</option>
            </select>
          </div>

          <div>
            <label>Value offered</label>
            <select>
              <option>Funding</option>
              <option>Partnerships</option>
              <option>Advisory</option>
            </select>
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="What are you looking for?" />
          <button title="Search">🔍</button>
        </div>
      </div>

      {/* === PROFILE CARD === */}
      {profile && (
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-placeholder">👤</div>
            <div className="venture-name">{profile.companyName || 'Unknown Venture'}</div>
          </div>

          <div className="profile-info">
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Job Title:</strong> {profile.jobTitle}</p>
            <p><strong>Country of Residence:</strong> {profile.country}</p>
            <p><strong>Investor Type:</strong> {profile.investorType}</p>
            <p><strong>Investment Range:</strong> {profile.investmentRange}</p>
            <p><strong>Industry:</strong> {profile.industry}</p>
            <p><strong>Startup Stage:</strong> {profile.startupStage}</p>
            <p><strong>Value Offered:</strong> {profile.valueOffered}</p>
            <p><strong>Region Interested in:</strong> {profile.regionOfInterest}</p>
            <p><strong>Company Registration:</strong> {profile.registration}</p>
          </div>

          <button className="interest-btn">Show Interest</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


