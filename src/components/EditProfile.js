import React from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      page: "EditProfile",

      email: this.props.dataFromParent,
      firstName: "",
      lastName: "",
      link1: "",
      link2: "",
      link3: "",
      workExperience: "",
      notes: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle fields change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateProfile() {
    console.log("STATE FOR PUT");
    console.log(this.state);
    axios
      .put("http://localhost:5000/userDatabase/put", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    console.log("dear god it did work now didn't it");
    console.log(this.state);
    this.updateProfile();
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <NavigationBar />
          <p className="App-new">{this.state.apiResponse}</p>
          <Header page={this.state.page} />
          <br />
          <div>
            <div className={styles.area}>
              <Table aria-label="simple table">
                <colgroup>
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "65%" }} />
                </colgroup>
                <TableBody>
                  <TableRow key={"LastName, FirstName"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"LastName, FirstName"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <TextField
                            type="text"
                            floatingLabelText="LastName"
                            name="lastName"
                            onChange={this.handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            type="text"
                            floatingLabelText="FirstName"
                            name="firstName"
                            onChange={this.handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow key={"Email"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"Email"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      {this.state.email}
                    </TableCell>
                  </TableRow>
                  <TableRow key={"Link #1"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"Link #1"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      <TextField
                        type="text"
                        floatingLabelText="Link #1"
                        name="link1"
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key={"Link #2"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"Link #2"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      <TextField
                        type="text"
                        floatingLabelText="Link #2"
                        name="link2"
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key={"Link #3"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"Link #3"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      <TextField
                        type="text"
                        floatingLabelText="Link #3"
                        name="link3"
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key={"Work Experience"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"Work Experience"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      <TextField
                        multiLine={true}
                        type="text"
                        floatingLabelText="Work Experience"
                        name="workExperience"
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key={"Notes"}>
                    <TableCell
                      component="th"
                      scope="row"
                      variant="head"
                      style={{ verticalAlign: "top" }}
                    >
                      <h2>{"Notes"}</h2>
                    </TableCell>
                    <TableCell align="left" className={styles.tablecell}>
                      <TextField
                        multiLine={true}
                        type="text"
                        floatingLabelText="Notes"
                        name="notes"
                        onChange={this.handleChange}
                        fullWidth
                      />
                      <br />
                      <br />
                      <br />
                      <div align="right">
                        <Link to={"/profile"}>
                          <button
                            className={styles.delete_button}
                            variant="extended"
                            aria-label="Delete"
                          >
                            Cancel
                          </button>
                        </Link>
                        <Link to={"/profile"} onClick={this.handleSubmit}>
                          <button
                            className={styles.add_submit_button}
                            variant="extended"
                            aria-label="Delete"
                          >
                            Submit
                          </button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default EditProfile;
