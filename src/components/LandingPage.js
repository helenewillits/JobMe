import React from "react";

import styles from "../assets/Styles.module.css";

import axios from "axios";

// defines the space that contains the three columns of applications
class LandingPage extends React.Component {
   //    componentWillMount() {
   //       axios
   //          .get("http://localhost:5000/testAPI")
   //          .then((res) => {
   //             // const data = res.data;
   //             this.setState({ applications: res.data });
   //             // console.log(res.data[0]["name"]);
   //          })
   //          .catch(function (error) {
   //             //Not handling the error. Just logging into the console.
   //             console.log(error);
   //          });
   //    }

   constructor(props) {
      super(props);
   }

   render() {
      // const { applications, page, status } = this.state;

      return (
         <div>
            {/* <p className="App-intro">{this.state.apiResponse}</p> */}
            <SignUp />
         </div>
      );
   }
}

// defines one row of applications, organized by type
class SignUp extends React.Component {
   render() {
      return (
         <div style={{ margin: 70 }}>
            <div className={styles.halfcolumn}>
               <br></br>
               <h1>Welcome</h1>
               <h3>easy application tracking starts here.</h3>
            </div>
            <div className={styles.halfcolumn} className={styles.login_signup}>
               <form>
                  <label>
                     <p>First and Last Name</p>
                     <input type="text" style={{ width: "40%" }} />
                     <input type="text" style={{ width: "40%" }} />
                  </label>
                  <label>
                     <p>Username</p>
                     <input type="text" />
                  </label>
                  <label>
                     <p>Password</p>
                     <input type="password" />
                  </label>
                  <div>
                     <button type="submit">Submit</button>
                     <button type="submit" className={styles.button_secondary}>
                        Log In
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

export default LandingPage;
