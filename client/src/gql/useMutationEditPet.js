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

const useMutationEditPet = () => {
  const [editPet] = useMutation(EDIT_PET, {
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
  return (input, pet) =>
    editPet({
      variables: {
        inp: { id: input.id, name: input.name, type: input.type },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editPet: {
          id: pet.id,
          name: input.name,
          type: input.type,
          img: "https://via.placeholder.com/300",
          __typename: "Pet",
        },
      },
    });
};

export { useMutationEditPet };
