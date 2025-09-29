// src/pages/JobsDisplay.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useLanguage } from "../components/useUser";
import "./JobDisplay.css";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/footer.jsx";
import JobCard from "../components/JobCard.jsx";
import JobForm from "../components/JobForm.jsx";
import {mockedjobs} from "../Utils/Jobs.js";
import JobsHeader from "../components/JobHeader.jsx";
import JobsTabs from "../components/JobTabs.jsx";

export default function JobsDisplay() {
  const { user } = useUser();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("get");
  const hasDetectedLanguage = useRef(false);
  const [loading, setLoading] = useState(true);
  const jobList = [...mockedjobs];

  const [availableJobs, setAvailableJobs] = useState([]);
  const [currentJobsFilter, setCurrentJobsFilter] = useState("highPaid");

  const [userPostedJobs, setUserPostedJobs] = useState([]);

  const filterjobs = {
    byId: (id) => jobList.filter((j) => j.jobId === id),
    byTitle: (title) =>
      jobList.filter((j) =>
        j.jobTitle.toLowerCase().includes(title.toLowerCase())
      ),
    byCompany: (company) =>
      jobList.filter((j) =>
        j.jobCompany.toLowerCase().includes(company.toLowerCase())
      ),
    byLocation: (area) =>
      jobList.filter((j) =>
        j.jobLocation.toLowerCase().includes(area.toLowerCase())
      ),
    byType: (type) => jobList.filter((j) => j.jobType === type),
    byShift: (shift) => jobList.filter((j) => j.jobShift === shift),
    bySkill: (skill) =>
      jobList.filter((j) =>
        j.jobRequirements.some((r) =>
          r.toLowerCase().includes(skill.toLowerCase())
        )
      ),
    byStatus: (status) => jobList.filter((j) => j.jobStatus === status),
    byPostedAfter: (date) =>
      jobList.filter((j) => new Date(j.jobDatePosted) >= new Date(date)),
    byDeadlineBefore: (date) =>
      jobList.filter(
        (j) => new Date(j.jobApplicationDeadline) <= new Date(date)
      ),
    highPaid: (minSalary = 1000) =>
      jobList.filter((j) => j.jobSalary.max >= minSalary),
    negotiable: () => jobList.filter((j) => j.jobSalary.negotiable),
    withApplicants: (min) =>
      jobList.filter((j) => j.jobApplicants.length >= min),
    noApplicants: () => jobList.filter((j) => j.jobApplicants.length === 0),
    reported: () => jobList.filter((j) => j.jobReports.length > 0),
    byLandmark: (place) =>
      jobList.filter((j) =>
        Object.values(j.jobLocationObservedLandmarks || {}).some(
          (l) => l && l.toLowerCase().includes(place.toLowerCase())
        )
      ),
  };

  // Run filter whenever filter changes
  useEffect(() => {
    if (filterjobs[currentJobsFilter]) {
      setAvailableJobs(filterjobs[currentJobsFilter]());
    } else {
      setAvailableJobs(jobList);
    }
  }, [currentJobsFilter, jobList]);

    useEffect(() => {
        const searchParam = new URLSearchParams(location.search);
        const type = searchParam.get("type");
        if (type & (type === "get" || type === "post")) {
            set
        }
    }, [])

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

  // Set active tab based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "post" || type === "get") {
      setActiveTab(type);
    }
  }, [location.search]);

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
          <div className="jobs-list">
            {availableJobs.length > 0 ? (
              availableJobs.map((job) => (
                <JobCard
                  key={job.jobId}
                  job={job}
                  language={language}
                  onApplyJob={handleApplyJob}
                  onViewJobDetails={handleViewJobDetails}
                  userTokens={user.userApplyTokens}
                />
              ))
            ) : (
              <p>{language === "fr" ? "" : "No jobs found for this filter."}</p>
            )}
          </div>
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
