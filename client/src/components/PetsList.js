import React from "react";
import { useModal, modalActionTypes } from "../pages/modal";
import { EDIT_PET, DELETE_PET } from "../pages/gqlObjects";
import PetBox from "./PetBox";

export default function PetsList({ pets }) {
  const [, dispatchModal] = useModal();

  const handleEdit = (pet) => {
    dispatchModal({
      type: modalActionTypes.SET_EDIT_MODE,
      pet,
      onSubmit: (pet) => {},
    });
  };

  const handleDelete = (pet) => {};

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
