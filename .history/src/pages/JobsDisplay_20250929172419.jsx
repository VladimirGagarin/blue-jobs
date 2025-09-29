// src/pages/JobsDisplay.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useLanguage } from "../components/useUser";
import "./JobsDisplay.css";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/footer.jsx";
import JobCard from "../components/JobCard.jsx";
import JobForm from "../components/JobForm.jsx";
import {mockedjobs} from "../Utils/Jobs.js";
import JobsHeader from "../components/JobsHeader/JobsHeader.jsx";
import JobsTabs from "../components/JobsTabs/JobsTabs.jsx";

export default function JobsDisplay() {
  const { user } = useUser();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("get");
  const hasDetectedLanguage = useRef(false);
  const [loading, setLoading] = useState(true);
  const  jobList = mockedjobs;

  // Mock jobs data
    const [availableJobs, setAvailableJobs] = useState([]);
    const [currentJobsFilter, setCurrentJobsFilter] = useState("all"); // filter jobs  based  on location, high paid , shift, newest,


    const [userPostedJobs, setUserPostedJobs] = useState([]);
    
    useEffect(() => {
        const filterjobs = {
            lo
         
        }

    }, [currentJobs])

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
      {/* Header with Navigation and Tokens */}
      <JobsHeader
        user={user}
        language={language}
        onNavigateHome={() => navigate("/")}
      />

      {/* Tabs Navigation */}
      <JobsTabs
        activeTab={activeTab}
        language={language}
        onTabChange={(tab) => {
          setActiveTab(tab);
          navigate(`/job?type=${tab}`);
        }}
      />

      {/* Main Content */}
      <main className="jobs-main-content">
        {activeTab === "get" ? (
          <JobList
            jobs={availableJobs}
            language={language}
            onApplyJob={handleApplyJob}
            onViewJobDetails={handleViewJobDetails}
            userTokens={user.userApplyTokens}
          />
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
