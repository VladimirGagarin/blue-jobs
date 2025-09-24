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
    { abb: "KE", name: "Kenya", nationality: {en:"Kenyan", fr:"Kényan"} },
    { abb: "UG", name: "Uganda", nationality: {en:"Ugandan", fr:"Ougandais"} },
    { abb: "TZ", name: "Tanzania", nationality: {en:"Tanzanian", fr:"Tanzanien"} },
    { abb: "RW", name: "Rwanda", nationality: {en:"Rwandan", fr:"Rwandais"} },
    { abb: "BI", name: "Burundi", nationality: {en:"Burundian", fr:"Burundais"} },
    { abb: "SS", name: "South Sudan", nationality: {en:"South Sudanese", fr:"Soudanais"} },
    { abb: "ET", name: "Ethiopia", nationality: {en:"Ethiopian", fr:"Éthiopien"} },
    { abb: "SD", name: "Sudan", nationality: {en:"Sudanese", fr:"Soudanais"} },
    { abb: "SO", name: "Somalia", nationality: {en:"Somali", fr:"Somalien"} },
    { abb: "NG", name: "Nigeria", nationality: {en:"Nigerian", fr:"Nigérian"} },
    { abb: "GH", name: "Ghana", nationality: {en:"Ghanaian", fr:"Ghanéen"} },
    { abb: "CI", name: "Côte d'Ivoire", nationality: {en:"Ivorian", fr:"Ivoirien"} },
    { abb: "SN", name: "Senegal", nationality: {en:"Senegalese", fr:"Sénégalais"} },
    { abb: "CM", name: "Cameroon", nationality: {en:"Cameroonian", fr:"Camerounais"} },
    { abb: "ZA", name: "South Africa", nationality: {en:"South African", fr:"Sud-Africain"} },
    { abb: "DZ", name: "Algeria", nationality: {en:"Algerian", fr:"Algérien"} },
    { abb: "MA", name: "Morocco", nationality: {en:"Moroccan", fr:"Marocain"} },
    { abb: "TN", name: "Tunisia", nationality: {en:"Tunisian", fr:"Tunisien"} },
    { abb: "EG", name: "Egypt", nationality: {en:"Egyptian", fr:"Égyptien"} },
  // Europe
    { abb: "FR", name: "France", nationality: {en:"French", fr:"Français"} },
    { abb: "BE", name: "Belgium", nationality: {en:"Belgian", fr:"Belge"} },
    { abb: "CH", name: "Switzerland", nationality: {en:"Swiss", fr:"Suisse"} },
    { abb: "GB", name: "United Kingdom", nationality: {en:"British", fr:"Britannique"} },
    { abb: "DE", name: "Germany", nationality: {en:"German", fr:"Allemand"} },
    { abb: "IT", name: "Italy", nationality: {en:"Italian", fr:"Italien"} },
  ];
}

export function userCountryOfResidence() {
  const search = async () => {
    try {
      const res = await fetch("https://ipapi.co/country/");
      const country = await res.text();
      con
      return country;
    } catch (e) {
      console.warn("Could not fetch location, using default", e);
      // return default country kenya
      return "KE";
    }
  };
  return search();
}
