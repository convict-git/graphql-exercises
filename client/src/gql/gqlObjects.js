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

const GET_PETS = gql`
  query AllPets {
    pets {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const CREATE_PET = gql`
  mutation CreatePet($inp: NewPetInput!) {
    addPet(input: $inp) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const EDIT_PET = gql`
  mutation EditPet($inp: EditPetInput!) {
    editPet(input: $inp) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

const DELETE_PET = gql`
  mutation DeletePet($inp: DeletePetInput!) {
    deletePet(input: $inp) {
      ...PetsField
    }
  }
  ${PETS_FIELDS}
`;

export { GET_PETS, CREATE_PET, EDIT_PET, DELETE_PET, PETS_FIELDS };
