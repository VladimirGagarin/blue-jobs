export const mockJobs = [
    {
    jobId: "bj_100A",
    jobTitle: "Frontend Developer",
    jobCompany: "Tech Solutions Ltd",
    jobLocation: "Nairobi, Kenya",
    jobType: "Full-time",
        jobDescription: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.",
    jobRequirements: [
    }
];

export const jobElligibilities = {
jobIsActive: (job) => {
    return job?.jobStatus === "active";
  }
};```