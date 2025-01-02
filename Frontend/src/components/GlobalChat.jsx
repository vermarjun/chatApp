import { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import axios from "axios"
import profileIcon from "/profileIcon.png"
import { API_URL ,SERVER_URL, UserDetailsContext, LogStateContext, CurrentTabOnlineContext, SocketContext } from "../App";

function GlobalChat(){  
    // Context
    const {socketRef} = useContext(SocketContext);
    const socket = socketRef.current;
    // const socket = s.current;
    const {currentTabOnline, setCurrentTabOnline} = useContext(CurrentTabOnlineContext)
    const {loggedIn, setLoggedIn} = useContext(LogStateContext);
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);

    const inputValue = useRef(null);
    const [hasMore, setHasMore] = useState(true);
    const [messages, setMessages] = useState([]);
    const limit = 10;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const divRef = useRef(null);
    const bottomRef = useRef(null);

    // as soon as component mounts, tell socket server to push this socket into it's global users array
    const hasRun = useRef(false); // to make sure this hook does not execute twice!!!!
    useEffect(()=>{
        // return when socket does not open
        if (!socket) return;
        if(!hasRun.current) {
            hasRun.current = true;
            return;
        }
        fetchMessages();
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GAVE ME MAJOR FUCKING HEADACHE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // wait for socket to open before sending message
        socket.onopen = () => {
            // console.log("done")
            socket.send(JSON.stringify({type: "connectGlobal"}))
        }
    }, []);
    // infinite scroll and pagination for fetching data
    async function fetchMessages(){
        try {
            if (!hasMore) return;
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/v1/global`, {
                params:{
                    limit: 10,
                    page: page
                }
            });
            const mess = response.data.message;
            setLoading(false);
            if (mess.length == 0){
                setHasMore(false);
            }                
            if (response.data.success == true && mess.length){
                mess.reverse();
                setMessages((messages)=>[...mess, ...messages]);
                setPage((p)=>p+1);
            }
        } catch(error){
            setLoading(false);
            console.log(error);
        }
    }
    // Send message to server
    const handleSendMessage = async (message) => {
        if (!loggedIn) return;
        try {
            if (socket){
                socket.send(JSON.stringify({
                    type:"sendMessage",
                    to: "global",
                    author: userDetails.username,
                    userId: userDetails.userId,
                    pfp: userDetails.pfp,
                    content: message
                }))
            }
            const response = await axios.post(`${API_URL}/api/v1/global`, {
                author : userDetails._id,
                content : message,
            });
            // console.log("message sent");
        } catch (error){
            console.log("Can Not Send Message, error: "+error);
        }
    };
    // Message sent by server
    if (socket){
        socket.onmessage = (event)=>{
            if (event.data) {
                const payload = JSON.parse(event.data.toString());
                if (payload.userId === "server"){
                    // this message was sent by server to send users in globalUsers array
                    setCurrentTabOnline(payload.online);
                }
                else {
                    const m = {
                        author: {
                            fullname : payload.author,
                            pfp: payload.pfp,
                        },
                        content: payload.content,
                        createdAt: Date.now(),
                        _id: payload.userId,
                    }
                    setMessages((prev) => [...prev, m]);
                    // scrollToBottom(); // Scroll to the bottom after sending a message
                }
            }
        }
    }
    function handleScroll(){
        if (divRef.current.scrollTop === 0 && hasMore && !loading) {
            fetchMessages();
        }
    }
    function scrollToBottom() {
        bottomRef.current.scrollIntoView({behavior: 'smooth'});
    };
    return (
        <div className="relative w-full flex flex-col">
            <div className="h-full w-full overflow-auto" ref={divRef} onScroll={handleScroll} >
                <MessageCard messages={messages} loggedIn={loggedIn} />
                <div ref={bottomRef}/>
            </div>
            <div className="w-full">
                <ChatInput textareaRef={inputValue} onSend={handleSendMessage} />
            </div>
        </div>
    )
}

export default GlobalChat; 