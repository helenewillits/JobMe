import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import Calendar from "./Calendar.js";
import Grid from "@material-ui/core/Grid";

export class FormUserDetails extends React.Component {
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

  render() {
    // Application state
    const { values, handleChange, classes } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div>
            <TextField
              floatingLabelText="Company"
              onchange={handleChange("companyName")}
              defaultValue={values.company}
            />
            <br />
            <TextField
              floatingLabelText="Job Title"
              onchange={handleChange("jobTitle")}
            />
            <br />
            <br />
          </div>
          <br />
          <div>
            <Grid container justify="left">
              <Calendar />
            </Grid>
            <TextField
              floatingLabelText="Job Posting Link"
              onchange={handleChange("link")}
            />
            <br />
            <TextField
              floatingLabelText="Notes"
              onchange={handleChange("notes")}
            />
            <br />
            <br />
            <Fab variant="extended" aria-label="Delete" className={classes.fab}>
              Cancel
            </Fab>{" "}
            <Fab
              variant="extended"
              aria-label="Delete"
              className={classes.fab}
              onClick={this.onClick}
            >
              Submit
            </Fab>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
  onClick() {
    console.log(this.state.values.company);
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

export default withStyles(styles)(FormUserDetails);
