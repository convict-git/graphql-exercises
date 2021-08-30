import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import PetModal from "../components/PetModal";
import Loader from "../components/Loader";

import { GET_PETS, CREATE_PET } from "./gqlObjects";

import { useModal, modalActionTypes } from "./modal";

export default function Pets() {
  const [modal, dispatchModal] = useModal();
  const pets = useQuery(GET_PETS);

  const [createPet, newPet] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });

      console.log(pets);
      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, ...pets] },
      });
    },
  });

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
