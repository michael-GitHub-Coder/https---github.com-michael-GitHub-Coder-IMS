import { useState, useEffect } from "react";
import { useGetTicketsQuery, useGetMeQuery, useUpdateTicketMutation } from "../slices/usersAPISlice";
import { GrEscalator } from "react-icons/gr";

const Table2 = () => {
  const { data: me } = useGetMeQuery({});
  const { data: tickets, error, isLoading, refetch } = useGetTicketsQuery({});
  const [updateTicket] = useUpdateTicketMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval); 
  }, [refetch]);

  const filteredTickets = tickets?.tickets
    .filter((ticket: any) => ticket.assignedTo?._id === me?.user?._id)
    .filter((ticket: any) => me?.user?.role === "Technician")
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 13;
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage);

  const [dropdownStatusTicketId, setDropdownStatusTicketId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<any | null>();
  const [escalationMessage, setEscalationMessage] = useState(""); 
  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState(false); 

  const handleStatusSelect = async (ticketId: string, status: string, assignedToId: string | undefined) => {
    try {
      await updateTicket({ ticketId, status, assignedTo: assignedToId });
      setDropdownStatusTicketId(null);
      refetch();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleEscalate = async (ticketId: string) => {
    if (!selectedTicket) {
      console.error("No ticket selected for escalation");
      return; 
    }
  
    try {
      await updateTicket({
        ticketId,
        status: "Escalated",
        escalationMessage,
      });
      setIsEscalationModalOpen(false); 
      setEscalationMessage(""); 
      refetch();
    } catch (error) {
      console.error("Error escalating ticket:", error);
    }
  };
  


  const handleViewClick = (ticket: any) => {
    setSelectedTicket(ticket);
    console.log("Selected Ticket:", ticket);
  };

  return (
    <div className="ml-10 mr-17">
      {isLoading && <p className="text-center min-w-6xl">Loading tickets...</p>}
      {error && <p className="text-red-500 text-center">Error fetching tickets</p>}

      {!isLoading && !error && tickets && (
        <div className="rounded-tl-md rounded-tr-md">
          <table className="table-auto min-w-6xl w-auto border border-gray-300">
            <thead className="bg-indigo-500 border-2 border-indigo-500 rounded-tl-md rounded-tr-md text-white">
              <tr>
                {["Ticket ID", "Priority", "Ticket Group", "Assigned by", "Assigned to", "Status", "Actions"].map((heading) => (
                  <th key={heading} className="py-3 px-4 text-left">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.length > 0 ? (
                paginatedTickets.map((ticket: any) => (
                  <tr key={ticket._id} className="border border-gray-300 px-4 py-2">
                    <td className="py-2 px-4">{ticket._id}</td>
                    <td className="py-2 px-4">{ticket.priority}</td>
                    <td className="py-2 px-4">{ticket.group?.name}</td>
                    <td className="py-2 px-4">{ticket.supervisorId?.firstName} {ticket.supervisorId?.lastName}</td>
                    <td className="py-2 px-4">{ticket.assignedTo?.firstName} {ticket.assignedTo?.lastName}</td>
                    <td className="py-2 px-4 relative">
                      <div onClick={() => setDropdownStatusTicketId(ticket._id)} className="cursor-pointer">
                        {ticket.status}
                      </div>
                      {dropdownStatusTicketId === ticket._id && (
                        <div className="absolute -left-3 overflow-visible bg-white border border-gray-300 shadow-lg rounded mt-1 w-full z-10">
                          <ul className="max-h-40 overflow-auto">
                            {["Open", "In Progress", "Closed"].map((status) => (
                              <li
                                key={status}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleStatusSelect(ticket._id, status, ticket.assignedTo?._id)}
                              >
                                {status}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 flex gap-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        View
                      </button>
                      <GrEscalator
                        size={30}
                        className="cursor-pointer"
                        onClick={() => {
                          setIsEscalationModalOpen(true); 
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">No tickets available</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={`${totalPages <= 1 ? "hidden" : "flex justify-center mt-4"}`}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`mx-2 px-3 py-2 ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
            >
              Previous
            </button>
            <span className="mx-4 text-lg mt-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`mx-2 px-3 py-2 ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
            >
              Next
            </button>
          </div>

          {selectedTicket && (
            <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
                <div className="flex justify-between border border-gray-300 px-2 py-3 rounded-md">
                  <p><strong>Ticket ID:</strong> {selectedTicket._id}</p>
                  <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                </div>
                <div className="mt-1 flex justify-between border border-gray-300 px-2 py-3 rounded-md">
                  <p><strong>Assigned to:</strong> {selectedTicket.assignedTo ? `${selectedTicket.assignedTo.firstName} ${selectedTicket.assignedTo.lastName}` : "Not assigned"}</p>
                  <p><strong>Status:</strong> {selectedTicket.status}</p>
                </div>
                <div className="mt-1 space-y-5 border border-gray-300 px-2 py-3 rounded-md">
                  <p><strong>Title:</strong> {selectedTicket.title}</p>
                  <p><strong>Description:</strong> {selectedTicket.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setSelectedTicket(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer">Close</button>
                </div>
              </div>
            </div>
          )}

          {isEscalationModalOpen && selectedTicket && (
            <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Escalate Ticket</h2>
                <div className="flex justify-between border border-gray-300 px-2 py-3 rounded-md">
                  <p><strong>Ticket ID:</strong> {selectedTicket._id}</p>
                  <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                </div>
                <div className="mt-1 flex justify-between border border-gray-300 px-2 py-3 rounded-md">
                  <p><strong>Assigned to:</strong> {selectedTicket.assignedTo ? `${selectedTicket.assignedTo.firstName} ${selectedTicket.assignedTo.lastName}` : "Not assigned"}</p>
                  <p><strong>Status:</strong> {selectedTicket.status}</p>
                </div>
                <div className="mt-4">
                  <textarea
                    value={escalationMessage}
                    onChange={(e) => setEscalationMessage(e.target.value)}
                    placeholder="Enter escalation message"
                    className="w-full h-24 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <button onClick={() => setIsEscalationModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer">
                    Close
                  </button>
                  <button
                    onClick={() => handleEscalate(selectedTicket._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Escalate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table2;




import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { useGetTicketsQuery,useGetMeQuery } from '../slices/usersAPISlice';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

 // const { userInfo } = useSelector((state: any) => state.auth);
 const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { data: tickets } = useGetTicketsQuery({});
  const { data: user } = useGetMeQuery({});

  const [NoOFCritical, setNoOFCritical] = useState(0);
  const [NoOfHigh, setNoOfHigh] = useState(0);
  const [NoOfLow, setNoOfLow] = useState(0);
  const [NoOfMedium, setNoOfMedium] = useState(0);
  const [ClosedTickets,setClosedTickets] = useState(0);
  const [totTickets,settotTickets] = useState(0);
  const [totClosedTickets,settotClosedTickets] = useState(0);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today




 //console.log(user);

  useEffect(() => {
    if (tickets) {
      
      settotTickets(tickets.tickets.length);

      
      // const filteredTicketsClosed = tickets.tickets.filter((data: any) => data.status !== "Closed" && data.assignedTo?._id === user.user?._id);
      const userTickets = tickets.tickets.filter((data: any) => data.assignedTo?._id === user.user?._id);
      // setClosedTickets(userTickets.length - filteredTicketsClosed.length);

      
      const closedTicketsToday = tickets?.tickets?.filter((ticket: any) => 
        ticket.status === "Closed" && new Date(ticket.closedAt) >= today
      ) || [];
   
      // const ticketsToday = tickets?.tickets?.filter((ticket: any) => 
      //   new Date(ticket.createdAt) >= today
      // ) || [];

      setClosedTickets(userTickets.length);
      settotClosedTickets(closedTicketsToday.length);

      const filteredTicketsCritical = tickets?.tickets?.filter((data: any) => data.priority !== "Critical");
      setNoOFCritical(tickets?.tickets?.length - filteredTicketsCritical.length);

      const filteredTicketsHigh = tickets?.tickets?.filter((data: any) => data.priority !== "High");
      setNoOfHigh(tickets?.tickets?.length - filteredTicketsHigh.length);

      const filteredTicketsLow = tickets?.tickets?.filter((data: any) => data.priority !== "Low");
      setNoOfLow(tickets?.tickets?.length - filteredTicketsLow.length);

      const filteredTicketsMedium = tickets?.tickets?.filter((data: any) => data.priority !== "Medium");
      setNoOfMedium(tickets?.tickets?.length - filteredTicketsMedium.length);
    }
  }, [tickets, user]);

console.log("totClosedTickets ", totClosedTickets);
console.log("totTickets ", totTickets);
  const t = Math.round((totClosedTickets / totTickets) * 100);
  

  const handleUserProfile = () =>{
      navigate("/dashboard/Profile")
  }
  

  return (
    <div className="bg-white flex h-screen w-full">
   
      <div className="relative">
        <Sidebar isOpen={sidebarOpen} />
        <button
          className="text-white rounded-r-full cursor-pointer bg-indigo-500 pr-3 pl-2 py-4 absolute top-7 transition-all duration-300 "
          style={{ left: sidebarOpen ? "10rem" : "3.5rem" }} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </button>
      </div>
      
      <div className="flex flex-col">   
        <div className={`flex justify-end ${sidebarOpen ? "-mr-20" : "mr-5"}  mt-5`}>
          <button onClick={handleUserProfile} className="bg-indigo-500 rounded-full px-3 py-2 text-white cursor-pointer absolute right-10">User Profile</button>
        </div>
        <div className="flex">
          <div className="mt-15 min-w-6xl">
            <Outlet />
          </div>
          <div className={`${sidebarOpen ? "hidden" : "block"} bg-gray-200 h-[calc(100vh-115px)] absolute right-5 top-15 justify-end mt-5 lg:w-55 md:w-full md:-ml-10  md:mr-5 rounded-md text-white`}>
            <div className="flex flex-col justify-center bg-indigo-500 rounded-full text-center py-14 m-5 ">
                  <p className="font-semibold text-2xl">{t}%</p>
                  <p>Tickets closed</p>
              </div>
            <div className="mx-2 space-y-4 mt-10 text-[13px]">
                <div className="bg-indigo-500 px-5 py-2 rounded-md"> 
                    <p>{totClosedTickets} tickets closed</p>
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
