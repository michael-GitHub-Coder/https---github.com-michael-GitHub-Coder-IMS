import React from 'react';
import { FaPen, FaPenAlt } from 'react-icons/fa';

const UserProfile = () => {
  return (
    <div className="ml-10 mr-17">
        <div className="min-w-6xl">
        <div className=" mx-auto bg-white overflow-hidden">
            <div className="px-6 py-4">
                <div className="text-gray-700 text-base space-y-10">

                    <div className="border border-gray-200 rounded-md px-5 py-2">
                        <div className="flex gap-5">
                            <img src="https://th.bing.com/th/id/OIP.mou4FUqL4SyhE6B54l4YWAHaHa?rs=1&pid=ImgDetMain" className="w-25 -mt-2"/>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Jack Adams</h2>
                                <p className="text-sm text-gray-600">Product Designer</p>
                                <p className="text-sm text-gray-600">Los Angeles, California, USA</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-md px-5 py-2">
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <h3 className="text-md font-semibold">Personal Information</h3>
                                <button className="flex gap-2 border border-gray-200 px-2 rounded-md"><FaPenAlt className="mt-1.5" size={12}/> Edit</button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                            <span>First Name</span>
                            <span>Jack</span>
                            <span>Last Name</span>
                            <span>Adams</span>
                            <span>Email address</span>
                            <span>jackadams@gmail.com</span>
                            <span>Phone</span>
                            <span>(213) 555-1234</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-md font-semibold">Bio</h3>
                            <p className="text-sm text-gray-600">Product Designer</p>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-md px-5 py-2">
                        <div className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-md font-semibold">Address</h3>
                            <button className="flex gap-2 border border-gray-200 px-2 rounded-md"><FaPenAlt className="mt-1.5" size={12}/> Edit</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <span>Country</span>
                            <span>United States of America</span>
                            <span>City/State</span>
                            <span>California, USA</span>
                            <span>Postal Code</span>
                            <span>ERT 62574</span>
                            <span>TAX ID</span>
                            <span>A8564178969</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* <div className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
                </button>
            </div> */}
            </div>
        </div>
    </div>
   
  );
};

export default UserProfile;