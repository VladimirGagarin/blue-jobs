// src/components/JobCard.jsx
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaBuilding,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaBookmark,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useState } from "react";
import "./JobCard.css";

export default function JobCard({
  job,
  language,
  onApplyJob,
  onViewJobDetails,
  onEditJob,
  onDeleteJob,
  onToggleJobStatus,
  userTokens,
  user
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const translations = {
    en: {
      apply: "Apply Now",
      viewDetails: "View Details",
      editDetails: "Edit Details",
      deleteJob: "Delete Job",
      activateJob: "Activate Job",
      deactivateJob: "Deactivate Job",
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
      yourJob: "Your Job",
    },
    fr: {
      apply: "Postuler",
      viewDetails: "Voir Détails",
      editDetails: "Modifier Détails",
      deleteJob: "Supprimer l'emploi",
      activateJob: "Activer l'emploi",
      deactivateJob: "Désactiver l'emploi",
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
      yourJob: "Votre emploi",
    },
    sw: {
      apply: "Omba Sasa",
      viewDetails: "Angalia Maelezo",
      editDetails: "Hariri Maelezo",
      deleteJob: "Futa Kazi",
      activateJob: "Washa Kazi",
      deactivateJob: "Zima Kazi",
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
      yourJob: "Kazi Yako",
    },
  };

  const t = translations[language] || translations.en;

  // Check if current user is the job poster
  const isJobPoster = user && user.userId === job.jobPostedBy;

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

  const handleEdit = (e) => {
    e.stopPropagation();
    onEditJob(job.jobId);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteJob(job.jobId);
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    onToggleJobStatus(job.jobId, job.jobStatus === 'active' ? 'closed' : 'active');
  };

  return (
    <div className="blue-job-card">
      {/* Header Section */}
      <div className="blue-job-card-header">
        <div className="blue-company-logo">
          <div className="blue-logo-placeholder">
            {job.jobCompany.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="blue-job-title-section">
          {isJobPoster && (
            <div className="blue-your-job-badge">{t.yourJob}</div>
          )}
          <h3 className="blue-job-title">{job.jobTitle}</h3>
          <div className="blue-company-info">
            <FaBuilding className="blue-company-icon" />
            <span className="blue-company-name">{job.jobCompany}</span>
          </div>
        </div>

        {/* Show bookmark/like only if user is NOT the job poster */}
        {!isJobPoster && (
          <div className="blue-job-actions">
            <button
              className={`blue-action-btn blue-bookmark-btn ${
                isBookmarked ? "blue-active" : ""
              }`}
              onClick={handleBookmark}
            >
              <FaBookmark />
            </button>
            <button
              className={`blue-action-btn blue-like-btn ${
                isLiked ? "blue-active" : ""
              }`}
              onClick={handleLike}
            >
              <FaHeart />
            </button>
          </div>
        )}
      </div>

      {/* Status Badge with Toggle for Job Poster */}
      <div className="blue-status-section">
        <div
          className="blue-status-badge"
          style={{
            color: statusInfo.color,
            backgroundColor: statusInfo.bg,
          }}
        >
          {statusInfo.text}
        </div>

        {/* Status Toggle for Job Poster */}
        {isJobPoster && (
          <button
            className="blue-status-toggle-btn"
            onClick={handleToggleStatus}
            title={job.jobStatus === "active" ? t.deactivateJob : t.activateJob}
          >
            {job.jobStatus === "active" ? <FaToggleOn /> : <FaToggleOff />}
            {job.jobStatus === "active" ? t.deactivateJob : t.activateJob}
          </button>
        )}
      </div>

      {/* Job Details Grid */}
      <div className="blue-job-details-grid">
        <div className="blue-detail-item">
          <FaMapMarkerAlt className="blue-detail-icon blue-location" />
          <span className="blue-detail-text">{job.jobLocation}</span>
        </div>

        <div className="blue-detail-item">
          <FaClock className="blue-detail-icon blue-type" />
          <span className="blue-detail-text">{getJobType()}</span>
        </div>

        <div className="blue-detail-item">
          <FaMoneyBillWave className="blue-detail-icon blue-salary" />
          <span className="blue-detail-text">{formatSalary()}</span>
        </div>

        <div className="blue-detail-item">
          <FaCalendarAlt className="blue-detail-icon blue-shift" />
          <span className="blue-detail-text">{getJobShift()}</span>
        </div>
      </div>

      {/* Description */}
      <div className="blue-job-description">
        <p>{job.jobDescription}</p>
      </div>

      {/* Requirements Tags */}
      <div className="blue-requirements-section">
        <div className="blue-requirements-tags">
          {job.jobRequirements.slice(0, 3).map((requirement, index) => (
            <span key={index} className="blue-requirement-tag">
              {requirement}
            </span>
          ))}
          {job.jobRequirements.length > 3 && (
            <span className="blue-requirement-tag blue-more">
              +{job.jobRequirements.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="blue-job-card-footer">
        <div className="blue-job-meta">
          <span className="blue-posted-date">{formatPostedDate()}</span>
          <span className="blue-applicants-count">
            {job.jobApplicants.length} {t.applicants}
          </span>
        </div>

        <div className="blue-action-buttons">
          {/* Different buttons for job poster vs other users */}
          {isJobPoster ? (
            // Job Poster Actions
            <>
              <button className="blue-edit-btn" onClick={handleEdit}>
                <FaEdit />
                {t.editDetails}
              </button>
              <button className="blue-delete-btn" onClick={handleDelete}>
                <FaTrash />
                {t.deleteJob}
              </button>
            </>
          ) : (
            // Regular User Actions
            <>
              <button
                className="blue-view-details-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewJobDetails(job.jobId);
                }}
              >
                <FaEye />
                {t.viewDetails}
              </button>

              <button
                className={`blue-apply-btn ${
                  userTokens <= 0 ? "blue-disabled" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyJob(job.jobId);
                }}
                disabled={userTokens <= 0}
              >
                {t.apply}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Card Hover Effect */}
      <div className="blue-card-hover-effect"></div>
    </div>
  );
}