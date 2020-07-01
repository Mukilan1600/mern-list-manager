import React, { Component } from "react";
import ItemsContainer from "./ItemsContainer";
import Profile from "./Profile";
import { Switch, Route } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <ItemsContainer />
        </Route>
      </Switch>
    );
  }
}

export default Main;
