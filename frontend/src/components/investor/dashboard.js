
import React,{useState,useEffect} from "react";
import  "./css_files/dashboard.css";

function Dashboard () 
     
{
    const [stats, setStats] = useState({
    matchedStartups: 0,
    pendingInvites: 0,
    contactRequests: 0
  });

  const [profile, setProfile] = useState(null);
  const [filters, setFilters] = useState({
    investorType: "",
    startupStage: 10000,
    industry: "",
    geography: "",
    valueOffered: ""
  });

  useEffect(() => {
    // Fetch metrics (summary cards)
    fetch(DASHBOARD_STATS_ENDPOINT)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Stats Error:", err));

    // Fetch profile (example investor)
    fetch(PROFILE_ENDPOINT)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Profile Error:", err));
  }, []);

  return (
    <div className="dashboard-container">
      {/* === TOP SUMMARY CARDS === */}
      <div className="summary-cards">
        <div className="summary-card">
          Matched Startups
          <span>15</span>
        </div>
        <div className="summary-card">
          Pending Invites
          <span>1</span>
        </div>
        <div className="summary-card">
          Contact Requests
          <span>3</span>
        </div>
      </div>

      {/* === FILTERS + SEARCH === */}
      <div className="tool-row">
        {/* ---- LEFT FILTER PANEL ---- */}
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

        {/* ---- RIGHT SEARCH BAR ---- */}
        <div className="search-bar">
          <input type="text" placeholder="What are you looking for?" />
          <button title="Search">🔍</button>
        </div>
      </div>

      {/* === PROFILE CARD (example) === */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-placeholder">👤</div>
          <div className="venture-name">CAPITOLNET VENTURE</div>
        </div>

        <div className="profile-info">
          <p><strong>Full Name:</strong> Rachel Montgomery</p>
          <p><strong>Job Title:</strong> Managing Partner, CapitolNet Venture</p>
          <p><strong>Country of Residence:</strong> United States</p>
          <p><strong>Investor Type:</strong> Venture Capital Firm</p>
          <p><strong>Investment Range:</strong> USD 50,000 – 500,000</p>
          <p><strong>Industry:</strong> Agri-Tech, HealthTech, ClimateTech</p>
          <p><strong>Startup Stage:</strong> Pre-seed to Series A</p>
          <p><strong>Value Offered:</strong> Funding, Strategic Partnerships, Global Market Access</p>
          <p><strong>Region Interested in:</strong> Sub-Saharan Africa</p>
          <p><strong>Company Registration:</strong> Delaware, Nigeria-Lagos</p>
        </div>

        <button className="interest-btn">Show Interest</button>
      </div>
    </div>
  );
};

export default Dashboard;
