import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/global/navbar';
import SignUp from './components/global/sign_up';
import Home from './components/global/home';
import Details from './components/startup/details';
import Documents from './components/startup/documents';
import Contacts from './components/startup/contacts';
//import Dashboard from './components/investor/dashboard';
import InvestorSignup from './components/investor/sign_up';
import InvestorDetails from './components/investor/details';
import InvestorDocuments from './components/investor/documents';
import InvestorContacts from './components/investor/contacts';
//import ContactForm from './components/investor/contactform';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home/>} />
        <Route path="/details" element={<Details />} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/investor/signup" element={<InvestorSignup/>} />
        <Route path="/investor/details" element={<InvestorDetails/>} />
        <Route path="/investor/documents" element={<InvestorDocuments/>} />
        <Route path="/investor/contacts" element={<InvestorContacts/>} />
        {/*<Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contactform" element={<ContactForm/>}/>*/}
      </Routes>
    </Router>
  );
}
export default App;
