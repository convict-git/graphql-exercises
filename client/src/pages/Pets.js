import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

import Loader from "../components/Loader";
import PetsList from "../components/PetsList";
import PetModal from "../components/PetModal";

import { useModal, modalActionTypes } from "../context/modal";
import { useQueryGetPets } from "../gql/useQueryGetPets";
import { useMutationCreatePet } from "../gql/useMutationCreatePet";

export default function Pets() {
  const client = useApolloClient();

  const [modal, dispatchModal] = useModal();

  const pets = useQueryGetPets();
  const [createPet, errorCreatePet] = useMutationCreatePet();

  if (pets.loading) {
    return <Loader />;
  }

  if (pets.error || errorCreatePet) {
    return <div>Error!!!</div>;
  }

  if (modal.mode !== "CLOSED") {
    return <PetModal />;
  }

  const handleClickNewPet = () => {
    dispatchModal({
      type: modalActionTypes.SET_NEW_MODE,
      onSubmit: (input) => {
        createPet(input);
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
            <button onClick={handleClickNewPet}>new pet</button>{" "}
          </div>
          <button
            onClick={() => {
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
