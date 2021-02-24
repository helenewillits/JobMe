import React from "react";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
// import { Button } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
// import RaisedButton from "material-ui/RaisedButton";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox'

import axios from "axios";

import {Redirect} from 'react-router-dom'

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
      favorited: false,
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

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeResult = this.handleChangeResult.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFavorite = this.handleChangeFavorite.bind(this);
  }

  callbackFunction = (childData) => {
    console.log(childData);
    this.setState({ deadline: childData });
  };

  // Handle fields change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeStatus = (event, index, value) => {
      this.setState({ applicationStatus: value });
  }

  handleChangeResult = (event, index, value) => {
      this.setState({ result: value });
  }

  handleChangeFavorite = (event) => {
      this.setState({ favorited: event.target.checked })
  }

  postNewApplication() {
    console.log("STATE FOR POST");
    console.log(this.state);
    axios
      .post("http://localhost:5000/applicationDatabase/add", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.postNewApplication();
  };

  render() {

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
              <Checkbox
                name="favorited"
                label='Favorite'
                onClick={this.handleChangeFavorite}
            />
            <Grid container justify="left">
              <Calendar parentCallback={this.callbackFunction} />
              <h1>{this.state.deadline}</h1>
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
            <DropDownMenu 
                value={this.state.applicationStatus} 
                onChange={this.handleChangeStatus}
            >
                <MenuItem value={""} disabled primaryText="Select Application Status" />
                <MenuItem value={"To Do"} primaryText="To Do" />
                <MenuItem value={"In Progress"} primaryText="In Progress" />
                <MenuItem value={"Completed"} primaryText="Completed" />
            </DropDownMenu>
            <br />
            <DropDownMenu
                value={this.state.result} 
                onChange={this.handleChangeResult}
            >
                <MenuItem value={""} disabled primaryText="Select Result" />
                <MenuItem value={"N/A"} primaryText="N/A" />
                <MenuItem value={"Interviewing"} primaryText="Interviewing" />
                <MenuItem value={"Waiting"} primaryText="Waiting" />
                <MenuItem value={"Discontinued"} primaryText="Discontinued" />
                <MenuItem value={"Accepted"} primaryText="Accepted" />
                <MenuItem value={"Declined"} primaryText="Declined" />
            </DropDownMenu>
            <br />
            <TextField
              floatingLabelText="Notes"
              fullWidth
              name="notes"
              onChange={this.handleChange}
            />
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
