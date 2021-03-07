import React from "react";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import cssstyles from "../assets/Styles.module.css";
import Container from '@material-ui/core/Container';

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
      .post("http://localhost:5000/interviewDatabase/add", this.state)
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
      <Container component="main" maxWidth="sm" align='center'>
        <Box mt={1} className={cssstyles.addPage}>
          <div>
            <MuiThemeProvider>
              <NavigationBar />
              <p className="App-new">{this.state.apiResponse}</p>
              <div align="left">
                <Header page={this.state.page} />
              </div>
              <div>
                <form>
                  <div>
                    <TextField
                      margin="normal"
                      type="text"
                      label="Company"
                      id="company"
                      name="companyName"
                      required
                      onChange={this.handleChange}
                      autoComplete="company"
                      fullWidth
                      autofocus
                    />
                    <TextField
                      label="Interviewer Name(s)"
                      fullWidth
                      margin="normal"
                      id="interviewerNames"
                      name="interviewerNames"
                      onChange={this.handleChange}
                      autoComplete="interviewerNames"
                      autofocus
                    />
                    <TextField
                      margin="normal"
                      label="Recruiter Name(s)"
                      fullWidth
                      id="recruiterNames"
                      name="recruiterNames"
                      autoComplete="recruiterNames"
                      onChange={this.handleChange}
                      autofocus
                    />
                    <Grid container>
                      <Calendar
                        parentCallback={this.callbackFunction}
                        label={"Interview Date *"}
                      />
                      <h3>{this.state.interviewDate.toString()}</h3>
                    </Grid>
                    <TextField
                      margin="normal"
                      id="interviewTime"
                      name="interviewTime"
                      required
                      label="Interview Time"
                      fullWidth
                      name="interviewTime"
                      onChange={this.handleChange}
                      autoComplete="interviewTime"
                      autofocus
                    />
                    <TextField
                      label="Interview Link"
                      margin="normal"
                      fullWidth
                      id="interviewLink"
                      name="interviewLink"
                      onChange={this.handleChange}
                      autoComplete="interviewLink"
                      autofocus
                    />
                    <TextField
                      label="Job Posting Link"
                      margin="normal"
                      fullWidth
                      name="jobPostingLink"
                      onChange={this.handleChange}
                      autoComplete="jobPostingLink"
                      autofocus
                    />
                    <TextField
                      label="Interview Portal Link"
                      margin="normal"
                      fullWidth
                      id="interviewPortalLink"
                      name="interviewPortalLink"
                      onChange={this.handleChange}
                      autoComplete="interviewPortalLink"
                      autofocus
                    />
                    <br />
                    <TextField
                      label="Notes"
                      margin="normal"
                      fullWidth
                      id="notes"
                      name="notes"
                      onChange={this.handleChange}
                      autoComplete="notes"
                      autofocus
                    />
                    <br />
                    <br />
                    <div align="right">
                      <Link to={"/interviews"}>
                        <button className={cssstyles.delete_button} variant="extended" aria-label="Delete">
                          Cancel
                    </button>
                      </Link>
                      <Link to={"/interviews"} onClick={this.handleSubmit}>
                        <button className={cssstyles.add_submit_button} variant="extended" aria-label="Delete" disabled={!this.performValidation()}>
                          Submit
                  </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </MuiThemeProvider>
          </div>
        </Box>
      </Container>
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
