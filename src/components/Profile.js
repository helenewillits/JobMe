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
      userID: 12345,
      user: {
          userID: 12345,
          firstName: "John",
          lastName: "Doe",
          email: "abc@gmail.com",
          link1: "https://link1.com",
          link2: "https://link2.com",
          link3: "https://link3.com",
          workExperience: "SLO Hacks \nInternship \nCS Club",
          notes: "- Update resume\n- Email recruiter\n- Update resume\n- Email recruiter\n- Update resume\n- Email recruiter\n- Update resume\n- Email recruiter\n- Update resume\n- Email recruiter"
      },
      page: "Profile"
   };

//    componentWillMount() {
//       axios
//          .get("http://localhost:5000/userDatabase")
//          .then((res) => {
//             // const data = res.data;
//             this.setState({ users: res.data });
//             console.log(res);
//             console.log(res.data[0]["companyName"]);
//             const toDo = res.data.filter(
//                (item) => item.applicationStatus == "To Do"
//             );
//             const inProgress = res.data.filter(
//                (item) => item.applicationStatus == "In Progress"
//             );
//             const completed = res.data.filter(
//                (item) => item.applicationStatus == "Completed"
//             );
//             this.setState({
//                applicationsToDo: toDo,
//                applicationsInProgress: inProgress,
//                applicationsCompleted: completed
//             });
//          })
//          .catch(function (error) {
//             //Not handling the error. Just logging into the console.
//             console.log(error);
//          });
//    }

   constructor(props) {
      super(props);
      this.state.userID = 12345;
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
                        <col style={{width:'35%'}}/>
                        <col style={{width:'65%'}}/>
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