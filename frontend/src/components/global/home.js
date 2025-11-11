import React, {useState,  useEffect} from 'react';
import './css_files/home.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaHandshake, FaRocket, FaUsers, FaDollarSign, FaShieldAlt } from "react-icons/fa";

function Home() {
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // slight delay to allow page rendering
      }
    }
  }, [location]);
  useEffect(() => {
    fetch('https://ics-project.viscerealplate.me/api/startups/approved')
      .then(res => res.json())
      .then(data => setStartups(data.slice(0, 3))) // show only 3
      .catch(err => console.error('Failed to fetch startups', err));

    fetch('https://ics-project.viscerealplate.me/api/investors/approved')
      .then(res => res.json())
      .then(data => setInvestors(data.slice(0, 3))) // show only 3
      .catch(err => console.error('Failed to fetch investors', err));
  }, []);
  return (
    <>
    <div className="home-banner">
      <div className="home-left">
        <h1 className="tagline">Empowering African Innovation</h1>
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
          <div className="how-icon"><FaSearch size={20}/></div>
          <div className="how-title">Discover</div>
          <div className="how-description">Browse a curated list of innovative African startups.</div>
        </div>
        <div className="how-card">
          <div className="how-icon"><FaHandshake size={20}/></div>
          <div className="how-title">Connect</div>
          <div className="how-description">Engage with startups and investors through our platform.</div>
        </div>
        <div className="how-card">
          <div className="how-icon"><FaRocket size={20}/></div>
          <div className="how-title">Grow</div>
          <div className="how-description">Support and scale promising ventures.</div>
        </div>
      </div>
    </div>
        <div className="preview-section">
      <h2 id="startups">Featured Startups</h2>
      <div className="homecard-list">
        {startups.map(startup => (
          <div key={startup.email} className="preview-card">
            <img src={`https://ics-project.viscerealplate.me/${startup.profileImageUrl}`} alt={startup.companyName} />
            <h3>{startup.companyName}</h3>
            <p>{startup.pitch}</p>
            <button onClick={() => navigate('/login')}>See More</button>
          </div>
        ))}
      </div>

      <h2  id="investors">Featured Investors</h2>
      <div className="homecard-list">
        {investors.map(inv => (
          <div key={inv.email} className="preview-card">
            <img src={`https://ics-project.viscerealplate.me/${inv.profileImage}`} alt={inv.fullName} />
            <h3>{inv.fullName}</h3>
            <p>{inv.jobTitle} at {inv.companyName}</p>
            <button onClick={() => navigate('/login')}>See More</button>
          </div>
        ))}
      </div>
    </div>
    <div className="how-it-works">
      <h2>Unlock the Potential of African Innovation</h2>
      <div className="how-cards">
        <div className="how-card">
          <div className="how-icon"><FaUsers size={20}/></div>
          <div className="how-title">Access to a Wide Network</div>
          <div className="how-description">Connect with a diverse community of startups and investors across Africa.</div>
        </div>
        <div className="how-card">
          <div className="how-icon"><FaDollarSign size={20}/></div>
          <div className="how-title">Investment Opportunities</div>
          <div className="how-description">Discover and invest in high-potential startups with innovative solutions.</div>
        </div>
        <div className="how-card">
          <div className="how-icon"><FaShieldAlt size={20}/></div>
          <div className="how-title">Secure and Transparent Platform</div>
          <div className="how-description">Our platform ensures secure and transparent interactions for all users.</div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
