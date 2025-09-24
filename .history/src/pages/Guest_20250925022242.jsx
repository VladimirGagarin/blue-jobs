// greet guest and provide links to login or signup choices in a fancy way
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/useUser.js";
import "./Guest.css";
import Footer from "../components/footer.jsx";
import Logo from "../assets/logo.png";
import HomeLogo from "../assets/home_icon.png";
import LoginLogo from "../assets/login_icon.png";
import SignupLogo from "../assets/signup_icon.png";
import LoadingPage from "../components/LoadingPage.jsx";

export default function GuestPage() {
    const { language } = useLanguage();
    const navigate = useNavigate();
       const [loading, setLoading] = useState(true);

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

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const cardsButtons = [
        { text: language === "fr" ? "Accueil" : "Home", onClick: () => navigate("/?panel=home"), photo: HomeLogo },
        { text: language === "fr" ? "Se connecter" : "Log In", onClick: handleLogin, photo: LoginLogo },
        { text: language === "fr" ? "S'inscrire" : "Sign Up", onClick: handleSignup, photo: SignupLogo },
    ];

    return (
        {loading ? (<LoadingPage message={language === "fr" ? "Bienvenue dans Blue Jobs" : "Welcome To Blue Jobs"} />) : (
        <div className="guest-page">
            <header className="guest-page-header">
                <img src={Logo} alt="Blue Jobs Logo" className="guest-page-logo" />
                <h1 className="guest-page-title">Blue Jobs</h1>
            </header>
            <div className="guest-page-content">
                <h1>{language === "fr" ? "Bienvenue, Invité!" : "Welcome, Guest!"}</h1>
                <p>{language === "fr" ? "Veuillez vous connecter ou vous inscrire." : "Please log in or sign up."}</p>
                <div className="guest-page-buttons">
                    {cardsButtons.map((button, index) => (
                        <div key={index} className="guest-card" onClick={button.onClick} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') button.onClick(); }}>
                            <img src={button.photo} alt={`${button.text} icon`} className="guest-card-icon" />
                            <span className="guest-card-text">{button.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
            </div>
                )
    );
}