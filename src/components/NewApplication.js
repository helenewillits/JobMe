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
import cssstyles from "../assets/Styles.module.css";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import axios from "axios";

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
    console.log("dear god it did work now didn't it");
    this.postNewApplication();
  };

  performValidation() {
    return (this.state.companyName.length > 0 && this.state.position.length > 0 && this.state.applicationStatus.length > 0 
        && this.state.result.length > 0 && this.state.deadline.length > 0);
  }

  render() {
    return (
      <Container component="main" maxWidth="sm" position="center">
        <Box mt={1} className={cssstyles.signin}>
          <MuiThemeProvider>
            <NavigationBar />
            <p className="App-new">{this.state.apiResponse}</p>
            <Header page={this.state.page} />
            <div>
              <form>
                <div>
                  <TextField
                    type="text"
                    floatingLabelText="Company"
                    name="companyName"
                    required={true}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <br />
                  <TextField
                    floatingLabelText="Position"
                    name="position"
                    required={true}
                    fullWidth
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
                    floatingLabelText="Job Posting Link (Optional)"
                    fullWidth
                    name="jobPostingLink"
                    onChange={this.handleChange}
                  />
                  <TextField
                    floatingLabelText="Job ID (Optional)"
                    fullWidth
                    name="jobId"
                    onChange={this.handleChange}
                  />
                  <TextField
                    floatingLabelText="Application Portal Link (Optional)"
                    fullWidth
                    name="applicationPortalLink"
                    onChange={this.handleChange}
                  />
                  <DropDownMenu
                    value={this.state.applicationStatus}
                    onChange={this.handleChangeStatus}
                  >
                    <MenuItem
                      value={""}
                      disabled
                      primaryText="*Select Application Status"
                    />
                    <MenuItem value={"To Do"} primaryText="To Do" />
                    <MenuItem value={"In Progress"} primaryText="In Progress" />
                    <MenuItem value={"Completed"} primaryText="Completed" />
                  </DropDownMenu>
                  <br />
                  <DropDownMenu
                    value={this.state.result}
                    onChange={this.handleChangeResult}
                  >
                    <MenuItem value={""} disabled primaryText="*Select Result" />
                    <MenuItem value={"N/A"} primaryText="N/A" />
                    <MenuItem value={"Interviewing"} primaryText="Interviewing" />
                    <MenuItem value={"Waiting"} primaryText="Waiting" />
                    <MenuItem value={"Discontinued"} primaryText="Discontinued" />
                    <MenuItem value={"Accepted"} primaryText="Accepted" />
                    <MenuItem value={"Declined"} primaryText="Declined" />
                  </DropDownMenu>
                  <br />
                  <TextField
                    floatingLabelText="Note (Optional)"
                    fullWidth
                    name="notes"
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <Link to={"/applications"}>
                    <Fab variant="extended" aria-label="Delete">
                      Cancel
                  </Fab>
                  </Link>
                  <Link to={"/applications"} onClick={this.handleSubmit}>
                    <Fab variant="extended" aria-label="Delete" disabled={!this.performValidation()}>
                      Submit
                  </Fab>
                  </Link>
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
