import React, { useEffect, useState } from 'react';
import { Search, MapPin, Briefcase, Star, Bell, User, LayoutGrid, List, Home, Bookmark, Mail, PlusCircle, LogOut, Menu } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SideBar from '../sidebar/sidebar';

const Applicant = () => {
   const [data, setData] = useState({});
   const [letter, setLetter] = useState("");
   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

   useEffect(() => {
     const fetchName = async () => {
       try {
         const response = await axios.get("http://localhost:3000/applicant/profile");
         toast.success(`Welcome ${response.data.Name}`);
         setData(response.data);
         setLetter(response.data.Name);
         localStorage.setItem("id",response.data.id);
       } catch (error) {
         toast.error("Error to fetch data ", error);
       }
     };
     fetchName();
   },[]);

   const handleLogout = () => {
     localStorage.clear();
   };

   const toggleSidebar = () => {
     setIsSidebarOpen(!isSidebarOpen);
   };

   return (
     <div className="flex h-screen bg-gray-100 font-inter">
       {/* Sidebar component */}
       <SideBar
        isSidebarOpen={isSidebarOpen}
         toggleSidebar={toggleSidebar}
         handleLogout={handleLogout}
         />

       {/* Main Content */}
       <main className={`flex-1 flex flex-col p-8 overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
         {/* Header */}
         <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
           <div className="flex items-center space-x-4">
             {/* Menu Button */}
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
                 placeholder="Search a job"
                 className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
               />
             </div>
             <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
               <option>All cities</option>
               <option>Lahore</option>
               <option>Islamabad</option>
             </select>
             <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
               Search
             </button>
           </div>
           <div className="flex items-center space-x-4">
             <Bell onClick={()=> toast.success("Notification Enabled")} className="w-6 h-6 text-gray-600 cursor-pointer hover:text-indigo-600" />
             <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-sm pr-4">
               <span className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">{letter[0]+letter[1]}</span>
               <span className="font-medium text-gray-800">{letter}</span>
             </div>
           </div>
         </header>

         {/* Statistics Section - Now using flexbox for row arrangement */}
         <section className="flex flex-wrap gap-6 mb-8">
           <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
             <div className="bg-blue-100 p-3 rounded-full mr-4">
               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <div>
               <p className="text-gray-500 text-sm">Job Applied</p>
               <p className="text-2xl font-semibold text-gray-800">{data.appliedJobs?.length || "00"}</p>
             </div>
           </div>
           <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
             <div className="bg-orange-100 p-3 rounded-full mr-4">
               <Bookmark className="w-6 h-6 text-orange-600" />
             </div>
             <div>
               <p className="text-gray-500 text-sm">Saved Jobs</p>
               <p className="text-2xl font-semibold text-gray-800">{data.savedJobs?.length || "00"}</p>
             </div>
           </div>
           <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
             <div className="bg-yellow-100 p-3 rounded-full mr-4">
               <Briefcase className="w-6 h-6 text-yellow-600" />
             </div>
             <div>
               <p className="text-gray-500 text-sm">Job Offers</p>
               <p className="text-2xl font-semibold text-gray-800">00</p>
             </div>
           </div>
           <div className="flex-1 min-w-[200px] flex items-center bg-white p-6 rounded-xl shadow-md">
             <div className="bg-green-100 p-3 rounded-full mr-4">
               <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
             </div>
             <div>
               <p className="text-gray-500 text-sm">Viewed job</p>
               <p className="text-2xl font-semibold text-gray-800">{data?.viewedJobs || "00"}</p>
             </div>
           </div>
         </section>

         {/* Go Pro Banner */}
         <section className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-xl shadow-md flex items-center justify-between mb-8">
           <div className="flex items-center">
             <div className="bg-white p-3 rounded-full mr-4">
               <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
             </div>
             <div>
               <p className="text-white font-semibold text-lg">See jobs where you'd be a top applicant</p>
               <p className="text-white text-sm opacity-90">Try free for 6 months</p>
             </div>
           </div>
           <button onClick={() => toast.error("Feauture isn't available yet")} className="px-6 py-3 bg-white text-pink-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200">
             Go pro
           </button>
         </section>

         {/* Job Listings Section */}
         <section className="flex-1">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-semibold text-gray-800">Based on your profile and career interests</h2>
             <div className="flex items-center space-x-2 text-gray-500 text-sm">
               <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full">
                 <Briefcase className="w-4 h-4 mr-1" /> UX Designer
               </span>
               <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full">
                 <MapPin className="w-4 h-4 mr-1" /> Any Locations
               </span>
               <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full">
                 <Briefcase className="w-4 h-4 mr-1" /> Any Industries
               </span>
               <div className="flex ml-4">
                 <button className="p-2 rounded-l-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
                   <List className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-r-lg bg-indigo-600 text-white hover:bg-indigo-700">
                   <LayoutGrid className="w-5 h-5" />
                 </button>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Job Card 1 */}
             <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start">
               <div className="bg-purple-100 p-3 rounded-full mb-4">
                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-800 mb-1">UX Lead and Researcher</h3>
               <p className="text-gray-500 text-sm mb-2">Globex Corporation Pvt, Ltd</p>
               <p className="text-gray-500 text-sm flex items-center mb-4">
                 <MapPin className="w-4 h-4 mr-1" /> Los Angeles, California, USA
               </p>
               <div className="flex items-center justify-between w-full mt-auto">
                 <button className="px-4  bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors duration-200">
                   See More
                 </button>
                 <span className="p-3 text-gray-400 text-sm">2 days back</span>
               </div>
             </div>

             {/* Job Card 2 */}
             <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start">
               <div className="bg-pink-100 p-3 rounded-full mb-4">
                 <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-800 mb-1">UX Designer</h3>
               <p className="text-gray-500 text-sm mb-2">Umbrella Corporation Pvt. Ltd</p>
               <p className="text-gray-500 text-sm flex items-center mb-4">
                 <MapPin className="w-4 h-4 mr-1" /> Los Angeles, California, USA
               </p>
               <div className="flex items-center justify-between w-full mt-auto">
                 <button className="px-4  bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors duration-200">
                   See More
                 </button>
                 <span className="p-3 text-gray-400 text-sm">7 days back</span>
               </div>
             </div>

             {/* Job Card 3 */}
             <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start">
               <div className="bg-blue-100 p-3 rounded-full mb-4">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-800 mb-1">UI/UX Designer</h3>
               <p className="text-gray-500 text-sm mb-2">Vehement Capital Partners</p>
               <p className="text-gray-500 text-sm flex items-center mb-4">
                 <MapPin className="w-4 h-4 mr-1" /> Alamosa, Colorado, USA
               </p>
               <div className="flex items-center justify-between w-full mt-auto">
                 <button className="px-4  bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors duration-200">
                   See More
                 </button>
                 <span className="p-3 text-gray-400 text-sm">1 week back</span>
               </div>
             </div>

             {/* Job Card 4 */}
             <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start">
               <div className="bg-orange-100 p-3 rounded-full mb-4">
                 <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-800 mb-1">Sr. UX Designer</h3>
               <p className="text-gray-500 text-sm mb-2">Globex Corporation Pvt, Ltd</p>
               <p className="text-500 text-sm flex items-center mb-4">
                 <MapPin className="w-4 h-4 mr-1" /> Los Angeles, California, USA
               </p>
               <div className="flex items-center justify-between w-full mt-auto">
                 <button className="px-4  bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors duration-200">
                   See More
                 </button>
                 <span className=" p-3 text-gray-400 text-sm">2 days back</span>
               </div>
             </div>
           </div>
         </section>
       </main>
     </div>
   );
};

export default Applicant;