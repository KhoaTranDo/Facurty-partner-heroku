import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import "./index.css";
import App from "./App";
import Homepage from "./components/homepage/homepage";
import Createexam from "./components/CreateExam/maincreate";
import MainGradingexam from "./components/Gradingexam/Maingrading";
import Gradingexam from "./components/Gradingexam/Gradingexam";
import Reviewexam from "./components/CreateExam/reviewexam";

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/create" component={Createexam}></Route>
        <Route exact path="/areaexam/:slug" component={Reviewexam}></Route>
        <Route exact path="/Maingrading" component={MainGradingexam}></Route>
        <Route path="/grading/:slug" component={Gradingexam}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);
