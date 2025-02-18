import React from 'react'
import { Link } from 'react-router-dom';
import { Fade, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const Login = () => {

  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }
  const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 1'
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'Slide 2'
    },
    {
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 3'
    },
  ];

  
  return (
    <div className="grid grid-cols-1 md:flex justify-center items-center h-screen px-5">
        <div className="bg-white px-5 py-4 md:flex flex-row gap-5 min-w-8xl">
          <div className="flex flex-col">
              <p className="text-4xl md:text-5xl font-bold mt-10">Welcome Back!</p>
              <p className="text-gray-400 -mt-1.5 font-bold ">Please enter login details below</p>
              <input type="text" placeholder="Enter the email" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500  bg-gray-300 w-auto md:w-96 mt-7"/>
              <input type="text" placeholder="Enter the Password" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-bold px-2 py-3 rounded-md text-gray-500 bg-gray-300 w-auto md:w-96 mt-7"/>
              <p className="flex py-3 justify-end text-black font-bold cursor-pointer">Forgot Password?</p>
              <Link to="/dashboard"><button className="font-bold px-2 py-3 rounded-md bg-gray-300 w-auto md:w-96  text-gray-500 hover:text-white cursor-pointer hover:bg-gray-500">Sign in</button></Link>
              <div className="flex text-gray-500 py-4">
                <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
                <p className="text-gray-400 mx-2 mt-2">OR</p>
                <p className="border-b-2 border-gray-500 w-[45%] mb-2"></p>
              </div>
              <div className="flex justify-center text-gray-500 gap-4 font-semibold py-4">
                <p>Don’t have an account? </p>
                <Link to="/register"><button className="text-indigo-500 cursor-pointer">Sign up</button></Link>
              </div>
          </div>
          <div className="relative hidden md:block bg-indigo-500 rounded-md px-2 py-1 w-auto md:w-96 opacity-80">
            <div className="slide-container">
              {/* <Fade>
              {slideImages.map((slideImage, index)=> (
                  <div key={index}>
                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                      <span style={spanStyle}>{slideImage.caption}</span>
                    </div>
                  </div>
                ))} 
              </Fade> */}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login