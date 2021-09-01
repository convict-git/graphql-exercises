import React from "react";
import { useModal, modalActionTypes } from "../context/modal";
import PetBox from "./PetBox";
import { useMutationEditPet } from "../gql/useMutationEditPet";
import { useMutationDeletePet } from "../gql/useMutationDeletePet";

export default function PetsList({ pets }) {
  const [, dispatchModal] = useModal();
  const editPet = useMutationEditPet();
  const deletePet = useMutationDeletePet();

  const handleEdit = (pet) => {
    dispatchModal({
      type: modalActionTypes.SET_EDIT_MODE,
      pet,
      onSubmit: (input) => {
        editPet(input, pet);
        dispatchModal({ type: modalActionTypes.CLOSE_MODAL });
      },
    });
  };

  const handleDelete = (pet) => deletePet(pet);

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
