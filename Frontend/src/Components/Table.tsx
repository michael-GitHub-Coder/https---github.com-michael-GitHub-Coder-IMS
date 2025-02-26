import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTicketsQuery } from '../slices/usersAPISlice';

const Table = () => {
  
  const { userInfo } = useSelector((state: any) => state.auth);
  const { data: tickets, error, isLoading } = useGetTicketsQuery({});

  const filteredTickets = tickets?.tickets.filter((data: any) => data.status !== "Closed") || [];

  
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 13;
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * ticketsPerPage,currentPage * ticketsPerPage);

  return (
    <div className="ml-10 mr-17">
      {isLoading && <p className="min-w-6xl w-auto text-center">Loading tickets...</p>}
      {error && <p className="text-red-500 min-w-6xl w-auto text-center">Error fetching tickets</p>}

      {!isLoading && !error && tickets && (
        <>
          <table className="table-auto min-w-6xl w-auto border border-gray-300">
            <thead className="rounded-md bg-indigo-500 text-white">
              <tr>
                {['Ticket ID', 'Priority', 'Ticket Group', 'Assigned by', 'Assigned to', 'Status'].map((heading) => (
                  <th key={heading} className="py-3 px-4 relative text-left">
                    {heading}
                    <div className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border border-gray-300">
              {paginatedTickets.length > 0 ? (
                paginatedTickets.map((ticket: any) => (
                  <tr key={ticket._id} className="border border-gray-300 px-4 py-2">
                    <td className="py-2 px-4">{ticket._id}</td>
                    <td className="py-2 px-4">{ticket.priority}</td>
                    <td className="py-2 px-4">{ticket.ticketGroup}</td>
                    <td className="py-2 px-4">{ticket.assignedBy}</td>
                    <td className="py-2 px-4">{ticket.assignedTo}</td>
                    <td className="py-2 px-4">{ticket.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No tickets available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* check number of lines */}
          <div className={`${totalPages <= 13 ? "hidden" : "flex justify-center mt-4"}`}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`mx-2 px-3 py-2  ${currentPage === 1 ? "bg-gray-200 rounded-full cursor-pointer" : "bg-indigo-500 text-white hover:bg-indigo-600 rounded-full cursor-pointer"}`}
            >
              Previous
            </button>
            <span className="mx-4 text-lg mt-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`mx-2 px-3 py-2  ${currentPage === totalPages ? "bg-gray-200 rounded-full cursor-pointer" : "bg-indigo-500 text-white hover:bg-indigo-600 rounded-full cursor-pointer"}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
