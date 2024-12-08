import ChatInput from "./ChatInput";
function ChatRoom(){
    return (
        <div className="relative w-full flex flex-col">
            <div className="h-full w-full overflow-auto">
            </div>
            <div className=" w-full">
                <ChatInput/>
            </div>
        </div>
    )
}

export default ChatRoom;