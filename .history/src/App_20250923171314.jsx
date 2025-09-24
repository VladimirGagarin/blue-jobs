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
    if (countryOfResidence && frenchSpeakingCountries.includes(countryOfResidence)) {
      if (language !== 'fr') {
        toggleLanguage();
      }
    } else {
      if (language !== 'en') {
        toggleLanguage();
      }
    }
  }, [countryOfResidence, language, toggleLanguage]);

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
          <h1>{language === "fr" ? "Bienvenue à" : "Welcome to"}</h1>
          <img src={Logo} alt="logo" />
        </div>
        <h2>{language === "fr" ? "Bonjour" : "Hello"} {user?.userName} { user?.userName === "Guest" && countryOfResidence ? `From ${countryOfResidence}`: `(${user?.userNationality})`}</h2>
        <p>{language === "fr" ? "Trouvez ou publiez des emplois occasionnels facilement." : "Find or post casual jobs with ease."}</p>

        <div className="hero-actions">
          {userIsGuest ? (
            <>
              <button onClick={() => navigate("/login")}>{language === "fr" ? "Connexion" : "Login"}</button>
              <button onClick={() => navigate("/signup")}>{language === "fr" ? "S'inscrire" : "Signup"}</button>
            </>
          ) : (
            <button onClick={() => navigate(`/dashboard?user=${user.userId}`)}>
              {language === "fr" ? "Tableau de bord" : "Dashboard"}
            </button>
          )}
        </div>
      </div>
      <div className='about-section'>
        <h3>{language === "fr" ? "À propos de Blue Jobs" : "About Blue Jobs"}</h3>
        <p>{language === "fr" ? "Blue Jobs est une plateforme conviviale qui connecte les chercheurs d'emploi occasionnels avec des employeurs potentiels. Que vous cherchiez à gagner un revenu supplémentaire ou à trouver des talents pour votre entreprise, Blue Jobs facilite le processus." : "Blue Jobs is a user-friendly platform that connects casual job seekers with potential employers. Whether you're looking to earn extra income or find talent for your business, Blue Jobs makes the process easy."}</p>
      </div>
      <div className='footer'>
        <div className=''
        <p>© 2024 Blue Jobs. {language === "fr" ? "Tous droits réservés." : "All rights reserved."}</p>
      </div>
    </div>
  );
}

export default App
