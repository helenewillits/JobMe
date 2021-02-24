import React, { Profiler } from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import axios from "axios";
import { makeStyles } from "@material-ui/core";

class Profile extends React.Component {
   state = {
      userID: 0,
      user: {
          userID: 12345,
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

    createData(name, value) {
        console.log("USER: ", this.state.user);
        return { name, value };
    }

    rows = [
        this.createData("Email", this.state.user.email),
        this.createData("Personal Link #1", this.state.user.link1),
        this.createData("Personal Link #2", this.state.user.link2),
        this.createData("Personal Link #3", this.state.user.link3),
        this.createData("Work Experience", this.state.user.workExperience),
        this.createData("Notes", this.state.user.notes)
    ]

   render() {
      return (
         <div>
            <NavigationBar />
            <p className="App-intro">{this.state.apiResponse}</p>
            <Header page={this.state.page} />
            <br />
            <div className={styles.area}>
                <Table aria-label="simple table">
                    <colgroup>
                        <col style={{width:'35%'}}/>
                        <col style={{width:'65%'}}/>
                    </colgroup>
                    <TableBody>
                        {this.rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" variant="head" style={{ verticalAlign: 'top'}}>
                                    <h2>{row.name}</h2>
                                </TableCell>
                                <TableCell align="left" className={styles.tablecell}>
                                    {row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* <div className={styles.area}>
                <h2>Email</h2>
                <div className={styles.area}>
                    <h4>{this.state.user.email}</h4>
                </div>
                <h2>Personal Link #1</h2>
                <div className={styles.area}>
                    <h4>{this.state.user.link1}</h4>
                </div>
                <h2>Personal Link #2</h2>
                <div className={styles.area}>
                    <h4>{this.state.user.link2}</h4>
                </div>
                <h2>Personal Link #3</h2>
                <div className={styles.area}>
                    <h4>{this.state.user.link3}</h4>
                </div>
                <h2>Work Experience</h2>
                <div className={styles.area}>
                    <h4>{this.state.user.workExperience}</h4>
                </div>
                <h2>Notes</h2>
                <div className={styles.area}>
                    <h4>{this.state.user.notes}</h4>
                </div> */}
         </div>
      );
   }
}

export default Profile;