import React from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import axios from "axios";

// defines the space that contains the three columns of applications
class SingleApplication extends React.Component {
   render() {
      // const { applications, page, status } = this.state;

      return (
         <div>
            <NavigationBar />
            <p>Hi!</p>
         </div>
      );
   }
}

export default SingleApplication;
