import{useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersAPISlice';
import { setCredentials } from '../slices/authSlice';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(()=>{
    if(userInfo){
      navigate("/dashboard");
    }
  },[navigate, userInfo]);

  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    
    try {
      const res = await login({name, email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/dashboard");
      console.log(userInfo);
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
     <div className="grid grid-cols-1 md:flex justify-center items-center h-screen px-5">
            <div className="bg-white px-5 py-4 md:flex flex-row gap-5 min-w-8xl">
              <div className="flex flex-col">
                  <p className="text-4xl md:text-5xl font-bold mt-10">Welcome Back!</p>
                  <p className="text-gray-400 -mt-1.5 font-bold ">Please enter login details below</p>
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e)=> setName(e.target.value)}
                      placeholder="Enter the email" 
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500  bg-gray-300 w-auto md:w-96 mt-7"
                    />
                    <input 
                      type="text" 
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      placeholder="Enter the email" 
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500  bg-gray-300 w-auto md:w-96 mt-7"
                    />
                    <input 
                      type="text" 
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                      placeholder="Enter the Password" 
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-5"
                    />
                    <input 
                      type="text" 
                      value={confirmPassword}
                      onChange={(e)=> setConfirmPassword(e.target.value)}
                      placeholder="Confirm the Password" 
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-5"
                    />
                    <button className="font-bold px-2 py-3 rounded-md bg-gray-300 w-auto md:w-96  text-gray-500 hover:text-white cursor-pointer hover:bg-gray-500 mt-5">Sign up</button>
                  </form>
                  <div className="flex text-gray-500 py-4"> 
                    <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
                    <p className="text-gray-400 mx-2 mt-2">OR</p>
                    <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
                  </div>
                  <div className="flex justify-center text-gray-500 gap-4 font-semibold py-4">
                    <p>Don’t have an account? </p>
                    <Link to="/login" >
                      <button className="text-indigo-500 cursor-pointer">Sign in</button>
                    </Link>
                  </div>
              </div>
              <div className="relative hidden md:block bg-indigo-500 rounded-md px-2 py-1 w-auto md:w-96 opacity-80">
                
              </div>
            </div>
        </div>
  )
}

export default Register