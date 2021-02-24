import React from "react";

class Header extends React.Component {
   // dashboard header
   dashboard_header = (
      <div>
         <h2>Hi there, {this.username}.</h2>
         <h1>Let's make some moves.</h1>
      </div>
   );

   //application log header
   application_log_header = (
      <div>
         <h1>My Applications</h1>
         <h2>{this.acknowledge_apps}</h2>
      </div>
   );
   // acknowledge_apps = () => {
   //     if(this.num_applications > 2)
   //         return "Wow, look at them all!"
   //     else
   //         return 'Nevermind'
   // };

   // new application header
   application_new_header = (
      <div>
         <h1>Add a New Application</h1>
         <h2>You're on a roll.</h2>
      </div>
   );

   // interview log header
   interview_log_header = (
      <div>
         <h1>My Interviews</h1>
         <h2>Get that Bread.</h2>
      </div>
   );

   profile_header = (
       <div>
           <h1>My Profile</h1>
           <h2>Straight Applicant Awesomeness.</h2>
       </div>
   );

   render() {
      const { page } = this.props;

      if (page === "Dashboard") return this.dashboard_header;
      if (page === "ApplicationLog") return this.application_log_header;
      if (page === "ApplicationNew") return this.application_new_header;
      if (page === "InterviewLog") return this.interview_log_header;
      if (page === "Profile") return this.profile_header;
      else {
         return this.dashboard_header;
      }

      // return error;
   }
}

export default Header;
