export const mockJobs = [
    {
    jobId: "bj_100A",
    }
];

export const jobElligibilities = {
jobIsActive: (job) => {
    return job?.jobStatus === "active";
  }
};```