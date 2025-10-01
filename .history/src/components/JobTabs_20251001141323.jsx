// src/components/JobsTabs/JobsTabs.jsx
import { FaBriefcase, FaPlus } from "react-icons/fa";
import "./JobTabs.css";

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
    <div className="blue-jobs-tabs">
      <button
        className={`blue-tab-button ${
          activeTab === "get" ? "blue-active" : ""
        }`}
        onClick={() => onTabChange("get")}
      >
        <FaBriefcase className="blue-tab-icon" />
        <span className="blue-tab-text">{t.getJobs}</span>
        <div className="blue-tab-indicator"></div>
      </button>

      <button
        className={`blue-tab-button ${
          activeTab === "post" ? "blue-active" : ""
        }`}
        onClick={() => onTabChange("post")}
      >
        <FaPlus className="blue-tab-icon" />
        <span className="blue-tab-text">{t.postJobs}</span>
        <div className="blue-tab-indicator"></div>
      </button>
    </div>
  );
}
