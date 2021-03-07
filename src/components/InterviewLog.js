import React from "react";
import styles from "../assets/Styles.module.css";
import Header from "./Header.js";
import AddButtonNavigationBar from "./AddButtonNavbar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";

// defines the space that contains the three columns ofInterview
class InterviewLog extends React.Component {
  state = {
    userEmail: "",
    InterviewPast: [],
    InterviewUpcoming: [],
    page: "InterviewLog",
    status: ["Past", "Upcoming"]
  };

  componentWillMount() {
    this.getEmail();
    axios
      .get("http://localhost:5000/interviewDatabase")
      .then((res) => {
        // need to update comparisons
        const currDate = moment().format("YYYY-MM-DD");
        console.log(currDate);

        const past = res.data.filter((item) => item.interviewDate < currDate);
        const upcoming = res.data.filter(
          (item) => item.interviewDate >= currDate
        );
        this.setState({
          InterviewPast: past,
          InterviewUpcoming: upcoming
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
      .post("http://localhost:5000/interviewDatabase/post/getEmail", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  // DISTINGUISH COLUMNS BASED ON STATUS

  getInterview = (i) => {
    if (i == 0) return this.state.InterviewPast;
    if (i == 1) return this.state.InterviewUpcoming;
  };

  column = (i) => {
    return (
      <div className={styles.halfcolumn}>
        <InterviewStatusColumn
          status={this.state.status[i]}
          interviews={this.getInterview(i)}
          handlePopup={this.props.handlePopup}
          modalOpen={this.props.modalOpen}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <AddButtonNavigationBar link={"/interviews/add"} />
        <p className="App-intro">{this.state.apiResponse}</p>
        <Header page={this.state.page} />
        {this.column(0)}
        {this.column(1)}
      </div>
    );
  }
}

// defines one row ofInterview, organized by type
class InterviewStatusColumn extends React.Component {
  render() {
    const { interviews, status } = this.props;

    return (
      <div className={styles.area}>
        <h3 className={styles.column_title}>{status}</h3>
        <InterviewList
          interviews={interviews}
          handlePopup={this.props.handlePopup}
          modalOpen={this.props.modalOpen}
        />
      </div>
    );
  }
}

// classInterviewtatusColumnInProgress extends React.Component {

class InterviewList extends React.Component {
  render() {
    const { interviews } = this.props;

    return (
      <div>
        <ul>
          {interviews.map((item) => (
            <InterviewLogItem
              interview={item}
              handlePopup={this.props.handlePopup}
              modalOpen={this.props.modalOpen}
              e
            />
          ))}
        </ul>
      </div>
    );
  }
}

// defines one Interview item
class InterviewLogItem extends React.Component {
  state = { interview: null };

  handleDelete = (interview) => {
    console.log("Delete");
    console.log(interview);
    console.log(interview._id);
    axios
      .delete("http://localhost:5000/interviewDatabase/delete", {
        data: {
          userId: interview.userId,
          _id: interview._id
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
    this.props.handlePopup(this.state.interview);
  };

  viewCompany = () => {
    if (this.state.interview.companyName != "")
      return <h4>{this.state.interview.companyName}</h4>;
  };
  viewPosition = () => {
    if (this.state.interview.position != "")
      return <h4>{this.state.interview.position}</h4>;
  };
  viewJobPostingLink = () => {
    if (this.state.interview.jobPostingLink != "")
      return (
        <div style={{ textDecoration: "underline" }}>
          <a href={this.state.interview.jobPostingLink}>View Job Posting</a>
        </div>
      );
  };
  viewInterviewDate = () => {
    if (this.state.interview.interviewDate != "")
      return <h5>{this.state.interview.interviewDate}</h5>;
  };
  viewInterviewTime = () => {
    if (this.state.interview.interviewTime != "")
      return <h5>{this.state.interview.interviewTime}</h5>;
  };

  render() {
    const { interview } = this.props;
    this.state.interview = interview;

    // check for undefinedInterview : this is the default when first rendering Interview
    // in development mode, but is re-rendered when it gets to the componentWillMount() function
    if (interview != undefined) {
      return (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className={styles.close_button}
              style={{ marginLeft: "auto" }}
              type="submit"
              onClick={this.handleDelete.bind(this, interview)}
            >
              x
            </button>
          </div>
          <div className={styles.item} onClick={this.handlePopup}>
            {this.viewCompany()}
            {this.viewPosition()}
            {this.viewJobPostingLink()}
            {this.viewInterviewDate()}
            {this.viewInterviewTime()}
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

export default InterviewLog;
