import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="bg-white px-5 py-4 flex flex-row gap-5 mmin-w-8xl">
          <div className="flex flex-col">
              <p className="text-5xl font-bold mt-10">Welcome Back!</p>
              <p className="text-gray-400 -mt-1.5 font-bold ">Please enter login details below</p>
              <input type="text" placeholder="Enter the email" className="font-bold px-2 py-3 rounded-md text-gray-500  bg-gray-300 w-96 mt-5"/>
              <input type="text" placeholder="Enter the Password" className="font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-96 mt-5"/>
              <p className="flex py-3 justify-end text-black font-bold">Forgot Password?</p>
              <button className="font-bold px-2 py-3 rounded-md bg-gray-300 w-96  text-gray-500 ">Sign in</button>
          </div>
          <div className="bg-indigo-500 rounded-md px-2 py-1 w-96 opacity-80 ">
              rgr
          </div>
        </div>
    </div>
  )
}

export default Login