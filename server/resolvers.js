import { createJob, getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        greeting: () => 'Hello World!',
        jobs: () => getJobs(),
        job: async (_root, { id }) => {
            const job = await getJob(id);

            if(!job) {
                throw notFoundError('No job found with id '+ id)
            }
                
            return job;
        },
        company: async (_root, { id }) => {
            const company = await getCompany(id);

            if(!company) {
                throw notFoundError('No company found with id '+ id)
            }
                
            return company;
        }
    },

    Mutation: {
        createJob: (_root, {title, description}) => {
            const companyId = 'FjcJCHJALA4i'; // TODO Based on user
            return createJob({companyId, title, description});
        }
    },

    Job: {
        date: (job) => job.createdAt,
        company: (job) => getCompany(job.companyId)
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id)
    }
}

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' }
    });
}