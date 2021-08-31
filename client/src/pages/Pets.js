import React from "react";
import PetsList from "../components/PetsList";
import PetModal from "../components/PetModal";
import Loader from "../components/Loader";

import { useModal, modalActionTypes } from "../context/modal";
import { useMutationCreatePet, useQueryGetPets } from "../gql/gqlOperations";
import { GET_PETS } from "../gql/gqlObjects";
import { useApolloClient } from "@apollo/react-hooks";

export default function Pets() {
  const client = useApolloClient();
  const [modal, dispatchModal] = useModal();
  const pets = useQueryGetPets();

  const [createPet, newPet] = useMutationCreatePet();

  if (pets.loading) {
    return <Loader />;
  }

  if (pets.error || newPet.error) {
    return <div>Error!!!</div>;
  }

  if (modal.mode !== "CLOSED") {
    return <PetModal />;
  }

  const onClickHandler = () => {
    dispatchModal({
      type: modalActionTypes.SET_NEW_MODE,
      onSubmit: (input) => {
        createPet({
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
        dispatchModal({ type: modalActionTypes.CLOSE_MODAL });
      },
    });
  };

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>
          <div className="col-xs-2">
            <button onClick={onClickHandler}>new pet</button>{" "}
          </div>
          <button
            onClick={() => {
              console.log(client);
              window.setTimeout(client.reFetchObservableQueries, 0);
            }}
          >
            refetch
          </button>
        </div>
      </section>
      <section>
        <PetsList pets={pets.data.pets} />
      </section>
    </div>
  );
}
