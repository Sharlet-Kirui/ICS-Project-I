import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import './css_files/overview.css';

const AdminOverview = () => {
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [startupRes, investorRes] = await Promise.all([
          axios.get('http://localhost:5000/api/startups'),
          axios.get('http://localhost:5000/api/investors')
        ]);
        setStartups(startupRes.data);
        setInvestors(investorRes.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  const countByStatus = (arr, status) => arr.filter(item => item.status === status).length;

  const approvedStartups = countByStatus(startups, 'approved');
  const approvedInvestors = countByStatus(investors, 'approved');
  const pendingStartups = countByStatus(startups, 'pending');
  const pendingInvestors = countByStatus(investors, 'pending');
  const rejectedStartups = countByStatus(startups, 'rejected');
  const rejectedInvestors = countByStatus(investors, 'rejected');

  const pieData = [
    { name: 'Startups', value: approvedStartups },
    { name: 'Investors', value: approvedInvestors }
  ];

  const barData = [
    {
      name: 'Startups',
      approved: approvedStartups,
      pending: pendingStartups,
      rejected: rejectedStartups
    },
    {
      name: 'Investors',
      approved: approvedInvestors,
      pending: pendingInvestors,
      rejected: rejectedInvestors
    }
  ];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="overview-container">
      <div className="overview-stats">
        <div className="overview-box">
          <h4>Total Startups</h4>
          <p>{approvedStartups}</p>
        </div>
        <div className="overview-box">
          <h4>Total Investors</h4>
          <p>{approvedInvestors}</p>
        </div>
        <div className="overview-box">
          <h4>Pending Verifications</h4>
          <p>{pendingStartups + pendingInvestors}</p>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-box">
          <h5>User Type Ratio</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h5>Verification Status</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" fill="#00C49F" name="Approved" />
              <Bar dataKey="pending" fill="#FFBB28" name="Pending" />
              <Bar dataKey="rejected" fill="#FF4D4F" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
