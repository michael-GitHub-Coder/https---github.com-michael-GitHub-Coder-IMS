import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useAddGroupMutation, useGetUsersQuery, useGetRegionsQuery } from '../slices/usersAPISlice';
import { setCredentials } from '../slices/authSlice';

const AddGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users using the query (no need to fetch users again manually)
  const { data: usersData } = useGetUsersQuery({});
  const { data: regionsData } = useGetRegionsQuery({});
  const [name, setName] = useState<string>('');
  const [region, setRegion] = useState<string>(''); // Changed this from regionsData to region
  const [supervisor, setSupervisor] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addingGroup] = useAddGroupMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo === true && userInfo !== null) {
      console.log('user info', userInfo);
      // navigate("/dashboard");
    }
  }, [navigate, userInfo]);
 

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await addingGroup({
        name, 
        regionId: region,
        supervisorId: supervisor }).unwrap();
      dispatch(setCredentials({ ...res }));
      setName("");
      setRegion("");    
      setSupervisor("");
      
    } catch (error) {
      console.log(error);
    }
  };

  console.log("usersData", usersData);
  console.log("regionsData", regionsData);

  return (
    <div className="ml-10 mr-17">
      <div className="max-w-6xl mx-auto px-6">
        {/* Groups Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Group Name</th>
                <th className="py-3 px-6 text-left">Technician</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with actual dynamic rows */}
              <tr className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">Group 1</td>
                <td className="py-3 px-6">Technician 1</td>
                <td className="py-3 px-6">Open</td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">Group 2</td>
                <td className="py-3 px-6">Technician 2</td>
                <td className="py-3 px-6">In Progress</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6">Group 3</td>
                <td className="py-3 px-6">Technician 3</td>
                <td className="py-3 px-6">Resolved</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Add New Group
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Add New Group</h2>
              <form onSubmit={submitHandler} className="space-y-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <select
                  value={region} // Using region state
                  onChange={(e) => setRegion(e.target.value)} // Setting region state
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="" disabled>Select Region</option>
                  {regionsData?.regions?.map((regions: any) => (
                    <option key={regions._id} value={regions._id}>
                      {regions.name}
                    </option>
                  ))}
                </select>
                <select
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="" disabled>Select Supervisor</option>
                  {usersData?.users?.map((user: any) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGroup;
