// src/pages/JobsDisplay.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useLanguage } from "../components/useUser";
import "./JobDisplay.css";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/footer.jsx";
import JobCard from "../components/JobCard.jsx";
import JobForm from "../components/JobForm.jsx";
import { mockedjobs } from "../Utils/jobs.js";
import JobsHeader from "../components/JobHeader.jsx";
import JobsTabs from "../components/JobTabs.jsx";
import JobFilters from "../components/JobFilters.jsx";

export default function JobsDisplay() {
  const { user } = useUser();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("get");
  const hasDetectedLanguage = useRef(false);
  const [loading, setLoading] = useState(true);

  const [availableJobs, setAvailableJobs] = useState([]);
  const [currentJobsFilter, setCurrentJobsFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");

  const [userPostedJobs, setUserPostedJobs] = useState([]);

  // Filter functions
  const filterJobs = {
    all: () => mockedjobs,
    highPaid: () => mockedjobs.filter((job) => job.jobSalary.max >= 1000),
    negotiable: () => mockedjobs.filter((job) => job.jobSalary.negotiable),
    noApplicants: () =>
      mockedjobs.filter((job) => job.jobApplicants.length === 0),
    byLocation: (location) =>
      mockedjobs.filter((job) =>
        job.jobLocation.toLowerCase().includes(location.toLowerCase())
      ),
    byType: (type) => mockedjobs.filter((job) => job.jobType === type),
    bySearch: (term) =>
      mockedjobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(term.toLowerCase()) ||
          job.jobCompany.toLowerCase().includes(term.toLowerCase()) ||
          job.jobRequirements.some((req) =>
            req.toLowerCase().includes(term.toLowerCase())
          )
      ),
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let filteredJobs = mockedjobs;

    // Apply search filter
    if (searchTerm) {
      filteredJobs = filterJobs.bySearch(searchTerm);
    }

    // Apply location filter
    if (filterLocation) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobLocation.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    // Apply job type filter
    if (filterType) {
      filteredJobs = filteredJobs.filter((job) => job.jobType === filterType);
    }

    // Apply preset filters
    if (currentJobsFilter !== "all" && filterJobs[currentJobsFilter]) {
      filteredJobs = filteredJobs.filter((job) =>
        filterJobs[currentJobsFilter]().includes(job)
      );
    }

    setAvailableJobs(filteredJobs);
  }, [currentJobsFilter, searchTerm, filterLocation, filterType]);

  // Set active tab from URL
  useEffect(() => {
    const searchParam = new URLSearchParams(location.search);
    const type = searchParam.get("type");

    if (type && (type === "get" || type === "post")) {
      setActiveTab(type);
    } else {
      setActiveTab("get");
    }
  }, [location]);

  // Language detection
  useEffect(() => {
    if (hasDetectedLanguage.current) return;

    const detectUserLanguage = () => {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (
        savedLanguage === "fr" ||
        savedLanguage === "en" ||
        savedLanguage === "sw"
      ) {
        if (language !== savedLanguage) {
          setLanguage(savedLanguage);
        }
        hasDetectedLanguage.current = true;
        return;
      }

      const browserLanguage =
        navigator.language || navigator.userLanguage || "en";
      const primaryLanguage = browserLanguage.split("-")[0];

      if (
        primaryLanguage === "fr" ||
        primaryLanguage === "en" ||
        primaryLanguage === "sw"
      ) {
        setLanguage(primaryLanguage);
        localStorage.setItem("preferredLanguage", primaryLanguage);
        hasDetectedLanguage.current = true;
      }
    };

    detectUserLanguage();
  }, [setLanguage, language]);

  // Loading effect
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Update document title
  useEffect(() => {
    const getTabTitle = () => {
      if (activeTab === "get") {
        return language === "fr"
          ? "Trouver des Emplois"
          : language === "sw"
          ? "Tafuta Kazi"
          : "Find Jobs";
      } else {
        return language === "fr"
          ? "Publier des Emplois"
          : language === "sw"
          ? "Tangaza Kazi"
          : "Post Jobs";
      }
    };

    const tabTitle = getTabTitle();
    document.title = `${tabTitle} | Blue Jobs`;
  }, [activeTab, language]);

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
    console.log("Applying to job:", jobId);
    // Handle job application logic
  };

  const handlePostJob = (jobData) => {
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
    console.log("Posting new job:", jobData);
    // Handle job posting logic
  };

  const handleViewJobDetails = (jobId) => {
    navigate(`/job?detail=${jobId}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterLocation("");
    setFilterType("");
    setCurrentJobsFilter("all");
  };

  if (loading) {
    return <LoadingPage message={document.title} />;
  }

  return (
    <div className="jobs-display">
      <JobsHeader
        user={user}
        language={language}
        onNavigateHome={() => navigate("/")}
      />

      <JobsTabs
        activeTab={activeTab}
        language={language}
        onTabChange={(tab) => {
          setActiveTab(tab);
          navigate(`/job?type=${tab}`);
        }}
      />

      <main className="jobs-main-content">
        {activeTab === "get" ? (
          <>
            <JobFilters
              language={language}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterLocation={filterLocation}
              onLocationChange={setFilterLocation}
              filterType={filterType}
              onTypeChange={setFilterType}
              currentFilter={currentJobsFilter}
              onFilterChange={setCurrentJobsFilter}
              onClearFilters={handleClearFilters}
              jobCount={availableJobs.length}
            />

            <div className="jobs-list-container">
              {availableJobs.length > 0 ? (
                <div className="jobs-grid">
                  {availableJobs.map((job) => (
                    <JobCard
                      key={job.jobId}
                      job={job}
                      language={language}
                      onApplyJob={handleApplyJob}
                      onViewJobDetails={handleViewJobDetails}
                      userTokens={user.userApplyTokens}
                      user
                    />
                  ))}
                </div>
              ) : (
                <div className="no-jobs-found">
                  <h3>
                    {language === "fr"
                      ? "Aucun emploi trouvé"
                      : language === "sw"
                      ? "Hakuna kazi zilizopatikana"
                      : "No jobs found"}
                  </h3>
                  <p>
                    {language === "fr"
                      ? "Essayez de modifier vos critères de recherche"
                      : language === "sw"
                      ? "Badilisha vigezo vyako vya utafutaji"
                      : "Try adjusting your search criteria"}
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="clear-filters-btn"
                  >
                    {language === "fr"
                      ? "Effacer les filtres"
                      : language === "sw"
                      ? "Futa Vichujio"
                      : "Clear Filters"}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <JobForm
            language={language}
            onSubmitJob={handlePostJob}
            userPostedJobs={userPostedJobs}
            userTokens={user.userPostTokens}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
