import React, { Profiler } from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

import axios from "axios";
import { makeStyles } from "@material-ui/core";

class Profile extends React.Component {
    state = {
        email: "",
        user: {},
        page: "Profile",
        refresh: false
    };

    componentWillMount() {
        console.log("In ComponentWillMount");
        this.getEmail();
        axios
            .get("https://jobme-app.herokuapp.com/userDatabase")
            .then((res) => {
                console.log(res.data[0]);
                this.setState({ user: res.data[0] });
            })
            .catch(function (error) {
                //Not handling the error. Just logging into the console.
                console.log(error);
            });
    }

    constructor(props) {
        super(props);
        this.state.email = this.props.dataFromParent;
    }

    getEmail() {
        console.log("getEmail post route");
        axios.post("https://jobme-app.herokuapp.com/userDatabase/post/getEmail", this.state)
            .then((res) => {
                console.log(res);
            })
            .catch(function (error) {
                //Not handling the error. Just logging into the console.
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <p className="App-intro">{this.state.apiResponse}</p>
                <Header page={this.state.page} />
                <br />
                <Link to={"/profile/edit"}>
                    <Fab variant="extended" aria-label="Delete">
                        Edit
              </Fab>
                </Link>
                <br />
                <div className={styles.area}>
                    <Table aria-label="simple table">
                        <colgroup>
                            <col style={{ width: '35%' }} />
                            <col style={{ width: '65%' }} />
                        </colgroup>
                        <TableBody>
                            <TableRow key={"LastName, FirstName"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"LastName, FirstName"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.lastName}, {this.state.user.firstName}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"Email"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"Email"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.email}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"Link #1"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"Link #1"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.link1}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"Link #2"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"Link #2"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.link2}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"Link #3"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"Link #3"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.link3}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"Work Experience"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"Work Experience"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.workExperience}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"Notes"}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top' }}>
                                    <h2>{"Notes"}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {this.state.user.notes}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Profile;
