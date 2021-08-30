import React from "react";

const ModalContext = React.createContext();

const modalActionTypes = {
  SET_EDIT_MODE: "SET_EDIT_MODE",
  SET_NEW_MODE: "SET_NEW_MODE",
  CLOSE_MODAL: "CLOSE_MODAL",
};

const initialModalValue = {
  mode: "CLOSED",
  pet: { id: null, name: null, type: null },
  onSubmit: null,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case modalActionTypes.SET_EDIT_MODE: {
      return {
        mode: "EDIT",
        pet: action.pet,
        onSubmit: action.onSubmit,
      };
    }
    case modalActionTypes.SET_NEW_MODE: {
      return {
        ...initialModalValue,
        mode: "NEW",
        onSubmit: action.onSubmit,
      };
    }
    case modalActionTypes.CLOSE_MODAL: {
      return {
        ...initialModalValue,
        mode: "CLOSED",
      };
    }
    default: {
      throw new Error(`Undefined action type: ${action.type}`);
    }
  }
};

const ModalProvider = () => {
  [state, dispatch] = React.useReducer(modalReducer, initialModalValue);
  const value = React.memo(() => [state, dispatch], [state]);
  return <ModalContext.Provider value={value} />;
};

const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error(`useModal should be used in the scope of ModalProvider`);
  }
  return context;
};

export { ModalProvider, useModal, modalActionTypes };
