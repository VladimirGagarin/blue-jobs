import Logo from "../assets/logo.svg";
import "./Navbar.css";
import { useEffect } from "react";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./useUser.js";
import { browserCountryAbbreviations, userCountryOfResidence } from "./useUser.js";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
    const { language } = useLanguage();
    const userIsLoggedIn = user && user.userId !== "guest" && user.userId !== null;
    const countries = browserCountryAbbreviations();
    const userIsGuest = user && (user.userId === "guest" || user.userId === null);
    const userCountry = userCountryOfResidence();

    

  return (
      <nav className="navbar">
          <div className="left-side">
              <div className="east-side">
                  <img src={Logo} alt="Logo" className="logo" />
              </div>
              <div className="brand-name" onClick={() => navigate("/")}>
                  <h1>Blue Jobs</h1>
                  <p>{language === 'fr' ? 'Portail d\'emploi décontracté' : 'Casual Job Portal'} . {countries.find(c => c.abb === userCountry)?.nationality[language] || ''}</p>
                </div>
          </div>
      <ul className="nav-links">
        <li onClick={() => navigate("/")}>{language === 'fr' ? 'Accueil' : 'Home'}</li>
        <li onClick={() => navigate("/about")}>{language === 'fr' ? 'À propos' : 'About'}</li>
        {userIsLoggedIn ? (
          <>
            <li onClick={() => navigate("/profile")}>{language === 'fr' ? 'Profil' : 'Profile'}</li>
            <li onClick={() => navigate("/guest")}>{language === 'fr' ? 'Déconnexion' : 'Logout'}</li>
          </>
        ) : (
          <>
            <li onClick={() => navigate("/login")}>{language === 'fr' ? 'Connexion' : 'Login'}</li>
            <li onClick={() => navigate("/signup")}>{language === 'fr' ? 'Inscription' : 'Signup'}</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
