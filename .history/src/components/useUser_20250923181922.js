// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import { LanguageContext } from "../contexts/LanguageContext";

export function useUser() {
  return useContext(UserContext);
}

export const useLanguage = () => useContext(LanguageContext);



export const elligibilities = {
  userCanPostJob: (user) => {
    // users with id, post permit, tokens and premium status can post
    return user?.userJobPostPermit && user?.userPostTokens > 0 && user?.userIsPremium && user?.userId !== "guest" && user?.userId !== null;
  },
  userCanApplyJob: (user) => {
    // users with id, apply permit, tokens and premium status can apply
    return user?.userApplyPermit && user?.userApplyTokens > 0 && user?.userIsPremium && user?.userId !== "guest" && user?.userId !== null;
  },
  userCanViewJob: (user) => {
    // anyone including guests can view jobs
    return user?.userId !== null;
  },
  userCanEditJob: (user, job) => {
    // only the user who posted the job 
    return user?.userId !== "guest" && user?.userId !== null && user?.userJobPostPermit && job?.jobId === user?.userPostedJobs?.find(j => j === job?.jobId) && job?.jobId !== null;
  },
  userCanDeleteJob: (user, job) => {
    // only the user who posted the job and job id exists or user role is admin
    return user?.userId !== "guest" && user?.userId !== null && job?.jobId === user?.userPostedJobs?.find(j => j === job?.jobId) && job?.jobId !== null || user?.userRole === "admin";
  },
  userDeniedToPostJob: (user) => {
    // users with no post permit or no tokens or not premium cannot post or id
    return !user?.userJobPostPermit || user?.userPostTokens === 0 || !user?.userIsPremium || user?.userId === "guest" || user?.userId === null;
  },
  userDeniedToApplyJob: (user) => {
    // users with no apply permit or no tokens or not premium cannot apply or id
    return !user?.userApplyPermit || user?.userApplyTokens === 0 || !user?.userIsPremium || user?.userId === "guest" || user?.userId === null;
  },
  userIsGuest: (user) => {
    // guests have no permissions to post or apply for jobs
    return user?.userId === "guest" || user?.userId === null;
  },
  userIsPremium: (user) => {
    // only premium users can post and apply for jobs
    return user?.userIsPremium === true && user?.userId !== "guest" && user?.userId !== null && user?.userApplyPermit && user?.userJobPostPermit && user?.userApplyTokens > 0 && user?.userPostTokens > 0;
  },
  userCanReportJob: (user, job) => {
    // any user can report a job and is not guest and job id exists or user role is admin
    return user?.userId !== "guest" && user?.userId !== null && job?.jobId !== null || user?.userRole === "admin";
  },

};


export function browserCountryAbbreviations() {
  return [
  // Africa
    { abb: "KE", name: "Kenya", nationality: "Kenyan" },
    { abb: "UG", name: "Uganda", nationality: "Ugandan" },
    { abb: "TZ", name: "Tanzania", nationality: "Tanzanian" },
    { abb: "RW", name: "Rwanda", nationality: "Rwandan" },
    { abb: "BI", name: "Burundi", nationality: "Burundian" },
    { abb: "SS", name: "South Sudan", nationality: "South Sudanese" },
    { abb: "ET", name: "Ethiopia", nationality: "Ethiopian" },
    { abb: "SD", name: "Sudan", nationality: "Sudanese" },
    { abb: "SO", name: "Somalia", nationality: "Somali" },
    { abb: "NG", name: "Nigeria", nationality: "Nigerian" },
    { abb: "GH", name: "Ghana", nationality: "Ghanaian" },
    { abb: "CI", name: "Côte d'Ivoire", nationality: "Ivorian" },
    { abb: "SN", name: "Senegal", nationality: "Senegalese" },
  ];
}

export function userCountryOfResidence() {
  const search = async () => {
    try {
      const res = await fetch("https://ipapi.co/country/");
      const country = await res.text();
      return country;
    } catch (e) {
      console.warn("Could not fetch location, using default", e);
      // return default country kenya
      return "KE";
    }
  };
  return search();
}
