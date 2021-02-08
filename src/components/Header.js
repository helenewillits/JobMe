import React from 'react';
import ReactDOM from 'react-dom';

// import NavigationBar from '';

class Header extends React.Component {

    // hard coded data to get started
    page = 'ApplicationLog'
    username = 'User';
    // num_applications = 10;

    // dashboard header
    dashboard_header = (
      <div>
        {/* <NavigationBar /> */}
        <h2>Hi there, {this.username}.</h2>
        <h1>Let's make some moves.</h1>
      </div>
    );
  
    //application log header
    application_log_header = (
        <div>
          {/* <NavigationBar /> */}
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
          {/* <NavigationBar /> */}
          <h1>Add a New Application</h1>
          <h2>You're on a roll.</h2>
        </div>
    );

    render() {
        if(this.page == 'Dashboard')
            return this.dashboard_header;
        if(this.page == 'ApplicationLog')
            return this.application_log_header;
        if(this.page == 'ApplicationNew')
            return this.application_new_header;
        
        // return error;
    }
  }

  export default Header;
  