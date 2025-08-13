import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// ---------- Input ----------
const Input = ({ label, id, name, type = "text", value, onChange, placeholder = "" }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name} // ✅ name prop added
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

// ---------- FileInput ----------
const FileInput = ({ label, id, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <label
      htmlFor={id}
      className="cursor-pointer flex items-center justify-center p-3 border border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.707 6.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm">Upload Resume/CV</span>
    </label>
    {/* ✅ name must match upload.single("resume") */}
    <input id={id} name="resume" type="file" onChange={onChange} className="hidden" />
  </div>
);

// ---------- Textarea ----------
const Textarea = ({ label, id, name, value, onChange, placeholder = "" }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={name} // ✅ added name prop
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="6"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
    />
  </div>
);

const ApplyJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    company: "", // ✅ matches backend
    phoneNumber: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // Validation
  const validateForm = () => {
    const { fullname, company, phoneNumber, coverLetter } = formData;
    if (!fullname || !company || !phoneNumber || !coverLetter) {
      return "Please fill in all required fields.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(company)) {
      return "Please enter a valid email address.";
    }
    if (!resumeFile) {
      return "Please upload your resume.";
    }
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resumeFile.type)) {
      return "Only PDF or Word documents are allowed.";
    }
    return null;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const data = new FormData();
      data.append("fullname", formData.fullname);
      data.append("company", formData.company);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("coverLetter", formData.coverLetter);
      data.append("resume", resumeFile); // ✅ correct way

      const userId = localStorage.getItem("id");
      const jobId = localStorage.getItem("JobId");
      console.log(userId);
      console.log(jobId);

      const res = await axios.post(`http://localhost:3000/apply-job/${jobId}/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Application Successfully Submitted");
      console.log(res.data);

      // Reset form
      setFormData({ fullname: "", company: "", phoneNumber: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting the application");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/applicant")}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
            title="Go Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex-grow text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">Apply Now</h1>
            <p className="mt-2 text-sm text-gray-500">Please fill out the form below to submit your application.</p>
          </div>
          <div className="w-6 h-6"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="e.g., John Doe" />
            <Input label="Email Address" id="company" name="company" type="email" value={formData.company} onChange={handleChange} placeholder="e.g., john.doe@example.com" />
            <Input label="Phone Number" id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="e.g., +1 (123) 456-7890" />
            <FileInput label="Resume/CV" id="resume" onChange={handleFileChange} />
          </div>

          <Textarea label="Cover Letter" id="coverLetter" name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Tell us why you're a great fit for this role." />

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
