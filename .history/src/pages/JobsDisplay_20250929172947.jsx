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
    const jobList = [...mockedjobs];
    

    //  {
    // jobId: "bj_100A",
    // jobTitle: "Frontend Developer",
    // jobCompany: "Tech Solutions Ltd",
    // jobLocation: "Nairobi, Kenya",
    // jobType: "Full-time", // Full-time, Part-time, Contract, Internship
    // jobShift: "Day", // Day, Night, Flexible
    //     jobDescription: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.",
    //     jobRequirements: [
    //     // tags should be in tags
    //   "Proven experience as a Frontend Developer",
    //         "Familiarity with HTML, CSS, JavaScript, and React",
    //         "Experience with responsive and adaptive design",
    //         "Good problem-solving skills and attention to detail"
    // ],
    // jobPostedBy: "u12345",// userId of the poster
    // jobDatePosted: "2025-10-01T10:00:00Z",
    //     jobApplicationDeadline: "2025-10-31T23:59:59Z",
    //     jobStatus: "active" // active, closed, filled
    // ,
    // jobPaymentDuration: {
    // year: false,
    // month: false,
    // week: true,
    // day: false
    // }, 
    // jobSalary: {
    //     min: 800,
    //     max: 1200,
    //     currency: "USD", // KES or EURO //
    //     negotiable: true,
    //     },
    //     jobApplicants: ["u12346", "u12347"], // userIds of applicants
    //     jobReports: [], // userIds of reporters
    //     jobLocationObservedLandmarks: {
    //         church: "St. Mary's Cathedral",
    //         estate: "Westlands",
    //         street: "Kimathi Street",
    //         city: "Nairobi",
    //         country: "Kenya",
    //         mosque: null,
    //         synagogue: null,
    //         temple: null,
    //         other: null,
    //         road: null,
    //         market: "Nairobi Central Market",
    //         hospital: "Nairobi Hospital",
    //         school: "Nairobi Primary School"
    //     },

    // },

  // Mock jobs data
    const [availableJobs, setAvailableJobs] = useState([]);
    const [currentJobsFilter, setCurrentJobsFilter] = useState("all"); // filter jobs  based  on location, high paid , shift, newest,


    const [userPostedJobs, setUserPostedJobs] = useState([]);
    
    useEffect(() => {
        const filterjobs = {
            location: (area) => jobList.filter(j => j.location.includes(area)),
            higPaid: () => jobList.filter(j => j.jobSalary.max >= 100),
            
         
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
