import React from 'react'

const AddUser = () => {
  return (
    <div>
        <h1 className="text-center font-bold text-2xl -mt-10">Add new user</h1>
        <div className="flex flex-col justify-center px-10 min-w-6xl w-auto ml-10 mr-17 mt-2">
            <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                type="text" 
                placeholder="First Name" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
                />
                <input 
                type="text" 
                placeholder="Last Name" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
                />
            </div>
            <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
            />
            <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                required
            />
            <textarea 
                placeholder="Bio" 
                rows="3" 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none" 
            ></textarea>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required
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