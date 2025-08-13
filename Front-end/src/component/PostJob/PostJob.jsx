import React, { useState } from "react";
import { Menu } from "lucide-react";
import AdminSideBar from "../adminSideBar/adminSidebar";
import { toast } from "react-toastify";
import axios from "axios";

const Input = ({ label, id, type = "text", value, onChange, placeholder = "" }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm hover:shadow-md"
    />
  </div>
);

const Textarea = ({ label, id, value, onChange, placeholder = "" }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="4"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y transition-shadow shadow-sm hover:shadow-md"
    />
  </div>
);

const PostJob = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    responsibilities: "",
    qualifications: "",
  });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = localStorage.getItem("id"); // Replace with actual admin ID from auth/session

    const payload = {
      title: formData.jobTitle,
      company: formData.companyName,
      location: formData.location,
      salary: `Rs ${formData.salaryMin} - Rs ${formData.salaryMax} a month`,
      easilyApply: true,
      rating: 4.5,
      responsibility: formData.responsibilities,
      Qalification: formData.qualifications,
    };

    try {
      const { data } = await axios.post(`http://localhost:3000/admin/${adminId}`, payload);

      toast.success("Job posted successfully!");
      console.log("Job Posted:", data);

      setFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: "",
        salaryMin: "",
        salaryMax: "",
        description: "",
        responsibilities: "",
        qualifications: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job");
    }
  };

  return (
    <div className="relative min-h-screen flex bg-gray-100 font-sans antialiased">
      <AdminSideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 transition-all duration-300">
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center gap-4">
            <button
              className="text-white hover:text-gray-200 transition"
              onClick={toggleSidebar}
            >
              <Menu className="w-7 h-7" />
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Post a New Job
              </h1>
              <p className="text-indigo-100 mt-1">
                Fill in the details to attract top talent.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Job Title" id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Junior MERN Stack Developer" />
              <Input label="Company Name" id="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g., Northstar" />
              <Input label="Location" id="location" value={formData.location} onChange={handleChange} placeholder="e.g., Lahore" />

              <div className="flex flex-col">
                <label htmlFor="jobType" className="text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md">
                  <option value="" disabled>Select a job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <Input label="Minimum Salary (Rs.)" id="salaryMin" type="number" value={formData.salaryMin} onChange={handleChange} placeholder="e.g., 70000" />
              <Input label="Maximum Salary (Rs.)" id="salaryMax" type="number" value={formData.salaryMax} onChange={handleChange} placeholder="e.g., 100000" />
            </div>

            <Textarea label="Job Description" id="description" value={formData.description} onChange={handleChange} placeholder="A brief overview of the role, company, and team." />
            <Textarea label="Responsibilities" id="responsibilities" value={formData.responsibilities} onChange={handleChange} placeholder="Use bullet points for clarity." />
            <Textarea label="Qualifications" id="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="List required skills, experience, and education." />

            <div className="flex justify-end">
              <button type="submit" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
