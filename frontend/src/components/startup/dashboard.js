// frontend/src/components/startup/dashboard.js
import React, { useEffect, useState } from 'react';
import './css_files/dashboard.css';

function Dashboard() {
  const [investors, setInvestors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [fundingRange, setFundingRange] = useState([0, 0]);

  useEffect(() => {
    fetch('http://localhost:5000/api/investors')
      .then(res => res.json())
      .then(data => setInvestors(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/investors/filters')
      .then(res => res.json())
      .then(data => {
        setFilterOptions(data);
        setFundingRange(data.fundingRange);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value
    }));
  };

  const removeFilter = (key) => {
    setSelectedFilters(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const filteredInvestors = investors.filter(inv => {
    return (
      (!searchTerm || inv.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || inv.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedFilters.valueOffered || inv.valueOffered.includes(selectedFilters.valueOffered)) &&
      (!selectedFilters.country || inv.country === selectedFilters.country) &&
      (!selectedFilters.industry || inv.industry.toLowerCase().includes(selectedFilters.industry.toLowerCase())) &&
      (!selectedFilters.fundingRange || (inv.fundingAmount >= selectedFilters.fundingRange[0] && inv.fundingAmount <= selectedFilters.fundingRange[1]))
    );
  });

  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

  return (
    <div className="dashboard">
      <aside className="filter-sidebar">
        <h4>Filters</h4>

        <div className="filter-group">
          <h5>Value Offered</h5>
          {filterOptions.valueOffered?.map(value => (
            <label key={value}>
              <input
                type="radio"
                name="valueOffered"
                checked={selectedFilters.valueOffered === value}
                onChange={() => handleFilterChange('valueOffered', value)}
              /> {value}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Funding Range</h5>
          <input
            type="range"
            min={filterOptions.fundingRange?.[0] || 0}
            max={filterOptions.fundingRange?.[1] || 0}
            step="1000"
            value={selectedFilters.fundingRange?.[1] || fundingRange[1]}
            onChange={e => handleFilterChange('fundingRange', [0, parseInt(e.target.value)])}
          />
          <div>Up to: {selectedFilters.fundingRange?.[1] || fundingRange[1]}</div>
        </div>

        <div className="filter-group">
          <h5>Geographical Focus</h5>
          {filterOptions.countries?.map(country => (
            <label key={country}>
              <input
                type="radio"
                name="country"
                checked={selectedFilters.country === country}
                onChange={() => handleFilterChange('country', country)}
              /> {country}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Industry</h5>
          {filterOptions.industries?.map(industry => (
            <label key={industry}>
              <input
                type="radio"
                name="industry"
                checked={selectedFilters.industry === industry}
                onChange={() => handleFilterChange('industry', industry)}
              /> {industry}
            </label>
          ))}
        </div>

        <div className="selected-filters">
          <h5>Selected Filters</h5>
          {Object.entries(selectedFilters).map(([key, value]) => (
            <span key={key} className="filter-tag" onClick={() => removeFilter(key)}>
              {key}: {typeof value === 'object' ? value[1] : value} ×
            </span>
          ))}
        </div>
      </aside>

      <main className="content">
        <div className="search-filter">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className={Object.keys(selectedFilters).length ? 'active' : ''}>Filter</button>
        </div>

        <div className="investor-cards">
          {filteredInvestors.map(inv => (
            <div key={inv.email} className="investor-card">
              <div className="card-layout">
                <img src={`http://localhost:5000/${inv.profileImage}`} alt={inv.fullName} />
                <div className="card-summary">
                  <h3>{inv.fullName}</h3>
                  <p>{inv.jobTitle}</p>
                  <p className="company-name">{inv.companyName}</p>
                  <button onClick={() => toggleDetails(inv.email)}>
                    {expandedCards[inv.email] ? 'Show Less' : 'See More'}
                  </button>
                  {expandedCards[inv.email] && (
                  <div className="details-side">
                    <p><strong>Industry:</strong> {inv.industry}</p>
                    <p><strong>Value Offered:</strong> {inv.valueOffered.join(', ')}</p>
                    <p><strong>Country:</strong> {inv.country}</p>
                    <p><strong>Funding:</strong> {inv.fundingCurrency} {inv.fundingAmount?.toLocaleString()}</p>
                  </div>
                )}
                  <button className="interest-btn">Show Interest</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
