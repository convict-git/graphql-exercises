import React from "react";
import { useModal, modalActionTypes } from "../context/modal";
import PetBox from "./PetBox";
import { useMutationEditPet } from "../gql/useMutationEditPet";
import { useMutationDeletePet } from "../gql/useMutationDeletePet";

export default function PetsList({ pets }) {
  const [, dispatchModal] = useModal();
  const [editPet] = useMutationEditPet();
  const [deletePet] = useMutationDeletePet();

  const handleEdit = (pet) => {
    dispatchModal({
      type: modalActionTypes.SET_EDIT_MODE,
      pet: pet,
      onSubmit: (input) => {
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
        dispatchModal({ type: modalActionTypes.CLOSE_MODAL });
      },
    });
  };

  const handleDelete = (pet) => {
    deletePet({
      variables: {
        inp: { id: pet.id },
      },
    });
  };

  return (
    <div className="row">
      {pets.map((pet) => (
        <div className="col-xs-12 col-md-4 col" key={pet.id}>
          <div className="box">
            <PetBox pet={pet} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
      ))}
    </div>
  );
}

PetsList = React.memo(PetsList);

PetsList.defaultProps = {
  pets: [],
};
