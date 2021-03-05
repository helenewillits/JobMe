import React from "react";
import { Switch, Route } from "react-router-dom";

import ApplicationLog from "./components/Application.js";
import SingleApplication from "./components/SingleApplication.js";
import NewApplication from "./components/NewApplication.js";
import InterviewLog from "./components/InterviewLog.js";
import SingleInterview from "./components/SingleInterview.js";
import NewInterview from "./components/NewInterview.js";
import Profile from "./components/Profile.js";
import EditProfile from "./components/EditProfile.js";
import SignUp from "./components/SignUp.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      appModalOpen: false,
      application: {},
      intModalOpen: false,
      interview: {},
      userEmail: "jeremydoe@gmail.com"
    };

    this.handleApplicationPopup = this.handleApplicationPopup.bind(this);
    this.handleInterviewPopup = this.handleInterviewPopup.bind(this);
  }

  handleApplicationPopup(application) {
    const newState = {};
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

  render() {
    return (
      <Switch>
        <div>
          {/* applications */}
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
          {/* interviews */}
          <Route exact path="/interviews">
            <div classname="appPopup">
              <SingleInterview
                display={this.state.intModalOpen}
                handlePopup={this.handleInterviewPopup}
                // modalOpen={this.state.appModalOpen}
                interview={this.state.interview}
              />
              <InterviewLog
                handlePopup={this.handleInterviewPopup}
                modalOpen={this.state.modalOpen}
                dataFromParent={this.state.userEmail}
              />
            </div>
          </Route>
          <Route exact path="/interviews/add">
            <div>
              <NewInterview dataFromParent={this.state.userEmail} />
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
        </div>
      </Switch>
    );
  }
}

export default App;
