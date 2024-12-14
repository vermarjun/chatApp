import React, { useState, useRef, useContext } from 'react';
import axios from "axios"
import { API_URL } from '../App';
import { UserDetailsContext, LogStateContext } from '../App';

const SigninModal = ({ signIn, setSignin, setSignup}) => {
  if (!signIn) return null;
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const passRef = useRef();
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const {userDetails, setUserDetails} = useContext(UserDetailsContext);
  const {loggedIn, setLoggedin} = useContext(LogStateContext);
  async function signInFunction(){
    if (!usernameRef.current.value) usernameRef.current.focus();
    else if (!passRef.current.value) passRef.current.focus();
    else {
      try{
        setLoading(true);
        const response = await axios.post(`${API_URL}/api/v1/users/login`,{
          "username": usernameRef.current.value,
          "password": passRef.current.value
        });
        setLoading(false);
        console.log(response);
        const serverResponseMessage = response.data.message;
        const success = response.data.success;
        const userDetails = response.data.userDetails;
        setMessage(serverResponseMessage);
        console.log(serverResponseMessage);
        setSuccess(true);
        setUserDetails(userDetails);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        setLoggedin(true);
      } catch(error){
        setLoading(false);
        setSuccess(false);
        setMessage(error.response.data.message);
      }
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-gradient-to-r from-[#121212] to-[#1E1E2E] rounded-lg shadow-2xl w-96 p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              className="bg-[#2A2A3A] w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              ref={passRef}
              type="password"
              className="bg-[#2A2A3A] w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={signInFunction}
            className={`flex justify-center items-center gap-x-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${loading?"disabled:bg-blue-600":""}`}
          >
            {
              loading && <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
            }
            Sign In
          </button>
            {
              message && <p className={`${success?"text-green-500":"text-red-500"} text-sm font-bold mt-2 text-center w-full`}>
                {message}
              </p>
            }
        <p className="text-sm text-gray-300 text-center mt-4">
          Create a new account?{' '}
          <button className="text-blue-400 hover:underline"
            onClick={()=>{setSignup(true); setSignin(false)}}
          >
            Register
          </button>
        </p>
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-600"
          onClick={()=>setSignin(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SigninModal;
