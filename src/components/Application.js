import React from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import AddButtonNavigationBar from "./AddButtonNavbar.js";
import axios from "axios";
import SingleApplication from "./SingleApplication";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Box from '@material-ui/core/Box';

// defines the space that contains the three columns of applications

class ApplicationLog extends React.Component {
  state = {
    userEmail: "",
    applicationsToDo: [],
    applicationsInProgress: [],
    applicationsCompleted: [],
    page: "ApplicationLog",
    status: ["To Do", "In Progress", "Completed"]
  };

  componentWillMount() {
    this.getEmail();
    axios
      .get("https://jobme-app.herokuapp.com/applicationDatabase")
      .then((res) => {
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
    this.state.userEmail = this.props.dataFromParent;
  }

  getEmail() {
    console.log("getEmail post route");
    axios
      .post(
        "https://jobme-app.herokuapp.com/applicationDatabase/post/getEmail",
        this.state
      )
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  // DISTINGUISH COLUMNS BASED ON STATUS

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
          handlePopup={this.props.handlePopup}
          modalOpen={this.props.modalOpen}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <AddButtonNavigationBar link={"/applications/add"} />
        <p className="App-intro">{this.state.apiResponse}</p>
        <Header page={this.state.page} />
        {this.column(0)}
        {this.column(1)}
        {this.column(2)}
      </div>
    );
  }
}

// defines one row of applications, organized by type
class ApplicationStatusColumn extends React.Component {
  render() {
    const { applications, status } = this.props;

    return (
      <Box className={styles.area}>
        <h3 className={styles.column_title}>{status}</h3>
        <ApplicationList
          applications={applications}
          handlePopup={this.props.handlePopup}
          modalOpen={this.props.modalOpen}
        />
      </Box>
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
            <ApplicationLogItem
              application={item}
              handlePopup={this.props.handlePopup}
              modalOpen={this.props.modalOpen}
            />
          ))}
        </ul>
      </div>
    );
  }
}

// defines one application item
class ApplicationLogItem extends React.Component {
  state = { application: null };

  handleDelete = (application) => {
    console.log("Delete");
    console.log(application);
    console.log(application._id);
    axios
      .delete("https://jobme-app.herokuapp.com/applicationDatabase/delete", {
        data: {
          userId: application.userId,
          _id: application._id
        }
      })
      .then((res) => {
        console.log(res.data);
        alert("Deleting item. Please refresh the page.");
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });

    // this.refresh();
  };

  handlePopup = () => {
    this.props.handlePopup(this.state.application);
  };

  render() {
    const { application } = this.props;
    this.state.application = application;

    // check for undefined applications : this is the default when first rendering Application
    // in development mode, but is re-rendered when it gets to the componentWillMount() function
    if (application != undefined) {
      return (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className={styles.close_button}
              style={{ marginLeft: "auto" }}
              type="submit"
              onClick={this.handleDelete.bind(this, application)}
            >
              x
            </button>
          </div>
          <div className={styles.item} onClick={this.handlePopup}>
            <h4> {application.companyName} </h4>
            <h4> {application.position} </h4>
            <div style={{ textDecoration: "underline" }}>
              <a href={application.jobPostingLink}>View Job Posting</a>
            </div>
            <h5>{application.result}</h5>
            <h5> {application.deadline} </h5>
          </div>
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

class AddButton extends React.Component {
  handleAdd = () => {
    window.location.href = "localhost:3000/applications/add";
  };

  render() {
    return (
      <div>
        <Link to={"/applications/add"}>
          <button type="submit" onclick={this.handleAdd}>
            +
          </button>
        </Link>
      </div>
    );
  }
}

export default ApplicationLog;
