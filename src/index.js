import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import Profile from "./components/Profile.js";
import Application from "./components/Application.js";

ReactDOM.render(
  <BrowserRouter>
    <App />{" "}

  </BrowserRouter>,
  document.getElementById("root")
);