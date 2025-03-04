import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddUserMutation, useGetGroupsQuery } from "../slices/usersAPISlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
   const [firstName, setFirstName] = useState<string>("");
   const [lastName, setLastName] = useState<string>("");
   const [password, setPassword] = useState<string>("12345");
   const [email, setEmail] = useState<string>("");
   const [role, setRole] = useState<string>("");
   const [phoneNumber, setPhoneNumber] = useState<string>("");
   const [bio, setBio] = useState<string>("");
   const [country, setCountry] = useState<string>("");
   const [province, setProvince] = useState<string>("");
   const [city, setCity] = useState<string>("");
   const [postalCode, setPostalCode] = useState<string>("");
   const [group, setGroup] = useState<string>("");

   const { data: groupsData, isLoading: isGroupsLoading } = useGetGroupsQuery({});
   const { userInfo } = useSelector((state: any) => state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [addUser, { isLoading, isError, error, isSuccess }] = useAddUserMutation();

   useEffect(() => {
      if (!userInfo) {
         navigate("/");
      }
   }, [navigate, userInfo]);

   const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         await addUser({
            firstName,
            lastName,
            email,
            role,
            phoneNumber,
            bio,
            country,
            province,
            city,
            postalCode,
            password,
            group,
         }).unwrap();

         // Reset form fields
         setFirstName("");
         setLastName("");
         setEmail("");
         setRole("");
         setPhoneNumber("");
         setBio("");
         setCountry("");
         setProvince("");
         setCity("");
         setPostalCode("");
         setGroup("");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <h1 className="text-center font-bold text-2xl -mt-10">Add new user</h1>
         <div className="flex flex-col justify-center px-10 min-w-6xl w-auto ml-10 mr-17 mt-2">
            {isSuccess && (
               <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  User added successfully!
               </div>
            )}
            {isError && (
               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  { "Something went wrong!"}
               </div>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                     type="text"
                     placeholder="First Name"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                  />
                  <input
                     type="text"
                     placeholder="Last Name"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                  />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                  />
                  <input
                     type="tel"
                     placeholder="Phone Number"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                  />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                     value={role}
                     onChange={(e) => setRole(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                  >
                     <option value="" disabled>Select role</option>
                     <option value="Technician">Technician</option>
                     <option value="Supervisor">Supervisor</option>
                  </select>
                  <select value={group} onChange={(e) => setGroup(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" required>
                     <option value="" disabled>Select group</option>
                     {isGroupsLoading ? (
                        <option disabled>Loading groups...</option>
                     ) : groupsData?.group?.length ? (
                        groupsData.group.map((region: any) => (
                           <option key={region._id} value={region._id}>
                              {region.name}
                           </option>
                        ))
                     ) : (
                        <option disabled>No groups available</option>
                     )}
                  </select>
               </div>
               <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
               ></textarea>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                  >
                     <option value="" disabled>Country</option>
                     <option value="South Africa">South Africa</option>
                     <option value="USA">USA</option>
                     <option value="Canada">Canada</option>
                  </select>
                  <input
                     type="text"
                     placeholder="Province"
                     value={province}
                     onChange={(e) => setProvince(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                     required
                  />
               </div>
               <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  required
               />
               <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  required
               />
               <button
                  type="submit"
                   className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
                  disabled={isLoading}
               >
                  {isLoading ? "Adding..." : "Add User"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default AddUser;
