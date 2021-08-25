import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

/**
 * Create a new apollo client and export as default
 */
// const link = new HttpLink({ uri: "http://localhost:4000/" });
const link = new HttpLink({ uri: "https://rickandmortyapi.com/graphql" });
const cache = new InMemoryCache(); // good to go with default settings as well

const client = new ApolloClient({ link, cache });

const query = gql`
  {
    characters {
      results {
        name
        id
        __typename
      }
    }
  }
`;

console.log("hello");
client
  .query({ query })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

export default client;
