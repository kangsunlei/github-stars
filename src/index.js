import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: Object.assign({}, headers, {
            authorization: token ? `Bearer ${token}` : ""
        })
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const App = () => (
    <ApolloProvider client={client}>
        <Main/>
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
