import React, { useEffect, useState } from "react";
import {
  Search,
  Users,
  Briefcase,
  BarChart3,
  Bell,
  Menu,
  Settings,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSideBar from "../adminSideBar/adminSidebar";

const Admin = () => {
  const [data, setData] = useState({});
  const [letter, setLetter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dashboard, setDashboard] = useState({}); // ✅ Initialize as object

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get profile
        const profileRes = await axios.get("http://localhost:3000/applicant/profile");
        toast.success(`Welcome ${profileRes.data.Name}`);
        setData(profileRes.data);
        localStorage.setItem("id",profileRes.data.id);

        // Save name initials safely
        const name = profileRes.data.Name || "";
        setLetter(name.slice(0, 2));

        // Step 2: Get dashboard using ID from profile
        const dashRes = await axios.get(
          `http://localhost:3000/admin/dashboard/${profileRes.data.id}`
        );
        setDashboard(dashRes.data);
        console.log(dashRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching admin data");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <AdminSideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col p-8 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users, jobs..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
              Search
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Bell
              onClick={() => toast.success("Notification Enabled")}
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-indigo-600"
            />
            <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-sm pr-4">
              <span className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                {letter}
              </span>
              <span className="font-medium text-gray-800">{data.Name}</span>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="flex flex-wrap gap-6 mb-8">
          <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">
                {dashboard.totalUsers || "0"}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Jobs</p>
              <p className="text-2xl font-semibold text-gray-800">
                {dashboard.totalJobs || "0"}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Posted Jobs</p>
              <p className="text-2xl font-semibold text-gray-800">
                {dashboard.postedJobLength || "0"}
                
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-800">
                {dashboard.pendingApprovals || "0"}
              </p>
            </div>
          </div>
        </section>

        {/* Job Management */}
        <section className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-lg font-semibold mb-4">Latest Job Posts</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {dashboard?.adminJobs?.slice(0, 3).map((x) => (
      <div key={x.JobId} className="p-4 border rounded-lg shadow-sm">
        <h3 className="font-semibold">{x.title}</h3>
        <p className="text-gray-500 text-sm">{x.company}</p>
        <p className="text-gray-400 text-xs mt-2">4 days ago</p>
      </div>
    ))}
  </div>
</section>

      </main>
    </div>
  );
};

export default Admin;
