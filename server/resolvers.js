import { getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
    Query: {
        greeting: () => 'Hello World!',
        jobs: () => getJobs()
    },

    Job: {
        date: (job) => formatDate(job.createdAt),
        company: (job) => getCompany(job.companyId)
    }
}

function formatDate(dateToFormat) {
    return new Date(dateToFormat)
    .toLocaleDateString("en-GB") // 27/01/2025
}