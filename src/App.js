import React from "react";
import { Switch, Route } from "react-router-dom";
import ApplicationLog from "./components/Application.js";
import SingleApplication from "./components/SingleApplication.js";
import NewApplication from "./components/NewApplication.js";
import SignUp from "./components/SignUp.js"
import Login from "./components/LogIn.js";
import Logout from "./components/Logout.js"
import InterviewLog from "./components/InterviewLog.js";
import SingleInterview from "./components/SingleInterview.js";
import NewInterview from "./components/NewInterview.js";
import Profile from "./components/Profile.js";
import EditProfile from "./components/EditProfile.js";
import { Redirect } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      modalOpen: false,
      appModalOpen: false,
      application: {},
      intModalOpen: false,
      interview: {}
    };

    this.handleApplicationPopup = this.handleApplicationPopup.bind(this);
    this.handleInterviewPopup = this.handleInterviewPopup.bind(this);
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
    newState.modalOpen = this.state.intModalOpen || !this.state.modalOpen;
    newState.appModalOpen = !this.state.appModalOpen;
    newState.application = application;
    newState.intModalOpen = this.state.intModalOpen;
    newState.interview = this.state.interview;
    newState.userEmail = this.state.userEmail;
    this.setState(newState);
    console.log("pop up");
  }

  handleInterviewPopup(interview) {
    const newState = {};
    newState.modalOpen = !this.state.intModalOpen || this.state.modalOpen;
    newState.appModalOpen = this.state.appModalOpen;
    newState.application = this.state.application;
    newState.intModalOpen = !this.state.intModalOpen;
    newState.interview = interview;
    newState.userEmail = this.state.userEmail;
    this.setState(newState);
    console.log("pop up");
  }

  getToken() {
    const tokenString = localStorage.getItem("token");
    console.log(tokenString);
    return tokenString;
  }

  render() {
    const token = this.getToken();
    console.log("Token ", token);

    if (!token) {
      return (
        <Switch>
          <div>
            <Route exact path="/login">
              <div>
                <Login parentCallback={this.callbackFunction} />
              </div>
            </Route>
            <Route exact path="/signup">
              <div>
                <SignUp />
              </div>
            </Route>
            <Route exact path="/">
              <Redirect to={"/login"} />
            </Route>
            <Route exact path="/profile">
              <Redirect to={"/login"} />
            </Route>
            <Route exact path="/profile/edit">
              <Redirect to={"/login"} />
            </Route>
            <Route exact path="/applications">
              <Redirect to={"/login"} />
            </Route>
            <Route exact path="/applications/add">
              <Redirect to={"/login"} />
            </Route>
            <Route exact path="/logout">
              <Redirect to={"/login"} />
            </Route>
          </div>
        </Switch>
      );
    }

    return (
      <Switch>
        <div>
          {/* applications */}
          <Route exact path="/applications">
            <div classname="appPopup">
              <SingleApplication
                display={this.state.appModalOpen}
                handlePopup={this.handleApplicationPopup}
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
          {/* interviews */}
          <Route exact path="/interviews">
            <div classname="appPopup">
              <SingleInterview
                display={this.state.intModalOpen}
                handlePopup={this.handleInterviewPopup}
                interview={this.state.interview}
              />
              <InterviewLog
                handlePopup={this.handleInterviewPopup}
                modalOpen={this.state.modalOpen}
                dataFromParent={this.getToken()}
              />
            </div>
          </Route>
          <Route exact path="/interviews/add">
            <div>
              <NewInterview dataFromParent={this.getToken()} />
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
          <Route exact path="/logout">
            <div>
              <Logout />
            </div>
          </Route>
          <Route exact path="/login">
            <Redirect to={"/profile"} />
          </Route>
          <Route exact path="/signup">
            <Redirect to={"/profile"} />
          </Route>
          <Route exact path="/">
            <Redirect to={"/profile"} />
          </Route>
        </div>
      </Switch>
    );
  }
}

export default App;
