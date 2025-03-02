import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  useAddGroupMutation,
  useGetUsersQuery,
  useGetRegionsQuery,
  useGetGroupsQuery,
  useUpdateGroupMutation,
} from "../slices/usersAPISlice";
import { setCredentials } from "../slices/authSlice";
import { FaPen, FaPlus } from "react-icons/fa";

const AddGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any>(null);

  const { data: usersData } = useGetUsersQuery({});
  const { data: regionsData } = useGetRegionsQuery({});
  const { data: groupsData } = useGetGroupsQuery({});
  
  const [addGroup] = useAddGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [supervisor, setSupervisor] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo === true && userInfo !== null) {
      console.log("user info", userInfo);
    }
  }, [navigate, userInfo]);

  // Handle Add Group
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addGroup({ name, regionId: region, supervisorId: supervisor }).unwrap();
      dispatch(setCredentials({ ...res }));
      setName("");
      setRegion("");
      setSupervisor("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Edit Click (Open Modal)
  const handleEditClick = (group: any) => {
    setEditingGroup(group);
    setName(group.name);
    setRegion(group.regionId?._id || "");
    setSupervisor(group.supervisorId?._id || "");
    setIsEditModalOpen(true);
  };

  // Handle Update Group
  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup) return;

    try {
      await updateGroup({
        id: editingGroup._id,
        name,
        regionId: region,
        supervisorId: supervisor,
      }).unwrap();

      setIsEditModalOpen(false);
      setEditingGroup(null);
      setName("");
      setRegion("");
      setSupervisor("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingGroup(null);
    setName("");
    setRegion("");
    setSupervisor("");
  };

  console.log("regions ", regionsData);
  return (
    <div className="ml-10 mr-17">
      <div className="max-w-6xl mx-auto -mt-15">
        {/* Groups Table */}
        <div className="overflow-x-auto mt-15">
          <table className="relative w-full min-w-6xl bg-white shadow-md rounded-lg scroll-hidden overflow-hidden">
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex justify-end cursor-pointer"
            >
              <FaPlus className="mb-4 absolute top-5 right-5 z-0 mr-3 text-white" />
            </div>
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Group Name</th>
                <th className="py-3 px-6 text-left">Group Originator</th>
                <th className="py-3 px-6 text-left">Group Supervisor</th>
                <th className="py-3 px-6 text-left">Region</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupsData?.group?.map((group: any) => (
                <tr key={group._id} className="border border-gray-300 px-4 py-2">
                  <td className="py-2 px-4">{group.name}</td>
                  <td className="py-2 px-4">
                    {group.createdBy?.firstName} {group.createdBy?.lastName}
                  </td>
                  <td className="py-2 px-4">
                    {group.supervisorId?.firstName} {group.supervisorId?.lastName}
                  </td>
                  <td className="py-2 px-4">{group.regionId?.name}</td>
                  <td className="py-2 px-4">
                    <FaPen
                      className="text-blue-500 cursor-pointer ml-10"
                      onClick={() => handleEditClick(group)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Group Modal */}
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required>
                  <option value="" disabled>Select Region</option>
                  {regionsData?.regions?.map((region: any) => (
                    <option key={region._id} value={region._id}>{region.name}</option>
                  ))}
                </select>
                <select value={supervisor} onChange={(e) => setSupervisor(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required>
                  <option value="" disabled>Select Supervisor</option>
                  {usersData?.users?.map((user: any) => (
                    <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                  ))}
                </select>
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700">Create Group</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Group Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Edit Group</h2>
              <form onSubmit={updateHandler} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required>
                  {regionsData?.regions?.map((region: any) => (
                    <option key={region._id} value={region._id}>
                        {region.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={handleCloseEditModal} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-400"> Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg">Update Group</button>
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
