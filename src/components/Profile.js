import React, { Profiler } from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import axios from "axios";

class Profile extends React.Component {
   state = {
      userID: 0,
      users: [],
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

   // NEED TO DISTINGUISH COLUMNS BASED ON STATUS --TO DO--

//    get_Applications = (i) => {
//       if (i == 0) return this.state.applicationsToDo;
//       if (i == 1) return this.state.applicationsInProgress;
//       if (i == 2) return this.state.applicationsCompleted;
//    };

//    column = (i) => {
//       return (
//          <div className={styles.thirdcolumn}>
//             <ApplicationStatusColumn
//                status={this.state.status[i]}
//                applications={this.get_Applications(i)}
//             />
//          </div>
//       );
//    };

   render() {
       console.log(this.state.page);
      return (
         <div>
            <NavigationBar />
            <p className="App-intro">{this.state.apiResponse}</p>
            <Header page={this.state.page} />
         </div>
      );
   }
}

export default Profile;