import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/global/navbar';
import StartupSignUp from './components/global/StartupSignup';
import Home from './components/global/home';
import Details from './components/startup/details';
import Documents from './components/startup/documents';
import Contacts from './components/startup/contacts';
import InvestorSignup from './components/investor/sign_up';
import InvestorDetails from './components/investor/details';
import InvestorDocuments from './components/investor/documents';
import InvestorContacts from './components/investor/contacts';
import Login from './components/global/login';
import StartupDashboard from './components/startup/dashboard';
import InvestorDashboard from './components/investor/dashboard';
import ProtectedRoute from './components/global/ProtectedRoute';
import ContactForm from './components/investor/contactform';
import StartupNetwork from './components/startup/network';
import StartupNotifications from './components/startup/notifications';
import StartupProfile from './components/startup/profile';
import InvestorNetwork from './components/investor/network';
import InvestorNotifications from './components/investor/notifications';
import InvestorProfile from './components/investor/profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<StartupSignUp />} />
        <Route path="/details" element={<Details />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/investor/signup" element={<InvestorSignup />} />
        <Route path="/investor/details" element={<InvestorDetails />} />
        <Route path="/investor/documents" element={<InvestorDocuments />} />
        <Route path="/investor/contacts" element={<InvestorContacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactform" element={<ContactForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="startup">
              <StartupDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/startupNetwork"
          element={
            <ProtectedRoute role="startup">
              <StartupNetwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/startupNotifications"
          element={
            <ProtectedRoute role="startup">
              <StartupNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/startupProfile"
          element={
            <ProtectedRoute role="startup">
              <StartupProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/investor/dashboard"
          element={
            <ProtectedRoute role="investor">
              <InvestorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investorNetwork"
          element={
            <ProtectedRoute role="investor">
              <InvestorNetwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investorNotifications"
          element={
            <ProtectedRoute role="investor">
              <InvestorNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investorProfile"
          element={
            <ProtectedRoute role="investor">
              <InvestorProfile />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      </Routes>
    </Router>
  );
}

export default App;
