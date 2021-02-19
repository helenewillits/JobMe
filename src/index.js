import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApplicationLog from "./components/Application.js";
import ApplicationNew from "./components/NewApplication.js";
import InterviewLog from "./components/InterviewLog.js";
import LandingPage from "./components/LandingPage.js";
import App from "./App.js";

//ReactDOM.render(<ApplicationNew />, document.getElementById("root"));
ReactDOM.render(
   <BrowserRouter>
      <App />{" "}
   </BrowserRouter>,
   document.getElementById("root")
);
