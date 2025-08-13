import { useState } from 'react';

import './App.css';
import React from 'react';
import Navbar from './component/Navbar/navbar';
import Footer from './component/footer/footer';
import { Routes, Route,useLocation } from 'react-router-dom';
import Home from './component/Home/home';
import Applicant from './component/Applicant/applicant';
import Login from './component/Login/login';
import Jobs from './component/jobs/jobs';
import Contact from './component/contact/contact';
import SignUp from './component/Signup/Signup';
import Admin from './component/admin/admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplicantJobs from './component/ApplicantJobs/ApplicantJobs';
import SavedJobs from './component/savedJobs/savedJobs';
import Adminexplore from './component/adminexplore/adminexplore';
import PostJob from './component/PostJob/PostJob';
import ApplyJob from './component/applyjob/applyjob';
import Approvals from './component/pendingapproval/pendingapproval';
import AppliedJobs from './component/Applied Jobs/AppliedJobs';

function App() {
    const location = useLocation();
     const hideOnRoutes = ['/applicant', '/admin',"/applicantjobs","/savedJobs","/adminexplore","/postjob","/applyjob",'/pendingapprovals',"/myjobs",'/appliedjobs'];

     const shouldHideLayout = hideOnRoutes.includes(location.pathname);
  return (
    <>
      <div className='app-container'>
        {!shouldHideLayout && <Navbar />}
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/applicant" element={<Applicant />} />
            <Route path="/admin" element={<Admin />} />
            <Route path='/applicantjobs' element={<ApplicantJobs/>}/>
            <Route path='/savedJobs' element={<SavedJobs/>}/>
            <Route path='/adminexplore' element={<Adminexplore/>}/>
            <Route path='/postjob' element={<PostJob/>}/>
            <Route path="/applyJob" element={<ApplyJob/>}/>
            <Route path='/pendingapprovals' element={<Approvals/>}/>
            <Route path='/appliedjobs' element={<AppliedJobs/>}/>
          </Routes>
        </div>
         {!shouldHideLayout && <Footer />}
      </div>

     
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
