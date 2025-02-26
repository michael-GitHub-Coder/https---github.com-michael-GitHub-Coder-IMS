import React, { useEffect, useState } from 'react';
import { FaPenAlt, FaSave } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateProfileMutation } from '../slices/usersAPISlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';

const UserProfile = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
  });

  const [addressInfo, setAddressInfo] = useState({
    country: '',
    cityState: '',
    postalCode: '',
    taxId: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setPersonalInfo({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        phone: userInfo.phoneNumber || '',
        bio: userInfo.bio || '',
      });

      setAddressInfo({
        country: userInfo.country || '',
        cityState: userInfo.cityState || '',
        postalCode: userInfo.postalCode || '',
        taxId: userInfo.taxId || '',
      });
    }
  }, [userInfo]);

  const handleEditToggle = (section: 'personal' | 'address') => {
    if (section === 'personal') {
      setIsEditingPersonal(!isEditingPersonal);
      if (isEditingPersonal) submitHandler('personal');
    } else {
      setIsEditingAddress(!isEditingAddress);
      if (isEditingAddress) submitHandler('address');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, section: 'personal' | 'address') => {
    const { name, value } = e.target;
    if (section === 'personal') {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setAddressInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = async (section: 'personal' | 'address') => {
    try {
      const updatedData = section === 'personal' ? personalInfo : addressInfo;
      const res = await updateProfile({ id: userInfo.id, ...updatedData }).unwrap();
      dispatch(setCredentials(res));
      navigate('/table');
    } catch (error) {
      console.log('Update failed:', error);
    }
  };

  return (
    <div className="ml-10 mr-17">
      <div className="min-w-6xl">
        <div className="mx-auto bg-white overflow-hidden">
          <div className="px-6 py-4 -mt-3">
            <div className="text-gray-700 text-base space-y-5">
              {/* Profile Section */}
              <div className="border border-gray-200 rounded-md px-5 py-2">
                <div className="flex gap-5">
                  <img
                    src="https://th.bing.com/th/id/OIP.mou4FUqL4SyhE6B54l4YWAHaHa?rs=1&pid=ImgDetMain"
                    className="w-25 -mt-2"
                  />
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                      {personalInfo.firstName} {personalInfo.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">Product Designer</p>
                    <p className="text-sm text-gray-600">Los Angeles, California, USA</p>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="border border-gray-200 rounded-md px-5 py-2">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-md font-semibold">Personal Information</h3>
                    <button
                      className="flex gap-2 border border-gray-200 px-2 rounded-md"
                      onClick={() => handleEditToggle('personal')}
                    >
                      {isEditingPersonal ? <FaSave size={12} /> : <FaPenAlt size={12} />}
                      {isEditingPersonal ? 'Save' : 'Edit'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>First Name</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => handleChange(e, 'personal')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{personalInfo.firstName}</span>
                    )}

                    <span>Last Name</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        name="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => handleChange(e, 'personal')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{personalInfo.lastName}</span>
                    )}

                    <span>Email</span>
                    {isEditingPersonal ? (
                      <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={(e) => handleChange(e, 'personal')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{personalInfo.email}</span>
                    )}

                    <span>Phone</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handleChange(e, 'personal')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{personalInfo.phone}</span>
                    )}

                    <span>Bio</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handleChange(e, 'personal')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{personalInfo.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="border border-gray-200 rounded-md px-5 py-2">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-md font-semibold">Address</h3>
                    <button
                      className="flex gap-2 border border-gray-200 px-2 rounded-md"
                      onClick={() => handleEditToggle('address')}
                    >
                      {isEditingAddress ? <FaSave size={12} /> : <FaPenAlt size={12} />}
                      {isEditingAddress ? 'Save' : 'Edit'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Country</span>
                    {isEditingAddress ? (
                      <input
                        type="text"
                        name="country"
                        value={addressInfo.country}
                        onChange={(e) => handleChange(e, 'address')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{addressInfo.country}</span>
                    )}

                    <span>City/State</span>
                    {isEditingAddress ? (
                      <input
                        type="text"
                        name="cityState"
                        value={addressInfo.cityState}
                        onChange={(e) => handleChange(e, 'address')}
                        className="border p-1 rounded"
                      />
                    ) : (
                      <span>{addressInfo.cityState}</span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
