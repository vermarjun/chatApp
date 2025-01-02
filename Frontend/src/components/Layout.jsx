import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext, useState } from "react";
import profileIcon from "/profileIcon.png"
import editIcon from "/editIcon.png"
import EditProfileModal from "./EditProfileModal";
import { CurrentTabContext, LogStateContext, UserDetailsContext, CurrentTabOnlineContext, SideBarContext } from "../App";
import openSideBar from "/openSideBar.png"

function Layout() {
    const {viewSideBar, setViewSideBar} = useContext(SideBarContext);
    console.log(viewSideBar);
    const {currentTabOnline, setCurrentTabOnline} = useContext(CurrentTabOnlineContext);
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);
    const {currentTab, setCurrentTab} = useContext(CurrentTabContext);
    const {loggedIn, setLoggedIn} = useContext(LogStateContext);
    const [editProfile, setEditProfile] = useState(false);
    function EditProfileFunction() {
        setEditProfile(true);
      }
    return (
        <div className="w-full h-full flex text-[#FFFFFF]">
            {editProfile && (
                <EditProfileModal
                loggedIn={loggedIn}
                setEditProfile={setEditProfile}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                />
            )}
            <Navbar/>
            <div className="flex justify-center items-center w-screen h-screen flex-col">
                <div className="bg-gradient-to-r from-[#121212] to-[#1E1E2E] w-screen h-screen flex flex-col">
                    <div className="flex items-center justify-between h-20 p-2 font-semibold bg-[#1F1F2F]">
                        <div className="flex justify-center items-center">
                            <div className="md:hidden h-10 w-10">
                                <button onClick={()=>setViewSideBar((s)=>!s)} className="flex flex-col justify-center items-center h-full">
                                  <img src={openSideBar} alt="" className="h-7"/>
                                  {/* <p className="text-xs">open</p> */}
                                </button>
                            </div>
                            <div className="flex justify-start items-center p-3">
                                <div className="flex gap-4">
                                <p className="font-bold text-xl">{currentTab}</p>
                                <div className="flex justify-center items-center gap-1">
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    {currentTabOnline} Online
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${loggedIn?"visible":"hidden"} w-fit flex justify-between items-center p-3 gap-3 border-none sm:border-2 border-gray-600 rounded-full`}>
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10">
                                <img
                                    src={(userDetails.pfp == ".")? profileIcon: userDetails.pfp}
                                    alt="Profile"
                                    className="h-full w-full  rounded-3xl object-contain"
                                    loading="lazy" // Optimizes loading performance
                                />
                                </div>
                                <p className="hidden sm:visible text-base font-semibold">
                                    {userDetails.username}
                                </p>
                            </div>
                            <button
                                onClick={EditProfileFunction}
                                className="hidden sm:visible bg-gray-500 p-2 rounded-full hover:bg-gray-600 transition-all duration-300"
                            >
                                <img src={editIcon} alt="Edit Profile" className="h-5 w-5" />
                            </button>
                        </div>
                        {/* <div onClick={() => { setCurrentTab("global")}}
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
                        </div> */}
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
