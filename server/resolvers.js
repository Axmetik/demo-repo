import { createJob, 
    deleteJob, getJob, 
    getJobs, getJobsByCompany, 
    updateJob } from './db/jobs.js';
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

            if(!company) throw notFoundError('No company found with id '+ id)
                
            return company;
        }
    },

    Mutation: {
        createJob: (_root, { input: {title, description} }, { user }) => {
            if(!user) throw unauthorizedError('User unauthorized');
            console.log(user)
            return createJob({companyId: user.companyId, title, description});
        },
        deleteJob: (_root, { id }) => deleteJob(id),
        updateJob: (_root, { input: {title, description} }) => {
            const id = '6mA05AZxvS1R'; // TODO Based on user
            return updateJob({id, title, description});
        },
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

function unauthorizedError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHORIZED' }
    });
}