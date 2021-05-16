import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Createexam from "./components/mixedexam/createexam";
import Homepage from "./components/homepage/homepage";
import Importexam from "./components/mixedexam/import";
import Areaprint from"./components/mixedexam/ExamResult/printarea"
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import allReducer from './reducers'
const myStore =createStore(allReducer)
ReactDOM.render(
  <Provider store={myStore}>
  <Router>
    <Switch>
        <Route path="/create" component={Createexam}></Route>
        <Route path="/import" component={Importexam}></Route>
        <Route path='/areaexam' component={Areaprint}></Route>
      <App>
        <Route path="/" component={Homepage}></Route>
      </App>
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
