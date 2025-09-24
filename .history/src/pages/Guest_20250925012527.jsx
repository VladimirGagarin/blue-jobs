// greet guest and provide links to login or signup choices in a fancy way
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/useUser.js";
import "./Guest.css";
import Footer from "../components/footer.jsx";

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
            <div className="guest-page-content">
                <h1>{language === "fr" ? "Bienvenue, Invité!" : "Welcome, Guest!"}</h1>
                <p>{language === "fr" ? "Veuillez vous connecter ou vous inscrire." : "Please log in or sign up."}</p>
                
                <button onClick={handleLogin} className="guest-page-button">{language === "fr" ? "Se connecter" : "Log In"}</button>
                <button onClick={handleSignup} className="guest-page-button">{language === "fr" ? "S'inscrire" : "Sign Up"}</button>
            </div>
            <Footer />
        </div>
    );
}