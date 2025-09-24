import "./Footer.css";
import { useLanguage } from "./useUser";
import { useState } from "react";


const Footer = () => {
  const { language, setLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const currentYear = new Date().getFullYear();

  const languageOptions = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "French", nativeName: "Français" }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleTermsClick = () => {
    // Navigate to terms page or open modal
    navigate("/consent");
  };

 

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side - Language Toggle */}
        <div className="footer-left">
          <div className="language-selector">
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
              {language === "fr" ? "Conditions" : "Terms"}
            </button>
            <span className="link-separator">|</span>
            <button 
              className="footer-link"
              onClick={handlePolicyClick}
            >
              {language === "fr" ? "Politique" : "Policy"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;