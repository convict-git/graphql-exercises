import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { GET_PETS } from "./useQueryGetPets";
import { PETS_FIELDS } from "./petsFields";

const EDIT_PET = gql`
  mutation EditPet($inp: EditPetInput!) {
    editPet(input: $inp) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const useMutationEditPet = () =>
  useMutation(EDIT_PET, {
    update(cache, { data: { editPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: {
          pets: pets.map((pet) => (editPet.id === pet.id ? editPet : pet)),
        },
      });
    },
  });

export { useMutationEditPet };
