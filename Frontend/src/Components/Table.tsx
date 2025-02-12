import React from 'react'

const Table = () => {
  return (
    <div className=" ml-10 mr-17 ">
    <table className="table-auto min-w-6xl w-auto">
      <thead className="rounded-md bg-indigo-500 text-white">
        <tr >
          <th className="py-3 px-4 flex justify-start relative">Ticket ID
            <div className="w-0 h-0 border-l-15 border-r-15 border-t-15 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
          </th>
          <th className="py-3 px-4  relative">Priority
            <div className="w-0 h-0 border-l-15 border-r-15 border-t-15 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
          </th>
          <th className="py-3 px-4 relative">Ticket Group
            <div className="w-0 h-0 border-l-15 border-r-15 border-t-15 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
          </th>
          <th className="py-3 px-4 relative">Assigned by
            <div className="w-0 h-0 border-l-15 border-r-15 border-t-15 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
          </th>
          <th className="py-3 px-4 relative">Assigned to
            <div className="w-0 h-0 border-l-15 border-r-15 border-t-15 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
          </th>
          <th className="py-3 px-5 flex justify-start relative">Status
            <div className="w-0 h-0 border-l-15 border-r-15 border-t-15 border-l-transparent border-r-transparent border-t-gray-400 absolute top-5 right-5"></div>
          </th>
        </tr>
      </thead>
      <tbody className="border-r border-gray-300">
        <tr className="border border-gray-300 px-4 py-2">
          <td>TN01254125458 </td>
          <td>Critical</td>
          <td>Pretoria North</td>
          <td>Jackson Maloka</td>
          <td>Michael Thulare</td>
          <td>Open</td>
        </tr>
        <tr className=" border border-gray-300 px-4 py-2">
          <td>TN01254125458 </td>
          <td>Critical</td>
          <td>Pretoria North</td>
          <td>Jackson Maloka</td>
          <td>Michael Thulare</td>
          <td>Open</td>
        </tr>
        <tr className="border border-gray-300 px-4 py-2">
          <td>TN01254125458 </td>
          <td>Critical</td>
          <td>Pretoria North</td>
          <td>Jackson Maloka</td>
          <td>Michael Thulare</td>
          <td>Open</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Table