import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="bg-white px-2 py-4 flex flex-row gap-5 mmin-w-8xl">
          <div>
              <p className="text-5xl font-bold ">Welcome Back!</p>
              <p className="text-gray-400 -mt-1.5 font-bold">Please enter login details below</p>
              <input type="text" placeholder="Username" className="border-b-2 border-gray-300 w-96 mt-5"/>
          </div>
          <div className="bg-indigo-500 rounded-md px-2 py-1 w-96 opacity-80 ">
              rgr
          </div>
        </div>
    </div>
  )
}

export default Login