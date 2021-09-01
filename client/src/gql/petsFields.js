import gql from "graphql-tag";

const PETS_FIELDS = gql`
  fragment PetsField on Pet {
    id
    __typename
    name
    type
    img
  }
`;

export { PETS_FIELDS };