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
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    // Fun tips that rotate
    const guestTips = [
        {
            en: "Hey looking for a hustle? 😎 Aah, worry no more! Guess what... we got you!",
            fr: "Tu cherches un petit boulot ? 😎 T'inquiète pas ! Devine quoi... on s'occupe de tout !"
        },
        {
            en: "Ready to find your next opportunity? Let's get you started! 🚀",
            fr: "Prêt à trouver ta prochaine opportunité ? C'est parti ! 🚀"
        },
        {
            en: "Join thousands finding their perfect gig every day! ✨",
            fr: "Rejoins des milliers de personnes qui trouvent le job parfait chaque jour ! ✨"
        },
        {
            en: "Your next career move is just a click away! 💼",
            fr: "Ta prochaine étape professionnelle n'est qu'à un clic ! 💼"
        }
    ];

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => setLoading(false), 3000); // Reduced loading time for better UX
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    // Rotate tips every 5 seconds
    useEffect(() => {
        const tipInterval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % guestTips.length);
        }, 5000);

        return () => clearInterval(tipInterval);
    }, [guestTips.length]);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleExplore = () => {
        navigate("/?panel=home");
    };

    const cardsButtons = [
        { 
            text: language === "fr" ? "Explorer" : "Explore", 
            subtitle: language === "fr" ? "Découvrir le site" : "Browse the site",
            onClick: handleExplore, 
            photo: HomeLogo,
            accent: "primary"
        },
        { 
            text: language === "fr" ? "Se connecter" : "Log In", 
            subtitle: language === "fr" ? "Déjà membre ?" : "Already a member?",
            onClick: handleLogin, 
            photo: LoginLogo,
            accent: "secondary"
        },
        { 
            text: language === "fr" ? "S'inscrire" : "Sign Up", 
            subtitle: language === "fr" ? "Nouveau ici ?" : "New here?",
            onClick: handleSignup, 
            photo: SignupLogo,
            accent: "accent"
        },
    ];

    return (
      <div className="guest-page">
        {loading && (
          <LoadingPage
            message={
              language === "fr"
                ? "Préparation de votre accueil..."
                : "Getting things ready for you..."
            }
          />
        )}

        <header className="guest-page-header">
          <div className="logo-container">
            <img src={Logo} alt="Blue Jobs Logo" className="guest-page-logo" />
            <div className="logo-text">
              <h1 className="guest-page-title">Blue Jobs</h1>
              <p className="guest-page-subtitle">
                {language === "fr"
                  ? "Votre partenaire emploi"
                  : "The Direct Link to Your Next Hire."}
              </p>
            </div>
          </div>
        </header>

        <div className="guest-page-content">
          <div className="welcome-section">
            <h1 className="welcome-title">
              {language === "fr"
                ? "👋 Bienvenue, Invité!"
                : "👋 Welcome, Guest!"}
            </h1>

            <div className="tip-container">
              <p className="animated-tip">
                {guestTips[currentTipIndex][language]}
              </p>
              <div className="tip-dots">
                {guestTips.map((_, index) => (
                  <span
                    key={index}
                    className={`tip-dot ${
                      index === currentTipIndex ? "active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="welcome-description">
              {language === "fr"
                ? "Rejoins notre communauté et découvre des opportunités qui correspondent à ton style de vie !"
                : "Join our community and discover opportunities that match your lifestyle!"}
            </p>
          </div>

          <div className="action-section">
            <h2 className="action-title">
              {language === "fr"
                ? "Que souhaitez-vous faire ?"
                : "What would you like to do?"}
            </h2>

            <div className="guest-page-buttons">
              {cardsButtons.map((button, index) => (
                <div
                  key={index}
                  className={`guest-card guest-card-${button.accent}`}
                  role="button"
                  tabIndex={0}
                  onClick={button.onClick}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") button.onClick();
                  }}
                >
                  <div className="card-icon-container">
                    <img
                      src={button.photo}
                      alt={`${button.text} icon`}
                      className="guest-card-icon"
                    />
                  </div>
                  <div className="card-content">
                    <span className="guest-card-text">{button.text}</span>
                    <span className="guest-card-subtitle">
                      {button.subtitle}
                    </span>
                  </div>
                  <div className="card-arrow">→</div>
                </div>
              ))}
            </div>

            <div className="guest-stats">
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">
                  {language === "fr" ? "Jobs disponibles" : "Available jobs"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">
                  {language === "fr" ? "Employeurs actifs" : "Active employers"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24h</span>
                <span className="stat-label">
                  {language === "fr" ? "Support rapide" : "Quick support"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
}