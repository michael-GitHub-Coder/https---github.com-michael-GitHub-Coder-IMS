import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetTicketsQuery, useGetUsersQuery, useUpdateTicketMutation, useGetMeQuery } from "../slices/usersAPISlice";

const Table = () => {
  const { data: me } = useGetMeQuery({});
  let logedInUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

 
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const { data: tickets, error, isLoading, refetch } = useGetTicketsQuery({});
  const { data: users } = useGetUsersQuery({});
  const [updateTicket] = useUpdateTicketMutation();

  // Filter tickets that are not closed and sort by creation date (most recent first)
  const filteredTickets = tickets?.tickets
    .filter((data: any) => data.status !== "Closed")
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 13;
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage);

  const [dropdownTicketId, setDropdownTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownStatusTicketId, setDropdownStatusTicketId] = useState<string | null>(null);
  const [statusSearchQuery, setStatusSearchQuery] = useState("");

  
  const handleViewClick = (ticket: any) => {
    setSelectedTicket(ticket);  
  };

  const closeModal = () => {
    setSelectedTicket(null); 
  };

  useEffect(() => {
    if (dropdownTicketId) setSearchQuery("");
  }, [dropdownTicketId]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  const handleAssignClick = (ticketId: string) => {
    setDropdownTicketId(ticketId === dropdownTicketId ? null : ticketId);
    setSearchQuery(""); 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); 

    return () => clearInterval(interval); 
  }, [refetch]);

  const handleStatusChangeClick = (ticketId: string) => {
    setDropdownStatusTicketId(ticketId === dropdownStatusTicketId ? null : ticketId);
    setStatusSearchQuery(""); 
  };

  const handleUserSelect = async (ticketId: string, assignedTo: string) => {
    try {
      await updateTicket({ ticketId: ticketId, assignedTo });
      setDropdownTicketId(null);
      refetch();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleStatusSelect = async (ticketId: string, status: string, assignedToId: string | undefined) => {
    console.log("Updating ticket with ID:", ticketId, "Status:", status, "Assigned to:", assignedToId);
  
    try {
      const response = await updateTicket({
        ticketId, 
        status,
        assignedTo: assignedToId
     });
      console.log("Response:", response);
      setDropdownStatusTicketId(null);
      refetch();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="ml-10 mr-17">
      {isLoading && <p className="text-center min-w-6xl">Loading tickets...</p>}
      {error && <p className="text-red-500 text-center">Error fetching tickets</p>}

      {!isLoading && !error && tickets && (
        <div className=" rounded-tl-md rounded-tr-md">
          {/* Conditional Rendering Based on User Role */}
         
          <table className="table-auto min-w-6xl w-auto border border-gray-300 ">
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
                    <td className="py-2 px-4">{ticket.supervisorId?.firstName}</td>
                    <td className="py-2 px-4 relative">
                      <div onClick={() => handleAssignClick(ticket._id)} className="cursor-pointer">
                        {ticket.assignedTo ? `${ticket.assignedTo.firstName ?? ""} ${ticket.assignedTo.lastName ?? ""}`.trim() : "Unassigned"}
                      </div>
                      {dropdownTicketId === ticket._id && (
                        <div className="absolute top-0 bg-white border border-gray-300 shadow-lg rounded  w-full z-10">
                          <input
                            type="text"
                            className="w-full p-2 border-b"
                            placeholder="Search user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <ul className="max-h-40 overflow-auto ">
                            {users.users?.filter((user: any) =>
                                `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((user: any) => (
                                <li
                                  key={user._id}
                                  className="p-2 hover:bg-gray-200 cursor-pointer"
                                  onClick={() => handleUserSelect(ticket._id, user._id)}
                                >
                                  {user.firstName} {user.lastName}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 relative">
                      <div onClick={() => handleStatusChangeClick(ticket._id)} className="cursor-pointer">
                        {ticket.status}
                      </div>
                      {dropdownStatusTicketId === ticket._id && (
                        <div className="absolute bg-white border border-gray-300 shadow-lg rounded mt-1 w-full z-10">
                          <input
                            type="text"
                            className="w-full p-2 border-b"
                            placeholder="Search status..."
                            value={statusSearchQuery}
                            onChange={(e) => setStatusSearchQuery(e.target.value)}
                          />
                          <ul className="max-h-40 overflow-auto">
                            {["Open", "In Progress", "Closed"].filter((status) =>
                                status.toLowerCase().includes(statusSearchQuery.toLowerCase())
                              )
                              .map((status) => (
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

                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleViewClick(ticket)}  
                        className="bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">No tickets available</td>
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
                <div className="mt-1  space-y-5 border border-gray-300 px-2 py-3 rounded-md">
                  <p><strong>Title:</strong> {selectedTicket.title}</p>
                  <p><strong>Description:</strong> {selectedTicket.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer">Close</button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Table;
