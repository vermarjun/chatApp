import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import { useContext, useState, createContext, useEffect, useRef } from "react";
import GlobalChat from "./components/GlobalChat";
import ChatRoom from "./components/ChatRoom";
import Profile from "./components/Profile";

export const API_URL = ""; 
export const SERVER_URL = "192.168.243.59";
export const LogStateContext = createContext(null);
export const CurrentTabContext = createContext(null);
export const UserDetailsContext = createContext(null);
export const RecieverIdContext = createContext(null);
export const CurrentTabOnlineContext = createContext(null);
export const SocketContext = createContext(null);
export const SideBarContext = createContext(null);

function App() {
  const socketRef = useRef(null);
  const [viewSideBar, setViewSideBar] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);
  const [currentTab, setCurrentTab] = useState("global");
  const [currentTabOnline, setCurrentTabOnline] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [recieverId, setRecieverId] = useState(null);
  // wheneverpage reloads, fetch user's logged state and username from localstorage 
  // ################################ TO DO ###########################################
  // BETTER WAY OF DOING THIS IS TO MAKE A BACKEND REQ EACH TIME USER REFRESHES THE PAGE AND THEN FETCH USER DETAILS, STORING IT ON CLIENT MACHINE = DUMB!
  useEffect(()=>{
    const ws = new WebSocket(`ws://${SERVER_URL}:3000`);
    socketRef.current = ws;
    const logState = localStorage.getItem("loggedIn");
    if (logState){
      setLoggedin(true);
      const userDetailslocal = JSON.parse(localStorage.getItem("userDetails"));
      setUserDetails(userDetailslocal);
    }

    return () => {
        ws.close();
    };
  }, []) 
  function LogStateProvider({children}){
      return (<LogStateContext.Provider value={{loggedIn : loggedIn, setLoggedin : setLoggedin}}>
          {children}
      </LogStateContext.Provider>)
  }
  function CurrentTabProvider({children}){
      return (
          <CurrentTabContext.Provider value = {{currentTab: currentTab, setCurrentTab: setCurrentTab}}>
              {children}
          </CurrentTabContext.Provider>
      )
  }
  function UserDetailsProvider({children}){
    return (
        <UserDetailsContext.Provider value = {{userDetails: userDetails, setUserDetails: setUserDetails}}>
            {children}
        </UserDetailsContext.Provider>
    )
  }
  function CurrentTabOnlineProvider({children}){
    return (
      <CurrentTabOnlineContext.Provider value={{setCurrentTabOnline: setCurrentTabOnline, currentTabOnline: currentTabOnline}}>
        {children}
      </CurrentTabOnlineContext.Provider>
    )
  }
  function RecieverIdProvider({children}){
    return (
      <RecieverIdContext.Provider value={{recieverId: recieverId, setRecieverId: setRecieverId}}>
        {children}
      </RecieverIdContext.Provider>
    )
  }
  function SocketProvider({children}){
    return (
      <SocketContext.Provider value={{socketRef:socketRef}}>
        {children}
      </SocketContext.Provider>
    )
  }
  function SideBarProvider({children}){
    return (
      <SideBarContext.Provider value={{viewSideBar:viewSideBar, setViewSideBar:setViewSideBar}}>
        {children}
      </SideBarContext.Provider>
    )
  }
  const user = {
      name: "John Doe",
      profilePicture: "https://via.placeholder.com/150",
      joinedDate: "January 1, 2023",
      roomsCreated: [
        { name: "Room 1", description: "This is room 1." },
        { name: "Room 2", description: "This is room 2." },
      ],
      roomsJoined: [
        { name: "Room A", description: "This is room A." },
        { name: "Room B", description: "This is room B." },
      ],
    };
  return (
    <SideBarProvider>
    <SocketProvider>
    <CurrentTabOnlineProvider>
    <RecieverIdProvider>
    <UserDetailsProvider>
      <CurrentTabProvider>
        <LogStateProvider>
          <div className="">
              <Routes>
                <Route path='/' element={<Layout/>}>
                  <Route path="" element={<GlobalChat/>}/>
                  <Route path="/room" element={<ChatRoom/>}/>
                  <Route path="/user" element={<Profile user={user} onMessageClick={() => alert('Message Clicked!')}/>}/>
                  {/* <Route path="" element={(currentTab==="global")?<GlobalChat/>:<ChatRoom/>}/> */}
                </Route>
              </Routes>
          </div>
        </LogStateProvider>
      </CurrentTabProvider>
    </UserDetailsProvider>
    </RecieverIdProvider>
    </CurrentTabOnlineProvider>
    </SocketProvider>
    </SideBarProvider>
  )
}

export default App
