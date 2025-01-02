import { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import axios from "axios";
import profileIcon from "/profileIcon.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  API_URL,
  SERVER_URL,
  UserDetailsContext,
  LogStateContext,
  CurrentTabOnlineContext,
  SocketContext,
} from "../App";
import { RecieverIdContext } from "../App";

function ChatRoom() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { loggedIn, setLoggedIn } = useContext(LogStateContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const inputValue = useRef(null);
  const [messages, setMessages] = useState([]);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const divRef = useRef(null);
  const bottomRef = useRef(null);
  const { currentTabOnline, setCurrentTabOnline } = useContext(
    CurrentTabOnlineContext
  );
  const { socketRef } = useContext(SocketContext);
  const socket = socketRef.current;

  const hasRun = useRef(false);
  const hasMore = useRef(true);
  const roomChange = useRef(false);

  const recieverId = state.reciever;

  useEffect(() => {
    console.log("yes run")
    if (!socket) return;
    if (!hasRun.current) {
      hasRun.current = true;
      return;
    }
    // when room changes i assume initially hasMore = true;
    hasMore.current = true;
    roomChange.current = true;
    setPage(0);
    fetchMessages();
    console.log(socket.onopen);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "connectRoom", roomId: recieverId }));
    };
  }, [state.reciever]);

  if (!state || !recieverId) {
    navigate("");
  }

  const handleSendMessage = async (message) => {
    if (!loggedIn) return;
    try {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "sendMessage",
            to: "room",
            roomId: recieverId,
            author: userDetails.username,
            userId: userDetails.userId,
            pfp: userDetails.pfp,
            content: message,
          })
        );
      }
      await axios.post(`${API_URL}/api/v1/messages`, {
        recieverId: recieverId,
        author: userDetails._id,
        content: message,
      });
    } catch (error) {
      console.log("Can Not Send Message, error: " + error);
    }
  };

  // message received from server
  if (socket) {
    socket.onmessage = (event) => {
      if (event.data) {
        const payload = JSON.parse(event.data.toString());
        if (payload.userId === "server") {
          // this message was sent by server to send users in globalUsers array
          setCurrentTabOnline(payload.online);
        } else {
          const m = {
            author: {
              fullname: payload.author,
              pfp: payload.pfp,
            },
            content: payload.content,
            createdAt: Date.now(),
            _id: payload.userId,
          };
          setMessages((prev) => [...prev, m]);
          // scrollToBottom(); // Scroll to the bottom after sending a message
        }
      }
    };
  }

  function scrollToBottom() {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  // infinite scroll and pagination for fetching data
  async function fetchMessages() {
    console.log("yes called", state.reciever);
    try {
        console.log(hasMore.current);
        console.log(page);
      if (!hasMore.current) return;
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/v1/messages`, {
        params: {
          recieverId: state.reciever,
          limit: 10,
          page: page,
        },
      });
      setLoading(false);
      const mess = response.data.message;
      if (mess.length == 0) {
        hasMore.current = false;
        // setHasMore(false);
      }
      console.log(mess);
      mess.reverse();
      if (roomChange.current){
        setMessages(mess);
    } else {
        if (response.data.success == true && mess.length) {
            setMessages((messages) => [...mess, ...messages]);
        }
    }
    setPage((p) => p + 1);
    roomChange.current = false;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  function handleScroll() {
    if (divRef.current.scrollTop === 0 && hasMore && !loading) {
      fetchMessages();
    }
  }

  return (
    <div className="relative w-full flex flex-col">
      <div
        className="h-full w-full overflow-auto"
        ref={divRef}
        onScroll={handleScroll}
      >
        <MessageCard messages={messages} loggedIn={loggedIn} />
        <div ref={bottomRef} />
      </div>
      <div className="w-full">
        <ChatInput textareaRef={inputValue} onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
