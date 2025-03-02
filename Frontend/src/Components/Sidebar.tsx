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
       navigate("/");
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div
      className={`bg-indigo-500 relative rounded-md mt-5 text-white p-5 fixed top-0 left-1 transition-all duration-300 ${
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
            <Link to="/dashboard/Add-group">
                <div className="flex gap-2">
                  <FiUsers size={24} />
                  {isOpen && <span>New group</span>}
                </div>
            </Link>
          </div>
       </div>
       <div className="flex items-center space-x-3 absolute top-[93%] cursor-pointer" onClick={hanldeLogout}>
          <FiLogOut size={24} />
          {isOpen && <span>Sign Out</span>} 
        </div>
      </div>
    </div>
  );
};

export default Sidebar