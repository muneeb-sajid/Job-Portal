import React from 'react';
import { Home, Bookmark, Mail, PlusCircle, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

const SideBar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  return (
    <aside className={`bg-white p-6 flex flex-col justify-between shadow-lg rounded-r-3xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      {isSidebarOpen && (
        <>
          <div>
            <div className="flex items-center mb-10">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">SEARCH</span>
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link to="/applicant" className="flex items-center text-indigo-600 bg-indigo-50 p-2 rounded-lg transition-colors duration-200">
                    <Home className="w-5 h-5 mr-3" />
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="/savedJobs" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                    <Bookmark className="w-5 h-5 mr-3" />
                    Saved
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/appliedjobs" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                    <Mail className="w-5 h-5 mr-3" />
                    My Jobs
                  </a>
                </li>
                <li className="mb-4">
                  <a href="applicantjobs" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                    <PlusCircle className="w-5 h-5 mr-3" />
                    Explore Jobs
                    </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-auto">
            <Link to="/login" onClick={handleLogout} className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Link>
          </div>
        </>
      )}
    </aside>
  );
};

export default SideBar;