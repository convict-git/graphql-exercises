import { Switch, Route } from "react-router-dom";
import React, { Fragment } from "react";
import Header from "./Header";
import Pets from "../pages/Pets";
import { ModalProvider } from "../pages/modal";

const App = () => (
  <Fragment>
    <Header />
    <ModalProvider>
      <div>
        <Switch>
          <Route exact path="/" component={Pets} />
        </Switch>
      </div>
    </ModalProvider>
  </Fragment>
);

export default App;
