import React from 'react';
import { Home, Bookmark, Mail, PlusCircle, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

const AdminSideBar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  return (
    <aside className={`bg-white p-6 flex flex-col justify-between shadow-lg rounded-r-3xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      {isSidebarOpen && (
        <>
          <div>
            <div className="flex items-center mb-10">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Admin</span>
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link to="/admin" className="flex items-center text-indigo-600 bg-indigo-50 p-2 rounded-lg transition-colors duration-200">
                    <Home className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="/adminexplore" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                    <Bookmark className="w-5 h-5 mr-3" />
                    All Jobs
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/pendingapprovals" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                    <Mail className="w-5 h-5 mr-3" />
                    Pending Approvals
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/postjob" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                    <PlusCircle className="w-5 h-5 mr-3" />
                    Post Job
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

export default AdminSideBar;