import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client'
import { ApolloProvider, Query } from "react-apollo";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";

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

// Fetch GraphQL data with a Query component
const ExchangeRates = () => (
    <Query
        query={gql`
        {
            user(login: "kangsunlei") {
                starredRepositories{
                totalCount
                }
            }
        }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return <pre>{JSON.stringify(data, null, 4)}</pre>;
        }}
    </Query>
);

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
