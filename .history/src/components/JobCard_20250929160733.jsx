// src/components/JobCard.jsx
import { useUser, useLanguage } from "./useUser";

export default function JobCard({ job, onApply }) {
  const { user } = useUser();
  const { language } = useLanguage();

  const translations = {
    en: { apply: "Apply" },
    fr: { apply: "Postuler" },
    sw: { apply: "Omba" },
  };

  const t = translations[language] || translations.en;

  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className="company">{job.company}</span>
      </div>
      <div className="job-details">
        <span className="location">{job.location}</span>
        <span className="salary">{job.salary}</span>
        <span className="date">{job.postedDate}</span>
      </div>
      <p className="job-description">{job.description}</p>
      <div className="job-requirements">
        {job.requirements.map((req, index) => (
          <span key={index} className="requirement-tag">
            {req}
          </span>
        ))}
      </div>
      <button
        className={`apply-btn ${user.userApplyTokens <= 0 ? "red-btn" : ""}`}
        onClick={() => onApply(job.id)}
        disabled={user.userApplyTokens <= 0}
      >
        {t.apply}
      </button>
    </div>
  );
}
