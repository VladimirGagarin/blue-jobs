// greet guest and provide links to login or signup choices in a fancy way
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/useUser.js";
import "./Guest.css";
import Footer from "../components/footer.jsx";
import Logo from "../assets/logo.png";

export default function GuestPage() {
    const { language } = useLanguage();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="guest-page">
            <header className="guest-page-header">
                <img src={Logo} alt="Blue Jobs Logo" className="guest-page-logo" />
                <h1 className="guest-page-title">Blue Jobs</h1>
            </header>
            <div className="guest-page-content">
                <h1>{language === "fr" ? "Bienvenue, Invité!" : "Welcome, Guest!"}</h1>
                <p>{language === "fr" ? "Veuillez vous connecter ou vous inscrire." : "Please log in or sign up."}</p>
                <div className="guest-page-buttons">
                    {/* home, signup, login buttons lets decorate like cards */}
                    <button onClick={() => navigate("/?panel=home")} className="guest-page-button">{language === "fr" ? "Accueil" : "Home"}</button>
                    <button onClick={handleLogin} className="guest-page-button">{language === "fr" ? "Se connecter" : "Log In"}</button>
                    <button onClick={handleSignup} className="guest-page-button">{language === "fr" ? "S'inscrire" : "Sign Up"}</button>

                </div>
            </div>
            <Footer />
        </div>
    );
}