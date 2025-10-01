// src/components/JobsHeader.jsx
import { FaHome, FaUser, FaBell, FaCog, FaSignOutAlt, FaBriefcase, FaTicketAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "./JobHeader.css";
import userLogo from "../assets/user.png";

export default function JobsHeader({ user, language, onNavigateHome }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const translations = {
    en: {
      backToHome: "Home",
      apply: "Apply",
      post: "Post",
      tokens: "tokens",
      findYourDreamJob: "Find Your Dream Job",
      profile: "Profile",
      notifications: "Notifications",
      settings: "Settings",
      logout: "Logout",
      welcome: "Welcome",
      guest: "Guest"
    },
    fr: {
      backToHome: "Accueil",
      apply: "Postuler",
      post: "Publier",
      tokens: "jetons",
      findYourDreamJob: "Trouvez Votre Emploi de Rêve",
      profile: "Profil",
      notifications: "Notifications",
      settings: "Paramètres",
      logout: "Déconnexion",
      welcome: "Bienvenue",
      guest: "Invité"
    },
    sw: {
      backToHome: "Nyumbani",
      apply: "Omba",
      post: "Tangaza",
      tokens: "tokeni",
      findYourDreamJob: "Tafuta Kazi Yako ya Ndoto",
      profile: "Wasifu",
      notifications: "Arifa",
      settings: "Mipangilio",
      logout: "Toka",
      welcome: "Karibu",
      guest: "Mgeni"
    }
  };

  const t = translations[language] || translations.en;

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleMenuItemClick = (action) => {
    setShowUserMenu(false);
    // Handle menu item actions here
    console.log(`Menu item clicked: ${action}`);
  };

  return (
    <header className="blue-jobs-header">
      {/* Left Section - Home Button */}
      <div className="blue-header-left">
        <button className="blue-home-btn" onClick={onNavigateHome}>
          <div className="blue-home-btn-content">
            <FaHome className="blue-home-icon" />
            <span className="blue-home-text">{t.backToHome}</span>
          </div>
          <div className="blue-home-btn-glow"></div>
        </button>
      </div>

      {/* Center Section - Logo */}
      <div className="blue-header-center">
        <div className="blue-logo-container">
          <div className="blue-logo-main">
            <span className="blue-logo-text">Blue</span>
            <span className="blue-logo-accent">Jobs</span>
          </div>
          <div className="blue-logo-subtitle">
            <span className="blue-subtitle-text">{t.findYourDreamJob}</span>
            <div className="blue-subtitle-underline"></div>
          </div>
        </div>
      </div>

      {/* Right Section - User Info & Tokens */}
      <div className="blue-header-right">
        {/* Tokens Display */}
        <div className="blue-tokens-container">
          <div className="blue-token-card blue-apply-token">
            <div className="blue-token-icon-wrapper">
              <div className="blue-token-icon-bg"></div>
              <span className="blue-token-emoji">
                <FaBriefcase />
              </span>
            </div>
            <div className="blue-token-info">
              <span className="blue-token-count">{user.userApplyTokens}</span>
              <span className="blue-token-label">{t.apply}</span>
            </div>
            <div className="blue-token-pulse"></div>
          </div>

          <div className="blue-token-card blue-post-token">
            <div className="blue-token-icon-wrapper">
              <div className="blue-token-icon-bg"></div>
              <span className="blue-token-emoji">
                <FaTicketAlt className="blue-token-icon" />
              </span>
            </div>
            <div className="blue-token-info">
              <span className="blue-token-count">{user.userPostTokens}</span>
              <span className="blue-token-label">{t.post}</span>
            </div>
            <div className="blue-token-pulse"></div>
          </div>
        </div>

        {/* User Menu */}
        <div className="blue-user-menu-container" ref={userMenuRef}>
          <button
            className="blue-user-avatar-btn"
            onClick={handleUserMenuToggle}
          >
            <div className="blue-user-avatar">
              {user.userPassportPhoto ? (
                <img
                  src={user?.userPassportPhoto}
                  alt={user?.userName}
                  className="blue-avatar-image"
                />
              ) : (
                <div className="blue-avatar-placeholder">
                  {user.userName?.charAt(0)?.toUpperCase() || t.guest.charAt(0)}
                </div>
              )}
              <div className="blue-avatar-status"></div>
            </div>
            <div className="blue-user-info">
              <span className="blue-user-greeting">{t.welcome}</span>
              <span className="blue-user-name">{user.userName || t.guest}</span>
            </div>
            <div
              className={`blue-menu-chevron ${showUserMenu ? "blue-open" : ""}`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="blue-user-dropdown-menu">
              <div className="blue-menu-header">
                <div className="blue-menu-user-avatar">
                  {user.userPassportPhoto ? (
                    <img
                      src={user.userPassportPhoto}
                      alt={user.userName}
                      className="blue-menu-avatar-image"
                    />
                  ) : (
                    <div className="blue-menu-avatar-placeholder">
                      {user.userName?.charAt(0)?.toUpperCase() ||
                        t.guest.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="blue-menu-user-details">
                  <span className="blue-menu-user-name">
                    {user.userName || t.guest}
                  </span>
                  <span className="blue-menu-user-email">
                    {user.userEmail || "No email"}
                  </span>
                </div>
              </div>

              <div className="blue-menu-items">
                <button
                  className="blue-menu-item"
                  onClick={() => handleMenuItemClick("profile")}
                >
                  <FaUser className="blue-menu-item-icon" />
                  <span className="blue-menu-item-text">{t.profile}</span>
                </button>

                <button
                  className="blue-menu-item"
                  onClick={() => handleMenuItemClick("notifications")}
                >
                  <FaBell className="blue-menu-item-icon" />
                  <span className="blue-menu-item-text">{t.notifications}</span>
                  {user.userNotifications?.length > 0 && (
                    <span className="blue-notification-badge">
                      {user.userNotifications.length}
                    </span>
                  )}
                </button>

                <button
                  className="blue-menu-item"
                  onClick={() => handleMenuItemClick("settings")}
                >
                  <FaCog className="blue-menu-item-icon" />
                  <span className="blue-menu-item-text">{t.settings}</span>
                </button>

                <div className="blue-menu-divider"></div>

                <button
                  className="blue-menu-item blue-logout"
                  onClick={() => handleMenuItemClick("logout")}
                >
                  <FaSignOutAlt className="blue-menu-item-icon" />
                  <span className="blue-menu-item-text">{t.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}