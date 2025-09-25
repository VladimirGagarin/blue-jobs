import "./Footer.css";
import { useLanguage } from "./useUser";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const Footer = () => {
  const { language, setLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Create a ref for the dropdown container
  const dropdownRef = useRef(null);

  const languageOptions = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "French", nativeName: "Français" }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleTermsClick = () => {
    navigate("/consent");
  };


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

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };

    // Add event listener when dropdown is open
    if (showLanguageDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside); // For mobile
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showLanguageDropdown]); // Only re-run when showLanguageDropdown changes

  // Close dropdown when Escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showLanguageDropdown) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showLanguageDropdown]);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side - Language Toggle */}
        <div className="footer-left">
          <div className="language-selector" ref={dropdownRef}>
            <button 
              className="language-toggle"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              aria-haspopup="true"
              aria-expanded={showLanguageDropdown}
            >
              {language === "fr" ? "Français" : "English"}
              <span className={`dropdown-arrow ${showLanguageDropdown ? "open" : ""}`}>▼</span>
            </button>
            
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    className={`language-option ${language === option.code ? "active" : ""}`}
                    onClick={() => handleLanguageChange(option.code)}
                  >
                    <span className="native-name">{option.nativeName}</span>
                    <span className="english-name">({option.name})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Copyright */}
        <div className="footer-center">
          <p className="copyright">
            © {currentYear} Blue Jobs. {
              language === "fr" 
                ? "Tous droits réservés." 
                : "All rights reserved."
            }
          </p>
        </div>

        {/* Right side - Terms and Policy */}
        <div className="footer-right">
          <div className="footer-links">
            <button 
              className="footer-link"
              onClick={handleTermsClick}
            >
              {language === "fr" ? "Conditions d'utilisation" : "Terms & Conditions"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;