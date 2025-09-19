import { useEffect, useState } from 'react';
import LoadingPage from "./components/LoadingPage";
import Logo from "./assets/logo.svg";
import {useUser} from "./componets/useUser.js";
import { useNavigate } from "react-router-dom";

import './App.css'

function App() {
   const [loading, setLoading] = useState(true);
   const {user} = useUser();
   const [userIsGuest, setUserIsGuest] = useState(true);
   const navigate  = useNavigate();

     useEffect(() => {
      const handleLoad = () => {
        setTimeout(() => setLoading(false), 8000);
      };


       if (document.readyState === "complete") {
         handleLoad();
       } else {
         window.addEventListener("load", handleLoad);
       }

       return () => window.removeEventListener("load", handleLoad);
     }, []);


     useEffect(() => {
        setUserIsGuest(user.userId === "guest");
     }, [])

  return (
    <>
      {loading && <LoadingPage message={"Welcome To Blue Jobs"} />}

      <div className="hero-page">
        <div className="header">
        <h1>Welcome to</h1>
        <img src={Logo} alt="logo"/>
        </div>
        <p>Find or post casual jobs with ease.</p>

        
          <div className="hero-actions">
            {userIsGuest ? (
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            ) : (
               <button onClick={() => navigate(`/dashboard?user=${user.userId}`)}>Dashboard</button>
            )}
          </div>
      </div>
    </>
  );
}

export default App
