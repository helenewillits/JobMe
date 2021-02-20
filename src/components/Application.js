import React from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import NavigationBar from "./Navbar.js";

import axios from "axios";

// defines the space that contains the three columns of applications
class ApplicationLog extends React.Component {
  state = {
    userID: 0,
    applicationsToDo: [],
    applicationsInProgress: [],
    applicationsCompleted: [],
    page: "ApplicationLog",
    status: ["To Do", "In Progress", "Completed"]
  };

  componentWillMount() {
    axios
      .get("http://localhost:5000/applicationDatabase")
      .then((res) => {
        // const data = res.data;
        this.setState({ applicationsToDo: res.data });
        console.log(res);
        console.log(res.data[0]["companyName"]);
        const toDo = res.data.filter(
          (item) => item.applicationStatus == "To Do"
        );
        const inProgress = res.data.filter(
          (item) => item.applicationStatus == "In Progress"
        );
        const completed = res.data.filter(
          (item) => item.applicationStatus == "Completed"
        );
        this.setState({
          applicationsToDo: toDo,
          applicationsInProgress: inProgress,
          applicationsCompleted: completed
        });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state.userID = 12345;
  }

  // NEED TO DISTINGUISH COLUMNS BASED ON STATUS --TO DO--

  get_Applications = (i) => {
    if (i == 0) return this.state.applicationsToDo;
    if (i == 1) return this.state.applicationsInProgress;
    if (i == 2) return this.state.applicationsCompleted;
  };

  column = (i) => {
    return (
      <div className={styles.thirdcolumn}>
        <ApplicationStatusColumn
          status={this.state.status[i]}
          applications={this.get_Applications(i)}
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
        {this.column(0)}
        {this.column(1)}
        {this.column(2)}
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
class ApplicationStatusColumn extends React.Component {
  render() {
    const { applications, status } = this.props;

    return (
      <div className={styles.area}>
        <h3 className={styles.column_title}>{status}</h3>
        <ApplicationList applications={applications} />
      </div>
    );
  }
}

// class ApplicationStatusColumnInProgress extends React.Component {

class ApplicationList extends React.Component {
  render() {
    const { applications } = this.props;

    return (
      <div>
        <ul>
          {applications.map((item) => (
            <ApplicationLogItem application={item} />
          ))}
        </ul>
      </div>
    );
  }
}

// defines one application item
class ApplicationLogItem extends React.Component {
  handleDelete = (application) => {
    console.log("Delete");
    console.log(application);
    console.log(application._id);
    axios
      .delete("http://localhost:5000/applicationDatabase/delete", {
        data: {
          userId: application.userId,
          _id: application._id
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  };

  handlePopup = () => {
    console.log("pop up requested!");
  };

  render() {
    const { application } = this.props;

    // check for undefined applications : this is the default when first rendering Application
    // in development mode, but is re-rendered when it gets to the componentWillMount() function
    if (application != undefined) {
      return (
        // <div className={styles.item} onClick={this.props.handlePopup}>
        <div className={styles.item} onClick={this.handlePopup}>
          <h4> {application._id} </h4>
          <h4> {application.companyName} </h4>
          <h4> {application.position} </h4>
          {/* <a href={application.jobPostingLink}>
                  {" "}
                  {application.jobPostingLink}{" "}
               </a> */}
          <h4> {application.deadline} </h4>
          <button
            type="submit"
            onClick={this.handleDelete.bind(this, application)}
          >
            -
          </button>
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

export default ApplicationLog;
