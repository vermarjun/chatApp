import React from 'react';

function Profile({ user }) {
  return (
    <div className="w-full mx-auto p-6 text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <img
          className="w-16 h-16 rounded-full"
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">Joined: {new Date(user.joined).toLocaleDateString()}</p>
        </div>
      </div>
      <button
        className="w-1/4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={() => alert(`Starting conversation with ${user.name}`)}
      >
        Message
      </button>
    </div>
  );
}

export default Profile;
