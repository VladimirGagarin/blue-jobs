import Logo from "../assets/logo.svg";
import "./Navbar.css";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./useUser.js";
import { browserCountryAbbreviations, userCountryOfResidence } from "./useUser.js";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user} = useUser();
  const navigate = useNavigate();
    const { language } = useLanguage();
    const userIsLoggedIn = user && user.userId !== "guest" && user.userId !== null;
    const countries = browserCountryAbbreviations(); // list  of countries
    const userCountry = userCountryOfResidence(); 
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

    return (
        <nav className="navbar">
            <div className="left-side">
                <div className="east-side" onClick={() => navigate("/?panel=home")}>
                    <img src={Logo} alt="Logo" className="logo" />
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
                >
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            )}
            {/* show menu if not small screen or if menu is open */}
            {(isMenuOpen || !isOnSmallScreen) && (
            <ul className="nav-links">
                <div className="east-side">
                    <li onClick={() => navigate("/")}>
                        {language === "fr" ? "Accueil" : "Home"}
                    </li>
                    <li onClick={() => navigate("?panel=about")}>
                        {language === "fr" ? "À propos" : "About"}
                    </li>
                    {/* feature panel */}
                    <li onClick={() => navigate("?panel=features")}>
                        {language === "fr" ? "Fonctionnalités" : "Features"}
                    </li>
                    {/*Reviews panel */}
                    <li onClick={() => navigate("?panel=reviews")}>
                        {language === "fr" ? "Avis" : "Reviews"}
                    </li>
                    {/* Founders panel */}
                    <li onClick={() => navigate("?panel=founders")}>
                        {language === "fr" ? "Fondateurs" : "Founders"}
                    </li>
                  
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
