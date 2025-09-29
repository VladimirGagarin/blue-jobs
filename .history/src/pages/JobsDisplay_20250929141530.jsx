// src/pages/JobsDisplay.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useLanguage } from "../components/useUser";
import "./JobDisplay.css";
import { FaSearch, FaBriefcase, FaPlus, FaHome } from "react-icons/fa";
import LoadingPage from "../components/LoadingPage";

export default function JobsDisplay() {
  const { user } = useUser();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
    const [activeTab, setActiveTab] = useState("get"); // "get" or "post"
    const hasDetectedLanguage = useRef(false); // Track if we've already detected
      const [loading, setLoading] = useState(true);
    
      // Detect user language and set preference with localStorage check
      useEffect(() => {
        if (hasDetectedLanguage.current) return; // Skip if already detected
    
        const detectUserLanguage = () => {
          // 1. First check localStorage for user preference
          const savedLanguage = localStorage.getItem("preferredLanguage");
          if (savedLanguage === "fr" || savedLanguage === "en") {
            if (language !== savedLanguage) {
              setLanguage(savedLanguage);
              console.log(`Using saved language preference: ${savedLanguage}`);
            }
            hasDetectedLanguage.current = true;
            return;
          }
    
          // 2. If no saved preference, detect from browser
          const browserLanguage =
            navigator.language || navigator.userLanguage || "en";
          const primaryLanguage = browserLanguage.split("-")[0];
    
          if (primaryLanguage === "fr" || primaryLanguage === "en") {
            setLanguage(primaryLanguage);
            // Save the detected language to localStorage for future visits
            localStorage.setItem("preferredLanguage", primaryLanguage);
            console.log(`Detected and saved user language: ${primaryLanguage}`);
            hasDetectedLanguage.current = true;
          }
        };
    
        detectUserLanguage();
      }, [setLanguage, language]);
    
    
     useEffect(() => {
        const handleLoad = () => {
          setTimeout(() => setLoading(false), 8000);
        };
    
        if (document.readyState === "complete") {
          handleLoad();
        } else {
          window.addEventListener("load", handleLoad);
        }
    
        return () => window.removeEventListener("load", handleLoad);
      }, []);

  // Translations
  const translations = {
    en: {
      pageTitle: "Jobs | Blue Jobs",
      getJobs: "Find Jobs",
      postJobs: "Post Jobs",
      searchPlaceholder: "Search for jobs...",
      noJobsFound: "No jobs found",
    apply: "Apply",
      post: "Post",
      postJob: "Post New Job",
      backToHome: "Back to Home",
      // Get Jobs Tab
      availableJobs: "Available Jobs",
      filterBy: "Filter by",
      location: "Location",
      category: "Category",
      salary: "Salary",
      // Post Jobs Tab
      postNewJob: "Post New Job",
      jobTitle: "Job Title",
      company: "Company",
      description: "Description",
      requirements: "Requirements",
      submit: "Submit Job",
      yourJobs: "Your Posted Jobs",
      // Status
      applied: "Applied",
      posted: "Posted",
      tokens: "tokens",
    },
    fr: {
      pageTitle: "Emplois | Blue Jobs",
      getJobs: "Trouver des Emplois",
      postJobs: "Publier des Emplois",
      searchPlaceholder: "Rechercher des emplois...",
      noJobsFound: "Aucun emploi trouvé",
        apply: "Postuler",
      post: "Pu"
      postJob: "Publier un Nouvel Emploi",
      backToHome: "Retour à l'Accueil",
      // Get Jobs Tab
      availableJobs: "Emplois Disponibles",
      filterBy: "Filtrer par",
      location: "Localisation",
      category: "Catégorie",
      salary: "Salaire",
      // Post Jobs Tab
      postNewJob: "Publier un Nouvel Emploi",
      jobTitle: "Titre du Poste",
      company: "Entreprise",
      description: "Description",
      requirements: "Exigences",
      submit: "Soumettre l'Emploi",
      yourJobs: "Vos Emplois Publiés",
      // Status
      applied: "Postulé",
      posted: "Publié",
      tokens: "jetons",
    },
    sw: {
      pageTitle: "Kazi | Blue Jobs",
      getJobs: "Tafuta Kazi",
      postJobs: "Tangaza Kazi",
      searchPlaceholder: "Tafuta kazi...",
      noJobsFound: "Hakuna kazi zilizopatikana",
      apply: "Omba",
      postJob: "Tangaza Kazi Mpya",
      backToHome: "Rudi Nyumbani",
      // Get Jobs Tab
      availableJobs: "Kazi Zilizopo",
      filterBy: "Chuja kwa",
      location: "Eneo",
      category: "Aina",
      salary: "Mshahara",
      // Post Jobs Tab
      postNewJob: "Tangaza Kazi Mpya",
      jobTitle: "Kichwa cha Kazi",
      company: "Kampuni",
      description: "Maelezo",
      requirements: "Mahitaji",
      submit: "Wasilisha Kazi",
      yourJobs: "Kazi Ulizotangaza",
      // Status
      applied: "Umeomba",
      posted: "Umetangaza",
      tokens: "tokeni",
    },
  };

  const t = translations[language] || translations.en;

  // Mock data for jobs (replace with actual API calls)
  const [availableJobs, setAvailableJobs] = useState([
    {
      id: "job1",
      title: "Software Developer",
      company: "Tech Solutions Ltd",
      location: "Nairobi",
      salary: "KSh 120,000 - 180,000",
      description: "We are looking for a skilled software developer...",
      requirements: ["React", "Node.js", "MongoDB"],
      postedDate: "2024-01-15",
    },
    {
      id: "job2",
      title: "Marketing Manager",
      company: "Creative Agency",
      location: "Mombasa",
      salary: "KSh 80,000 - 120,000",
      description: "Join our dynamic marketing team...",
      requirements: ["Digital Marketing", "SEO", "Social Media"],
      postedDate: "2024-01-14",
    },
  ]);

  const [userPostedJobs, setUserPostedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Set active tab based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "post" || type === "get") {
      setActiveTab(type);
    }
  }, [location.search]);

  // Update document title
  useEffect(() => {
    document.title = t.pageTitle;
  }, [language, t.pageTitle]);

  // Filter jobs based on search term
  const filteredJobs = availableJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyJob = (jobId) => {
    if (user.userApplyTokens <= 0) {
      alert(
        language === "fr"
          ? "Vous n'avez plus de jetons d'application"
          : language === "sw"
          ? "Huna tokeni za kuomba tena"
          : "You have no apply tokens left"
      );
      return;
    }
    // Handle job application logic
    console.log("Applying to job:", jobId);
    // Deduct token, update user, etc.
  };

  const handlePostJob = () => {
    if (user.userPostTokens <= 0) {
      alert(
        language === "fr"
          ? "Vous n'avez plus de jetons de publication"
          : language === "sw"
          ? "Huna tokeni za kutangaza tena"
          : "You have no post tokens left"
      );
      return;
    }
    // Handle job posting logic
    console.log("Posting new job");
  };

  return (
      <div className="jobs-display-container">
          {loading && <LoadingPage message={t.pageTitle} />}
      {/* Header */}
      <header className="jobs-header">
        <button className="home-btn" onClick={() => navigate("/")}>
          <FaHome /> {t.backToHome}
        </button>
        <h1>Blue Jobs</h1>
        <div className="user-tokens">
          <span>
            {t.apply}: {user.userApplyTokens} {t.tokens}
          </span>
          <span>
            {t.post}: {user.userPostTokens} {t.tokens}
          </span>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="jobs-tabs">
        <button
          className={`tab-button ${activeTab === "get" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("get");
            navigate("/job?type=get");
          }}
        >
          <FaBriefcase /> {t.getJobs}
        </button>
        <button
          className={`tab-button ${activeTab === "post" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("post");
            navigate("/job?type=post");
          }}
        >
          <FaPlus /> {t.postJobs}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "get" ? (
          <div className="get-jobs-tab">
            {/* Search Bar */}
            <div className="search-section">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Jobs List */}
            <div className="jobs-list">
              <h2>{t.availableJobs}</h2>
              {filteredJobs.length === 0 ? (
                <div className="no-jobs">
                  <p>{t.noJobsFound}</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
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
                      className={`apply-btn ${user.userApplyTokens <=0 ? "red-btn": ""}`}
                      onClick={() => handleApplyJob(job.id)}
                      disabled={user.userApplyTokens <= 0}
                    >
                      {t.apply}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="post-jobs-tab">
            {/* Post Job Form */}
            <div className="post-job-section">
              <h2>{t.postNewJob}</h2>
              <div className="post-job-form">
                <input type="text" placeholder={t.jobTitle} />
                <input type="text" placeholder={t.company} />
                <input type="text" placeholder={t.location} />
                <input type="text" placeholder={t.salary} />
                <textarea placeholder={t.description} rows="4" />
                <textarea placeholder={t.requirements} rows="3" />
                <button
                  className={"submit-job-btn"}
                  onClick={handlePostJob}
                  disabled={user.userPostTokens <= 0}
                >
                  {t.submit}
                </button>
              </div>
            </div>

            {/* User's Posted Jobs */}
            <div className="posted-jobs-section">
              <h2>{t.yourJobs}</h2>
              {userPostedJobs.length === 0 ? (
                <p>
                  {language === "fr"
                    ? "Vous n'avez publié aucun emploi"
                    : language === "sw"
                    ? "Hujatangaza kazi yoyote"
                    : "You haven't posted any jobs"}
                </p>
              ) : (
                userPostedJobs.map((job) => (
                  <div key={job.id} className="posted-job-card">
                    <h4>{job.title}</h4>
                    <p>
                      {job.company} - {job.location}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
