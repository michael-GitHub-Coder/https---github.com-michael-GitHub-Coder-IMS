import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersAPISlice';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiBook, FiBookOpen, FiHome, FiLogOut, FiSettings, FiUser, FiUsers } from "react-icons/fi";
//import Table from "./Table";
//import AddTicket from "./AddTicket";
//import AddUser from "./AddUser";
import { Link, Outlet } from "react-router-dom";
import { clearCredentials } from "../slices/authSlice";


const Sidebar = ({ isOpen }: { isOpen: boolean }) => {

  const { userInfo } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutAPIcall] = useLogoutMutation();

  

  const hanldeLogout = async (e:any) =>{
    e.preventDefault();
    
    try {
       await logoutAPIcall({}).unwrap();
       dispatch(clearCredentials());
       navigate("/login");
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div
      className={`bg-indigo-500 relative rounded-md mt-5 text-white p-5 fixed top-0 left-0 transition-all duration-300 ${
        isOpen ? "w-40" : "w-16"
      } h-[calc(100vh-50px)]`}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3 cursor-pointer">
            <Link to="/dashboard/table">
              <div className="flex gap-2">
                <FiHome size={24} />
                {isOpen && <span>Dashboard</span>}
              </div>
            </Link>
        </div>
       <div className="absolute top-[38%]">
        <div className="flex items-center space-x-3 cursor-pointer">
            <Link to="/dashboard/Add-user">
              <div className="flex gap-2">
                <FiUser size={24} />
                {isOpen && <span>New user</span>}
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-3 mt-5 cursor-pointer">
            <Link to="/dashboard/Add-ticket">
              <div className="flex gap-2">
                <FiBookOpen size={24}  />
                {isOpen && <span>New Ticket</span>}
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-3 mt-5 cursor-pointer">
            <Link to="/dashboard/Add-ticket">
                <div className="flex gap-2">
                  <FiUsers size={24} />
                  {isOpen && <span>New group</span>}
                </div>
            </Link>
          </div>
       </div>
       <div className="flex items-center space-x-3 absolute top-[93%] cursor-pointer">
          <FiLogOut size={24} />
          {isOpen && <span>Sign Out</span>} //hanldeLogout here
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
      
      <div className="flex flex-col">   
        <div className={`flex justify-end ${sidebarOpen ? "-mr-20" : "mr-5"}  mt-5`}>
          <button className="bg-indigo-500 rounded-full px-3 py-2 text-white cursor-pointer">User Profile</button>
        </div>
        <div className="flex">


          <div className="mt-5">
            {/* <Table /> */}
            {/* <AddTicket /> */}
            {/* <AddUser /> */}
            <Outlet />
          </div>


          <div className={`${sidebarOpen ? "hidden" : "block"} bg-gray-400 h-[calc(100vh-115px)] justify-end mt-5 lg:w-55 md:w-full md:-ml-10  md:mr-5 rounded-md text-white`}>
            <div className="flex flex-col bg-indigo-500 rounded-full text-center py-14 m-5 ">
                <p className="font-semibold text-2xl">50%</p>
                <p>Tickets closed</p>
            </div>
          <div className="mx-2 space-y-4 mt-10 text-[13px]">
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
      </div>
    </div>
  );
};

export default Dashboard;
