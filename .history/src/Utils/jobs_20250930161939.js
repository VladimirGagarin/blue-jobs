export const mockedjobs = [
    {
    jobId: "bj_100A",
    jobTitle: "Frontend Developer",
    jobCompany: "Tech Solutions Ltd",
    jobLocation: "Nairobi, Kenya",
    jobType: "Full-time", // Full-time, Part-time, Contract, Internship
    jobShift: "Day", // Day, Night, Flexible
        jobDescription: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.",
        jobRequirements: [
        // tags should be in tags
      "Proven experience as a Frontend Developer",
            "Familiarity with HTML, CSS, JavaScript, and React",
            "Experience with responsive and adaptive design",
            "Good problem-solving skills and attention to detail"
    ],
    jobPostedBy: "u12345",// userId of the poster
    jobDatePosted: "2025-10-01T10:00:00Z",
        jobApplicationDeadline: "2025-10-31T23:59:59Z",
        jobStatus: "active" // active, closed, filled
    ,
    jobPaymentDuration: {
    year: false,
    month: false,
    week: true,
    day: false
    }, 
    jobSalary: {
        min: 800,
        max: 1200,
        currency: "USD", // KES or EURO //
        negotiable: true,
        },
        jobApplicants: ["u12346", "u12347"], // userIds of applicants
        jobReports: [], // userIds of reporters
        jobLocationObservedLandmarks: {
            church: "St. Mary's Cathedral",
            estate: "Westlands",
            street: "Kimathi Street",
            city: "Nairobi",
            country: "Kenya",
            mosque: null,
            synagogue: null,
            temple: null,
            other: null,
            road: null,
            market: "Nairobi Central Market",
            hospital: "Nairobi Hospital",
            school: "Nairobi Primary School"
        },

    },
    {
        jobId: "bj_100B",
        jobTitle: "Backend Developer",
        jobCompany: "Innovatech",
        jobLocation: "Remote",
        jobType: "Part-time",
        jobShift: "Flexible",
        jobDescription: "We are seeking a Backend Developer to help us build and maintain our server-side applications.",
        jobRequirements: [
            "Experience with Node.js, Express, and MongoDB",
            "Familiarity with RESTful APIs and microservices architecture",
            "Strong problem-solving skills and ability to work independently"
        ],
        jobPostedBy: "u12348",
        jobDatePosted: "2025-10-02T10:00:00Z",
        jobApplicationDeadline: "2025-10-30T23:59:59Z",
        jobStatus: "active",
        jobPaymentDuration: {
            year: false,
            month: true,
            week: false,
            day: false
        },
        jobSalary: {
            min: 600,
            max: 900,
            currency: "USD",
            negotiable: false
        },
        jobApplicants: ["u12349", "u12350"],
        jobReports: [],
        jobLocationObservedLandmarks: {
            church: null,
            estate: "Kilimani",
            street: null,
            city: null,
            country: null,
            mosque: null,
            synagogue: null,
            temple: null,
            other: null,
            road: null,
            market: null,
            hospital: null,
            school: null
        },
    },

     {
    jobId: "bj_100B",
    jobTitle: "Graphic Designer",
    jobCompany: "Creative Minds Agency",
    jobLocation: "Mombasa, Kenya",
    jobType: "Contract",
    jobShift: "Flexible",
    jobDescription: "Seeking a creative Graphic Designer to produce engaging graphics for digital and print media campaigns.",
    jobRequirements: [
      "Proficiency with Adobe Creative Suite",
      "Strong portfolio of previous design projects",
      "Ability to work under tight deadlines",
      "Excellent communication skills"
    ],
    jobPostedBy: "u22345",
    jobDatePosted: "2025-09-28T09:00:00Z",
    jobApplicationDeadline: "2025-10-20T23:59:59Z",
    jobStatus: "active",
    jobPaymentDuration: {
      year: false,
      month: true,
      week: false,
      day: false
    }, 
    jobSalary: {
      min: 500,
      max: 700,
      currency: "USD",
      negotiable: false,
    },
    jobApplicants: [],
    jobReports: [],
    jobLocationObservedLandmarks: {
      church: null,
      estate: "Nyali",
      street: "Moi Avenue",
      city: "Mombasa",
      country: "Kenya",
      mosque: "Mandhry Mosque",
      synagogue: null,
      temple: null,
      other: null,
      road: "Links Road",
      market: "Mombasa Central Market",
      hospital: "Coast General Hospital",
      school: "Nyali Primary School"
    },
  },

  {
    jobId: "bj_100C",
    jobTitle: "Data Analyst",
    jobCompany: "Insight Analytics Co.",
    jobLocation: "Kigali, Rwanda",
    jobType: "Full-time",
    jobShift: "Day",
    jobDescription: "Looking for a Data Analyst to interpret data, analyze results using statistical techniques, and provide ongoing reports.",
    jobRequirements: [
      "Experience with SQL, Python, or R",
      "Strong analytical skills",
      "Knowledge of data visualization tools (Tableau, PowerBI)",
      "Bachelor’s degree in Statistics, Mathematics, or related field"
    ],
    jobPostedBy: "u33456",
    jobDatePosted: "2025-09-30T12:30:00Z",
    jobApplicationDeadline: "2025-10-15T23:59:59Z",
    jobStatus: "active",
    jobPaymentDuration: {
      year: true,
      month: false,
      week: false,
      day: false
    }, 
    jobSalary: {
      min: 15000,
      max: 20000,
      currency: "USD",
      negotiable: true,
    },
    jobApplicants: ["u33457"],
    jobReports: [],
    jobLocationObservedLandmarks: {
      church: "Sainte-Famille Church",
      estate: "Kacyiru",
      street: "KN 5 Road",
      city: "Kigali",
      country: "Rwanda",
      mosque: "Kigali Mosque",
      synagogue: null,
      temple: null,
      other: null,
      road: "Airport Road",
      market: "Kimironko Market",
      hospital: "King Faisal Hospital",
      school: "Kigali International School"
    },
  },

  {
    jobId: "bj_100D",
    jobTitle: "Mobile App Developer",
    jobCompany: "AppWorks Ltd",
    jobLocation: "Lagos, Nigeria",
    jobType: "Full-time",
    jobShift: "Day",
    jobDescription: "We are looking for a Mobile App Developer to design and build advanced applications for iOS and Android platforms.",
    jobRequirements: [
      "Experience with React Native or Flutter",
      "Strong knowledge of mobile UI/UX standards",
      "Familiarity with RESTful APIs",
      "Ability to work collaboratively in a team environment"
    ],
    jobPostedBy: "u44567",
    jobDatePosted: "2025-09-27T15:00:00Z",
    jobApplicationDeadline: "2025-10-25T23:59:59Z",
    jobStatus: "active",
    jobPaymentDuration: {
      year: false,
      month: true,
      week: false,
      day: false
    }, 
    jobSalary: {
      min: 2000,
      max: 3000,
      currency: "USD",
      negotiable: true,
    },
    jobApplicants: ["u44568", "u44569", "u44570"],
    jobReports: [],
    jobLocationObservedLandmarks: {
      church: "Holy Cross Cathedral",
      estate: "Victoria Island",
      street: "Adeola Odeku Street",
      city: "Lagos",
      country: "Nigeria",
      mosque: "Lagos Central Mosque",
      synagogue: null,
      temple: null,
      other: null,
      road: "Ozumba Mbadiwe Road",
      market: "Balogun Market",
      hospital: "Lagos Island Hospital",
      school: "Corona School"
    },
  },

  {
    jobId: "bj_100jE",
    jobTitle: "Content Writer",
    jobCompany: "BrightWords Media",
    jobLocation: "Cape Town, South Africa",
    jobType: "Part-time",
    jobShift: "Flexible",
    jobDescription: "We need a talented Content Writer to create engaging blog posts, product descriptions, and marketing copy for our clients.",
    jobRequirements: [
      "Excellent writing and editing skills in English",
      "Familiarity with SEO best practices",
      "Ability to meet deadlines",
      "Creative thinker with attention to detail"
    ],
    jobPostedBy: "u98765",
    jobDatePosted: "2025-09-29T11:00:00Z",
    jobApplicationDeadline: "2025-10-22T23:59:59Z",
    jobStatus: "active",
    jobPaymentDuration: {
      year: false,
      month: false,
      week: false,
      day: true
    }, 
    jobSalary: {
      min: 50,
      max: 100,
      currency: "USD",
      negotiable: true,
    },
    jobApplicants: [],
    jobReports: [],
    jobLocationObservedLandmarks: {
      church: "St. George’s Cathedral",
      estate: "Gardens",
      street: "Adderley Street",
      city: "Cape Town",
      country: "South Africa",
      mosque: "Claremont Main Road Mosque",
      synagogue: "Cape Town Hebrew Congregation",
      temple: null,
      other: null,
      road: "Kloof Street",
      market: "Greenmarket Square",
      hospital: "Groote Schuur Hospital",
      school: "Rondebosch High School"
    },
  },

];

export const jobElligibilities = {
    jobIsActive: (job) => {
        return job?.jobStatus === "active";
    },
    jobIsClosed: (job) => {
        return job?.jobStatus === "closed";
    },
    jobIsFilled: (job) => {
        return job?.jobStatus === "filled";
    },
    jobApplicationOpen: (job) => {
        const now = new Date();
        const deadline = new Date(job?.jobApplicationDeadline);
        return now < deadline && job?.jobStatus === "active";
    },
    jobApplicationClosed: (job) => {
        const now = new Date();
        const deadline = new Date(job?.jobApplicationDeadline);
        return now >= deadline || job?.jobStatus === "closed" || job?.jobStatus === "filled";
    },
    jobCanApply: (user, job) => {
        // user can apply if job is active, application is open, user has apply permit, tokens, is not guest, and hasn't applied before
        return job?.jobStatus === "active" && user?.userApplyPermit && user?.userApplyTokens > 0 && user?.userId !== "guest" && user?.userId !== null && job?.jobId !== user?.userAppliedJobs?.find(j => j === job?.jobId) && jobElligibilities.jobApplicationOpen(job);
    },
    jobCannotApply: (user, job) => {
        return !jobElligibilities.jobCanApply(user, job);
    },
    jobCanBePosted: (user) => {
        // user can post if they have post permit, tokens, is not guest, and is premium
        return user?.userJobPostPermit && user?.userPostTokens > 0 && user?.userId !== "guest" && user?.userId !== null && user?.userIsPremium === true;
    },
    jobCannotBePosted: (user) => {
        return !jobElligibilities.jobCanBePosted(user);
    },
    jobCanBeEdited: (user, job) => {
        // user can edit if they are the poster, job is active, and user has post permit
        return user?.userId !== "guest" && user?.userId !== null && user?.userJobPostPermit && job?.jobId === user?.userPostedJobs?.find(j => j === job?.jobId) && job?.jobId !== null && job?.jobStatus === "active";
    },
    jobCannotBeEdited: (user, job) => {
        return !jobElligibilities.jobCanBeEdited(user, job);
    },
    jobApplicationToken(job) {
        // if job salary max is above 100 USD or 500KES or 50EUR then application costs 10 tokens else 5 token
        const maxSalary = job?.jobSalary?.max;
        const currency = job?.jobSalary?.currency;
        if (currency === "USD" && maxSalary > 100) {
            return 10;
        } else if (currency === "KES" && maxSalary > 500) {
            return 10;
        } else if (currency === "EUR" && maxSalary > 50) {
            return 10;
        } else {
            return 5;
        }
    },
    jobPostToken(job) {
        const maxSalary = job?.jobSalary?.max;
        const currency = job?.jobSalary?.currency;
        // if job salary max is between 100-500 tokens will be 20 200 - 1000 tokens will be 50 else range in any currency exccepts KES
        if (currency ==="USD" || currency ==="EUR") {
            if (maxSalary <= 100) {
                return 20;
            } else if (maxSalary > 100 && maxSalary <= 500) {
                return 50;
            } else {
                return 100;
            }
        } else if (currency === "KES") {
            if (maxSalary <= 500) {
                return 10;
            } else if (maxSalary > 500 && maxSalary <= 2500) {
                return 30;
            } else {
                return 100;
            }
        } else {
            return 50; // default token cost for unknown currency
        }
    },
        
};