import React from "react";
import styles from "../assets/Styles.module.css";

// defines the space that contains the three columns of interviews
class SingleInterview extends React.Component {
  state = { interview: {} };

  viewInterviewerNames = () => {
    if (this.state.interview.interviewerNames != "")
      return <h3>{this.state.interview.interviewerNames}</h3>;
  };
  viewRecruiterNames = () => {
    if (this.state.interview.recruiterNames != "")
      return <h3>{this.state.interview.recruiterNames}</h3>;
  };
  viewInterviewLink = () => {
    if (this.state.interview.interviewLink != "")
      return (
        <div style={{ textDecoration: "underline" }}>
          <a href={this.state.interview.interviewLink}>
            Link to Join Interview
          </a>
        </div>
      );
  };
  viewPosition = () => {
    if (this.state.interview.position != "")
      return <h3>{this.state.interview.position}</h3>;
  };
  viewJobPostingLink = () => {
    if (this.state.interview.jobPostingLink != "")
      return (
        <div style={{ textDecoration: "underline" }}>
          <a href={this.state.interview.jobPostingLink}>View Job Posting</a>
        </div>
      );
  };
  viewNotes = () => {
    if (this.state.interview.notes != "")
      return <h3>{this.state.interview.notes}</h3>;
  };

  handleClose = () => {
    this.props.handlePopup(this.state.interview);
  };

  render() {
    const { interview } = this.props;
    this.state.interview = interview;
    console.log("here");

    if (!this.props.display) {
      return null;
    }

    return (
      <div className={styles.popup}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className={styles.close_button}
            style={{ marginLeft: "auto" }}
            type="submit"
            onClick={this.handleClose}
          >
            x
          </button>
        </div>
        <h1>{interview.companyName}</h1>
        {this.viewInterviewerNames()}
        {this.viewRecruiterNames()}
        <h3>{interview.interviewDate}</h3>
        <h3>{interview.interviewTime}</h3>
        {this.viewInterviewLink()}
        {this.viewPosition()}
        {this.viewJobPostingLink()}
        {this.viewNotes()}
      </div>
    );
  }
}

export default SingleInterview;
