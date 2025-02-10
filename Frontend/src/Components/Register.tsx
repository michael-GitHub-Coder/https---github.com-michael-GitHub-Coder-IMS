import React from 'react'

const Register = () => {
  return (
     <div className="grid grid-cols-1 md:flex justify-center items-center h-screen px-5">
            <div className="bg-white px-5 py-4 md:flex flex-row gap-5 min-w-8xl">
              <div className="flex flex-col">
                  <p className="text-4xl md:text-5xl font-bold mt-10">Welcome Back!</p>
                  <p className="text-gray-400 -mt-1.5 font-bold ">Please enter login details below</p>
                  <input type="text" placeholder="Enter the email" className="font-bold px-2 py-3 rounded-md text-gray-500  bg-gray-300 w-auto md:w-96 mt-7"/>
                  <input type="text" placeholder="Enter the Password" className="font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-5"/>
                  <input type="text" placeholder="Confirm the Password" className="font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-5"/>
                  <button className="font-bold px-2 py-3 rounded-md bg-gray-300 w-auto md:w-96  text-gray-500 hover:text-white cursor-pointer hover:bg-gray-500 mt-5">Sign up</button>
                  <div className="flex text-gray-500 py-4">
                    <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
                    <p className="text-gray-400 mx-2 mt-2">OR</p>
                    <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
                  </div>
                  <div className="flex justify-center text-gray-500 gap-4 font-semibold py-4">
                    <p>Don’t have an account? </p>
                    <button className="text-indigo-500 cursor-pointer">Sign in</button>
                  </div>
              </div>
              <div className="relative hidden md:block bg-indigo-500 rounded-md px-2 py-1 w-auto md:w-96 opacity-80">
                
              </div>
            </div>
        </div>
  )
}

export default Register