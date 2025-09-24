export const mockJobs = [
    {
    jobId: "bj_100A",
    jobTitle: "Frontend Developer",
        jobCompany: "Tech Solutions Ltd",
    jobLocation: "Nairobi, Kenya",
    }
];

export const jobElligibilities = {
jobIsActive: (job) => {
    return job?.jobStatus === "active";
  }
};```