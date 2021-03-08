import React from "react";
import styles from "../assets/Styles.module.css";

// defines the space that contains the three columns of applications
class SingleApplication extends React.Component {
  state = { application: {} };

  viewCompany = () => {
    if (this.state.application.companyName != "")
      return <h4>{this.state.application.companyName}</h4>;
  };
  viewPosition = () => {
    if (this.state.application.position != "")
      return <h4>{this.state.application.position}</h4>;
  };
  viewJobId = () => {
    if (this.state.application.jobId !== "")
      return <h3>{this.state.application.jobId}</h3>;
  };
  viewJobPostingLink = () => {
    if (this.state.application.jobPostingLink !== "")
      return (
        <div style={{ textDecoration: "underline" }}>
          <a href={this.state.application.jobPostingLink}>View Job Posting</a>
        </div>
      );
  };
  viewApplicationPortalLink = () => {
    if (this.state.application.applicationPortalLink !== "")
      return (
        <div style={{ textDecoration: "underline" }}>
          <a href={this.state.application.applicationPortalLink}>
            View Application Portal
          </a>
        </div>
      );
  };
  viewResult = () => {
    if (this.state.application.result != "")
      return <h5>{this.state.application.result}</h5>;
  };
  viewDeadline = () => {
    if (this.state.application.deadline != "")
      return <h5>{this.state.application.deadline}</h5>;
  };
  viewNotes = () => {
    if (this.state.application.notes !== "")
      return <h3>{this.state.application.notes}</h3>;
  };

  handleClose = () => {
    this.props.handlePopup(this.state.application);
  };

  render() {
    const { application } = this.props;
    this.state.application = application;
    
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
        {this.viewPosition()}
        {this.viewJobId()}
        {this.viewDeadline()}
        {this.viewJobPostingLink()}
        {this.viewApplicationPortalLink()}
        {this.viewResult()}
        {this.viewNotes()}
      </div>
    );
  }
}

export default SingleApplication;
