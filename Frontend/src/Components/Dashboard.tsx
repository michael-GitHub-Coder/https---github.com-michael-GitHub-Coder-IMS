import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`bg-indigo-500 rounded-md mt-5 text-white p-5 fixed top-0 left-0 transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      } h-[calc(100vh-50px)]`}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3">
          <FiHome size={24} />
          {isOpen && <span>Dashboard</span>}
        </div>
        <div className="flex items-center space-x-3">
          <FiUser size={24} />
          {isOpen && <span>Profile</span>}
        </div>
        <div className="flex items-center space-x-3">
          <FiSettings size={24} />
          {isOpen && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
   
      <div className="relative">
        
        <Sidebar isOpen={sidebarOpen} />

        <button
          className="text-white rounded-r-full bg-indigo-500 pr-3 pl-2 py-4 absolute top-7 transition-all duration-300"
          style={{ left: sidebarOpen ? "15rem" : "3.5rem" }} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
