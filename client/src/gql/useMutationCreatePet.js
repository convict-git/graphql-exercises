import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { PETS_FIELDS } from "./petsFields";
import { GET_PETS } from "./useQueryGetPets";

const CREATE_PET = gql`
  mutation CreatePet($inp: NewPetInput!) {
    addPet(input: $inp) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const useMutationCreatePet = () =>
  useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, ...pets] },
      });
    },
  });

export { useMutationCreatePet };