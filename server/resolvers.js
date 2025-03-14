import { getJob, getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
    Query: {
        greeting: () => 'Hello World!',
        jobs: () => getJobs(),
        job: (_root, { id }) => getJob(id),
    },

    Job: {
        date: (job) => job.createdAt,
        company: (job) => getCompany(job.companyId)
    }
}