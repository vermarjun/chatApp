import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import { useState, useEffect, useRef } from "react";
import getBackIcon from "/getBackIcon.png";

const CreateNewRoomModal = ({ loggedIn, setCreateNewRoom }) => {
  if (!loggedIn) return null;
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
            type="text"
            className="bg-gray-600 p-3 rounded-lg w-full focus:outline-none"
            placeholder="Enter Rooom's Name"
          />
          <button className="w-full bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-500 text-sm font-bold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomCard = ({
  roomName,
  createdOn,
  createdBy,
  activeMembers,
  lastMessage,
  notifications,
  setCurrentRoom,
}) => {
  return (
    <div
      onClick={()=>setCurrentRoom(roomName)}
      className={`relative bg-[#1F1F2F] shadow-gray-500 shadow-md border border-gray-700 rounded-md p-3 flex flex-col space-y-2 hover:shadow-md mb-5 transition-all duration-300 hover:cursor-pointer ${
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
          Created by: <span className="text-gray-300">{createdBy}</span>
        </div>
        <span className="text-xs font-bold text-gray-500">{createdOn}</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div>
          Active members: <span className="font-semibold">{activeMembers}</span>
        </div>
      </div>
      <div className="text-sm text-gray-500 truncate">
        {lastMessage ? `"${lastMessage}"` : <em>No messages yet</em>}
      </div>
    </div>
  );
};

function DisplayRoomInfo() {
  return (
    <div className="flex justify-between items-center p-5 bg-[#1F1F2F]">
      <div>
        <p className="text-xl">Room Name</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="bg-green-600 h-4 w-4 rounded-full"></div>
        <p>10 Online</p>
      </div>
    </div>
  );
}

function RightSideBar({ loggedIn, setCurrentRoom }) {
  const [CreateNewRoom, setCreateNewRoom] = useState(false);
  const [expoloreRooms, setExploreRooms] = useState(false);
  const [userRooms, setUserRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  function createNewRoom() {
    setCreateNewRoom(true);
  }
  function expoloreNewRooms() {
    // And fetch new data and replace current rooms with that data
    const newRooms = []; //This is the new fetched data
    setAllRooms(newRooms);
    setExploreRooms(true);
  }
  useEffect(() => {
    // fetch rooms user has joined
    const rooms = [
      {
        roomName: "General",
        createdOn: "Dec 1, 2024",
        createdBy: "Admin",
        activeMembers: 5,
        lastMessage: "Hey everyone!",
        notifications: 10,
      },
      {
        roomName: "Tech Discussions",
        createdOn: "Nov 28, 2024",
        createdBy: "Alice",
        activeMembers: 12,
        lastMessage: "Check out this new tech stack!",
        notifications: 100,
      },
      {
        roomName: "Random",
        createdOn: "Dec 5, 2024",
        createdBy: "Bob",
        activeMembers: 8,
        lastMessage: "",
        notifications: 10000,
      },
      {
        roomName: "Random",
        createdOn: "Dec 5, 2024",
        createdBy: "Bob",
        activeMembers: 8,
        lastMessage: "",
        notifications: 0,
      },
    ];
    setUserRooms(rooms);
    setCurrentRoom(rooms[0]);
  }, []);
  return (
    <div className="absolute right-0 bg-gradient-to-b from-[#1F1F3F] to-[#1F1F2F] h-full w-full flex flex-col gap-3 rounded-lg overflow-auto">
      {CreateNewRoom && (
        <CreateNewRoomModal
          loggedIn={loggedIn}
          setCreateNewRoom={setCreateNewRoom}
        />
      )}

      <div className={`bg-[#1F1F3F] ${expoloreRooms?"hidden":"visible"}`}>
        {!expoloreRooms && <DisplayRoomInfo/>}
      </div>

      <div
        className={`flex flex-col gap-3 w-full px-5 ${
          expoloreRooms ? "hidden" : "visible"
        }`}
      >
        <button
          onClick={createNewRoom}
          className="text-sm font-bold bg-blue-600 w-full px-5 py-3 rounded-full hover:bg-blue-500 transition-all duration-300"
        >
          Create Room
        </button>
        <button
          onClick={expoloreNewRooms}
          className="text-sm font-bold bg-green-600 w-full px-5 py-3 rounded-full hover:bg-green-500 transition-all duration-300"
        >
          Explore New Rooms
        </button>
      </div>
      {/* <div className="px-5 text-xl font-bold py-3">
            <p>Rooms You have joined</p>
            </div> */}
      <div className="w-full px-5">
        <button
          onClick={() => {
            setExploreRooms(false);
          }}
          className={`bg-gray-600 rounded-full mt-5 w-10 h-10 flex justify-center items-center ${
            expoloreRooms ? "visible" : "hidden"
          }`}
        >
          <img src={getBackIcon} alt="" />
        </button>
        <div className="h-full w-full">
          {!expoloreRooms ? (
            // this is to display user's rooms
            <div className="overflow-auto">
              {userRooms.map((room, index) => (
                <RoomCard key={index} {...room} setCurrentRoom={setCurrentRoom}/>
              ))}
            </div>
          ) : (
            // this is to display all rooms
            <div className="overflow-auto">
              {allRooms.map((room, index) => (
                <RoomCard key={index} {...room} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatRoom({ loggedIn }) {
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const divRef = useRef(null);
  // infinite scroll and pagination for fetching data
  function handleScroll() {
    if (!hasMore) return; //Aur nahi hain messages, dont fetch more, user has reached END
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      // fetchMoreData();
    }
  }
  useEffect(() => {
    console.log(divRef.current.scrollTop, divRef.current.clientHeight);
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);

  // FETCH NEW MESSAGES AS SOON AS ROOM IS CHANGED:
  useEffect(()=>{
    console.log(currentRoom);
  }, [currentRoom]);
  const handleSendMessage = (message) => {
    console.log("Message Sent:", message);
  };
  useEffect(() => {
    setMessages((messages) => [
      ...messages,
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: `Hey! How are you? alkasdasdlajksdlkajsdkjaslkdjalskdjajsdlkasdljasd laksjdlaksjdlaksjdlakjlkjaslkdjas dlkajsdklasjdlkajsdlaksjdlasjdalskjdalksdjalskjd
                laksjdaksjdaksdjalskdjalskjd
                Hello
                adasdas
                `,
        timestamp: "10:45 AM",
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Did you finish the assignment?",
        timestamp: "10:46 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
      {
        sender: "Me",
        pfp: "https://via.placeholder.com/40",
        content: "Yeah, I completed it yesterday.",
        timestamp: "10:47 AM",
        isMine: true,
      },
      {
        sender: "Alice",
        pfp: "https://via.placeholder.com/40",
        content: "Awesome! Can you share it with me?",
        timestamp: "10:48 AM",
        isMine: false,
      },
    ]);
  }, []);
  return (
    <div className="w-full flex">
      <div className="flex flex-col w-4/6">
        <div className="w-full h-full overflow-y-scroll" ref={divRef}>
          <MessageCard messages={messages} loggedIn={loggedIn} />
        </div>
        <div className="w-full">
          <ChatInput />
        </div>
      </div>
      <div className="relative h-full w-2/6 overflow-auto">
        <RightSideBar setCurrentRoom={setCurrentRoom} loggedIn={loggedIn} />
      </div>
    </div>
  );
}

export default ChatRoom;
