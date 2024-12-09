import React, { useRef, useState } from "react";

const EditProfileModal = ({ loggedIn, setEditProfile, userDetails }) => {
  if (!loggedIn) return null;
  const [editPassword, setEditPassword] = useState(false);
  const currentPassword = useRef(null);

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
                  type="password"
                  placeholder="Enter Current Password"
                  className="bg-gray-600 w-full rounded-lg p-3"
                  ref={currentPassword}
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="bg-gray-600 w-full rounded-lg p-3"
                  ref={currentPassword}
                />
                <div className="flex items-center gap-5">
                  <button className="bg-red-600 px-5 py-3 text-sm font-bold rounded-lg">
                    Change
                  </button>
                  <p className="text-red-600 ">Wrong Password</p>
                </div>
              </div>
            )}
          </div>
          {/* <p className="text-green-600 ">Password Changed!</p> */}
          <p className="text-left text-sm font-light text-gray-300">Note: For Now you can only add links for pfp, I will have to integrate cloud to enable images but I'm lazy ;)</p>
          <button className="w-full bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-500 text-sm font-bold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
