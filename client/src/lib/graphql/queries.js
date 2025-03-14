import { GraphQLClient, gql } from 'graphql-request';

const graphQLEndpoint = 'http://localhost:9000/graphql';

const client = new GraphQLClient(graphQLEndpoint);

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                date
                title
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