import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { sleep } from "./utils/delay";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";

/**
 * Create a new apollo client and export as default
 */
// const link = new HttpLink({ uri: "https://rickandmortyapi.com/graphql" });
// const link = new HttpLink({ uri: "http://localhost:4000/" });

const delay = setContext((request) => sleep(500));
const httpLink = new HttpLink({ uri: "http://localhost:4000/" });
const link = ApolloLink.from([delay, httpLink]); // composition of Apollo links

// client side schemas
const typeDefs = gql`
  extend type User {
    age: Int
  }
  extend type Pet {
    vaccinated: Boolean!
  }
`;

const resolvers = {
  User: {
    age: () => 35,
  },
  Pet: {
    vaccinated: () => true,
  },
};

const cache = new InMemoryCache(); // good to go with default settings as well

const client = new ApolloClient({ link, cache, typeDefs, resolvers });

export default client;
