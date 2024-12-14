import { useState, useContext } from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import editIcon from "/editIcon.png";
import EditProfileModal from "./EditProfileModal";
import { LogStateContext, UserDetailsContext } from "../App";
import profileIcon from "/profileIcon.png"

function ChatCard({ user }) {
  return (
    <div className="flex items-center p-4 bg-[#1F1F2F] rounded-lg hover:bg-[#2D2D40] transition-all duration-300 cursor-pointer">
      {/* Profile Picture */}
      <img
        src={user.pfp}
        alt={`${user.name}'s profile`}
        className="w-12 h-12 rounded-full mr-3"
      />
      {/* Chat Details */}
      <div className="flex flex-col flex-grow ">
        <div className="flex justify-between items-center mb-2">
          {/* Name */}
          <div className="text-[#E4E4E7] text-base">{user.name}</div>
          {/* Time of Last Message */}
          <div className="text-gray-300 text-xs flex justify-center items-center">
            {user.lastMessageTime}
          </div>
        </div>

        {/* Last Message */}
        <div className="text-[#A1A1AA] text-xs truncate max-w-[80%]">
          {user.lastMessage}
        </div>
      </div>
    </div>
  );
}

function ChatList() {
  const users = [
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: "10:45 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Bob",
      lastMessage: "See you at the meeting later.",
      lastMessageTime: "9:30 AM",
    },
    {
      pfp: "https://via.placeholder.com/150",
      name: "Charlie",
      lastMessage: "Thanks for sharing the details.",
      lastMessageTime: "Yesterday",
    },
  ];
  return (
    <div className="w-full max-w-md mx-auto space-y-3 overflow-x-hidden">
      {users.map((user, index) => (
        <ChatCard key={index} user={user} />
      ))}
      <div className="h-10"></div>
    </div>
  );
}

const WelcomeMessage = ({ loggedIn }) => {
  return (
    <div
      className={`w-full h-5/6 flex justify-center items-center text-center p-5 ${
        !loggedIn ? "visible" : "hidden"
      }`}
    >
      <div>
        <p className="mb-2 text-2xl font-semibold">Yo dude!</p>
        <p className="text-gray-400 text-balance">
          You'll have to Login to join the conversation!
        </p>
        <div className="mt-4 text-left space-y-4">
          {/* Feature 1 */}
          <div>
            <p className="font-semibold text-lg">
              1. Join the Global Conversation
            </p>
            <p className="text-gray-300 text-sm font-normal">
              Connect with users worldwide in a global chat, where everyone has
              a voice.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <p className="font-semibold text-lg">
              2. Explore/Create Chat Rooms
            </p>
            <p className="text-gray-300 text-sm font-normal">
              Join exciting interest-based chat rooms or create your own.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <p className="font-semibold text-lg">3. Direct Messages</p>
            <p className="text-gray-300 text-sm font-normal">
              Chat privately with friends, share moments, and build strong
              connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function Navbar() {
  const { loggedIn, setLoggedin } = useContext(LogStateContext);
  const [signUp, setSignup] = useState(false);
  const [signIn, setSignin] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  // console.log(userDetails);
  function logOut() {
    localStorage.clear();
    window.location.reload(); // Reloads the page from the cache
  }
  function EditProfileFunction() {
    setEditProfile(true);
  }
  return (
    <div className="bg-[#1F1F3F] w-96 h-screen relative">
      <WelcomeMessage loggedIn={loggedIn} />
      {editProfile && (
        <EditProfileModal
          loggedIn={loggedIn}
          setEditProfile={setEditProfile}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
      {loggedIn && (
        <div className="flex justify-center items-center h-20 gap-2">
          <img src="" alt="logo" className="bg-gray-500 p-2 rounded-lg" />
          <p className="text-2xl font-bold">DISCUSSIONS</p>
        </div>
      )}
      {loggedIn && (
        <div className={`w-full h-4/6 px-5 overflow-scroll`}>
          <ChatList />
        </div>
      )}
      {signUp && (
        <SignupModal
          signUp={signUp}
          setSignup={setSignup}
          setSignin={setSignin}
        />
      )}
      {signIn && (
        <SigninModal
          signIn={signIn}
          setSignup={setSignup}
          setSignin={setSignin}
        />
      )}
      <div className="absolute bottom-0 w-full px-6 flex flex-col gap-3 bg-inherit py-4">
        {!loggedIn ? (
          <div className="flex flex-col gap-5">
            <button
              onClick={() => setSignup(true)}
              className={`bg-blue-600 p-3 rounded-full w-full text-sm font-semibold hover:bg-blue-500 transition-all duration-200`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setSignin(true)}
              className={`bg-blue-600 p-3 rounded-full w-full text-sm font-semibold hover:bg-blue-500 transition-all duration-200`}
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Profile Section */}
            <div className="w-full flex justify-between items-center p-3 gap-3 border-2 border-gray-600 rounded-full">
              <div className="flex items-center gap-3">
                {/* Profile Picture */}
                <div className="relative h-10 w-10">
                  <img
                    src={(userDetails.pfp == ".")? profileIcon: userDetails.pfp}
                    alt="Profile"
                    className="h-full w-full  rounded-3xl object-contain"
                    loading="lazy" // Optimizes loading performance
                  />
                </div>
                {/* Username */}
                <p className="text-base font-semibold">
                  {userDetails.username}
                </p>
              </div>
              {/* Edit Button */}
              <button
                onClick={EditProfileFunction}
                className="bg-gray-500 p-2 rounded-full hover:bg-gray-600 transition-all duration-300"
              >
                <img src={editIcon} alt="Edit Profile" className="h-5 w-5" />
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={logOut}
              className="bg-red-600 p-3 rounded-full w-full text-sm font-semibold hover:bg-red-500 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
