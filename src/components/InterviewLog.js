import React from "react";

import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import axios from "axios";

// defines the space that contains the three columns of applications
class InterviewLog extends React.Component {
   state = {
      interviews: [],
      page: "InterviewLog",
      status: ["Upcoming", "Past"]
   };

   componentWillMount() {
      axios
         .get("http://localhost:5000/testAPI")
         .then((res) => {
            // const data = res.data;
            this.setState({ interviews: res.data });
            // console.log(res.data[0]["name"]);
         })
         .catch(function (error) {
            //Not handling the error. Just logging into the console.
            console.log(error);
         });
   }

   constructor(props) {
      super(props);
   }

   row = (i) => {
      return (
         <div>
            <InterviewStatusColumn
               status={this.state.status[i]}
               interviews={this.state.interviews}
            />
         </div>
      );
   };

   render() {
      // const { applications, page, status } = this.state;

      return (
         <div>
            <NavigationBar />
            <p className="App-intro">{this.state.apiResponse}</p>
            <Header page={this.state.page} />
            {this.row(0)}
            {this.row(1)}
         </div>
      );

      // return (
      //    <div>
      //       <NavigationBar />
      //       <p className="App-intro">{this.state.apiResponse}</p>
      //       <Header page={page} />
      //       <div className={styles.row}>
      //          {/* <div className={styles.thirdcolumn}>
      //             <ApplicationStatusColumn
      //                status={status[0]}
      //                applications={applications}
      //             />
      //          </div> */}
      //          this.column(0);
      //          <div className={styles.thirdcolumn}>
      //             <ApplicationStatusColumn
      //                status={status[1]}
      //                applications={applications}
      //             />
      //          </div>
      //          <div className={styles.thirdcolumn}>
      //             <ApplicationStatusColumn
      //                status={status[2]}
      //                applications={applications}
      //             />
      //          </div>
      //       </div>
      //    </div>
      // );
   }
}

// defines one row of applications, organized by type
class InterviewStatusColumn extends React.Component {
   render() {
      const { interviews, status } = this.props;

      return (
         <div className={styles.area}>
            <h3 className={styles.column_title}>{status}</h3>
            <InterviewList interviews={interviews} />
         </div>
      );
   }
}

// class ApplicationStatusColumnInProgress extends React.Component {

class InterviewList extends React.Component {
   render() {
      const { interviews } = this.props;

      return (
         <div>
            <ul>
               {interviews.map((item) => (
                  <InterviewLogItem interview={item} />
               ))}
            </ul>
         </div>
      );
   }
}

// defines one application item
class InterviewLogItem extends React.Component {
   handleClick = () => {
      console.log("clicked!");
   };

   render() {
      const { interview } = this.props;

      // check for undefined applications : this is the default when first rendering Application
      // in development mode, but is re-rendered when it gets to the componentWillMount() function
      if (interview != undefined) {
         return (
            <div className={styles.item} onClick={this.handleClick}>
               <h4> {interview.company} </h4>
               <h4> {interview.position} </h4>
               <a href={interview.jobpostinglink}>
                  {" "}
                  {interview.jobpostinglink}{" "}
               </a>
               <h4>
                  {interview.deadline} <span> {interview.time} </span>
               </h4>
            </div>
         );
      } else {
         return (
            <div className={styles.item}>
               <h4> Unable to Render </h4>
            </div>
         );
      }
   }
}

export default InterviewLog;
