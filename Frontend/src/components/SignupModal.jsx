import React, { useState } from 'react';

const SignupModal = ({ signUp, setSignup, setSignin}) => {
  if (!signUp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-gradient-to-r from-[#121212] to-[#1E1E2E] rounded-lg shadow-2xl w-96 p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
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
              type="password"
              className="bg-[#2A2A3A] w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-300 text-center mt-4">
          Already a user?{' '}
          <button
            className="text-blue-400 hover:underline"
            onClick={()=>{setSignup(false); setSignin(true)}}
          >
            Login instead
          </button>
        </p>
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-600"
          onClick={()=>setSignup(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
