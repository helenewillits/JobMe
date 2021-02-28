import React from "react";
import { Switch, Route } from "react-router-dom";
import ApplicationLog from "./components/Application.js";
import SingleApplication from "./components/SingleApplication.js";
import NewApplication from "./components/NewApplication.js";
import SignUp from "./components/SignUp.js"
import Login from "./components/LogIn.js";
import Profile from "./components/Profile.js";
import EditProfile from "./components/EditProfile.js";
import SignUp from "./components/SignUp.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      modalOpen: false,
      appModalOpen: false,
      application: {},
      userEmail: "jeremydoe@gmail.com"
    };

    this.handleApplicationPopup = this.handleApplicationPopup.bind(this);
  }

  handleApplicationPopup(application) {
    const newState = {};
    newState.appModalOpen = !this.state.appModalOpen;
    newState.modalOpen = !this.state.modalOpen;
    newState.application = application;
    newState.userEmail = this.state.userEmail;
    this.setState(newState);
    console.log("pop up");
  }

  render() {
    return (
      <Switch>
        <div>
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
                dataFromParent={this.state.userEmail}
              />
            </div>
          </Route>
          <Route exact path="/applications/add">
            <div>
              <NewApplication dataFromParent={this.state.userEmail} />
            </div>
          </Route>
          <Route exact path="/profile">
            <div>
              <Profile dataFromParent={this.state.userEmail} />
            </div>
          </Route>
          <Route exact path="/profile/edit">
            <div>
              <EditProfile dataFromParent={this.state.userEmail} />
            </div>
          </Route>
          <Route exact path="/signup">
            <div>
              <SignUp />
            </div>
          </Route>
          <Route exact path="/login">
            <div>
              <Login />
            </div>
          </Route>
        </div>
      </Switch>
    );
  }
}

export default App;
