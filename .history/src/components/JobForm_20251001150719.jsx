// src/components/JobForm.jsx
import { useState } from "react";
import { 
  FaPlus, 
  FaTrash, 
  FaSave, 
  FaPaperPlane, 
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaBuilding,
  FaEdit,
  FaEye
} from "react-icons/fa";
import "./JobForm.css";

export default function JobForm({ language, onSubmitJob, userPostedJobs, userTokens }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCompany: "",
    jobLocation: "",
    jobType: "Full-time",
    jobShift: "Day",
    jobDescription: "",
    jobRequirements: [""],
    jobApplicationDeadline: "",
    jobSalary: {
      min: "",
      max: "",
      currency: "KES",
      negotiable: false
    },
    jobPaymentDuration: {
      year: false,
      month: true,
      week: false,
      day: false
    }
  });

  const [currentRequirement, setCurrentRequirement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  // const fileInputRef = useRef(null);

  const translations = {
    en: {
      postNewJob: "Post New Job",
      createJob: "Create Job",
      myJobs: "My Jobs",
      jobTitle: "Job Title",
      jobTitlePlaceholder: "e.g., Senior Frontend Developer",
      company: "Company",
      companyPlaceholder: "Your company name",
      location: "Location",
      locationPlaceholder: "e.g., Nairobi, Kenya",
      jobType: "Job Type",
      jobShift: "Work Shift",
      description: "Job Description",
      descriptionPlaceholder: "Describe the role, responsibilities, and what makes your company great...",
      requirements: "Requirements",
      requirementPlaceholder: "Add a requirement...",
      addRequirement: "Add Requirement",
      salary: "Salary",
      minSalary: "Min Salary",
      maxSalary: "Max Salary",
      currency: "Currency",
      negotiable: "Negotiable",
      paymentDuration: "Payment Duration",
      deadline: "Application Deadline",
      postJob: "Post Job",
      saving: "Posting...",
      tokensRequired: "Tokens Required",
      youHave: "You have",
      tokens: "tokens",
      insufficientTokens: "Insufficient tokens",
      preview: "Preview",
      clear: "Clear Form",
      draft: "Save Draft",
      requiredField: "This field is required",
      yourPostedJobs: "Your Posted Jobs",
      noJobsPosted: "You haven't posted any jobs yet",
      active: "Active",
      closed: "Closed",
      applicants: "applicants",
      edit: "Edit",
      view: "View",
      delete: "Delete",
      fullTime: "Full-time",
      partTime: "Part-time",
      contract: "Contract",
      internship: "Internship",
      dayShift: "Day",
      nightShift: "Night",
      flexible: "Flexible",
      perWeek: "Per Week",
      perMonth: "Per Month",
      perYear: "Per Year",
      perDay: "Per Day"
    },
    fr: {
      postNewJob: "Publier un Nouvel Emploi",
      createJob: "Créer un Emploi",
      myJobs: "Mes Emplois",
      jobTitle: "Titre du Poste",
      jobTitlePlaceholder: "ex: Développeur Frontend Senior",
      company: "Entreprise",
      companyPlaceholder: "Nom de votre entreprise",
      location: "Localisation",
      locationPlaceholder: "ex: Nairobi, Kenya",
      jobType: "Type d'Emploi",
      jobShift: "Horaire de Travail",
      description: "Description du Poste",
      descriptionPlaceholder: "Décrivez le rôle, les responsabilités et ce qui rend votre entreprise géniale...",
      requirements: "Exigences",
      requirementPlaceholder: "Ajouter une exigence...",
      addRequirement: "Ajouter une Exigence",
      salary: "Salaire",
      minSalary: "Salaire Minimum",
      maxSalary: "Salaire Maximum",
      currency: "Devise",
      negotiable: "Négociable",
      paymentDuration: "Durée de Paiement",
      deadline: "Date Limite de Candidature",
      postJob: "Publier l'Emploi",
      saving: "Publication...",
      tokensRequired: "Jetons Requis",
      youHave: "Vous avez",
      tokens: "jetons",
      insufficientTokens: "Jetons insuffisants",
      preview: "Aperçu",
      clear: "Effacer le Formulaire",
      draft: "Sauvegarder le Brouillon",
      requiredField: "Ce champ est requis",
      yourPostedJobs: "Vos Emplois Publiés",
      noJobsPosted: "Vous n'avez publié aucun emploi pour le moment",
      active: "Actif",
      closed: "Fermé",
      applicants: "candidats",
      edit: "Modifier",
      view: "Voir",
      delete: "Supprimer",
      fullTime: "Temps plein",
      partTime: "Temps partiel",
      contract: "Contrat",
      internship: "Stage",
      dayShift: "Jour",
      nightShift: "Nuit",
      flexible: "Flexible",
      perWeek: "Par Semaine",
      perMonth: "Par Mois",
      perYear: "Par An",
      perDay: "Par Jour"
    },
    sw: {
      postNewJob: "Tangaza Kazi Mpya",
      createJob: "Unda Kazi",
      myJobs: "Kazi Zangu",
      jobTitle: "Kichwa cha Kazi",
      jobTitlePlaceholder: "mf: Mtaalamu wa Frontend",
      company: "Kampuni",
      companyPlaceholder: "Jina la kampuni yako",
      location: "Eneo",
      locationPlaceholder: "mf: Nairobi, Kenya",
      jobType: "Aina ya Kazi",
      jobShift: "Muda wa Kazi",
      description: "Maelezo ya Kazi",
      descriptionPlaceholder: "Elezea jukumu, majukumu, na kile kinachofanya kampuni yako kuwa bora...",
      requirements: "Mahitaji",
      requirementPlaceholder: "Ongeza hitaji...",
      addRequirement: "Ongeza Hitaji",
      salary: "Mshahara",
      minSalary: "Mshahara wa Chini",
      maxSalary: "Mshahara wa Juu",
      currency: "Sarafu",
      negotiable: "Inapatikana",
      paymentDuration: "Muda wa Kulipwa",
      deadline: "Mwisho wa Kuomba",
      postJob: "Tangaza Kazi",
      saving: "Inatangazwa...",
      tokensRequired: "Tokeni Zinazohitajika",
      youHave: "Una",
      tokens: "tokeni",
      insufficientTokens: "Tokeni hazitoshi",
      preview: "Hakiki",
      clear: "Futa Fomu",
      draft: "Hifadhi Rasimu",
      requiredField: "Sehemu hii inahitajika",
      yourPostedJobs: "Kazi Ulizotangaza",
      noJobsPosted: "Hujatangaza kazi yoyote bado",
      active: "Imefunguliwa",
      closed: "Imefungwa",
      applicants: "waombaji",
      edit: "Hariri",
      view: "Angalia",
      delete: "Futa",
      fullTime: "Wakati Kamili",
      partTime: "Wakati Nusu",
      contract: "Mkataba",
      internship: "Uanagenzi",
      dayShift: "Mchana",
      nightShift: "Usiku",
      flexible: "Kubadilika",
      perWeek: "Kila Wiki",
      perMonth: "Kila Mwezi",
      perYear: "Kila Mwaka",
      perDay: "Kila Siku"
    }
  };

  const t = translations[language] || translations.en;

  const jobTypes = [
    { value: "Full-time", label: t.fullTime },
    { value: "Part-time", label: t.partTime },
    { value: "Contract", label: t.contract },
    { value: "Internship", label: t.internship }
  ];

  const jobShifts = [
    { value: "Day", label: t.dayShift },
    { value: "Night", label: t.nightShift },
    { value: "Flexible", label: t.flexible }
  ];

  const currencies = [
    { value: "KES", label: "KES (Kenyan Shilling)" },
    { value: "USD", label: "USD (US Dollar)" },
    { value: "EUR", label: "EUR (Euro)" }
  ];

  const paymentDurations = [
    { value: "week", label: t.perWeek },
    { value: "month", label: t.perMonth },
    { value: "year", label: t.perYear },
    { value: "day", label: t.perDay }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalaryChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      jobSalary: {
        ...prev.jobSalary,
        [field]: field === 'negotiable' ? !prev.jobSalary.negotiable : value
      }
    }));
  };

  const handlePaymentDurationChange = (duration) => {
    setFormData(prev => ({
      ...prev,
      jobPaymentDuration: {
        year: duration === "year",
        month: duration === "month",
        week: duration === "week",
        day: duration === "day"
      }
    }));
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        jobRequirements: [...prev.jobRequirements, currentRequirement.trim()]
      }));
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      jobRequirements: prev.jobRequirements.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRequirement();
    }
  };

  const clearForm = () => {
    setFormData({
      jobTitle: "",
      jobCompany: "",
      jobLocation: "",
      jobType: "Full-time",
      jobShift: "Day",
      jobDescription: "",
      jobRequirements: [""],
      jobApplicationDeadline: "",
      jobSalary: {
        min: "",
        max: "",
        currency: "KES",
        negotiable: false
      },
      jobPaymentDuration: {
        year: false,
        month: true,
        week: false,
        day: false
      }
    });
    setCurrentRequirement("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userTokens <= 0) {
      alert(t.insufficientTokens);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmitJob(formData);
      clearForm();
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.jobTitle && formData.jobCompany && formData.jobLocation && formData.jobDescription;

  return (
    <div className="blue-job-form-container">
      {/* Header Tabs */}
      <div className="blue-form-tabs">
        <button
          className={`blue-tab ${activeTab === "create" ? "blue-active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          <FaPlus />
          {t.createJob}
        </button>
        <button
          className={`blue-tab ${activeTab === "myJobs" ? "blue-active" : ""}`}
          onClick={() => setActiveTab("myJobs")}
        >
          <FaEye />
          {t.myJobs}
        </button>
      </div>

      {/* Token Info */}
      <div className="blue-token-info-card">
        <div className="blue-token-content">
          <div className="blue-token-count">
            <div className="blue-token-icon-wrapper">
              <div className="blue-token-icon-bg"></div>
              <span className="blue-token-emoji">💰</span>
            </div>
            <div className="blue-token-numbers">
              <span className="blue-token-number">{userTokens}</span>
              <span className="blue-token-label">{t.tokens}</span>
            </div>
            <div className="blue-token-pulse"></div>
          </div>
          <div className="blue-token-message">
            <div className="blue-token-title">{t.tokensRequired}</div>
            <div className="blue-token-description">
              {t.youHave}{" "}
              <strong className="blue-token-highlight">{userTokens}</strong>{" "}
              {t.tokens.toLowerCase()}{" "}
              {userTokens > 0 ? t.available : t.insufficient}
            </div>
          </div>
        </div>
        <div className="blue-token-glow"></div>
      </div>

      {activeTab === "create" ? (
        <form className="blue-job-form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="blue-form-section">
            <h3 className="blue-section-title">{t.postNewJob}</h3>

            <div className="blue-form-grid">
              <div className="blue-form-group">
                <label className="blue-form-label">{t.jobTitle} *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  placeholder={t.jobTitlePlaceholder}
                  className="blue-form-input"
                  required
                />
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">
                  <FaBuilding />
                  {t.company} *
                </label>
                <input
                  type="text"
                  value={formData.jobCompany}
                  onChange={(e) =>
                    handleInputChange("jobCompany", e.target.value)
                  }
                  placeholder={t.companyPlaceholder}
                  className="blue-form-input"
                  required
                />
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">
                  <FaMapMarkerAlt />
                  {t.location} *
                </label>
                <input
                  type="text"
                  value={formData.jobLocation}
                  onChange={(e) =>
                    handleInputChange("jobLocation", e.target.value)
                  }
                  placeholder={t.locationPlaceholder}
                  className="blue-form-input"
                  required
                />
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">
                  <FaClock />
                  {t.jobType}
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  className="blue-form-select"
                >
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">
                  <FaClock />
                  {t.jobShift}
                </label>
                <select
                  value={formData.jobShift}
                  onChange={(e) =>
                    handleInputChange("jobShift", e.target.value)
                  }
                  className="blue-form-select"
                >
                  {jobShifts.map((shift) => (
                    <option key={shift.value} value={shift.value}>
                      {shift.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">
                  <FaCalendarAlt />
                  {t.deadline}
                </label>
                <input
                  type="date"
                  value={formData.jobApplicationDeadline}
                  onChange={(e) =>
                    handleInputChange("jobApplicationDeadline", e.target.value)
                  }
                  className="blue-form-input"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="blue-form-section">
            <label className="blue-form-label">{t.description} *</label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) =>
                handleInputChange("jobDescription", e.target.value)
              }
              placeholder={t.descriptionPlaceholder}
              className="blue-form-textarea"
              rows="6"
              required
            />
          </div>

          {/* Requirements */}
          <div className="blue-form-section">
            <label className="blue-form-label">{t.requirements}</label>
            <div className="blue-requirements-input-group">
              <input
                type="text"
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.requirementPlaceholder}
                className="blue-requirement-input"
              />
              <button
                type="button"
                onClick={addRequirement}
                className="blue-add-requirement-btn"
              >
                <FaPlus />
              </button>
            </div>

            <div className="blue-requirements-list">
              {formData.jobRequirements.map(
                (req, index) =>
                  req && (
                    <div key={index} className="blue-requirement-tag">
                      <span className="blue-requirement-text">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="blue-remove-requirement"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Salary Information */}
          <div className="blue-form-section">
            <h4 className="blue-section-subtitle">
              <FaMoneyBillWave />
              {t.salary}
            </h4>

            <div className="blue-salary-grid">
              <div className="blue-form-group">
                <label className="blue-form-label">{t.minSalary}</label>
                <input
                  type="number"
                  value={formData.jobSalary.min}
                  onChange={(e) => handleSalaryChange("min", e.target.value)}
                  className="blue-form-input"
                  min="0"
                />
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">{t.maxSalary}</label>
                <input
                  type="number"
                  value={formData.jobSalary.max}
                  onChange={(e) => handleSalaryChange("max", e.target.value)}
                  className="blue-form-input"
                  min="0"
                />
              </div>

              <div className="blue-form-group">
                <label className="blue-form-label">{t.currency}</label>
                <select
                  value={formData.jobSalary.currency}
                  onChange={(e) =>
                    handleSalaryChange("currency", e.target.value)
                  }
                  className="blue-form-select"
                >
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="blue-form-group blue-checkbox-group">
                <label className="blue-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.jobSalary.negotiable}
                    onChange={(e) =>
                      handleSalaryChange("negotiable", e.target.checked)
                    }
                    className="blue-checkbox-input"
                  />
                  <span className="blue-checkmark"></span>
                  {t.negotiable}
                </label>
              </div>
            </div>

            {/* Payment Duration */}
            <div className="blue-payment-duration">
              <label className="blue-form-label">{t.paymentDuration}</label>
              <div className="blue-duration-options">
                {paymentDurations.map((duration) => (
                  <button
                    key={duration.value}
                    type="button"
                    className={`blue-duration-option ${
                      formData.jobPaymentDuration[duration.value]
                        ? "blue-active"
                        : ""
                    }`}
                    onClick={() => handlePaymentDurationChange(duration.value)}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="blue-form-actions">
            <button
              type="button"
              onClick={clearForm}
              className="blue-secondary-btn"
            >
              <FaTrash />
              {t.clear}
            </button>

            <button type="button" className="blue-secondary-btn">
              <FaSave />
              {t.draft}
            </button>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting || userTokens <= 0}
              className="blue-primary-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="blue-spinner"></div>
                  {t.saving}
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  {t.postJob}
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* My Jobs Tab */
        <div className="blue-my-jobs-section">
          <h3 className="blue-section-title">{t.yourPostedJobs}</h3>

          {userPostedJobs.length === 0 ? (
            <div className="blue-no-jobs">
              <div className="blue-no-jobs-icon">💼</div>
              <h4 className="blue-no-jobs-title">{t.noJobsPosted}</h4>
              <p className="blue-no-jobs-message">
                Start by creating your first job posting!
              </p>
            </div>
          ) : (
            <div className="blue-jobs-list">
              {userPostedJobs.map((job) => (
                <div key={job.jobId} className="blue-job-item">
                  <div className="blue-job-item-header">
                    <h4 className="blue-job-item-title">{job.jobTitle}</h4>
                    <span className={`blue-job-status ${job.jobStatus}`}>
                      {job.jobStatus === "active" ? t.active : t.closed}
                    </span>
                  </div>
                  <div className="blue-job-item-details">
                    <span className="blue-job-company">{job.jobCompany}</span>
                    <span className="blue-job-detail-separator">•</span>
                    <span className="blue-job-location">{job.jobLocation}</span>
                    <span className="blue-job-detail-separator">•</span>
                    <span className="blue-job-applicants">
                      {job.jobApplicants.length} {t.applicants}
                    </span>
                  </div>
                  <div className="blue-job-item-actions">
                    <button className="blue-action-btn blue-edit">
                      <FaEdit />
                      {t.edit}
                    </button>
                    <button className="blue-action-btn blue-view">
                      <FaEye />
                      {t.view}
                    </button>
                    <button className="blue-action-btn blue-delete">
                      <FaTrash />
                      {t.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}