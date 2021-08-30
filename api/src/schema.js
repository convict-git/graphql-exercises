const { gql } = require("apollo-server");

const typeDefs = gql`
  enum PetType {
    CAT
    DOG
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    type: PetType!
    name: String!
    owner: User!
    img: String!
    createdAt: Int!
  }

  input NewPetInput {
    name: String!
    type: PetType!
  }

  # changes
  input EditPetInput {
    id: ID!
    name: String!
    type: PetType!
  }

  # changes
  input DeletePetInput {
    id: ID!
  }

  input PetsInput {
    type: PetType
  }

  type Query {
    user: User!
    pets(input: PetsInput): [Pet]!
    pet(id: ID!): Pet!
  }

  type Mutation {
    addPet(input: NewPetInput!): Pet!
    editPet(input: EditPetInput!): Pet!
    deletePet(input: DeletePetInput!): Boolean!
  }
`;

module.exports = typeDefs;
