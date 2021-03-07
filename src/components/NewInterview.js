import React from "react";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import { Link } from "react-router-dom";

import axios from "axios";

// defines the space that contains the page for adding new job interviews
class InterviewNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      page: "InterviewNew",

      userEmail: this.props.dataFromParent,
      companyName: "",
      interviewerNames: "",
      recruiterNames: "",
      interviewDate: "",
      interviewTime: "",
      interviewLink: "",
      position: "",
      jobPostingLink: "",
      notes: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (childData) => {
    console.log(childData);
    this.setState({ interviewDate: childData });
  };

  // Handle fields change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  postNewInterview() {
    console.log("STATE FOR POST");
    console.log(this.state);
    axios
      .post("https://jobme-app.herokuapp.com/interviewDatabase/add", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    console.log("dear god it did work now didn't it");
    // event.preventDefault();
    this.postNewInterview();
  };

  performValidation() {
    return this.state.companyName.length > 0 && this.state.interviewTime.length > 0 && this.state.interviewDate > 0;
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <NavigationBar />
          <p className="App-new">{this.state.apiResponse}</p>
          <Header page={this.state.page} />
          <div>
            <form>
              <div>
                <TextField
                  type="text"
                  floatingLabelText="*Company"
                  name="companyName"
                  onChange={this.handleChange}
                  fullWidth
                />
                <br />
                <TextField
                  floatingLabelText="Interviewer Name(s) (Optional)"
                  fullWidth
                  name="interviewerNames"
                  onChange={this.handleChange}
                />
                <TextField
                  floatingLabelText="Recruiter Name(s) (Optional)"
                  fullWidth
                  name="recruiterNames"
                  onChange={this.handleChange}
                />
                <Grid container>
                  <Calendar
                    parentCallback={this.callbackFunction}
                    label={"*Interview Date"}
                  />
                  <h3>{this.state.interviewDate.toString()}</h3>
                </Grid>
                <TextField
                  floatingLabelText="*Interview Time"
                  fullWidth
                  name="interviewTime"
                  onChange={this.handleChange}
                />
                <TextField
                  floatingLabelText="Interview Link (Optional)"
                  fullWidth
                  name="interviewLink"
                  onChange={this.handleChange}
                />
                <TextField
                  floatingLabelText="Job Posting Link (Optional)"
                  fullWidth
                  name="jobPostingLink"
                  onChange={this.handleChange}
                />
                <TextField
                  floatingLabelText="Interview Portal Link (Optional)"
                  fullWidth
                  name="interviewPortalLink"
                  onChange={this.handleChange}
                />
                <br />
                <TextField
                  floatingLabelText="Notes (Optional)"
                  fullWidth
                  name="notes"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Link to={"/interviews"}>
                  <Fab variant="extended" aria-label="Delete">
                    Cancel
                  </Fab>
                </Link>
                <Link to={"/interviews"} onClick={this.handleSubmit}>
                  <Fab variant="extended" aria-label="Delete" disabled={!this.performValidation()}>
                    Submit
                  </Fab>
                </Link>
              </div>
            </form>
          </div>
        </MuiThemeProvider>
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

export default withStyles(styles)(InterviewNew);
