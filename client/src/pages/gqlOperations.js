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
    update(cache, { data: { editedPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: {
          pets: pets.map((pet) => (editedPet.id === pet.id ? editedPet : pet)),
        },
      });
    },
  });

const useMutationDeletePet = () =>
  useMutation(DELETE_PET, {
    update(cache, { data: { deletedPet, success } }) {
      console.log(deletedPet, success);
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: {
          pets: success
            ? pets.filter((pet) => deletedPet.id !== pet.id)
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
