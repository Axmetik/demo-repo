import { GraphQLClient, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const graphQLEndpoint = 'http://localhost:9000/graphql';

const client = new GraphQLClient(graphQLEndpoint, {
    headers: () => {
        const accessToken = getAccessToken();
        if(accessToken) {
            return { 'Authorization': `Bearer ${accessToken}` };
        }
        return {}
    }
});

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                date
                company {
                    id
                    name
                }
            }
        }
    `;

    const { jobs } = await client.request(query);
    return jobs;
}

export async function getJob(id) {
    const query = gql`
        query JobById($id: ID!) {
            job(id: $id) {
                id
                title
                date
                description
                company {
                    id
                    name
                }
             }
        }
    `;

    const { job } = await client.request(query, { id });
    return job;
}

export async function getCompany(id) {
    const query = gql`
      query CompanyById($id: ID!) {
        company(id: $id) {
          id
          name
          description
          jobs {
            id
            date
            title
          }
        }
      }
    `;
    const { company } = await client.request(query, { id });
    return company;
}

export async function createJob({title, description}) {
    const mutation = gql`
    mutation CreateJob($input: CreateJobInput!){
        job: createJob(input: $input) {
            id
        }
    }
    `;

    const {job} = await client.request(mutation, {
        input : { title, description }
    });
    return job;
}

