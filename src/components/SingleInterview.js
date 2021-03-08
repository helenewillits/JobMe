import React from "react";
import styles from "../assets/Styles.module.css";

// defines the space that contains the three columns of interviews
class SingleInterview extends React.Component {
  state = { interview: {} };

  viewCompany = () => {
    if (this.state.interview.companyName != "")
      return <h1>{this.state.interview.companyName}</h1>;
  };
  viewInterviewerNames = () => {
    if (this.state.interview.interviewerNames != "")
      return <h3>{this.state.interview.interviewerNames}</h3>;
  };
  viewRecruiterNames = () => {
    if (this.state.interview.recruiterNames != "")
      return <h3>{this.state.interview.recruiterNames}</h3>;
  };
  viewInterviewDate = () => {
    if (this.state.interview.interviewDate != "")
      return <h5>{this.state.interview.interviewDate}</h5>;
  };
  viewInterviewTime = () => {
    if (this.state.interview.interviewTime != "")
      return <h5>{this.state.interview.interviewTime}</h5>;
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
        {this.viewCompany()}
        {this.viewInterviewerNames()}
        {this.viewRecruiterNames()}
        {this.viewInterviewDate()}
        {this.viewInterviewTime()}
        {this.viewInterviewLink()}
        {this.viewPosition()}
        {this.viewJobPostingLink()}
        {this.viewNotes()}
      </div>
    );
  }
}

export default SingleInterview;
