import React from "react";
import { Switch, Route } from "react-router-dom";
import ApplicationLog from "./components/Application.js";
import SingleApplication from "./components/SingleApplication.js";
import NewApplication from "./components/NewApplication.js";
import SignUp from "./components/SignUp.js"
import Login from "./components/LogIn.js";
import Profile from "./components/Profile.js";
import EditProfile from "./components/EditProfile.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      modalOpen: false,
      appModalOpen: false,
      application: {},
    };

    this.handleApplicationPopup = this.handleApplicationPopup.bind(this);
  }

  useEffect = () => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState({ token: foundUser });
    };
  }

  setToken(userToken) {
    localStorage.setItem('token', userToken);
  }

  callbackFunction = (childData) => {
    this.setState({ token: childData });
    console.log("APP.JS STATE ", this.state);

    this.setToken(childData);
  }

  handleApplicationPopup(application) {
    const newState = {};
    newState.token = this.state.token;
    newState.appModalOpen = !this.state.appModalOpen;
    newState.modalOpen = !this.state.modalOpen;
    newState.application = application;
    this.setState(newState);
    console.log("pop up");
  }

  getToken() {
    const tokenString = localStorage.getItem("token");
    console.log(tokenString);
    return tokenString;
  }

  getEmail() {
    return this.state.token;
  }

  render() {
    // this.useEffect();
    const token = this.getToken();
    console.log("Token ", token);

    if (!token) {
      return <Login parentCallback={this.callbackFunction} />
    }

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
                dataFromParent={this.getToken()}
              />
            </div>
          </Route>
          <Route exact path="/applications/add">
            <div>
              <NewApplication dataFromParent={this.getToken()} />
            </div>
          </Route>
          <Route exact path="/profile">
            <div>
              <Profile dataFromParent={this.getToken()} />
            </div>
          </Route>
          <Route exact path="/profile/edit">
            <div>
              <EditProfile dataFromParent={this.getToken()} />
            </div>
          </Route>
          <Route exact path="/signup">
            <div>
              <SignUp />
            </div>
          </Route>
        </div>
      </Switch>
    );
  }
}

export default App;
