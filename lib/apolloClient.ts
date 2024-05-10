import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';

const createApolloClient = () => {
    return new ApolloClient({
        uri: "http://127.0.0.1:8000/graphql",
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
