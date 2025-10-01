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
   <div className="blue-job-filters">
     {/* Main Search Bar */}
     <div className="blue-search-section">
       <div className="blue-search-bar">
         <FaSearch className="blue-search-icon" />
         <input
           type="text"
           placeholder={t.searchPlaceholder}
           value={searchTerm}
           onChange={(e) => onSearchChange(e.target.value)}
           className="blue-search-input"
         />
         {searchTerm && (
           <button
             className="blue-clear-search"
             onClick={() => onSearchChange("")}
           >
             <FaTimes />
           </button>
         )}
       </div>

       <button
         className={`blue-filter-toggle ${
           showAdvancedFilters ? "blue-active" : ""
         }`}
         onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
       >
         <FaFilter />
         {t.toggleFilters}
       </button>
     </div>

     {/* Quick Filters */}
     <div className="blue-quick-filters-section">
       <h4 className="blue-quick-filters-title">{t.quickFilters}</h4>
       <div className="blue-quick-filters">
         {quickFilters.map((filter) => {
           const Icon = filter.icon;
           return (
             <button
               key={filter.id}
               className={`blue-quick-filter-btn ${
                 currentFilter === filter.id ? "blue-active" : ""
               }`}
               onClick={() => onFilterChange(filter.id)}
             >
               <Icon className="blue-filter-icon" />
               <span className="blue-filter-label">{filter.label}</span>
               {filter.count !== undefined && (
                 <span className="blue-filter-count">{filter.count}</span>
               )}
             </button>
           );
         })}
       </div>
     </div>

     {/* Advanced Filters */}
     {showAdvancedFilters && (
       <div className="blue-advanced-filters">
         <div className="blue-filters-grid">
           {/* Location Filter */}
           <div className="blue-filter-group">
             <label className="blue-filter-label">
               <FaMapMarkerAlt className="blue-label-icon" />
               {t.location}
             </label>
             <div className="blue-location-input-wrapper">
               <FaMapMarkerAlt className="blue-location-icon" />
               <input
                 type="text"
                 placeholder={t.locationPlaceholder}
                 value={filterLocation}
                 onChange={(e) => onLocationChange(e.target.value)}
                 className="blue-location-input"
               />
             </div>
           </div>

           {/* Job Type Filter */}
           <div className="blue-filter-group">
             <label className="blue-filter-label">
               <FaBriefcase className="blue-label-icon" />
               {t.jobType}
             </label>
             <select
               value={filterType}
               onChange={(e) => onTypeChange(e.target.value)}
               className="blue-type-select"
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
           <div className="blue-filter-actions">
             <button
               className="blue-clear-filters-btn"
               onClick={onClearFilters}
             >
               <FaTimes />
               {t.clearFilters}
             </button>
           </div>
         )}
       </div>
     )}

     {/* Active Filters Summary */}
     {hasActiveFilters && (
       <div className="blue-active-filters">
         <span className="blue-active-filters-text">
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
