import React from "react";
import styles from "../assets/Styles.module.css";

// defines the space that contains the three columns of applications
class SingleApplication extends React.Component {
  state = { application: {} };

  viewJobId = () => {
    if (this.state.application.jobId != "")
      return <h3>{this.state.application.jobId}</h3>;
  };
  viewJobPostingLink = () => {
    if (this.state.application.jobId != "")
      return (
        <a href={this.state.application.jobPostingLink}>
          {" "}
          {this.state.application.jobPostingLink}{" "}
        </a>
      );
  };
  viewApplicationPortalLink = () => {
    if (this.state.application.jobId != "")
      return (
        <a href={this.state.application.applicationPortalLink}>
          {" "}
          {this.state.application.applicationPortalLink}{" "}
        </a>
      );
  };
  viewNotes = () => {
    if (this.state.application.jobId != "")
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
        <h1>{application.companyName}</h1>
        <h2>{application.position}</h2>
        {this.viewJobId()}
        <h3>{application.deadline}</h3>
        {this.viewJobPostingLink()}
        {this.viewApplicationPortalLink()}
        <h3>{application.result}</h3>
        {this.viewNotes()}
      </div>
    );
  }
}

export default SingleApplication;
