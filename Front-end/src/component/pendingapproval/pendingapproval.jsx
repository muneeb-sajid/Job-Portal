import React, { useEffect, useState } from 'react';
import { Check, X, Eye, Menu as MenuIcon } from 'lucide-react';
import AdminSideBar from "../adminSideBar/adminSidebar";
import { toast } from "react-toastify";
import axios from 'axios';

const Approvals = () => {
  const [applications, setApplications] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:3000/admin/pendingJobs/${id}`);
        if (Array.isArray(response.data)) {
          setApplications(response.data);
        }
      } catch (err) {
        console.log(err);
        toast.error("There is some problem connecting to server");
      }
    };
    fetchPendingApprovals();
  }, []);

  const handleApprove = (jobId) => {
    setApplications(applications.filter(app => app.jobId !== jobId));
  };

  const handleReject = (jobId) => {
    setApplications(applications.filter(app => app.jobId !== jobId));
  };

  const handleLogout = () => {
    console.log("Admin logged out");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
      <AdminSideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-10 font-sans">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-100 transition-all"
          >
            <MenuIcon size={22} />
          </button>
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>

        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              📋 Pending Job Approvals
            </h1>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
              {applications.length} Pending
            </span>
          </div>

          {/* Applications List */}
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.jobId}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{app.Name}</h2>
                    <p className="text-gray-600 mt-1">
                      Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 mt-1 italic">
                      "{app.CoverLetter}"
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                    <a
                      href={`http://localhost:3000${app.resumeFilePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-all shadow-sm"
                    >
                      <Eye size={16} /> View Resume
                    </a>
                    <button
                      onClick={() => handleApprove(app.jobId)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition-all shadow-sm"
                    >
                      <Check size={16} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.jobId)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-all shadow-sm"
                    >
                      <X size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold">No Pending Approvals</h3>
              <p className="mt-2">All applications have been reviewed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Approvals;
