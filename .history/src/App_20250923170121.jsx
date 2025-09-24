import { useEffect, useState } from 'react';
import LoadingPage from "./components/LoadingPage";
import Logo from "./assets/logo.svg";
import {useUser} from "./components/useUser.js";
import { useNavigate } from "react-router-dom";
import { useLanguage } from './components/useUser.js';

import './App.css'

function App() {
   const [loading, setLoading] = useState(true);
   const {user} = useUser();
   const [userIsGuest, setUserIsGuest] = useState(true);
   const navigate  = useNavigate();
  const [countryOfResidence, setCountry] = useState(null);
  const { language, toggleLanguage } = useLanguage();

  // set user language preference based on countries speaking french or english
  useEffect(() => {
    const frenchSpeakingCountries = ['FR', 'BE', 'CH', 'CA', 'SN', 'CI', 'ML', 'BF', 'NE', 'TD', 'CM', 'GA', 'CG', 'CD', 'BJ', 'TG'];

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
     }, [user])

     useEffect(() => {
      const  userLocation = async ()  => {
        try {
        // try geolocation API (browser)
        const res = await fetch("https://ipapi.co/country/");
          const country = await res.text();
        // Update nationality in form
          setCountry(country);

      } catch (e) {
        console.warn("Could not fetch location, using default",e);
          setCountry(null);
      }
      }
       
       userLocation();
     },[])

  return (
    <div className="App">
      {loading && <LoadingPage message={"Welcome To Blue Jobs"} />}

      <div className="hero-page">
        <div className="header">
          <h1>Welcome to</h1>
          <img src={Logo} alt="logo" />
        </div>
        <h2>Hello {user?.userName} { user?.userName === "Guest" && countryOfResidence ? `From ${countryOfResidence}`: `(${user?.userNationality})`}</h2>
        <p>Find or post casual jobs with ease.</p>

        <div className="hero-actions">
          {userIsGuest ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          ) : (
            <button onClick={() => navigate(`/dashboard?user=${user.userId}`)}>
              Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
