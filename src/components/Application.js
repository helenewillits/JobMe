import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../assets/Styles.module.css' ;
import Header from './Header.js';

// defines the space that contains the three columns of applications
class ApplicationLog extends React.Component{
    // backend : figure out how to initalize this
    state = { applications: [] };

    // filter by status - done in backend?
    get_ToDo = () => {
        return this.applications;
    }

    // get_InProgress()

    // get_Completed()

    // update this to only pass filtered applications
    render() {
        return (
            <div>
                <Header />
                <div className={styles.row} >
                    <div className={styles.thirdcolumn} >
                        <ApplicationStatusColumn status='To Do' applications={this.state.applications}/>
                    </div>
                    <div className={styles.thirdcolumn} >
                        <ApplicationStatusColumn applications={this.state.applications}/>
                    </div>
                    <div className={styles.thirdcolumn} >
                        <ApplicationStatusColumn applications={this.state.applications}/>
                    </div>
                </div>
            </div>
        );
    }
}

// defines one row of applications, organized by type
class ApplicationStatusColumn extends React.Component {
    state = { applications : [] };

    render() {
        return (
            <div className={styles.area}>
                <h3>this.staus</h3>
                <ApplicationList applications={this.state.applications}/>
            </div>
        );
    }
}

class ApplicationList extends React.Component {
    render() {
        return (
            <div>
                
                <span>&#x3C;ApplicationList /&#x3E;</span>
            </div>
        )
    }
}

// defines one application item
class ApplicationLog_Item extends React.Component {
    // state = {
    //     company : "",
    //     position : "",
    //     jobpostinglink: "",
    //     status: "",
    //     result: "",
    //     deadline: "",
    // };

    state = {
        company: "Apple", 
        position: "Sofware Developer Intern",
        jobpostinglink: "https://careers.apple.com/student",
        status : "Completed",
        result : "Accepted",
        deadline: "02.21.2021"
    };

    applicationItem = (
        <div className={styles.application_item}>
            <h4> {this.state.company} </h4>
            <h4> {this.state.position} </h4>
            <a href={this.state.jobpostinglink} > {this.state.jobpostinglink} </a>
            <h4> {this.state.deadline} </h4>
        </div>
    );
  
    render() {
        return this.applicationItem;
    }
}

    export default ApplicationLog;
// export default {
//     ApplicationLog,
//     ApplicationStatusColumn,
//     ApplicationLog_Item,
// }