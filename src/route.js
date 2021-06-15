import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Form from "./containers/Form";
import List from "./containers/List";
import Logout from "./containers/Logout";
import Log from "./containers/Log";
//import Edit from "./containers/Edit";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/form">
          <Form />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
        <Route exact path="/log">
          <Log />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}
