import React from "react";
import PetsList from "../components/PetsList";
import PetModal from "../components/PetModal";
import Loader from "../components/Loader";

import { useModal, modalActionTypes } from "./modal";
import { useMutationCreatePet, useQueryGetPets } from "./gqlOperations";

export default function Pets() {
  const [modal, dispatchModal] = useModal();
  const pets = useQueryGetPets();

  const [createPet, newPet] = useMutationCreatePet();

  if (pets.loading) {
    return <Loader />;
  }

  if (pets.error || newPet.error) {
    return <div>Error!!!</div>;
  }

  console.log(modal);
  if (modal.mode !== "CLOSED") {
    return <PetModal />;
  }

  const onClickHandler = () => {
    console.log("onClickHandler");
    dispatchModal({
      type: modalActionTypes.SET_NEW_MODE,
      onSubmit: (input) => {
        console.log(`now createPet`, input);
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
            <button onClick={onClickHandler}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={pets.data.pets} />
      </section>
    </div>
  );
}
