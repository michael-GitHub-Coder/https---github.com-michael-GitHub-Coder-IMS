import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiBook, FiBookOpen, FiHome, FiLogOut, FiSettings, FiUser, FiUsers } from "react-icons/fi";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`bg-indigo-500 relative rounded-md mt-5 text-white p-5 fixed top-0 left-0 transition-all duration-300 ${
        isOpen ? "w-40" : "w-16"
      } h-[calc(100vh-50px)]`}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3 cursor-pointer">
          <FiHome size={24} />
          {isOpen && <span>Dashboard</span>}
        </div>
       <div className="absolute top-[38%]">
        <div className="flex items-center space-x-3 cursor-pointer">
            <FiUser size={24} />
            {isOpen && <span>New user</span>}
          </div>
          <div className="flex items-center space-x-3 mt-5 cursor-pointer">
            <FiBookOpen size={24} />
            {isOpen && <span>New Ticket</span>}
          </div>
          <div className="flex items-center space-x-3 mt-5 cursor-pointer">
            <FiUsers size={24} />
            {isOpen && <span>New group</span>}
          </div>
       </div>
       <div className="flex items-center space-x-3 absolute top-[93%] cursor-pointer">
          <FiLogOut size={24} />
          {isOpen && <span>Dashboard</span>}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-white flex h-screen w-full">
   
      <div className="relative">
        <Sidebar isOpen={sidebarOpen} />
        <button
          className="text-white rounded-r-full cursor-pointer bg-indigo-500 pr-3 pl-2 py-4 absolute top-7 transition-all duration-300"
          style={{ left: sidebarOpen ? "10rem" : "3.5rem" }} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </button>
      </div>
      <div className="mt-5">
        {/* <div className="flex justify-end">
          <button className="bg-indigo-500 rounded-full px-2.5 py-2.5 text-white">User profile</button>
        </div> */}
        <div className="px-15 mt-5">
          <table className="table-auto min-w-6xl">
            <thead className="rounded-md bg-indigo-500 text-white ">
              <tr>
                <th className="py-3">Song</th>
                <th>Artist</th>
                <th>Year</th>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${sidebarOpen ? "hidden" : "block"} bg-gray-400 h-[calc(100vh-70px)] mt-10 w-full -ml-10 mr-5 rounded-md text-white`}>
        <div className="flex flex-col bg-indigo-500 rounded-full text-center py-14 m-5 ">
            <p className="font-semibold text-2xl">50%</p>
            <p>Tickets closed</p>
        </div>
       <div className="mx-2 space-y-4 mt-20 text-[13px]">
          <div className="bg-indigo-500 px-5 py-2 rounded-md"> 
              <p>25555 tickets closed</p>
          </div>
          <div className="bg-indigo-500 px-5 py-2 rounded-md"> 
              <p>125 Tickets Breached SLA</p>
          </div>
          <div className="bg-indigo-500 px-5 py-2 rounded-md"> 
              <p>12542 Tickets Escalations
              </p>
          </div>
       </div>
        <p className="text-center mt-7 text-indigo-500 font-bold text-2xl">Open Tickets</p>
       <div className="flex gap-4 mt-2 mx-2">
         <div className="bg-indigo-500 w-22 h-20 rounded-md">
            <p className="text-center mt-2  font-bold text-2xl">25</p>
            <p className="text-center">Critical</p>
         </div>
         <div className="bg-indigo-500 w-22 h-20 rounded-md">
            <p className="text-center mt-2 font-bold text-2xl">25</p>
            <p className="text-center">High</p>
         </div>
       </div>
       <div className="flex gap-4 mt-2 mx-2">
         <div className="bg-indigo-500 w-22 h-20 rounded-md">
            <p className="text-center mt-2  font-bold text-2xl">25</p>
            <p className="text-center">Medium</p>
         </div>
         <div className="bg-indigo-500 w-22 h-20 rounded-md">
            <p className="text-center mt-2 font-bold text-2xl">25</p>
            <p className="text-center">Low</p>
         </div>
       </div>
      </div>
    </div>
  );
};

export default Dashboard;
