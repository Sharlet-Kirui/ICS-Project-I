import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/global/navbar';
import SignUp from './components/global/sign_up';
import Dashboard from './components/investor/dashboard';
import InvestorSignup from './components/investor/sign_up';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<h1>Welcome to the Homepage</h1>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/investorsignup" element={<InvestorSignup/>} />
      </Routes>
    </Router>
  );
}

export default App;
