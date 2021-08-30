import gql from "graphql-tag";

const PETS_FIELDS = gql`
  fragment PetsField on Pet {
    id
    name
    type
    img
  }
`;

const GET_PETS = gql`
  query AllPets {
    pets {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const CREATE_PET = gql`
  mutation CreatePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const EDIT_PET = gql`
  mutation EditPet($pet: EditPetInput!) {
    editPet(input: $pet) {
      id
      name
      type
    }
  }
`;

const DELETE_PET = gql`
  mutation DeletePet($input: DeletePetInput!) {
    deletePet(input: $input)
  }
`;

export { GET_PETS, CREATE_PET, EDIT_PET, DELETE_PET, PETS_FIELDS };
