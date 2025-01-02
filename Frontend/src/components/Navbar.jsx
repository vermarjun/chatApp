import { useState, useContext, useRef, useEffect } from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import { useNavigate } from "react-router-dom"
import closeIcon from "/closeIcon.png"

import {
  API_URL,
  CurrentTabContext,
  LogStateContext,
  UserDetailsContext,
  RecieverIdContext,
  SideBarContext,
} from "../App";
import profileIcon from "/profileIcon.png";
import axios from "axios";

const CreateNewRoomModal = ({ setCreateNewRoom, userId }) => {
  const roomNameRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  async function createNewRoom() {
    if (!roomNameRef.current.value) roomNameRef.current.focus();
    else {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/api/v1/room/create`, {
          roomName: roomNameRef.current.value,
          creatorUserId: userId,
        });
        setLoading(false);
        const message = response.data.message;
        const success = response.data.success;
        if (success) {
          setSuccess(true);
          setMessage(message);
        }
      } catch (error) {
        setLoading(false);
        setSuccess(false);
        setMessage(error.response.data.message);
        // console.log(error);
      }
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gradient-to-r from-[#121212] to-[#1E1E2E] rounded-lg shadow-2xl w-[28rem] h-fit text-white p-6">
        <div className="relative flex flex-col w-full h-full gap-5">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg">Create New Room</p>
            <button
              onClick={() => setCreateNewRoom(false)}
              className="text-white"
            >
              X
            </button>
          </div>
          <input
            ref={roomNameRef}
            type="text"
            className="bg-gray-600 p-3 rounded-lg w-full focus:outline-double outline-blue-500"
            placeholder="Enter Rooom's Name"
          />
          <button
            onClick={() => createNewRoom()}
            className={`flex justify-center items-center gap-x-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${
              loading ? "disabled:bg-blue-600" : ""
            }`}
          >
            {loading && (
              <span
                className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              ></span>
            )}
            Create
          </button>
          {message && (
            <p
              className={`${
                success ? "text-green-500" : "text-red-500"
              } text-center text-xs`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function LiveSearch({viewSideBar ,setViewSideBar}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  // Using debounce so that request is not made for every keystroke, front end will wait said amount of time for making a new backend request everytime
  // function debounce(func, delay){
  //   let timeOut;
  //   return (

  //   )
  // }
  async function handleSearch(event) {
    const value = event.target.value;
    setQuery(value);

    if (value.trim()) {
      //ensure search data is not white space
      try {
        const response = await axios.get(`${API_URL}/api/v1/search`, {
          params: {
            query: value,
          },
        });
        if (response.data.success) {
          const data = response.data.message;
          setResult(data);
          console.log(data);
        }
      } catch (error) {
        console.log("Error fetching search results: ", error);
      }
    } else {
      setResult([]);
    }
  }
  return (
    <div
      className="flex justify-center items-center h-20 px-3"
      onMouseEnter={() => setShowUsers(true)}
      onMouseLeave={() => setShowUsers(false)}
    >
      <div className="relative h-full w-full flex justify-center items-center gap-2">
        <input
          onChange={handleSearch}
          defaultValue={query}
          type="text"
          className="w-full h-1/2 rounded-lg bg-gray-600 p-5 focus:outline-double outline-blue-400"
          placeholder="Search Friends"
        />
        <button onClick={()=>setViewSideBar((s)=>!s)}>
          <img src={closeIcon} alt="" className="h-5"/>
        </button>
        <div
          className={`absolute top-16 w-full max-h-52 overflow-auto ${
            showUsers && result.length != 0 ? "visible" : "hidden"
          }`}
        >
          <div
            className={`flex flex-col gap-1 bg-neutral-700 p-1 rounded z-50`}
          >
            {result.map((r) => {
              return (
                <div
                  key={r._id}
                  className="flex gap-2 justify-start items-center w-full h-fit p-2 rounded-lg bg-neutral-800 hover:cursor-pointer z-50"
                >
                  <div className="">
                    <img
                      src={r.pfp == "." ? profileIcon : r.pfp}
                      alt=""
                      className="rounded-full h-5"
                    />
                  </div>
                  <div className="break-all">
                    <p className="text-sm">{r.fullname}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const RoomCard = ({
  _id,
  roomName,
  createdAt,
  creatorId,
  members = 0,
  lastMessage = "",
  notifications = 0,
  setRecieverId, 
  setCurrentTab,
  allRooms,
  setAllRooms
}) => {
  const navigate = useNavigate();
  let d = new Date(createdAt);
  const date = d.toLocaleDateString();
  function GoToRoom(){
    navigate('/room', {state: {reciever: _id}});
    // setCurrentTab(roomName);
    // setRecieverId(_id);
  }
  async function joinRoom(){
    const response = await axios.post(`${API_URL}/api/v1/room/join`, {
      roomId: _id,
    })
    setAllRooms((prev)=>prev);
  }
  return (
    <div
      onClick={GoToRoom}
      className={`relative bg-[#1F1F2F] hover:shadow-gray-500 border border-gray-700 rounded-md px-3 pb-2 flex flex-col space-y-2 hover:shadow-md mb-5 transition-all duration-300 hover:cursor-pointer ${
        notifications ? "mt-4" : "mt-0"
      }`}
    >
      <div
        className={`${
          !notifications ? "hidden" : "visible"
        } absolute w-8 h-8 rounded-full bg-red-600 -top-4 right-2 flex justify-center items-center text-xs`}
      >
        {notifications >= 100 ? "100+" : notifications}
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold truncate text-center">
          {roomName}
        </h3>
      </div>
      <div className="flex justify-between text-xs text-white">
        <div>
          Created by:{" "}
          <span className="text-gray-300">{creatorId.fullname}</span>
        </div>
        <span className="text-xs font-bold text-gray-500">{date}</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div>
          Active members:{" "}
          <span className="font-semibold">{members.length}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 truncate">
          {lastMessage ? `"${lastMessage}"` : <em>No messages yet</em>}
        </div>
          {allRooms &&  <button onClick={joinRoom} className="bg-blue-600 px-2 hover:bg-blue-500 rounded-lg transition-all duration-300">Join</button>}
        </div>
    </div>
  );
};

function RoomList({allRooms, setAllRooms}) {
  const { currentTab, setCurrentTab } = useContext(CurrentTabContext);
  const { recieverId, setRecieverId } = useContext(RecieverIdContext);
  const [userRooms, setUserRooms] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  async function fetchRooms() {
    try {
      setLoading(true);
      let response;
      if (allRooms) {
        response = await axios.get(`${API_URL}/api/v1/room/all`);
        // console.log(response.data.message); 
      } else {
        response = await axios.get(`${API_URL}/api/v1/room`);
        // console.log(response.data.message); 
      }
      setLoading(false);
      const rooms = response.data.message;
      const success = response.data.success;
      setSuccess(success);
      if (success) {
        setUserRooms(rooms);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setUserRooms([]);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, [allRooms]);
  return (
    <div className="w-full max-w-md mx-auto space-y-3 overflow-x-hidden">
      {userRooms.map((room, index) => (
        <RoomCard key={index} {...room} allRooms={allRooms} setAllRooms={setAllRooms} setCurrentTab={setCurrentTab} setRecieverId={setRecieverId}/>
      ))}
    </div>
  );
}

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
  const users = [];
  return (
    <div className="w-full max-w-md mx-auto space-y-3 overflow-x-hidden">
      {users.map((user, index) => (
        <ChatCard key={index} user={user} />
      ))}
      <div className="h-10"></div>
    </div>
  );
}

function WelcomeMessage(){
  return (
    <div
      className={`w-full h-5/6 flex justify-center items-center text-center p-5 `}
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
  // contexts
  const {viewSideBar, setViewSideBar} = useContext(SideBarContext);
  const { loggedIn, setLoggedin } = useContext(LogStateContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  // modals
  const [signUp, setSignup] = useState(false);
  const [signIn, setSignin] = useState(false);
  const [CreateNewRoom, setCreateNewRoom] = useState(false);

  const [allRooms, setAllRooms] = useState(false);
  const [tab, setTab] = useState("messages");

  function logOut() {
    localStorage.clear();
    window.location.reload();
  }
  function exploreAllRooms(){
    setAllRooms((prev)=>!prev);
    // setTab("rooms");
  }
  return (
    <div className={`${viewSideBar?"hidden":"visible"} fixed left-0 top-0 bg-[#1F1F3F] md:w-96 h-full sm:h-screen md:relative md:z-0 z-50 w-3/4`}>
      {/* Create new room */}
      {CreateNewRoom && loggedIn && (
        <CreateNewRoomModal
          userId={userDetails.userId}
          setCreateNewRoom={setCreateNewRoom}
        />
      )}
      {/* Welcome Message */}
      {!loggedIn && <WelcomeMessage/>}
      {/* Search */}
      {loggedIn && <LiveSearch viewSideBar={viewSideBar} setViewSideBar={setViewSideBar}/>}
      {/* rooms/message */}
      {loggedIn && (
        <div className={`w-full h-4/6 px-3 overflow-scroll`}>
          <div className="flex justify-center items-center w-full mb-5">
            <button
              onClick={() => setTab("messages")}
              className={`w-1/2 h-full p-3 rounded-lg text-xs font-bold hover:cursor-pointer ${
                tab == "messages" ? "bg-gray-500" : ""
              }  `}
            >
              Messages
            </button>
            <button
              onClick={() => setTab("rooms")}
              className={`w-1/2 h-full p-3 rounded-lg text-xs font-bold hover:cursor-pointer ${
                tab == "rooms" ? "bg-gray-500" : ""
              }  `}
            >
              Rooms
            </button>
          </div>
          {tab === "rooms" ? (
            <RoomList allRooms={allRooms} setAllRooms={setAllRooms}/>
          ) : (
            <ChatList />
          )}
        </div>
      )}
      {/* Signup Modal */}
      {signUp && (
        <SignupModal
          signUp={signUp}
          setSignup={setSignup}
          setSignin={setSignin}
        />
      )}
      {/* Signin Modal */}
      {signIn && (
        <SigninModal
          signIn={signIn}
          setSignup={setSignup}
          setSignin={setSignin}
        />
      )}
      <div className="absolute bottom-0 w-full px-3 flex flex-col gap-3 bg-inherit py-4">
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
            {/* Room Button */}
            <button
              onClick={() => setCreateNewRoom(true)}
              className="bg-blue-600 p-3 rounded-full w-full text-xs font-semibold hover:bg-blue-500 transition-all duration-200"
            >
              Create Room
            </button>
            <button
              onClick={exploreAllRooms}
              className="bg-blue-600 p-3 rounded-full w-full text-xs font-semibold hover:bg-blue-500 transition-all duration-200"
            >
              { 
                allRooms?"Show My Rooms":"Explore All Rooms"
              }
            </button>
            {/* Logout button */}
            <button
              onClick={logOut}
              className="bg-red-600 p-3 rounded-full w-full text-xs font-semibold hover:bg-red-500 transition-all duration-200"
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
