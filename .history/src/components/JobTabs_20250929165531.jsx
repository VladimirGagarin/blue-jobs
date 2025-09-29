// src/components/JobsTabs/JobsTabs.jsx
import { FaBriefcase, FaPlus } from "react-icons/fa";
import "./JobsTabs.css";

export default function JobsTabs({ activeTab, language, onTabChange }) {
  const translations = {
    en: {
      getJobs: "Find Jobs",
      postJobs: "Post Jobs",
    },
    fr: {
      getJobs: "Trouver des Emplois",
      postJobs: "Publier des Emplois",
    },
    sw: {
      getJobs: "Tafuta Kazi",
      postJobs: "Tangaza Kazi",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className="jobs-tabs">
      <button
        className={`tab-button ${activeTab === "get" ? "active" : ""}`}
        onClick={() => onTabChange("get")}
      >
        <FaBriefcase className="tab-icon" />
        <span className="tab-text">{t.getJobs}</span>
        <div className="tab-indicator"></div>
      </button>

      <button
        className={`tab-button ${activeTab === "post" ? "active" : ""}`}
        onClick={() => onTabChange("post")}
      >
        <FaPlus className="tab-icon" />
        <span className="tab-text">{t.postJobs}</span>
        <div className="tab-indicator"></div>
      </button>
    </div>
  );
}
