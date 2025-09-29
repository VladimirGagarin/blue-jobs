// src/components/JobsHeader/JobsHeader.jsx
import { FaHome } from "react-icons/fa";
import "./JobsHeader.css";

export default function JobsHeader({ user, language, onNavigateHome }) {
  const translations = {
    en: {
      backToHome: "Home",
      apply: "Apply",
      post: "Post",
      tokens: "tokens",
    },
    fr: {
      backToHome: "Accueil",
      apply: "Postuler",
      post: "Publier",
      tokens: "jetons",
    },
    sw: {
      backToHome: "Nyumbani",
      apply: "Omba",
      post: "Tangaza",
      tokens: "tokeni",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <header className="jobs-header">
      <button className="home-btn" onClick={onNavigateHome}>
        <FaHome className="home-icon" />
        {t.backToHome}
      </button>

      <div className="jobs-logo">
        <h1>Blue Jobs</h1>
        <span className="logo-subtitle">Find Your Dream Job</span>
      </div>

      <div className="user-tokens">
        <div className="token-item apply-tokens">
          <span className="token-label">{t.apply}</span>
          <span className="token-count">{user.userApplyTokens}</span>
          <span className="token-text">{t.tokens}</span>
        </div>
        <div className="token-item post-tokens">
          <span className="token-label">{t.post}</span>
          <span className="token-count">{user.userPostTokens}</span>
          <span className="token-text">{t.tokens}</span>
        </div>
      </div>
    </header>
  );
}
