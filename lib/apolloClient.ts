import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, from } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql', // GraphQL endpoint
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache()
});

export default client;
