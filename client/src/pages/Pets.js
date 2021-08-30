import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";

const PETS_FIELDS = gql`
  fragment PetsField on Pet {
    id
    name
    type
    img
    owner {
      age @client
    }
    vaccinated @client
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

export default function Pets() {
  const [modal, setModal] = useState(false);
  const pets = useQuery(GET_PETS);

  // const [createPet, newPet] = useMutation(CREATE_PET); // without updating the cache

  const [createPet, newPet] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      console.log(pets);
      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, ...pets] },
      });
    },
    // optimisitic updates can be handled here as well
  });

  // if (pets.loading || newPet.loading) {
  if (pets.loading) {
    // don't load on newPet now (optimistically update)
    return <Loader />;
  }

  if (pets.error || newPet.error) {
    return <div>Error!!!</div>;
  }

  const onSubmit = (input) => {
    setModal(false);
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        addPet: {
          id: toString(Math.floor(Math.random() * 100000)),
          name: input.name,
          type: input.type,
          img: "https://via.placeholder.com/300",
          __typename: "Pet",
        },
      },
    });
  };

  console.log(pets.data);

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={pets.data.pets} />
      </section>
    </div>
  );
}
