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
import FeatureContent from "./components/Features.jsx";
import FoundersContent from "./components/Founders.jsx";

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
    features: <FeatureContent/>,
    reviews: <div>Reviews Content</div>,
    founders: <FoundersContent/>,
    "public_jobs": <div>Public Jobs </div>,
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

  useEffect(() => {
    if (hasAutoSetLanguage.current) return;

    // Check if user has already set a preference
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage === "fr" || savedLanguage === "en") {
      if (language !== savedLanguage) {
        setLanguage(savedLanguage);
      }
      hasAutoSetLanguage.current = true;
      return; // Respect user's saved preference
    }

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
          localStorage.setItem("preferredLanguage", "fr");
          console.log(`Auto-set to French for country: ${countryOfResidence}`);
          hasAutoSetLanguage.current = true;
        }
      } else {
        if (language !== "en") {
          setLanguage("en");
          localStorage.setItem("preferredLanguage", "en");
          console.log(`Auto-set to English for country: ${countryOfResidence}`);
          hasAutoSetLanguage.current = true;
        }
      }
    } else {
      // Country detection failed - use browser language or default
      const browserLanguage = navigator.language?.split("-")[0];
      const finalLanguage = browserLanguage === "fr" ? "fr" : "en";

      if (language !== finalLanguage) {
        setLanguage(finalLanguage);
        localStorage.setItem("preferredLanguage", finalLanguage);
        console.log(`Fallback to: ${finalLanguage}`);
        hasAutoSetLanguage.current = true;
      }
    }
  }, [countryOfResidence, setLanguage, language]);

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
              : `Welcome to  | ${
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
