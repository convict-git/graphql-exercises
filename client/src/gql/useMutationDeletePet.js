import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { GET_PETS } from "./useQueryGetPets";
import { PETS_FIELDS } from "./petsFields";

const DELETE_PET = gql`
  mutation DeletePet($inp: DeletePetInput!) {
    deletePet(input: $inp) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const useMutationDeletePet = () =>
  useMutation(DELETE_PET, {
    update(cache, { data: { deletePet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: {
          pets: deletePet
            ? pets.filter((pet) => deletePet.id !== pet.id)
            : [...pets],
        },
      });
    },
  });

export { useMutationDeletePet };
