import React from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import axios from "axios";

// defines the space that contains the three columns of applications
class SingleApplication extends React.Component {
  viewJobId = (application) => {
    if (application.jobId != "") return <h3>{application.jobId}</h3>;
  };

  render() {
    const { application } = this.props;
    console.log("here");

    if (!this.props.display) {
      return null;
    }

    return (
      <div className={styles.popup}>
        <h1>{application.companyName}</h1>
        <h2>{application.position}</h2>
        {/* this.viewJobId(application) */}
        <h3>{application.deadline}</h3>
        <h3>{application.jobPostingLink}</h3>
        <h3>{application.applicationPortalLink}</h3>
        <h3>{application.result}</h3>
        <h3>{application.notes}</h3>
      </div>
    );
  }
}

export default SingleApplication;

// userId: 2,
//       * favorited: 0,
//
//       * companyName: "Apple",
//       * position: "Software Development Intern",
//         jobId: 183489239238,
//       * deadline: "05/04/2021",
//         jobPostingLink: "careers.apple.com",
//         applicationPortalLink: "careers.apple.com/interns",
//       *  applicationStatus: "Completed",
//       * result: "N/A",
//         notes: ""
