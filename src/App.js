import React from "react";
import { Switch, Route } from "react-router-dom";

import ApplicationLog from "./components/Application.js";
import SingleApplication from "./components/SingleApplication.js";
import NewApplication from "./components/NewApplication.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      appModalOpen: false,
      application: {}
    };

    this.handleApplicationPopup = this.handleApplicationPopup.bind(this);
  }

  handleApplicationPopup(application) {
    const newState = {};
    newState.appModalOpen = !this.state.appModalOpen;
    newState.modalOpen = !this.state.modalOpen;
    newState.application = application;
    this.setState(newState);
    console.log("pop up");
  }

  render() {
    return (
      <Switch>
        <div>
        <Route exact path="/">
            <div>
              <h1>this will be the sign up page</h1>
            </div>
          </Route>
          <Route exact path="/applications">
            <div classname="appPopup">
              <SingleApplication
                display={this.state.appModalOpen}
                handlePopup={this.handleApplicationPopup}
                // modalOpen={this.state.appModalOpen}
                application={this.state.application}
              />
              <ApplicationLog
                handlePopup={this.handleApplicationPopup}
                modalOpen={this.state.modalOpen}
              />
            </div>
          </Route>
          <Route exact path="/applications/add">
            <div>
              <NewApplication />
            </div>
          </Route>
        </div>
      </Switch>
    );
  }
}

export default App;
