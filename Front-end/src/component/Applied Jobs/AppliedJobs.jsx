import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import SideBar from '../sidebar/sidebar';
import { toast } from "react-toastify";



const AppliedJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("id");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const id = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:3000/applicant/appliedjob/${id}`);
        console.log(res.data);
        if (res.data && Array.isArray(res.data)) {
          setAppliedJobs(res.data);
        } else if (res.data && res.data.length >= 0) {
          setAppliedJobs(res.data); // your backend seems to return array directly
        } else {
          setAppliedJobs([]);
        }
      } catch (err) {
        console.error(err);
        toast.error("There is some problem connecting to server");
      }
    };
    fetchAppliedJobs();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Applied Jobs
            </h1>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {appliedJobs.length} Jobs
            </span>
          </div>

          {/* List */}
          {appliedJobs.length > 0 ? (
            <div className="space-y-4">
              {appliedJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <h2 className="text-xl font-bold text-gray-900">{job.Name}</h2>
                    <p className="text-gray-600 mt-1">
                      <span className="font-semibold">{job.CoverLetter}</span> • Applied on{" "}
                      {new Date(job.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusBadge(
                        job.status || "Pending"
                      )}`}
                    >
                      {job.status || "Pending"}
                    </span>
                    <button
                      onClick={() =>
                    toast.success("Viewming the activity")
                      }
                      className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      View Resume
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <h3 className="text-xl font-semibold">No Applications Found</h3>
              <p className="mt-2">
                It looks like you haven't applied for any jobs yet.
              </p>
            </div>
          )}
        </div>
      </div>

  
    </div>
  );
};

export default AppliedJobs;
