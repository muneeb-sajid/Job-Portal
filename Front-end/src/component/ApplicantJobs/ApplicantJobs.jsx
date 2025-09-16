import React, { useEffect, useState } from 'react';
import { Bookmark, Menu } from 'lucide-react';
import SideBar from '../sidebar/sidebar';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure toastify is configured in your app
import { useNavigate } from 'react-router-dom';

const ApplicantJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(1);
  const [adminJobs, setAdminJobs] = useState([]);
  const [view, setView] = useState(0);
  const [saved, setSaved] = useState([]);
  const [job,setJob]=useState(0);
  const navigate=useNavigate("");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
  };
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/applicantJobs");
        if (response.data.length !== 0) {
          setAdminJobs(response.data);
        }
      } catch (error) {
        toast.error("Server is down");
      }
    };

    fetchJobs();
  }, []);

  
  console.log("Hello Viewer:");

  const selectedJob = adminJobs.find(job => job.id === selectedJobId);
  const handleJobSelect = (jobId) => {
   
    setSelectedJobId(jobId);
    if(view <= jobId)
    {
    setView(prev => prev + 1);
    console.log(view);
    }
      
  };
  const handleSavedJobs = (jobId) => {
  if (!saved.includes(jobId)) {
    setSaved(prev => [...prev, jobId]);
    toast.success("Job Saved Succesfully");
  }
  else
  {
    toast.error("Job is already save");
  }
};

const HandleApply = (JobId) =>{
      localStorage.setItem("JobId",JobId);
      navigate("/applyjob");
    }

useEffect(() => {
  if (view === 0 && saved.length === 0 && job === 0) return;

  const updateDashboard = async () => {
    const updateData = {
      viewedJobs: view,
      savedJobs: saved,
      appliedJobs: job
    };

    
    const id = localStorage.getItem("id");

    console.log("Sending PATCH to backend with:");
    console.log("User ID:", id);
    console.log("Data:", updateData);

    try {
      const res = await axios.patch(`http://localhost:3000/user/activity/${id}`, updateData);
    } catch (error) {
      console.error("PATCH error:", error);
      toast.error("Error updating activity");
    }
  };

  updateDashboard();
}, [view, saved, job]);



 
  

  const SearchBar = () => (
    
    
    <div className="flex flex-col sm:flex-row items-center justify-center bg-white p-4 sm:p-6 rounded-xl shadow-md max-w-4xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        onClick={toggleSidebar}
        className=" bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-gray-800" />
      </button>
      <input
        type="text"
        placeholder="Job title, keywords, or company"
        className="flex-grow border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700 w-full sm:w-1/2"
      />
      <input
        type="text"
        placeholder="Lahore"
        className="flex-grow border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700 w-full sm:w-1/4"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md w-full sm:w-auto transition duration-200">
        Find jobs
      </button>

    </div>
  );

  const JobCard = ({ job, isSelected, onSelect }) => (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border cursor-pointer transition duration-200 
        ${isSelected ? 'border-blue-500 ring-2  ring-blue-200' : 'border-gray-200 hover:shadow-md'}`}
      onClick={() => onSelect(job.id)}
    >
      <h3 className="text-lg font-bold text-gray-800">
        {job.title} <Bookmark onClick={() => handleSavedJobs(job.id)} />
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        {job.company}
        {job.rating && <span className="text-xs text-gray-500"> · {job.rating} ⭐</span>}
      </p>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-md font-semibold text-gray-800 mt-2">{job.salary}</p>
      {job.easilyApply && (
        <div className="flex items-center text-green-600 text-sm mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l-6 6m0 0l6 6m-6-6h14" />
          </svg>
          Easily apply
        </div>
      )}
    </div>
  );

  const JobList = ({ jobs, selectedJobId, onJobSelect }) => (
    <div className="w-full lg:w-2/5 xl:w-1/3 space-y-4 pr-4 lg:pr-0 overflow-y-auto max-h-[calc(100vh-200px)]">
      <h2 className="text-xl font-bold text-gray-800">Jobs for you</h2>
      <p className="text-sm text-gray-600 mb-4">Jobs based on your activity on Indeed</p>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} isSelected={job.id === selectedJobId} onSelect={onJobSelect} />
      ))}
    </div>
  );

  const JobDetails = ({ job }) => {
    if (!job) {
      return (
        <div className="w-full lg:w-3/5 xl:w-2/3 bg-white p-8 rounded-xl shadow-md flex items-center justify-center text-gray-600 text-lg h-[calc(100vh-200px)]">
          Select a job to view details
        </div>
      );
    }

    return (
      <div className="w-full lg:w-3/5 xl:w-2/3 bg-white p-8 rounded-xl shadow-md overflow-y-auto max-h-[calc(100vh-200px)]">
        <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-md text-gray-600 mt-2">
          {job.company}
          {job.rating && <span className="text-sm text-gray-500"> · {job.rating} ⭐</span>}
        </p>
        <p className="text-md text-gray-600">{job.location}</p>
        <p className="text-lg font-semibold text-gray-800 mt-4">{job.salary}</p>
        <button onClick={()=> HandleApply(job.id) } id="appbtn" className='w-30 bg-blue-400 h-10 rounded font cursor-pointer'>Apply Now</button>
        <div className="mt-6 job-description text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description }}></div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter relative">
      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Menu icon */}
      

      {/* Main content */}
      
      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-inter flex-1 overflow-y-auto">
        
        <SearchBar />
        <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8 max-w-7xl mx-auto">
          <JobList jobs={adminJobs} selectedJobId={selectedJobId} onJobSelect={handleJobSelect} />
          <JobDetails job={selectedJob} />
         
        </div>
      </div>
    </div>
  );
};

export default ApplicantJobs;
