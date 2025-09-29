// src/components/JobsHeader.jsx
import { FaHome, FaUser, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "./JobHeader.css";

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
    <header className="jobs-header">
      {/* Left Section - Home Button */}
      <div className="header-left">
        <button className="home-btn" onClick={onNavigateHome}>
          <div className="home-btn-content">
            <FaHome className="home-icon" />
            <span className="home-text">{t.backToHome}</span>
          </div>
          <div className="home-btn-glow"></div>
        </button>
      </div>

      {/* Center Section - Logo */}
      <div className="header-center">
        <div className="logo-container">
          <div className="logo-main">
            <span className="logo-text">Blue</span>
            <span className="logo-accent">Jobs</span>
          </div>
          <div className="logo-subtitle">
            <span className="subtitle-text">{t.findYourDreamJob}</span>
            <div className="subtitle-underline"></div>
          </div>
        </div>
      </div>

      {/* Right Section - User Info & Tokens */}
      <div className="header-right">
        {/* Tokens Display */}
        <div className="tokens-container">
          <div className="token-card apply-token">
            <div className="token-icon-wrapper">
              <div className="token-icon-bg"></div>
              <span className="token-emoji">💼</span>
            </div>
            <div className="token-info">
              <span className="token-count">{user.userApplyTokens}</span>
              <span className="token-label">{t.apply}</span>
            </div>
            <div className="token-pulse"></div>
          </div>

          <div className="token-card post-token">
            <div className="token-icon-wrapper">
              <div className="token-icon-bg"></div>
              <span className="token-emoji">📝</span>
            </div>
            <div className="token-info">
              <span className="token-count">{user.userPostTokens}</span>
              <span className="token-label">{t.post}</span>
            </div>
            <div className="token-pulse"></div>
          </div>
        </div>

        {/* User Menu */}
        <div className="user-menu-container" ref={userMenuRef}>
          <button className="user-avatar-btn" onClick={handleUserMenuToggle}>
            <div className="user-avatar">
              {user.userPassportPhoto ? (
                <img 
                  src={user.userPassportPhoto} 
                  alt={user.userName}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  {user.userName?.charAt(0)?.toUpperCase() || t.guest.charAt(0)}
                </div>
              )}
              <div className="avatar-status"></div>
            </div>
            <div className="user-info">
              <span className="user-greeting">{t.welcome}</span>
              <span className="user-name">
                {user.userName || t.guest}
              </span>
            </div>
            <div className={`menu-chevron ${showUserMenu ? 'open' : ''}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="user-dropdown-menu">
              <div className="menu-header">
                <div className="menu-user-avatar">
                  {user.userPassportPhoto ? (
                    <img 
                      src={user.userPassportPhoto} 
                      alt={user.userName}
                      className="menu-avatar-image"
                    />
                  ) : (
                    <div className="menu-avatar-placeholder">
                      {user.userName?.charAt(0)?.toUpperCase() || t.guest.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="menu-user-details">
                  <span className="menu-user-name">{user.userName || t.guest}</span>
                  <span className="menu-user-email">{user.userEmail || "No email"}</span>
                </div>
              </div>

              <div className="menu-items">
                <button 
                  className="menu-item"
                  onClick={() => handleMenuItemClick('profile')}
                >
                  <FaUser className="menu-item-icon" />
                  <span>{t.profile}</span>
                </button>
                
                <button 
                  className="menu-item"
                  onClick={() => handleMenuItemClick('notifications')}
                >
                  <FaBell className="menu-item-icon" />
                  <span>{t.notifications}</span>
                  {user.userNotifications?.length > 0 && (
                    <span className="notification-badge">
                      {user.userNotifications.length}
                    </span>
                  )}
                </button>
                
                <button 
                  className="menu-item"
                  onClick={() => handleMenuItemClick('settings')}
                >
                  <FaCog className="menu-item-icon" />
                  <span>{t.settings}</span>
                </button>
                
                <div className="menu-divider"></div>
                
                <button 
                  className="menu-item logout"
                  onClick={() => handleMenuItemClick('logout')}
                >
                  <FaSignOutAlt className="menu-item-icon" />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}