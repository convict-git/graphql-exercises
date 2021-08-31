import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PETS, CREATE_PET, EDIT_PET, DELETE_PET } from "./gqlObjects";

const useQueryGetPets = () => useQuery(GET_PETS);

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

export {
  useMutationCreatePet,
  useMutationEditPet,
  useMutationDeletePet,
  useQueryGetPets,
};
