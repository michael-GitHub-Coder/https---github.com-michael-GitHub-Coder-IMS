import React from 'react'

const AddTicket = () => {
  return (
    <div className="flex flex-col justify-center px-5 min-w-6xl w-auto ml-10 mr-17 ">
        
        
        <form>
            <textarea 
                placeholder="Type your message..." 
                className="w-full h-50 p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
            ></textarea>
            <div className="grid gap-6 mb-6 md:grid-cols-2 my-5">    
                <div>
                    <input type="text" placeholder="Assign technician" className="w-full  p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none" placeholder="John" required />
                </div>
                <div>
                    <input type="text" placeholder="Assign group" className="w-full  p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none" placeholder="Doe" required />
                </div>
                <div>
                    <input type="text" placeholder="Status" className="w-full  p-3 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none" placeholder="Flowbite" required />
                </div>  
            </div>
            <button type="submit" className="cursor-pointer text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Create Ticket</button>
           
        </form>

    </div>
  )
}

export default AddTicket