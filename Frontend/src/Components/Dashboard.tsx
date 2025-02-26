import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { useGetTicketsQuery } from '../slices/usersAPISlice';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);
  const { data: tickets } = useGetTicketsQuery({});

  const [NoOFCritical, setNoOFCritical] = useState(0);
  const [NoOfHigh, setNoOfHigh] = useState(0);
  const [NoOfLow, setNoOfLow] = useState(0);
  const [NoOfMedium, setNoOfMedium] = useState(0);


  useEffect(() => {
    if (tickets) {
      
      const filteredTicketsCritical = tickets.tickets.filter((data: any) => data.priority !== "Critical");
      setNoOFCritical(tickets.tickets.length - filteredTicketsCritical.length);

      const filteredTicketsHigh = tickets.tickets.filter((data: any) => data.priority !== "High");
      setNoOfHigh(tickets.tickets.length - filteredTicketsHigh.length);

      const filteredTicketsLow = tickets.tickets.filter((data: any) => data.priority !== "Low");
      setNoOfLow(tickets.tickets.length - filteredTicketsLow.length);

      const filteredTicketsMedium = tickets.tickets.filter((data: any) => data.priority !== "Medium");
      setNoOfMedium(tickets.tickets.length - filteredTicketsMedium.length);
    }
  }, [tickets]);

  

  const handleUserProfile = () =>{
      navigate("/dashboard/Profile")
  }

  return (
    <div className="bg-white flex h-screen w-full">
   
      <div className="relative">
        <Sidebar isOpen={sidebarOpen} />
        <button
          className="text-white rounded-r-full cursor-pointer bg-indigo-500 pr-3 pl-2 py-4 absolute top-7 transition-all duration-300 "
          style={{ left: sidebarOpen ? "10rem" : "4.5rem" }} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </button>
      </div>
      
      <div className="flex flex-col">   
        <div className={`flex justify-end ${sidebarOpen ? "-mr-20" : "mr-5"}  mt-5`}>
          <button onClick={handleUserProfile} className="bg-indigo-500 rounded-full px-3 py-2 text-white cursor-pointer">User Profile</button>
        </div>
        <div className="flex">
          <div className="mt-5 min-w-6xl">
            <Outlet />
          </div>
          <div className={`${sidebarOpen ? "hidden" : "block"} bg-gray-200 h-[calc(100vh-115px)] justify-end mt-5 lg:w-55 md:w-full md:-ml-10  md:mr-5 rounded-md text-white`}>
            <div className="flex flex-col justify-center bg-indigo-500 rounded-full text-center py-14 m-5 ">
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
            <div className="flex justify-center gap-4 mt-2 mx-2">
              <div className="bg-indigo-500 w-22 h-20 rounded-md">
                  <p className="text-center mt-2  font-bold text-2xl">{NoOFCritical}</p>
                  <p className="text-center">Critical</p>
              </div>
              <div className="bg-indigo-500 w-22 h-20 rounded-md">
                  <p className="text-center mt-2 font-bold text-2xl">{NoOfHigh}</p>
                  <p className="text-center">High</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2 mx-2">
              <div className="bg-indigo-500 w-22 h-20 rounded-md">
                  <p className="text-center mt-2  font-bold text-2xl">{NoOfMedium}</p>
                  <p className="text-center">Medium</p>
              </div>
              <div className="bg-indigo-500 w-22 h-20 rounded-md">
                  <p className="text-center mt-2 font-bold text-2xl">{NoOfLow}</p>
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
