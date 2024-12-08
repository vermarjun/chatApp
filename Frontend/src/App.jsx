import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import { useState } from "react";
import GlobalChat from "./components/GlobalChat";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [global, setGlobal] = useState(true);
  const [chatRoom, setChatRoom] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignup] = useState(false);
  const [signIn, setSignin] = useState(false);
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Layout setSignin={setSignin} setSignup={setSignup} signUp={signUp} signIn={signIn} global={global} setGlobal={setGlobal} chatRoom={chatRoom} setChatRoom={setChatRoom} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}>
          <Route path="" element={global?<GlobalChat loggedIn={loggedIn} />:<ChatRoom/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
