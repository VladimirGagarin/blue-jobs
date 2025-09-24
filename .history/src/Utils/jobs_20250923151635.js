export const mockJobs = [
    {
    jobId: "bj_100A",
    jobTitle: "Frontend Developer",
    jobCompany: "Tech Solutions Ltd",
    jobLocation: "Nairobi, Kenya",
    jobType: "Full-time", // Full-time, Part-time, Contract, Internship
    jobShift: "Day", // Day, Night, Flexible
        jobDescription: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.",
    jobRequirements: [
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
        currency: "USD",
        negotiable: true,
        },
        jobApplicants: ["u12346", "u12347"], // userIds of applicants
        jobReports: [], // userIds of reporters
        jobLocationObservedLandmarks: {
            church: {name:"St. Mary's Cathedral" position: {distance: {length:200,}}}, // position we use booleans of  near , opposite ,north , south , east , west and distance in meters
            estate: {"Westlands"},
            street: {"Kimathi Street"},
            city: {"Nairobi"},
            country: {"Kenya"},
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
    }
];

export const jobElligibilities = {
jobIsActive: (job) => {
    return job?.jobStatus === "active";
  }
};```