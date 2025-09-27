import Logo from "../assets/logo.png";
import "./Navbar.css";
import { useUser } from "./useUser.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "./useUser.js";
import { browserCountryAbbreviations, userCountryOfResidence } from "./useUser.js";
import { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaStar, FaComments, FaUsers } from "react-icons/fa";

const Navbar = () => {
  const { user} = useUser();
  const navigate = useNavigate();
    const { language } = useLanguage();
    const userIsLoggedIn = user && user.userId !== "guest" && user.userId !== null;
    const countries = browserCountryAbbreviations(); // list  of countries
    const userCountry = userCountryOfResidence(); // get user country from browser
    const location = useLocation();
    const [currentPanel, setCurrentPanel] = useState("home");

    // on mount get current panel from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const panel = params.get("panel");
        if (panel) {
            setCurrentPanel(panel);
        }
    }, [location.search]);

    // state for responsive design
    const [isOnSmallScreen, setIsOnSmallScreen] = useState(window.innerWidth < 800);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsOnSmallScreen(window.innerWidth < 800);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // if document is clicked outside the menu when on small screen, close the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOnSmallScreen && isMenuOpen) {
                const menu = document.querySelector(".nav-links-container");
                const hamburger = document.querySelector(".hamburger");

                if (menu && !menu.contains(event.target) && !hamburger.contains(event.target)) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOnSmallScreen, isMenuOpen]);

    // links for the east side of the navbar use both  icons with titles in large screens
    // and full names for accessibility (screen readers) in small screens
    const eastSideLinks = [
        { name: language === "fr" ? "Accueil" : "Home", panel: "home", navigation: "/?panel=home", icon: <FaHome /> },
        { name: language === "fr" ? "À propos" : "About", panel: "about", navigation: "/?panel=about", icon: <FaInfoCircle /> },
        { name: language === "fr" ? "Fonctionnalités" : "Features", panel: "features", navigation: "/?panel=features", icon: <FaStar /> },
        { name: language === "fr" ? "Avis" : "Reviews", panel: "reviews", navigation: "/?panel=reviews", icon: <FaComments /> },
        { name: language === "fr" ? "Fondateurs" : "Founders", panel: "founders", navigation: "/?panel=founders", icon: <FaUsers /> },
        {name: language === "fr" ? "Notficasione" : "Notification", panel:"notifications", navigation: "/notifications", icon: <FaB}
    ]

    return (
        <nav className="navbar">
            <div className="left-side">
                <div className="logo-container" onClick={() => navigate("/?panel=home")}>
                    <img src={Logo} alt="Logo" className="logo-head" />
                </div>
                <div className="brand-name">
                    <h1>Blue Jobs</h1>
                    <p>
                        {language === "fr"
                            ? "Portail d'emploi décontracté"
                            : "Casual Job Portal"}{" "}
                        {` - ${countries.find((c) => c.abb === userCountry)?.name || "Kenya"}`}
                    </p>
                </div>
            </div>
            {/* hamburger menu */}
            {isOnSmallScreen && (
                <div
                    className={`hamburger ${isMenuOpen ? "open" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    role="button"
                    aria-label= {isMenuOpen ? `${language === "fr" ? "Fermer le menu" : "Close menu"}` : `${language === "fr" ? "Ouvrir le menu" : "Open menu"}`}
                    title={isMenuOpen ? `${language === "fr" ? "Fermer le menu" : "Close menu"}` : `${language === "fr" ? "Ouvrir le menu" : "Open menu"}`}
                >
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            )}
            {/* show menu if not small screen or if menu is open */}
            {(isMenuOpen || !isOnSmallScreen) && (
            <ul className="nav-links-container">
                <div className="east-side">
                    {eastSideLinks.map((link) => (
                        <li
                            key={link.panel}
                            onClick={() => {
                                navigate(link.navigation);
                                setCurrentPanel(link.panel);

                                if (isOnSmallScreen) {
                                    setIsMenuOpen(false); // close menu on link click
                                }
                            }}
                            className={`${currentPanel === link.panel ? "active" : ""}`}
                            title={link.name}
                            role="button"
                            aria-label={link.name}
                        >
                            {isOnSmallScreen ? link.name : link.icon}
                        </li>
                    ))}
                </div>
                <div className="west-side">
                    {userIsLoggedIn ? (
                        <>
                            <li onClick={() => navigate("/profile")}>
                                {language === "fr" ? "Profil" : "Profile"}
                            </li>
                            <li
                                onClick={() => {
                                    navigate(`/jobs?type=post&userId=${user.userId}`);
                                }}
                            >
                                {language === "fr" ? "Publier une offre" : "Post Job"}
                            </li>
                            <li onClick={() => navigate(`/jobs?type=get&userId=${user.userId}`)}>
                                {language === "fr" ? "Obtenir des offres" : "Get Jobs"}
                            </li>
                        </>
                    ) : (
                        <>
                            <li onClick={() => navigate("/login")}>
                                {language === "fr" ? "Connexion" : "Login"}
                            </li>
                            <li onClick={() => navigate("/signup")}>
                                {language === "fr" ? "Inscription" : "Signup"}
                            </li>
                        </>
                    )}
                </div>
                </ul>
        )}
        </nav>
    );
};

export default Navbar;
