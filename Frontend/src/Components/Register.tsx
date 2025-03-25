import { useState,useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersAPISlice';
import { setCredentials } from '../slices/authSlice';

const Register = () => {

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Admin");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();


  const submitHandler = async (e: React.FormEvent) =>{
    e.preventDefault();
    
    try {
      const res = await register({firstName,lastName,email,role,phoneNumber,bio,country,postalCode,password,confirmPassword,city}).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setPhoneNumber("");
      setBio("");
      setCountry("");
      setCity("");
      setPostalCode("");
     
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="grid grid-cols-1 md:flex justify-center items-center h-screen px-5">
      <div className="bg-white px-5 py-4 md:flex flex-row gap-5 min-w-8xl">
        <div className="flex flex-col relative">
          <p className="text-4xl md:text-5xl font-bold mt-10">Welcome Back!</p>
          <p className="text-gray-400 -mt-1.5 font-bold">Please enter login details below</p>
          {step === 1 ? (
            <form className="flex flex-col">
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7"/>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7"/>
              <button type="button" onClick={() => setStep(2)} className=" font-bold px-2 py-3 rounded-md bg-gray-300 w-auto md:w-96  text-gray-500 hover:text-white cursor-pointer hover:bg-gray-500">Continue</button>
            </form>
          ) : (
            <form onSubmit={submitHandler} className="flex flex-col">
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7"/>
              <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7" />
              <button type="button" onClick={() => setStep(1)} ><FaArrowLeft className="text-indigo-500 absolute top-4 cursor-pointer"/></button>
              <button type="submit" className="font-bold px-2 py-3 rounded-md bg-gray-300 w-auto md:w-96  text-gray-500 hover:text-white cursor-pointer hover:bg-gray-500">Sign Up</button>
            </form>
          )}
          <div className="flex text-gray-500 py-4">
            <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
            <p className="text-gray-400 mx-2 mt-2">OR</p>
            <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
          </div>
          <div className="flex justify-center text-gray-500 gap-4 font-semibold py-4">
            <p>Don’t have an account?</p>
            <Link to="/">
              <button className="text-indigo-500 cursor-pointer">Sign in</button>
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block bg-indigo-500 rounded-md px-2 py-1 w-auto md:w-96 opacity-80"></div>
      </div>
    </div>
  );
};

export default Register;
