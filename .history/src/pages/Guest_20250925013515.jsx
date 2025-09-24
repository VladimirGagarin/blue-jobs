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

    const cardsButtons = [
        { text: language === "fr" ? "Accueil" : "Home", onClick: () => navigate("/?panel=home"), photo: HomeLogo },
        { text: language === "fr" ? "Se connecter" : "Log In", onClick: handleLogin, photo: LoginLogo },
        { text: language === "fr" ? "S'inscrire" : "Sign Up", onClick: handleSignup, photo: SignupLogo },
    ];

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
                    {cardsButtons.map((button, index) => (
                </div>
            </div>
            <Footer />
        </div>
    );
}