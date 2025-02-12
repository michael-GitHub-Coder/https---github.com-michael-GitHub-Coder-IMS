import React from 'react'

const AddUser = () => {
  return (
    <div>
        <h1 className="text-center font-bold text-2xl -mt-10">Add new user</h1>
        <div className="flex flex-col justify-center px-5 min-w-6xl w-auto ml-10 mr-17 mt-5">
            <form>
                <div className="grid gap-6 mb-6  my-5">  
                    <input 
                        placeholder="Email" 
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
                    ></input>  
                    <div>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                            required
                        >
                            <option value="" disabled selected>Select technician</option>
                            <option value="tech1">Technician 1</option>
                            <option value="tech2">Technician 2</option>
                            <option value="tech3">Technician 3</option>
                        </select>
                    </div>

                    <div>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                            required
                        >
                            <option value="" disabled selected>Select group</option>
                            <option value="group1">Group 1</option>
                            <option value="group2">Group 2</option>
                            <option value="group3">Group 3</option>
                        </select>
                    </div>

                    <div>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                            required
                        >
                            <option value="" disabled selected>Select status</option>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                </div>
                <button type="submit" className="cursor-pointer text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Add User</button>
            
            </form>

        </div>
    </div>
  )
}

export default AddUser