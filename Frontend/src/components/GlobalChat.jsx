import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";


function GlobalChat({loggedIn}){
    const [hasMore, setHasMore] = useState(true);
    const [messages, setMessages] = useState([]);
    const divRef = useRef(null);
    // infinite scroll and pagination for fetching data
    function handleScroll(){
        if (!hasMore) return; //Aur nahi hain messages, dont fetch more, user has reached END
        const {scrollTop, scrollHeight, clientHeight} = divRef.current;
        console.log(scrollHeight, scrollTop, clientHeight)
        if (scrollTop+clientHeight >= scrollHeight){
            // fetchMoreData();
        }
    }
    useEffect(()=>{
        console.log(divRef.current.scrollTop, divRef.current.clientHeight);
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }, [messages])
    const handleSendMessage = (message) => {
        console.log("Message Sent:", message);
    };
    useEffect(()=>{
        setMessages((messages)=>[...messages, 
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
    }, [])
    return (
        <div className="relative w-full flex flex-col">
            <div className="h-full w-full overflow-auto" ref={divRef} onScroll={handleScroll}>
                <MessageCard messages={messages} />
            </div>
            <div className="w-full">
                <ChatInput onSend={handleSendMessage} loggedIn={loggedIn}/>
            </div>
        </div>
    )
}

export default GlobalChat; 