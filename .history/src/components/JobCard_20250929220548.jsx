// src/components/JobCard.jsx
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaBuilding,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import { useState } from "react";
import "./JobCard.css";

export default function JobCard({
  job,
  language,
  onApplyJob,
  onViewJobDetails,
  userTokens,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const translations = {
    en: {
      apply: "Apply Now",
      viewDetails: "View Details",
      applicants: "applicants",
      daysAgo: "days ago",
      today: "Today",
      yesterday: "Yesterday",
      negotiable: "Negotiable",
      fullTime: "Full-time",
      partTime: "Part-time",
      contract: "Contract",
      internship: "Internship",
      dayShift: "Day",
      nightShift: "Night",
      flexible: "Flexible",
      active: "Active",
      closed: "Closed",
      filled: "Filled",
      perWeek: "/week",
      perMonth: "/month",
      perYear: "/year",
      usd: "USD",
      kes: "KES",
      eur: "EUR",
    },
    fr: {
      apply: "Postuler",
      viewDetails: "Voir Détails",
      applicants: "candidats",
      daysAgo: "jours",
      today: "Aujourd'hui",
      yesterday: "Hier",
      negotiable: "Négociable",
      fullTime: "Temps plein",
      partTime: "Temps partiel",
      contract: "Contrat",
      internship: "Stage",
      dayShift: "Jour",
      nightShift: "Nuit",
      flexible: "Flexible",
      active: "Actif",
      closed: "Fermé",
      filled: "Pourvu",
      perWeek: "/semaine",
      perMonth: "/mois",
      perYear: "/an",
      usd: "USD",
      kes: "KES",
      eur: "EUR",
    },
    sw: {
      apply: "Omba Sasa",
      viewDetails: "Angalia Maelezo",
      applicants: "waombaji",
      daysAgo: "siku zilizopita",
      today: "Leo",
      yesterday: "Jana",
      negotiable: "Inapatikana",
      fullTime: "Wakati Kamili",
      partTime: "Wakati Nusu",
      contract: "Mkataba",
      internship: "Uanagenzi",
      dayShift: "Mchana",
      nightShift: "Usiku",
      flexible: "Kubadilika",
      active: "Imefunguliwa",
      closed: "Imefungwa",
      filled: "Imajazwa",
      perWeek: "/wiki",
      perMonth: "/mwezi",
      perYear: "/mwaka",
      usd: "USD",
      kes: "KES",
      eur: "EUR",
    },
  };

  const t = translations[language] || translations.en;

  // Format salary
  const formatSalary = () => {
    const { min, max, currency, negotiable } = job.jobSalary;
    const currencySymbol =
      {
        USD: "$",
        KES: "KSh ",
        EUR: "€",
      }[currency] || currency;

    const period = job.jobPaymentDuration.week
      ? t.perWeek
      : job.jobPaymentDuration.month
      ? t.perMonth
      : job.jobPaymentDuration.year
      ? t.perYear
      : "";

    if (min === max) {
      return `${currencySymbol}${min.toLocaleString()}${period}${
        negotiable ? ` • ${t.negotiable}` : ""
      }`;
    }
    return `${currencySymbol}${min.toLocaleString()} - ${currencySymbol}${max.toLocaleString()}${period}${
      negotiable ? ` • ${t.negotiable}` : ""
    }`;
  };

  // Format posted date
  const formatPostedDate = () => {
    const postedDate = new Date(job.jobDatePosted);
    const today = new Date();
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t.today;
    if (diffDays === 1) return t.yesterday;
    return `${diffDays} ${t.daysAgo}`;
  };

  // Get job type translation
  const getJobType = () => {
    const types = {
      "Full-time": t.fullTime,
      "Part-time": t.partTime,
      Contract: t.contract,
      Internship: t.internship,
    };
    return types[job.jobType] || job.jobType;
  };

  // Get job shift translation
  const getJobShift = () => {
    const shifts = {
      Day: t.dayShift,
      Night: t.nightShift,
      Flexible: t.flexible,
    };
    return shifts[job.jobShift] || job.jobShift;
  };

  // Get status translation and color
  const getStatusInfo = () => {
    const statusMap = {
      active: {
        text: t.active,
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.1)",
      },
      closed: {
        text: t.closed,
        color: "#ef4444",
        bg: "rgba(239, 68, 68, 0.1)",
      },
      filled: {
        text: t.filled,
        color: "#6b7280",
        bg: "rgba(107, 114, 128, 0.1)",
      },
    };
    return statusMap[job.jobStatus] || statusMap.active;
  };

  const statusInfo = getStatusInfo();

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

//   const handleShare = (e) => {
//     e.stopPropagation();
//     // Implement share functionality
//     console.log("Share job:", job.jobId);
//   };

  return (
    <div className="job-card" onClick={() => onViewJobDetails(job.jobId)}>
      {/* Header Section */}
      <div className="job-card-header">
        <div className="company-logo">
          <div className="logo-placeholder">
            {job.jobCompany.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="job-title-section">
          <h3 className="job-title">{job.jobTitle}</h3>
          <div className="company-info">
            <FaBuilding className="company-icon" />
            <span className="company-name">{job.jobCompany}</span>
          </div>
        </div>

        <div className="job-actions">
          <button
            className={`action-btn bookmark-btn ${
              isBookmarked ? "active" : ""
            }`}
            onClick={handleBookmark}
          >
            <FaBookmark />
          </button>
          <button
            className={`action-btn like-btn ${isLiked ? "active" : ""}`}
            onClick={handleLike}
          >
            <FaHeart />
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div
        className="status-badge"
        style={{
          color: statusInfo.color,
          backgroundColor: statusInfo.bg,
        }}
      >
        {statusInfo.text}
      </div>

      {/* Job Details Grid */}
      <div className="job-details-grid">
        <div className="detail-item">
          <FaMapMarkerAlt className="detail-icon location" />
          <span className="detail-text">{job.jobLocation}</span>
        </div>

        <div className="detail-item">
          <FaClock className="detail-icon type" />
          <span className="detail-text">{getJobType()}</span>
        </div>

        <div className="detail-item">
          <FaMoneyBillWave className="detail-icon salary" />
          <span className="detail-text">{formatSalary()}</span>
        </div>

        <div className="detail-item">
          <FaCalendarAlt className="detail-icon shift" />
          <span className="detail-text">{getJobShift()}</span>
        </div>
      </div>

      {/* Description */}
      <div className="job-description">
        <p>{job.jobDescription}</p>
      </div>

      {/* Requirements Tags */}
      <div className="requirements-section">
        <div className="requirements-tags">
          {job.jobRequirements.slice(0, 3).map((requirement, index) => (
            <span key={index} className="requirement-tag">
              {requirement}
            </span>
          ))}
          {job.jobRequirements.length > 3 && (
            <span className="requirement-tag more">
              +{job.jobRequirements.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="job-card-footer">
        <div className="job-meta">
          <span className="posted-date">{formatPostedDate()}</span>
          <span className="applicants-count">
            {job.jobApplicants.length} {t.applicants}
          </span>
        </div>

        <div className="action-buttons">
          <button
            className="view-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onViewJobDetails(job.jobId);
            }}
          >
            <FaEye />
            {t.viewDetails}
          </button>

          <button
            className={`apply-btn ${userTokens <= 0 ? "disabled" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onApplyJob(job.jobId);
            }}
            disabled={userTokens <= 0}
          >
            {t.apply}
          </button>
        </div>
      </div>

      {/* Card Hover Effect */}
      <div className="card-hover-effect"></div>
    </div>
  );
}
