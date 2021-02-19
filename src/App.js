import React from "react";
import { Switch, Route } from "react-router-dom";

import ApplicationLog from "./components/Application.js";
import SingleApplication from "./components/SingleApplication.js";

class App extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         modalOpen: false,
         appModalOpen: false
      };

      this.handleApplicationPopup = this.handleApplicationPopup.bind(this);
   }

   handleApplicationPopup() {
      const newState = {};
      newState.appModalOpen = true;
      newState.modalOpen = true;
      this.setState(newState);
   }

   render() {
      return (
         <Switch>
            <div>
               <Route exact path="/application">
                  <div classname="appPopup">
                     {/* <SingleApplication
                        display={this.state.appModalOpen}
                        modalOpen={this.state.appModalOpen}
                     /> */}
                     <ApplicationLog
                        // handlePopup={this.handleApplicationPopup}
                        // modalOpen={this.state.modalOpen}
                     />
                  </div>
               </Route>
            </div>
         </Switch>
      );
   }
}

export default App;

// //Load HTTP module
// const http = require("http");
// const hostname = "127.0.0.1";
// const port = 3000;

// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {
//     //Set the response HTTP header with HTTP status and Content type
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello World\n");
// });

// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
