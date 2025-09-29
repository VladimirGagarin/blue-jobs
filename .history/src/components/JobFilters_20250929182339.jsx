// src/components/JobFilters.jsx
import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaHandshake,
} from "react-icons/fa";
import "./JobFilters.css";

export default function JobFilters({
  language,
  searchTerm,
  onSearchChange,
  filterLocation,
  onLocationChange,
  filterType,
  onTypeChange,
  currentFilter,
  onFilterChange,
  onClearFilters,
  jobCount,
}) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const translations = {
    en: {
      searchPlaceholder: "Search jobs, companies, skills...",
      locationPlaceholder: "Any location",
      filterBy: "Filter by",
      allJobs: "All Jobs",
      highPaid: "High Salary",
      negotiable: "Negotiable",
      noApplicants: "New Posts",
      location: "Location",
      jobType: "Job Type",
      anyType: "Any Type",
      fullTime: "Full-time",
      partTime: "Part-time",
      contract: "Contract",
      internship: "Internship",
      toggleFilters: "More Filters",
      clearFilters: "Clear All",
      jobsFound: "jobs found",
      quickFilters: "Quick Filters",
      search: "Search",
    },
    fr: {
      searchPlaceholder: "Rechercher emplois, entreprises, compétences...",
      locationPlaceholder: "Toute localisation",
      filterBy: "Filtrer par",
      allJobs: "Tous les emplois",
      highPaid: "Salaire élevé",
      negotiable: "Négociable",
      noApplicants: "Nouvelles offres",
      location: "Localisation",
      jobType: "Type d'emploi",
      anyType: "Tous types",
      fullTime: "Temps plein",
      partTime: "Temps partiel",
      contract: "Contrat",
      internship: "Stage",
      toggleFilters: "Plus de filtres",
      clearFilters: "Tout effacer",
      jobsFound: "emplois trouvés",
      quickFilters: "Filtres rapides",
      search: "Rechercher",
    },
    sw: {
      searchPlaceholder: "Tafuta kazi, kampuni, ujuzi...",
      locationPlaceholder: "Eneo lolote",
      filterBy: "Chuja kwa",
      allJobs: "Kazi Zote",
      highPaid: "Mshahara Mkubwa",
      negotiable: "Inapatikana",
      noApplicants: "Kazi Mpya",
      location: "Eneo",
      jobType: "Aina ya Kazi",
      anyType: "Aina Yoyote",
      fullTime: "Wakati Kamili",
      partTime: "Wakati Nusu",
      contract: "Mkataba",
      internship: "Uanagenzi",
      toggleFilters: "Vichujio Zaidi",
      clearFilters: "Futa Yote",
      jobsFound: "kazi zilizopatikana",
      quickFilters: "Vichujio Haraka",
      search: "Tafuta",
    },
  };

  const t = translations[language] || translations.en;

  const jobTypes = [
    { value: "", label: t.anyType },
    { value: "Full-time", label: t.fullTime },
    { value: "Part-time", label: t.partTime },
    { value: "Contract", label: t.contract },
    { value: "Internship", label: t.internship },
  ];

  const quickFilters = [
    { id: "all", label: t.allJobs, icon: FaBriefcase, count: jobCount },
    { id: "highPaid", label: t.highPaid, icon: FaDollarSign },
    { id: "negotiable", label: t.negotiable, icon: FaHandshake },
    { id: "noApplicants", label: t.noApplicants, icon: FaBriefcase },
  ];

  const hasActiveFilters =
    searchTerm || filterLocation || filterType || currentFilter !== "all";

  return (
    <div className="job-filters">
      {/* Main Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => onSearchChange("")}>
              <FaTimes />
            </button>
          )}
        </div>

        <button
          className={`filter-toggle ${showAdvancedFilters ? "active" : ""}`}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <FaFilter />
          {t.toggleFilters}
        </button>
      </div>

      {/* Quick Filters */}
      <div className="quick-filters-section">
        <h4 className="quick-filters-title">{t.quickFilters}</h4>
        <div className="quick-filters">
          {quickFilters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                className={`quick-filter-btn ${
                  currentFilter === filter.id ? "active" : ""
                }`}
                onClick={() => onFilterChange(filter.id)}
              >
                <Icon className="filter-icon" />
                <span className="filter-label">{filter.label}</span>
                {filter.count !== undefined && (
                  <span className="filter-count">{filter.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filters-grid">
            {/* Location Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FaMapMarkerAlt className="label-icon" />
                {t.location}
              </label>
              <div className="location-input-wrapper">
                <FaMapMarkerAlt className="location-icon" />
                <input
                  type="text"
                  placeholder={t.locationPlaceholder}
                  value={filterLocation}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="location-input"
                />
              </div>
            </div>

            {/* Job Type Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FaBriefcase className="label-icon" />
                {t.jobType}
              </label>
              <select
                value={filterType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="type-select"
              >
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="filter-actions">
              <button className="clear-filters-btn" onClick={onClearFilters}>
                <FaTimes />
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-text">
            {jobCount} {t.jobsFound}
            {searchTerm && ` • "${searchTerm}"`}
            {filterLocation && ` • ${t.location}: ${filterLocation}`}
            {filterType &&
              ` • ${t.jobType}: ${
                jobTypes.find((t) => t.value === filterType)?.label
              }`}
            {currentFilter !== "all" &&
              ` • ${quickFilters.find((f) => f.id === currentFilter)?.label}`}
          </span>
        </div>
      )}
    </div>
  );
}
