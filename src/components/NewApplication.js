import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "@material-ui/core";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
import { Button } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { Dropdown } from "semantic-ui-react";

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

class ApplicationNewPage extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      companyName: "",
      position: "",
      jobId: "",
      deadline: "",
      jobPostingLink: "",
      applicationPortalLink: "",
      applicationStatus: "",
      result: "",
      notes: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle fields change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log("HANDLECHANGE STATE");
    // console.log(this.state);
  };

  // submitApplication(event) {
  //   const applicationInfo = {
  //     userId: this.state.userId,
  //     companyName: this.state.companyName,
  //     position: this.state.position,
  //     jobId: this.state.jobId,
  //     deadline: this.state.deadline,
  //     jobPostingLink: this.state.jobPostingLink,
  //     applicationPortalLink: this.state.applicationPortalLink,
  //     applicationStatus: this.state.applicationStatus,
  //     result: this.state.result,
  //     notes: this.state.notes
  //   };
  //   event.preventDefault();
  // }

  postNewApplication() {
    console.log("STATE FOR POST");
    console.log(this.state);
    axios
      .post("http://localhost:5000/applicationDatabase/add", this.state)
      .then((res) => {
        // const data = res.data;
        // this.setState({ applicationsToDo: res.data });
        console.log(res);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("HANDLE SUBMIT");
    // console.log(this.state);
    this.postNewApplication();
  };

  render() {
    // const {
    //   userId,
    //   companyName,
    //   position,
    //   jobId,
    //   deadline,
    //   jobPostingLink,
    //   applicationPortalLink,
    //   applicationStatus,
    //   result,
    //   notes
    // } = this.state.application;

    return (
      <div>
        <form>
          <div>
            <TextField
              type="text"
              floatingLabelText="Company"
              name="companyName"
              onChange={this.handleChange}
              fullWidth
            />
            <br />
            <TextField
              floatingLabelText="Position"
              name="position"
              fullWidth
              onChange={this.handleChange}
            />
            <br />
          </div>
          <br />
          <div>
            <Grid container justify="left">
              <Calendar />
            </Grid>
            <TextField
              floatingLabelText="Job Posting Link"
              fullWidth
              name="jobPostingLink"
              onChange={this.handleChange}
            />
            <TextField
              floatingLabelText="Job ID"
              fullWidth
              name="jobId"
              onChange={this.handleChange}
            />
            <TextField
              floatingLabelText="Application Portal Link"
              fullWidth
              name="applicationPortalLink"
              onChange={this.handleChange}
            />
            <br />
            <TextField
              floatingLabelText="Notes"
              fullWidth
              name="notes"
              onChange={this.handleChange}
            />
            <br />
            <br />
            {/* <InputLabel id="label">Application Status</InputLabel>
            <Select labelId="label" id="select" value={this.applicationStatus}>
              <MenuItem value={20}>To Do</MenuItem>
              <MenuItem value={this.applicationStatus}>In Progress</MenuItem>
              <MenuItem value={this.applicationStatus}>Completed</MenuItem>
            </Select> */}
            {/* <Dropdown
              placeholder="Select Application Status"
              name="applicationStatus"
              onChange={this.handleChange}
              selection
              options={[
                { text: "To Do", value: "To Do" },
                { text: "In Progress", value: "In Progress" },
                { text: "Completed", value: "Completed" }
              ]}
              value={this.value}
            />
            ) */}
            <br />
            <br />
            <Fab variant="extended" aria-label="Delete">
              Cancel
            </Fab>{" "}
            <Fab
              variant="extended"
              aria-label="Submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Fab>
          </div>
        </form>
      </div>
    );
  }
}

const styles = (theme) => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(ApplicationNew);
