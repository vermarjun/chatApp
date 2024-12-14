import React, { useRef, useState } from "react";
import axios from "axios"
import { API_URL } from "../App";

const EditProfileModal = ({ loggedIn, setEditProfile, userDetails, setUserDeatils }) => {
  if (!loggedIn) return null;
  const [changePasswordLoading, setChnagePasswordLoading] = useState(false);
  const [saveProfileLoading, setSaveProfileLoading] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const usernameRef = useRef(null);
  const pfpRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  async function changePassword(){
    try {
      if (!currentPasswordRef.current.value) currentPasswordRef.current.focus();
      else if (!newPasswordRef.current.value) newPasswordRef.current.focus();
      else {
        setChnagePasswordLoading(true);
        const response = await axios.post(`${API_URL}/api/v1/users/changepassword`,{
          "userName": userDetails.username,
          "oldPassword": currentPasswordRef.current.value,
          "newPassword": newPasswordRef.current.value,
        });
        setChnagePasswordLoading(false);
        const serverResponseMessage = response.data.message;
        const serverResponseSuccess = response.data.success;
        setSuccess(serverResponseSuccess);
        setMessage(serverResponseMessage);
      }
    } catch(error){
      setChnagePasswordLoading(false);
      setSuccess(false);
      setMessage(error.response.data.message);
    }
  }
  async function updateUserProfile() {
    try {
      if (!pfpRef.current.value) pfpRef.current.focus();
      else if (!usernameRef.current.value) usernameRef.current.focus();
      else {
        setSaveProfileLoading(true);
        const response = await axios.post(`${API_URL}/api/v1/users/updateprofile`,{
          "oldUserDetails": localStorage.getItem("userDetails"),
          "newUserName": usernameRef.current.value,
          "pfp": pfpRef.current.value,
        });
        console.log(response.data.message);
        setSaveProfileLoading(false);
        const serverResponseMessage = response.data.message;
        const serverResponseSuccess = response.data.success;
        setSuccess(serverResponseSuccess);
        setMessage(serverResponseMessage);
        localStorage.setItem("userDetails" ,JSON.stringify(response.data.userDetails));
        window.location.reload();
      }
    } catch(error){
      console.log(error);
      setSaveProfileLoading(false);
      setSuccess(false);
      setMessage(error.response.data.message);
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-gradient-to-r from-[#121212] to-[#1E1E2E] rounded-lg shadow-2xl w-96 p-6 text-white">
        <div className="relative flex flex-col w-full h-full gap-5">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg">Edit Profile</p>
            <button
              onClick={() => setEditProfile(false)}
              className="text-white"
            >
              X
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <p>Username</p>
            <input
            ref={usernameRef}
            type="text"
            className="bg-gray-700 p-3 rounded-lg w-full focus:outline-none"
            placeholder="Enter New Username"
              defaultValue={userDetails.username}
              readOnly={false}
              />
          </div>

          <div className="flex flex-col gap-2">
            <div>
                <p>Profile Picture</p>
            </div>
            <input
              ref={pfpRef}
              type="text"
              className="bg-gray-700 p-3 rounded-lg w-full focus:outline-none "
              placeholder="Enter Profile Picture link"
              defaultValue={userDetails.pfp}
              readOnly={false}
            />
          </div>
          <div>
            {!editPassword && (
                <button
                onClick={() => setEditPassword(true)}
                className="bg-gray-700 p-3 rounded-lg w-full"
                >
                Edit Password
              </button>
            )}
            {editPassword && (
              <div className="flex flex-col gap-2 border border-gray-600 p-2 rounded-lg">
                <input
                  ref={currentPasswordRef}
                  type="password"
                  placeholder="Enter Current Password"
                  className="bg-gray-600 w-full rounded-lg p-3"
                  />
                <input
                  ref={newPasswordRef}
                  type="password"
                  placeholder="Enter New Password"
                  className="bg-gray-600 w-full rounded-lg p-3"
                />
                <div className="flex items-center gap-5">
                  <button
                    onClick={changePassword} 
                    className={`flex justify-center items-center gap-x-2 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ${changePasswordLoading?"disabled:bg-red-600":""}`}>
                    {
                      editPassword && changePasswordLoading && <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    }
                    Change
                  </button>
                </div>
                  {
                    editPassword && message && <p className={`${success?"text-green-500":"text-red-500"} text-sm font-bold mt-2 text-center w-full`}>
                      {message}
                    </p>
                  }
              </div>
            )}
          </div>
          {/* <p className="text-green-600 ">Password Changed!</p> */}
          <p className="text-left text-sm font-light text-gray-300">Note: For Now you can only add links for pfp, I will have to integrate cloud to enable images but I'm lazy ;)</p>
          <button 
            onClick={updateUserProfile}
            className={`flex items-center justify-center gap-2 w-full bg-blue-600  text-white px-5 py-3 rounded-lg hover:bg-blue-500 text-sm font-bold ${changePasswordLoading?"disabled:bg-red-600":""}`}>
              {
                saveProfileLoading && <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
              }
            Save
          </button>
              {
                !editPassword && message && <p className={`${success?"text-green-500":"text-red-500"} text-sm font-bold mt-2 text-center w-full`}>
                  {message}
                </p>
              }
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
