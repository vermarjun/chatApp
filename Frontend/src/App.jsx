import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import { useContext, useState, createContext, useEffect } from "react";
import GlobalChat from "./components/GlobalChat";
import ChatRoom from "./components/ChatRoom";

export const API_URL = ""; 
export const SERVER_URL = "192.168.243.59";
export const LogStateContext = createContext(null);
export const CurrentTabContext = createContext(null);
export const UserDetailsContext = createContext(null);

function App() {
  const [loggedIn, setLoggedin] = useState(false);
  const [currentTab, setCurrentTab] = useState("global");
  const [userDetails, setUserDetails] = useState({});
  // wheneverpage reloads, fetch user's logged state and username from localstorage 
  // ################################ TO DO ###########################################
  // BETTER WAY OF DOING THIS IS TO MAKE A BACKEND REQ EACH TIME USER REFRESHES THE PAGE AND THEN FETCH USER DETAILS, STORING IT ON CLIENT MACHINE = DUMB!
  useEffect(()=>{
    const logState = localStorage.getItem("loggedIn");
    if (logState){
        setLoggedin(true);
        const userDetailslocal = JSON.parse(localStorage.getItem("userDetails"));
        setUserDetails(userDetailslocal);
    }
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
  
  return (
    <UserDetailsProvider>
      <CurrentTabProvider>
        <LogStateProvider>
          <div className="">
              <Routes>
                <Route path='/' element={<Layout/>}>
                  <Route path="" element={(currentTab==="global")?<GlobalChat/>:<ChatRoom/>}/>
                </Route>
              </Routes>
          </div>
        </LogStateProvider>
      </CurrentTabProvider>
    </UserDetailsProvider>
  )
}

export default App
