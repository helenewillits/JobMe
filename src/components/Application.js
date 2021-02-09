import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../assets/Styles.module.css' ;
import Header from './Header.js';
import NavigationBar from './Navbar.js';

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
                <NavigationBar />
                <Header />
                <div className={styles.row}>
                    <div className={styles.thirdcolumn} >
                        <ApplicationStatusColumn_ToDo status='To Do' applications={this.state.applications}/>
                    </div>
                    <div className={styles.thirdcolumn} >
                        <ApplicationStatusColumn_InProgress applications={this.state.applications}/>
                    </div>
                    <div className={styles.thirdcolumn} >
                        <ApplicationStatusColumn_Completed applications={this.state.applications}/>
                    </div>
                </div>
            </div>
        );
    }
}

// defines one row of applications, organized by type
class ApplicationStatusColumn_ToDo extends React.Component {
    state = { applications : [] };

    render() {
        return (
            <div className={styles.area}>
                <h3>{this.status}</h3>
                <h3 className={styles.column_title}>To Do</h3>
                <ApplicationList_ToDo applications={this.state.applications}/>
            </div>
        );
    }
}

class ApplicationStatusColumn_InProgress extends React.Component {
    state = { applications : [] };

    render() {
        return (
            <div className={styles.area}>
                <h3>{this.status}</h3>
                <h3 className={styles.column_title}>In Progress</h3>
                <ApplicationList_InProgress applications={this.state.applications}/>
            </div>
        );
    }
}

class ApplicationStatusColumn_Completed extends React.Component {
    state = { applications : [] };

    render() {
        return (
            <div className={styles.area}>
                <h3>{this.status}</h3>
                <h3 className={styles.column_title}>Completed</h3>
                <ApplicationList_Completed applications={this.state.applications}/>
            </div>
        );
    }
}
class ApplicationList_ToDo extends React.Component {

    // TODO: Determine amount of applications to show based on how many stored in backend. Each    application column needs to represent different types of applications (e.g. To Do, In Progress, and Completed)
    state = {items : [<ApplicationLog_Item />, <ApplicationLog_Item />, <ApplicationLog_Item />, <ApplicationLog_Item />]}

    render() {
        return (
            <div>
                <React.Fragment>
                    {this.state.items}
                </React.Fragment>
            </div>
        )
    }
}

class ApplicationList_InProgress extends React.Component {

    // TODO: Determine amount of applications to show based on how many stored in backend. Each    application column needs to represent different types of applications (e.g. To Do, In Progress, and Completed)
    state = {items : [<ApplicationLog_Item />, <ApplicationLog_Item />, <ApplicationLog_Item />, <ApplicationLog_Item />]}

    render() {
        return (
            <div>
                <React.Fragment>
                    {this.state.items}
                </React.Fragment>
            </div>
        )
    }
}

class ApplicationList_Completed extends React.Component {

    // TODO: Determine amount of applications to show based on how many stored in backend. Each    application column needs to represent different types of applications (e.g. To Do, In Progress, and Completed)
    state = {items : [<ApplicationLog_Item />, <ApplicationLog_Item />, <ApplicationLog_Item />, <ApplicationLog_Item />]}

    render() {
        return (
            <div>
                <React.Fragment>
                    {this.state.items}
                </React.Fragment>
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