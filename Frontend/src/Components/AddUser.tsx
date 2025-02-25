import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddUserMutation } from '../slices/usersAPISlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
const AddUser = () => {
    
   const [firstName,setfirstName] = useState<string>("");
   const [lastName,setlastName] = useState<string>("");
   const [email,setEmail] = useState<string>("");
   const [role,setRole] = useState<string>("");
   const [phoneNumber,setphoneNumber] = useState<string>("");
   const [bio,setBio] = useState<string>("");
   const [country,setCountry] = useState<string>("");
   const [postalCode,setPostalCode] = useState<string>("");

   const {userInfo} = useSelector((state: any)=>state.auth);
   

   const navigate = useNavigate();
   const dispatch = useDispatch();

  const [addUser] = useAddUserMutation();

  useEffect(()=>{
    if(!userInfo){
      navigate("/");
    }
  },[navigate, userInfo]);
    
   const handleFormSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        try {
            const res = await addUser({firstName,lastName,email, phoneNumber,bio,country,postalCode,role}).unwrap();
            dispatch(setCredentials({...res}));
            // navigate("/dashboard");

            console.log(res);
        } catch (error) {
            console.log(error)
        }
   }
  return (
    <div>
        <h1 className="text-center font-bold text-2xl -mt-10">Add new user</h1>
        <div className="flex flex-col justify-center px-10 min-w-6xl w-auto ml-10 mr-17 mt-2">
            <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                type="text" 
                placeholder="First Name" 
                value={firstName}
                onChange={(e)=>setfirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
                />
                <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e)=>setlastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                    required
                />
            </div>
           
            <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phoneNumber}
                onChange={(e)=>setphoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
            />
            <textarea 
                placeholder="Bio" 
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                rows="3" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none" 
            ></textarea>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required
                value={country}
                onChange={(e)=>setCountry(e.target.value)}
                >
                <option value="" disabled selected>Country</option>
                <option value="South Africa">South Africa</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                </select>
                <input 
                type="text" 
                placeholder="Province" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
                />
            </div>
            <input 
                type="text" 
                placeholder="Postal Code" 
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
            />
            <button 
                type="submit" 
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
            >
                Add User
            </button>
            </form>
        </div>
    </div>
  )
}

export default AddUser