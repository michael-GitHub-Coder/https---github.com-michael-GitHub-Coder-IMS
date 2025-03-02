import { useState } from "react";
import { useGetGroupsQuery, useGetRegionsQuery, useAddticketMutation } from "../slices/usersAPISlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

const AddTicket = () => {
  // States for form values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status] = useState("Open"); // fixed value
  const [group, setGroup] = useState("");
  const [region, setRegion] = useState("");

  // Fetch groups and regions data
  const { data: groupsData, isLoading: groupsLoading, error: groupsError } = useGetGroupsQuery({});
  const { data: regionsData, isLoading: regionsLoading, error: regionsError } = useGetRegionsQuery({});
  

  console.log("group data ",groupsData);
  console.log("region data",regionsData);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addticket] = useAddticketMutation();

  // Handle loading and errors
  if (groupsLoading || regionsLoading) {
    return <p>Loading...</p>;
  }

  if (groupsError) {
    return <p className="text-red-500">Failed to load groups</p>;
  }

  if (regionsError) {
    return <p className="text-red-500">Failed to load regions</p>;
  }

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addticket({ title, description, priority, status, group, region }).unwrap();
      dispatch(setCredentials({ ...res }));
      //navigate("/dashboard");
      alert("Ticket created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl -mt-10">Add New Ticket</h1>
      <div className="flex flex-col justify-center px-10 min-w-6xl w-auto ml-10 mr-17 mt-2">
        <form onSubmit={handleTicketSubmit} className="space-y-4">
            <input 
                  type="text" 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Title" 
                 className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
          <textarea
            placeholder="Type your message..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-50 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
          ></textarea>
          <div className="grid gap-6 mb-6 md:grid-cols-2 my-5">
            {/* Priority */}
            <div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                required
              >
                <option value="" disabled>Select Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Status (fixed value) */}
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                disabled
              >
                <option value="Open">Open</option>
              </select>
            </div>

            {/* Group (dynamically populated from groupsData) */}
            <div>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                required
              >
                <option value="" disabled>Select Group</option>
                {groupsData &&
                  groupsData.group?.map((group: any, index: number) => (
                    <option key={index} value={group._id}>
                      {group.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Region (dynamically populated from regionsData) */}
            <div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                required
              >
                <option value="" disabled>Select Region</option>
                {regionsData &&
                  regionsData.regions?.map((region: any, index: number) => (
                    <option key={index} value={region._id}>
                      {region.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
