import React from "react";

import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";
import Calendar from "./Calendar.js";
import Button from "@material-ui/core/Button";

// defines the space that contains the page for adding new job applications
class ApplicationNew extends React.Component {
   constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
      this.state.page = "ApplicationNew";
      this.state.status = [
         "Company",
         "Job Title",
         "Job ID",
         "Deadline",
         "Job Posting Link",
         "Job Dashboard Link",
         "Resume",
         "Cover Letter",
         "Status",
         "Result",
         "Notes"
      ];
   }

   render() {
      const { page, status } = this.state;

      return (
         <div>
            <NavigationBar />
            <p className="App-new">{this.state.apiResponse}</p>
            <Header page={page} />
            <div className={styles.row}>
               <div className={styles.fullcolumn}>
                  <ApplicationNewPage status={status} />
               </div>
            </div>
         </div>
      );
   }
}

// defines one row of applications, organized by type
class ApplicationNewPage extends React.Component {
   render() {
      const { status } = this.props;

      return (
         <div className={styles.areafull}>
            <div class={styles.rectangle_484_C61RwL}></div>
            <div class={styles.rectangle_485_C61RwL}></div>
            <div class={styles.rectangle_486_C61RwL}></div>
            <div class={styles.rectangle_487_C61RwL}></div>
            <div class={styles.rectangle_488_C61RwL}></div>
            <div class={styles.deadline_C61RwL}>Deadline</div>
            <div class={styles.company_C61RwL}>Company</div>
            <div class={styles.JobTitle_C61RwL}>Job Title</div>
            <div class={styles.JobId_C61RwL}>Job ID</div>
            <div class={styles.JobPostingLink_C61RwL}>Job Posting Link</div>
            <div class={styles.JobDashboardLink_C61RwL}>Job Dashboard Link</div>
            <div>
               <Calendar className={styles.calendar} />
            </div>
            <div>
               <Button
                  variant="contained"
                  color="primary"
                  href="#"
                  className={styles.buttonPos1}
               >
                  Finish
               </Button>
               <Button
                  variant="contained"
                  color="primary"
                  href="#"
                  className={styles.buttonPos2}
               >
                  Cancel
               </Button>
            </div>
         </div>
      );
   }
}

export default ApplicationNew;
