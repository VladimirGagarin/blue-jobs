// contexts/UserData.js
export const mockUsers =[
  {
    userId: "u12345",
    userName: "Kelvin Einstein",
    userNationalId: "12345678",
    userEmail: "kevo@email.com",
    userPhoneNumber: "+254712345678",
    userNationality: "Kenyan",

    userIsPremium: false,
    userJobPostPermit: true,
    userApplyPermit: true,

    userPostedJobs: ["bj_101A", "bj_102D"],
    userAppliedJobs: ["bj_150E", "bj_151H"],

    userPostTokens: 3,
    userApplyTokens: 5,

    userDateCreated: "2025-09-18T12:00:00Z",
    userPassportPhoto: "https://bluejobs.com/uploads/u12345.jpg",
    userPassword: "!LoveCoding2025",
    userRole: "basic",
  },
  {
    userId: "u12346",
    userName: "Lydiah Wanjiku",
    userNationalId: "23456789",
    userEmail: "lydiah@email.com",
    userPhoneNumber: "+254711223344",
    userNationality: "Kenyan",

    userIsPremium: true,
    userJobPostPermit: true,
    userApplyPermit: true,

    userPostedJobs: ["bj_110A"],
    userAppliedJobs: ["bj_120C"],

    userPostTokens: 5,
    userApplyTokens: 2,

    userDateCreated: "2025-09-19T09:30:00Z",
    userPassportPhoto: "https://bluejobs.com/uploads/u12346.jpg",
    userPassword: "Pass@Lydiah2025",
    userRole: "basic",
  },
  {
    userId: "u12347",
    userName: "Joseph Njoroge",
    userNationalId: "34567890",
    userEmail: "joseph@email.com",
    userPhoneNumber: "+254722334455",
    userNationality: "Kenyan",

    userIsPremium: false,
    userJobPostPermit: true,
    userApplyPermit: true,
   

    userPostedJobs: [],
    userAppliedJobs: ["bj_130B", "bj_131F"],

    userPostTokens: 0,
    userApplyTokens: 4,

    userDateCreated: "2025-09-19T15:20:00Z",
    userPassportPhoto: "https://bluejobs.com/uploads/u12347.jpg",
    userPassword: "Njogz#2025",
    userRole: "basic",
  },
  {
    userId: "u12348",
    userName: "Maria Goretti",
    userNationalId: "45678901",
    userEmail: "maria@email.com",
    userPhoneNumber: "+254733445566",
    userNationality: "Kenyan",

    userIsPremium: true,
    userJobPostPermit: false, // blocked from posting jobs
    userApplyPermit: true,
 

    userPostedJobs: [],
    userAppliedJobs: ["bj_140G"],

    userPostTokens: 0,
    userApplyTokens: 1,

    userDateCreated: "2025-09-20T08:10:00Z",
    userPassportPhoto: "https://bluejobs.com/uploads/u12348.jpg",
    userPassword: "Goretti*Faith2025",
    userRole: "basic",
  },
  {
    userId: "u12349",
    userName: "Sr. Mary Japheth",
    userNationalId: "56789012",
    userEmail: "mary.japheth@email.com",
    userPhoneNumber: "+254744556677",
    userNationality: "Kenyan",

    userIsPremium: false,
    userJobPostPermit: true,
    userApplyPermit: false, // blocked from applying
  

    userPostedJobs: ["bj_160K"],
    userAppliedJobs: [],

    userPostTokens: 1,
    userApplyTokens: 0,

    userDateCreated: "2025-09-21T18:40:00Z",
    userPassportPhoto: "https://bluejobs.com/uploads/u12349.jpg",
    userPassword: "SrJaphet#2025",
    userRole: "basic",
  },
  {
    // admin user

  }
  
];

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
    // only the user who posted the job and job id exists and is premium can delete
    return user?.userId !== "guest" && user?.userIsPremium && user?.userJobPostPermit && job?.jobId === user?.userPostedJobs?.find(j => j === job?.jobId) && job?.jobId !== null;
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
    // any user can report a job and is not guest and job id exists
    return user?.userId !== "guest" && user?.userId !== null && job?.jobId !== null;
  },

};