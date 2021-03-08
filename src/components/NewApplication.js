import React from "react";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DropDownMenu from "material-ui/DropDownMenu";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import { Link } from "react-router-dom";
import cssstyles from "../assets/Styles.module.css";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from "axios";
import CssBaseline from '@material-ui/core/CssBaseline';

// defines the space that contains the page for adding new job applications
class ApplicationNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      page: "ApplicationNew",

      userEmail: this.props.dataFromParent,
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (childData) => {
    console.log(childData.toString());
    this.setState({ deadline: childData.toString() });
  };

  // Handle fields change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeStatus = (event, index, value) => {
    this.setState({ applicationStatus: value });
  };

  handleChangeResult = (event, index, value) => {
    this.setState({ result: value });
  };

  handleChangeFavorite = (event) => {
    this.setState({ favorited: event.target.checked });
  };

  postNewApplication() {
    console.log("STATE FOR POST");
    console.log(this.state);
    axios
      .post("https://jobme-app.herokuapp.com/applicationDatabase/add", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    console.log("dear god it did work now didn't it");
    this.postNewApplication();
  };

  performValidation() {
    return (this.state.companyName.length > 0 && this.state.position.length > 0 && this.state.applicationStatus.length > 0 
        && this.state.result.length > 0 && this.state.deadline.length > 0);
  }

  render() {
    return (
      <Container component="main" maxWidth="sm">
        <Box mt={1} className={cssstyles.addPage}>
          <MuiThemeProvider>
            <NavigationBar />
            <p className="App-new">{this.state.apiResponse}</p>
            <Header page={this.state.page} />
            <div>
              <form noValidate>
                <div>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    label="Company"
                    name="companyName"
                    id="Company"
                    autoComplete="company"
                    autofocus
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    label="Position"
                    name="position"
                    required
                    margin="normal"
                    fullWidth
                    id="position"
                    autoComplete="position"
                    autofocus
                    onChange={this.handleChange}
                  />
                  <br />
                </div>
                <br />
                <div>
                  <Checkbox
                    name="favorited"
                    label="Favorite"
                    onClick={this.handleChangeFavorite}
                  />
                  <Grid container>
                    <Calendar
                      parentCallback={this.callbackFunction}
                      label={"*Application Deadline"}
                    />
                    <h3>{this.state.deadline}</h3>
                  </Grid>
                  <TextField
                    label="Job Posting Link"
                    fullWidth
                    margin="normal"
                    id="jobPostingLink"
                    autoComplete="jobPostingLink"
                    name="jobPostingLink"
                    autofocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Job ID"
                    fullWidth
                    name="jobId"
                    margin="normal"
                    id="jobID"
                    autoComplete="jobID"
                    name="jobID"
                    autofocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Application Portal Link"
                    fullWidth
                    margin="normal"
                    name="applicationPortalLink"
                    id="applicationPortalLink"
                    autoComplete="applicationPortalLink"
                    autofocus
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <div className={cssstyles.dropMargin}>
                    <DropDownMenu
                      value={this.state.applicationStatus}
                      onChange={this.handleChangeStatus}
                    >
                      <MenuItem
                        value={""}
                        disabled
                        primaryText="Select Application Status*"
                      />
                      <MenuItem value={"To Do"} primaryText="To Do" />
                      <MenuItem value={"In Progress"} primaryText="In Progress" />
                      <MenuItem value={"Completed"} primaryText="Completed" />
                    </DropDownMenu>
                    <br />
                    <DropDownMenu
                      className={{ required: "true", color: '#E3F6F5 !important' }}
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
                  </div>
                  <TextField
                    label="Note"
                    fullWidth
                    margin="normal"
                    name="notes"
                    id="notes"
                    autocomplete="notes"
                    autofocus
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <div align="right">
                    <Link to={"/applications"}>
                      <button className={cssstyles.delete_button} variant="extended" aria-label="Delete">
                        Cancel
                  </button>
                    </Link>
                    <Link to={"/applications"} onClick={this.handleSubmit}>
                      <button className={cssstyles.add_submit_button} variant="extended" aria-label="Delete" disabled={!this.performValidation()}>
                        Submit
                  </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </MuiThemeProvider>
        </Box>
      </Container >
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
