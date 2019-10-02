const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const nodeFetch = require("node-fetch");
let client;
const cache = new InMemoryCache();
const { onError } = require("apollo-link-error");


const defaultOptions = {
    query: {
      fetchPolicy: "no-cache"
    },
    mutate: {
      fetchPolicy: "no-cache"
    }
};

const errorLink = onError(({ networkError }) => {
    if (networkError) {
      if (networkError.result) {
        console.error(networkError.result);
        if (networkError.result.errors.length) {
          networkError.result.errors.forEach(error => {
            console.error(error);
          });
        }
      }
    }
});
  
const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
    fetch: nodeFetch,
})

const link = errorLink.concat(httpLink);

try {
    client = new ApolloClient({
        link,
        cache,
        defaultOptions
    })
} catch (error) {
    console.log(error)
}


module.exports = client