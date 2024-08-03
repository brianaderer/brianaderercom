import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';

const createApolloClient = () => {
    return new ApolloClient({
        uri: `${process.env.BACKEND_LOCATION}/graphql`,
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });
};

export default createApolloClient;
