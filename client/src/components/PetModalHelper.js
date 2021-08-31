import React from "react";
import Select from "react-select";
import { useModal, modalActionTypes } from "../context/modal";

const options = [
  { value: "CAT", label: "Cat" },
  { value: "DOG", label: "Dog" },
];

export default function PetModalHelper() {
  const [modal, dispatchModal] = useModal();

  const {
    mode,
    pet: { id, name: givenName, type: givenType },
    onSubmit,
  } = modal;

  const [name, setName] = React.useState(givenName || "");
  const [type, setType] = React.useState(givenType || "DOG");

  const activeOption = options.find((o) => o.value === type);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ id, name, type });
  };

  const cancel = (e) => {
    e.preventDefault();
    dispatchModal({ type: modalActionTypes.CLOSE_MODAL });
  };

  return (
    <div className="new-pet page">
      <h1>{mode === "NEW" ? "New Pet" : "Edit Pet"}</h1>
      <div className="box">
        <form onSubmit={submit}>
          <Select
            value={activeOption}
            defaultValue={options[0]}
            onChange={(e) => setType(e.value)}
            options={options}
          />

          <input
            className="input"
            type="text"
            placeholder="pet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <a className="error button" onClick={cancel}>
            cancel
          </a>
          <button type="submit" name="submit">
            {mode === "NEW" ? "add pet" : "edit pet"}
          </button>
        </form>
      </div>
    </div>
  );
}
