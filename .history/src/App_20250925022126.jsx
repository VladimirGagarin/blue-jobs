import { useEffect, useState } from 'react';
import LoadingPage from "./components/LoadingPage";
import Logo from "./assets/logo.svg";
import {useUser} from "./components/useUser.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from './components/useUser.js';
import Navbar from './components/Navbar.jsx';
import AboutContent from './components/About.jsx';
import HomeContent from "./components/HomeScreen.jsx";
import Footer from './components/footer';

import './App.css'

function App() {
   const [loading, setLoading] = useState(true);
   const {user} = useUser();
    const [userIsGuest, setUserIsGuest] = useState(true);
   const navigate  = useNavigate();
  const [countryOfResidence, setCountry] = useState(null);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [currentPanel, setCurrentPanel] = useState("home");

  const contentPanels = {
    home: <HomeContent/>,
    about: <AboutContent />,
    features: <div>Features Content</div>,
    reviews: <div>Reviews Content</div>,
    founders: <div>Founders Content</div>,
  };
  // on mount, check current panel from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const panel = params.get("panel");
    if (panel) {
      setCurrentPanel(panel);
    }
    else{
      setCurrentPanel("home");
      navigate("/?panel=home");
    }
  }, [location.search, navigate]);

  // set user language preference based on countries speaking french or english
  useEffect(() => {
    const frenchSpeakingCountries = ['FR', 'BE', 'CH', 'CA', 'SN', 'CI', 'ML', 'BF', 'NE', 'TD', 'CM', 'GA', 'CG', 'CD', 'BJ', 'TG'];
    if (countryOfResidence && frenchSpeakingCountries.includes(countryOfResidence)) {
      if (language !== 'fr') {
        setLanguage('fr');
      }
    } else {
      if (language !== 'en') {
        setLanguage('en');
      }
    }
  }, [countryOfResidence]);

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
      {loading ? (<LoadingPage message={language === "fr" ? "Bienvenue dans Blue Jobs" : "Welcome To Blue Jobs"} />) : (
        <>
        <Navbar />
        <main>
        {contentPanels[currentPanel]}
      </main>
          <Footer />
          <
      )}
      
      

    </div>
  );
}

export default App
