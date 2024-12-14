import React, { useState, useRef, useEffect, useContext } from "react";
import { LogStateContext } from "../App";

function TopRightModal({text}){
    return (
        <div className="flex justify-center items-center bg-neutral-950 font-light text-sm fixed bottom-20 right-4 p-5 rounded-lg">
            <p>{text}</p>
        </div>
    )
}

function ChatInput({ onSend, textareaRef }) {
    const {loggedIn, setLoggedin} = useContext(LogStateContext);
    const [loginWarning, setLoginwarning] = useState(false); 
    const [message, setMessage] = useState("");
    
    const handleSend = () => {
        if (!loggedIn){
            setLoginwarning(true);
            const timeout = setTimeout(()=>{
                setLoginwarning(false);
                clearTimeout(timeout);   
            }, 5000)
        }
        if (message.trim() !== "") {
            onSend(message);
            setMessage("");
            textareaRef.current.style.height = "50px"; // Reset height after sending
        }
    };

    useEffect(()=>{
        // console.log(textareaRef);
        textareaRef.current.style.height = "50px"
    }, []);

    const handleInputChange = (e) => {
        setMessage(e.target.value);

        // Auto-grow the textarea
        const textarea = textareaRef.current;
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Grow until 120px
    };
    
    return (
        <div className="flex items-center w-full p-4 bg-[#1F1F2F]">
            {loginWarning && <TopRightModal text={"You need to login to join the conversation!"}/>}
            {/* Auto-growing Textarea */}
            <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-grow p-3 text-[#E4E4E7] bg-[#2A2A3A] border border-[#3B82F6] rounded-l-lg focus:outline-none resize-none overflow-y-auto"
                style={{
                    minHeight: "50px",
                    maxHeight: "10rem", // Limit the max height
                }}
            />

            {/* Send Button */}
            <button
                onClick={handleSend}
                className="p-3 bg-[#3B82F6] text-white rounded-r-lg border border-[#3B82F6] hover:bg-[#2563EB] transition-all duration-300"
            >
                Send
            </button>
        </div>
    );
}

export default ChatInput;
