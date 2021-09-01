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

const useMutationCreatePet = () => {
  const [createPetHelper, { error }] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, ...pets] },
      });
    },
  });

  const createPet = (input) =>
    createPetHelper({
      variables: { inp: { name: input.name, type: input.type } },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          id: toString(Math.floor(Math.random() * 100000)),
          name: input.name,
          type: input.type,
          img: "https://via.placeholder.com/300",
          __typename: "Pet",
        },
      },
    });

  return [createPet, error];
};

export { useMutationCreatePet };
