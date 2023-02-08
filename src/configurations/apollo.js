import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";

const URI = process.env.REACT_APP_WP_GQL_URL;

const httpLink = createHttpLink({
    uri: URI,
});

const authLink = setContext((_, { headers }) => {
    let token = localStorage.getItem("clientToken");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const cache = new InMemoryCache();

await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
  

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
});

export default client;