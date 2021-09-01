import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

import { PETS_FIELDS } from './petsFields';

const GET_PETS = gql`
  query AllPets {
    pets {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const useQueryGetPets = () => useQuery(GET_PETS);

export {GET_PETS, useQueryGetPets};
