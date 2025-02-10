import { useState } from "react";
import { FiMenu, FiHome, FiSettings, FiUser } from "react-icons/fi";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`bg-indigo-500 rounded-md mt-5 text-white p-5 fixed top-0 left-0 transition-transform ${
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
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 bg-gray-100 p-6 ml-16">
        {/* <div className="flex justify-between items-center bg-white p-4 shadow-md">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1> 
        </div> 

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">Card 1</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Card 2</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Card 3</div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
