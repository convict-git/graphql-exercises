import React from "react";

function PetBox({ pet }) {
  return (
    <div className="pet">
      <figure>
        <img src={pet.img + `?pet=${pet.id}`} alt="" />
      </figure>
      <div className="pet-name">{pet.name}</div>
      <div className="pet-type">{pet.type}</div>
      <button>edit</button>
      <button>delete</button>
    </div>
  );
}

PetBox = React.memo(PetBox);

export default PetBox;
