import React from "react";

function PetBox({ pet, onEdit, onDelete }) {
  return (
    <div className="pet">
      <figure>
        <img src={pet.img + `?pet=${pet.id}`} alt="" />
      </figure>
      <div className="pet-name">{pet.name}</div>
      <div className="pet-type">{pet.type}</div>
      <button onClick={() => onEdit(pet)}>edit</button>{" "}
      <button onClick={() => onDelete(pet)}>delete</button>
    </div>
  );
}

PetBox = React.memo(PetBox);

export default PetBox;
