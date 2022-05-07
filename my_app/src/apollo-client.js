import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://mini-project23.hasura.app/v1/graphql',
    headers: {
        'x-hasura-admin-secret':
            'IpZ28unWmHHOItpnGIA1ZCIWvk2TVJnVyZIhA1TIM9mKOesNjPEQWixdJOP27LJq',
    },
    cache: new InMemoryCache(),
});

export default client;