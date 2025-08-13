import React, { useEffect, useState } from 'react';
import "../jobs/jobs.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

// Jobs Component
const Jobs = () => {
    const naviagte = useNavigate();
    const [jobs,setJob] =useState([]);

   useEffect (() => {
        const fetchJobs = async () =>{
          try{
             const response = await axios.get('http://localhost:3000/user/jobs')
             setJob(response.data);
          } catch(error)
          {
            toast.error("Error to connect to server",error);
          }
        }
        fetchJobs();
   },[]);
  

  // State for modal visibility and message
  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  // Function to handle "Apply" button click
  const handleApplyClick = (jobTitle) => {
     naviagte('/login');
  };

  // Custom Modal Component (instead of alert())
  const CustomModal = ({ message, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3 className="modal-title">Application Status</h3>
          <p className="modal-message">{message}</p>
          <button
            onClick={onClose}
            className="modal-close-button"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="jobs-page-container">
      <div className="jobs-container">
        <h1 className="jobs-heading">Browse Dream and Apply Jobs</h1>

        <div className="job-grid">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="job-card"
            >
              <div className="job-card-content">
                <h2 className="job-title">{job.title}</h2>
                <p className="job-company">{job.company}</p>
                <p className="job-location">{job.location}</p>
                <p className="job-description">{job.description}</p>

                <div className="job-meta">
                  <span className="job-meta-item">
                    <svg className="job-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10l2-2H4zm11.293 11.707a1 1 0 00.707-.293l3-3a1 1 0 00-1.414-1.414L16 13.586V10a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h4a2 2 0 002-2v-1.586l.293.293a1 1 0 00.707.293z" clipRule="evenodd"></path>
                    </svg>
                    {job.type}
                  </span>
                  <span className="job-meta-item">
                    <svg className="job-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 0a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 0a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm4 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm0-4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm0-4a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd"></path>
                    </svg>
                    {job.posted}
                  </span>
                  <span className="job-meta-item">
                    <svg className="job-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10l2-2H4zm11.293 11.707a1 1 0 00.707-.293l3-3a1 1 0 00-1.414-1.414L16 13.586V10a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h4a2 2 0 002-2v-1.586l.293.293a1 1 0 00.707.293z" clipRule="evenodd"></path>
                    </svg>
                    {job.salary}
                  </span>
                </div>

                <button
                  onClick={() => handleApplyClick(job.title)}
                  className="apply-button"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && <CustomModal message={modalMessage} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default Jobs;
