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

import axios from "axios";

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
    application: {
      userID: "",
      appID: "",
      favorited: "",
      companyName: "",
      position: "",
      jobId: "",
      deadline: "",
      jobPostingLink: "",
      applicationPortalLink: "",
      result: "",
      notes: ""
    }
  };

  postNewApplication() {
    axios
      .post(
        "http://localhost:5000/applicationDatabase/add",
        this.state.application
      )
      .then((res) => {
        // const data = res.data;
        this.setState({ applicationsToDo: res.data });
        console.log("post");
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  // Handle fields change
  handleChange = (e) => {
    //  const { input, value } = e.target;
    this.state.application[e] = "amazon";

    console.log("handle change");
    console.log(e);
    console.log(this.state.application[e]);
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
        <FormUserDetails handleChange={this.handleChange} values={values} />
      </div>
    );
  }
}

export default ApplicationNew;
