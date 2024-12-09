import React from "react";

function MessageCard({ messages, loggedIn }) {
    let myUsername;
    (loggedIn)? myUsername="Me":myUsername=null;
    return (
        <div className="flex flex-col w-full p-4">
            {messages.map((message, index) => {
                const isSameSenderAsPrevious = index > 0 && messages[index - 1].sender === message.sender;
                const isMine = (myUsername === message.sender); 
                return (
                    <div key={index} className="flex w-full mb-3">
                        {/* PFP */}
                        {!isSameSenderAsPrevious && !isMine ? (
                            // appears only for the first message and only for other not user
                            <img
                                src={message.pfp}
                                alt={`${message.sender}'s profile`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                        ) : (
                            <div className="w-10 h-10 mr-3"></div>
                        )}
                        
                        {/* Message Bubble */}
                        <div className="flex flex-col w-full">
                            {
                                !isSameSenderAsPrevious && !isMine ? (
                                    <div className="mb-1 ml-1 font-semibold text-sm">{message.sender}</div>
                                ) : <div className="h-2"></div>
                            }
                            <div className={`max-w-[75%] p-3 rounded-lg text-[#E4E4E7] ${isMine? "bg-[#3B82F6] self-end text-white": "bg-[#2A2A3A] self-start"}`}>
                                {/* doing this to make sure enter appears in next line only */}
                                {
                                    (message.content.split('\n')).map((data, index)=>{
                                        return (
                                            <p key={index}>
                                                {data}
                                            </p>
                                        )
                                    })
                                }
                                <div className="text-xs text-gray-200 text-right mt-1">
                                    {message.timestamp}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MessageCard;
