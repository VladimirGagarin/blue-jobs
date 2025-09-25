import { useEffect, useState,useRef } from 'react';
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
  const { user } = useUser();
  const [userIsGuest, setUserIsGuest] = useState(true);
  const navigate = useNavigate();
  const [countryOfResidence, setCountry] = useState(null);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [currentPanel, setCurrentPanel] = useState("home");
  // set user language preference based on countries speaking french or english
  const hasAutoSetLanguage = useRef(false); // Track if we've already auto-set language


  const contentPanels = {
    home: <HomeContent />,
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
    } else {
      setCurrentPanel("home");
      navigate("/?panel=home");
    }
  }, [location.search, navigate]);

  // set user language preference based on countries speaking french or english
  useEffect(() => {
    // Skip if we've already auto-set the language based on country
    if (hasAutoSetLanguage.current) return;

    const frenchSpeakingCountries = [
      "FR",
      "BE",
      "CH",
      "CA",
      "SN",
      "CI",
      "ML",
      "BF",
      "NE",
      "TD",
      "CM",
      "GA",
      "CG",
      "CD",
      "BJ",
      "TG",
      // You might want to add these:
      "LU",
      "MC",
      "HT",
      "RW",
      "MG",
      "DJ",
      "KM",
      "CF",
      "GN",
      "MR",
      "BI",
    ];
      if (countryOfResidence) {
        if (frenchSpeakingCountries.includes(countryOfResidence)) {
          if (language !== "fr") {
            setLanguage("fr");
            console.log(
              `Auto-set to French for country: ${countryOfResidence}`
            );
            hasAutoSetLanguage.current = true; // Mark as auto-set
          }
        } else {
          if (language !== "en") {
            setLanguage("en");
            console.log(
              `Auto-set to English for country: ${countryOfResidence}`
            );
            hasAutoSetLanguage.current = true; // Mark as auto-set
          }
        }
      }
    else {
      // Browser language not supported, default to English
      if (language !== "en") {
        setLanguage("en");
        console.log("Fallback: Defaulting to English");
        hasAutoSetLanguage.current = true;
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
  }, [user]);

  useEffect(() => {
    const userLocation = async () => {
      try {
        // try geolocation API (browser)
        const res = await fetch("https://ipapi.co/country/");
        const country = await res.text();
        // Update nationality in form
        setCountry(country);
      } catch (e) {
        console.warn("Could not fetch location, using default", e);
        setCountry(null);
      }
    };

    userLocation();
  }, []);

  // Add this near your contentPanels definition
  const panelDisplayNames = {
    home: { en: "Home", fr: "Accueil" },
    about: { en: "About", fr: "À propos" },
    features: { en: "Features", fr: "Fonctionnalités" },
    reviews: { en: "Reviews", fr: "Avis" },
    founders: { en: "Founders", fr: "Fondateurs" },
  };

  return (
    <div className="App">
      {loading ? (
        <LoadingPage
          message={
            language === "fr"
              ? `Bienvenue sur Blue Jobs | ${
                  panelDisplayNames[currentPanel]?.fr || "Accueil"
                }`
              : `Welcome to Blue Jobs | ${
                  panelDisplayNames[currentPanel]?.en || "Home"
                }`
          }
        />
      ) : (
        <>
          <Navbar />
          <main>{contentPanels[currentPanel]}</main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App
