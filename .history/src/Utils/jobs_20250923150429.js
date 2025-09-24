export const mockJobs = [
    {
    jobId: "bj_100A",
    jobTitle: "Frontend Developer",
    jobCompany: "Tech Solutions Ltd",
    jobLocation: "Nairobi, Kenya",
    jobType: "Full-time",
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
    
    }
];

export const jobElligibilities = {
jobIsActive: (job) => {
    return job?.jobStatus === "active";
  }
};```