export const mockJobs = [
    {
    jobId: "bj_100A",
    jobTitle: "Frontend Developer",
        jobCompany: "Tech Solutions Ltd",
    
    }
];

export const jobElligibilities = {
jobIsActive: (job) => {
    return job?.jobStatus === "active";
  }
};```