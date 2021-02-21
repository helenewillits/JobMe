import React from "react";

import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
import { Button } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FormUserDetails from "./FormUserDetails";

// defines the space that contains the page for adding new job applications
class ApplicationNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.state.page = "ApplicationNew";
  }

  render() {
    const { page, status } = this.state;

    return (
      <div>
        <MuiThemeProvider>
          <NavigationBar />
          <p className="App-new">{this.state.apiResponse}</p>
          <Header page={page} />
          <div>
            <ApplicationNewPage status={status} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

// defines one row of applications, organized by type
class ApplicationNewPage extends React.Component {
  state = {
    step: 1,
    company: "Company",
    jobTitle: "Job Title",
    jobID: "Job ID",
    deadline: "Deadline",
    link: "Job Posting Link",
    resume: "Resume",
    coverLetter: "Cover Letter"
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { status } = this.props;
    const {
      company,
      jobTitle,
      jobID,
      deadline,
      link,
      resume,
      coverLetter
    } = this.state;
    const values = {
      company,
      jobTitle,
      jobID,
      deadline,
      link,
      resume,
      coverLetter
    };

    return (
      <div>
        <FormUserDetails
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
        />
      </div>
    );
  }
}

export default ApplicationNew;
