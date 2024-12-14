import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext } from "react";
import { CurrentTabContext } from "../App";

function Layout() {
    const {currentTab, setCurrentTab} = useContext(CurrentTabContext);
    return (
        <div className="w-full h-full flex text-[#FFFFFF]">
            <Navbar/>
            <div className="flex justify-center items-center w-screen h-screen flex-col">
                <div className="bg-gradient-to-r from-[#121212] to-[#1E1E2E] w-full h-screen flex flex-col">
                    <div className="flex items-center h-20 p-2 font-semibold bg-[#1F1F2F]">
                        <div onClick={() => { setCurrentTab("global")}}
                            className={`flex justify-center items-center w-1/2 h-full transition-all duration-300 ${
                                currentTab==="global"?
                                    "bg-[#2D2D40] shadow-md shadow-gray-500"
                                    : "hover:bg-[#2D2D40] hover:shadow-md hover:shadow-gray-500 cursor-pointer"
                            }`}
                        >
                            Global Chat
                        </div>
                        <div onClick={() => { setCurrentTab("chatroom") }}
                            className={`flex justify-center items-center w-1/2 h-full transition-all duration-300 ${
                                currentTab==="chatroom"?
                                    "bg-[#2D2D40] shadow-md shadow-gray-500"
                                    : "hover:bg-[#2D2D40] hover:shadow-md hover:shadow-gray-500 cursor-pointer"
                            }`}
                        >
                            Chat Rooms
                        </div>
                    </div>
                    <div className="relative h-full flex overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
